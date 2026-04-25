import { useEffect, useRef, useState } from "react";
import type { LocalizationContent } from "./localization";

const initialBeatStates = [0, 1, 2, 3];
const accentCycle: AccentLevel[] = ["strong", "medium", "mute"];

type AccentLevel = "strong" | "medium" | "mute";

interface MetronomePanelProps {
  copy: LocalizationContent["metronome"];
}

export default function MetronomePanel({ copy }: MetronomePanelProps) {
  const [bpm, setBpm] = useState(92);
  const [beatsPerBar, setBeatsPerBar] = useState(4);
  const [subdivision, setSubdivision] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [accentPattern, setAccentPattern] = useState<AccentLevel[]>([
    "strong",
    "medium",
    "medium",
    "medium",
  ]);
  const totalSteps = beatsPerBar * subdivision;

  const audioContextRef = useRef<AudioContext | null>(null);
  const schedulerRef = useRef<number | null>(null);
  const nextNoteTimeRef = useRef(0);
  const currentStepRef = useRef(0);
  const lookaheadMsRef = useRef(25);
  const scheduleWindowRef = useRef(0.1);
  const tapTimesRef = useRef<number[]>([]);

  useEffect(() => {
    setAccentPattern((current) =>
      Array.from({ length: totalSteps }, (_, index) => {
        if (current[index]) {
          return current[index];
        }

        return index === 0 ? "strong" : "medium";
      }),
    );
  }, [totalSteps]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const audioContext = audioContextRef.current;

    if (!audioContext) {
      return;
    }

    nextNoteTimeRef.current = audioContext.currentTime + 0.05;
    currentStepRef.current = 0;
    setActiveStep(0);

    schedulerRef.current = window.setInterval(() => {
      scheduleNotes();
    }, lookaheadMsRef.current);

    return () => {
      if (schedulerRef.current !== null) {
        window.clearInterval(schedulerRef.current);
        schedulerRef.current = null;
      }
    };
  }, [isRunning, bpm, beatsPerBar, subdivision, accentPattern]);

  useEffect(() => {
    return () => {
      if (schedulerRef.current !== null) {
        window.clearInterval(schedulerRef.current);
      }

      audioContextRef.current?.close().catch(() => undefined);
    };
  }, []);

  function scheduleNotes() {
    const audioContext = audioContextRef.current;

    if (!audioContext) {
      return;
    }

    while (
      nextNoteTimeRef.current <
      audioContext.currentTime + scheduleWindowRef.current
    ) {
      const step = currentStepRef.current % totalSteps;
      const stepInBeat = step % subdivision;
      const accent = accentPattern[step] ?? "medium";
      const isBeat = stepInBeat === 0;

      if (accent !== "mute") {
        triggerClick(audioContext, nextNoteTimeRef.current, {
          accent,
          isBeat,
        });
      }

      const delayMs = Math.max(
        0,
        (nextNoteTimeRef.current - audioContext.currentTime) * 1000,
      );

      window.setTimeout(() => {
        setActiveStep(step);
      }, delayMs);

      const secondsPerBeat = 60 / bpm;
      nextNoteTimeRef.current += secondsPerBeat / subdivision;
      currentStepRef.current += 1;
    }
  }

  function triggerClick(
    audioContext: AudioContext,
    time: number,
    options: { accent: AccentLevel; isBeat: boolean },
  ) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "square";
    oscillator.frequency.value = options.isBeat
      ? options.accent === "strong"
        ? 1320
        : 980
      : 720;

    const peakGain = options.isBeat
      ? options.accent === "strong"
        ? 0.26
        : 0.18
      : 0.12;

    gainNode.gain.setValueAtTime(0.0001, time);
    gainNode.gain.exponentialRampToValueAtTime(peakGain, time + 0.002);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, time + 0.05);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(time);
    oscillator.stop(time + 0.06);
  }

  function handleTapTempo() {
    const now = performance.now();
    const recent = [...tapTimesRef.current, now].filter(
      (time) => now - time <= 2400,
    );

    tapTimesRef.current = recent;

    if (recent.length < 2) {
      return;
    }

    const intervals = recent.slice(1).map((time, index) => time - recent[index]);
    const averageInterval =
      intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
    const nextBpm = Math.round(60000 / averageInterval);

    if (Number.isFinite(nextBpm)) {
      setBpm(Math.min(220, Math.max(40, nextBpm)));
    }
  }

  function cycleAccent(stepIndex: number) {
    setAccentPattern((current) => {
      const next = [...current];
      const currentLevel = next[stepIndex] ?? (stepIndex === 0 ? "strong" : "medium");
      const nextLevel =
        accentCycle[(accentCycle.indexOf(currentLevel) + 1) % accentCycle.length];
      next[stepIndex] = nextLevel;
      return next;
    });
  }

  function accentLabel(level: AccentLevel) {
    if (level === "strong") {
      return copy.strong;
    }

    if (level === "mute") {
      return copy.mute;
    }

    return copy.medium;
  }

  const stepStates =
    totalSteps === activeStep + 1 && !isRunning
      ? initialBeatStates
      : Array.from({ length: totalSteps }, (_, index) => index);
  const subdivisions = [
    { value: 1, label: copy.subdivisionLabels.quarter },
    { value: 2, label: copy.subdivisionLabels.eighth },
    { value: 4, label: copy.subdivisionLabels.sixteenth },
  ];

  return (
    <section className="panel-card metronome-panel">
      <div className="metronome-header">
        <div>
          <p className="section-label">{copy.sectionLabel}</p>
          <h2>{copy.title}</h2>
          <p className="metronome-copy">{copy.description}</p>
        </div>

        <div className="transport-group">
          <button
            className="tap-button"
            onClick={handleTapTempo}
            type="button"
          >
            {copy.tapTempo}
          </button>
          <button
            className={`transport-button ${isRunning ? "is-live" : ""}`}
            onClick={() => {
              if (isRunning) {
                setIsRunning(false);
                return;
              }
              if (!audioContextRef.current) {
                audioContextRef.current = new AudioContext();
              }
              const ctx = audioContextRef.current;
              // Play a silent buffer to fully unlock audio on iOS WebKit
              const silentBuffer = ctx.createBuffer(1, 1, ctx.sampleRate);
              const silentSource = ctx.createBufferSource();
              silentSource.buffer = silentBuffer;
              silentSource.connect(ctx.destination);
              silentSource.start(0);
              ctx.resume().then(() => setIsRunning(true)).catch(() => setIsRunning(true));
            }}
            type="button"
          >
            {isRunning ? copy.stop : copy.start}
          </button>
        </div>
      </div>

      <div className="metronome-controls">
        <label className="control-card">
          <span>{copy.bpm}</span>
          <input
            max={220}
            min={40}
            onChange={(event) => setBpm(Number(event.target.value))}
            type="range"
            value={bpm}
          />
          <strong>{bpm}</strong>
        </label>

        <label className="control-card">
          <span>{copy.beatsPerBar}</span>
          <input
            max={7}
            min={2}
            onChange={(event) => setBeatsPerBar(Number(event.target.value))}
            type="range"
            value={beatsPerBar}
          />
          <strong>{beatsPerBar}/4</strong>
        </label>

        <label className="control-card">
          <span>{copy.subdivision}</span>
          <select
            onChange={(event) => setSubdivision(Number(event.target.value))}
            value={subdivision}
          >
            {subdivisions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <strong>{subdivision}x</strong>
        </label>
      </div>

      <div className="accent-panel">
        <div className="accent-header">
          <p className="section-label">{copy.accentPattern}</p>
        </div>
        <div className="accent-row">
          {accentPattern.map((level, index) => (
            <button
              className={`accent-chip accent-${level}`}
              key={`${index}-${level}`}
              onClick={() => cycleAccent(index)}
              type="button"
            >
              <span>
                {Math.floor(index / subdivision) + 1}
                {subdivision > 1 ? `.${(index % subdivision) + 1}` : ""}
              </span>
              <strong>{accentLabel(level)}</strong>
            </button>
          ))}
        </div>
      </div>

      <div className="pulse-grid" role="presentation">
        {stepStates.map((step) => {
          const accent = accentPattern[step] ?? "medium";
          const isCurrent = isRunning && step === activeStep;
          const isBeat = step % subdivision === 0;

          return (
            <div
              className={[
                "pulse-node",
                accent === "strong" && isBeat ? "downbeat" : "",
                accent === "mute" && isBeat ? "muted" : "",
                isBeat ? "beat" : "subbeat",
                isCurrent ? "active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              key={step}
            >
              <span>{step + 1}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

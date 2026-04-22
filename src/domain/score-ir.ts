export type SourceKind = "musicxml" | "omr" | "audio" | "manual";

export type StepName = "C" | "D" | "E" | "F" | "G" | "A" | "B";

export type ModeName =
  | "major"
  | "minor"
  | "dorian"
  | "phrygian"
  | "lydian"
  | "mixolydian"
  | "aeolian"
  | "locrian"
  | "unknown";

export type ClefSign = "G" | "F" | "C" | "percussion" | "tab";

export type EventKind =
  | "note"
  | "rest"
  | "barline"
  | "tempo"
  | "direction"
  | "harmony";

export interface ScoreSourceRef {
  kind: SourceKind;
  originId?: string;
  pageIndex?: number;
  systemIndex?: number;
  measureIndex?: number;
  eventIndex?: number;
  confidence?: number;
  boundingBox?: BoundingBox;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ScoreMetadata {
  title?: string;
  subtitle?: string;
  composer?: string;
  arranger?: string;
  lyricist?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Score {
  id: string;
  metadata: ScoreMetadata;
  parts: Part[];
  source?: ScoreSourceRef;
  ticksPerQuarter: number;
}

export interface Part {
  id: string;
  name: string;
  instrumentName?: string;
  measures: Measure[];
  transposition?: Transposition;
  clefPlan?: ClefDefinition[];
}

export interface Measure {
  id: string;
  index: number;
  number?: string;
  keySignature?: KeySignature;
  timeSignature?: TimeSignature;
  tempo?: TempoMark;
  voices: Voice[];
  directions?: DirectionEvent[];
  source?: ScoreSourceRef;
}

export interface Voice {
  id: string;
  events: ScoreEvent[];
}

export type ScoreEvent =
  | NoteEvent
  | RestEvent
  | BarlineEvent
  | TempoEvent
  | DirectionEvent
  | HarmonyEvent;

export interface EventBase {
  id: string;
  kind: EventKind;
  tickStart: number;
  tickDuration: number;
  source?: ScoreSourceRef;
}

export interface NoteEvent extends EventBase {
  kind: "note";
  pitch: Pitch;
  duration: DurationValue;
  tie?: TieInfo;
  slurIds?: string[];
  articulations?: string[];
  lyrics?: LyricLine[];
  beams?: BeamInfo[];
}

export interface RestEvent extends EventBase {
  kind: "rest";
  duration: DurationValue;
}

export interface BarlineEvent extends EventBase {
  kind: "barline";
  style?: "regular" | "double" | "final" | "repeat-start" | "repeat-end";
}

export interface TempoEvent extends EventBase {
  kind: "tempo";
  tempo: TempoMark;
}

export interface DirectionEvent extends EventBase {
  kind: "direction";
  text: string;
  placement?: "above" | "below";
}

export interface HarmonyEvent extends EventBase {
  kind: "harmony";
  symbol: string;
}

export interface Pitch {
  step: StepName;
  alter: number;
  octave: number;
  midi: number;
  concertMidi?: number;
  spelling: string;
}

export interface DurationValue {
  divisionUnits: number;
  beats?: number;
  seconds?: number;
  notated: NotatedDuration;
}

export interface NotatedDuration {
  value:
    | "whole"
    | "half"
    | "quarter"
    | "eighth"
    | "16th"
    | "32nd"
    | "64th"
    | "128th"
    | "unknown";
  dots: number;
  isTuplet?: boolean;
  tuplet?: TupletInfo;
}

export interface TupletInfo {
  actualNotes: number;
  normalNotes: number;
}

export interface TieInfo {
  starts?: boolean;
  stops?: boolean;
}

export interface BeamInfo {
  level: number;
  type: "begin" | "continue" | "end" | "forward-hook" | "backward-hook";
}

export interface LyricLine {
  verse?: number;
  text: string;
  syllabic?: "single" | "begin" | "middle" | "end";
}

export interface KeySignature {
  fifths: number;
  mode: ModeName;
  tonic?: StepName;
}

export interface TimeSignature {
  beats: number;
  beatType: number;
}

export interface TempoMark {
  bpm: number;
  beatUnit: NotatedDuration["value"];
  text?: string;
}

export interface ClefDefinition {
  sign: ClefSign;
  line: number;
  octaveChange?: -2 | -1 | 0 | 1 | 2;
}

export interface Transposition {
  chromatic: number;
  diatonic?: number;
  octaveChange?: number;
}

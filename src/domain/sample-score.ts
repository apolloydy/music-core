import type { Score } from "./score-ir";

export const sampleScore: Score = {
  id: "demo-twinkle-fragment",
  metadata: {
    title: "Twinkle Fragment",
    subtitle: "Score IR sample",
    composer: "Traditional",
    updatedAt: "2026-04-21",
  },
  ticksPerQuarter: 480,
  source: {
    kind: "manual",
    originId: "prototype-seed",
    confidence: 1,
  },
  parts: [
    {
      id: "piano-rh",
      name: "Piano RH",
      instrumentName: "Piano",
      clefPlan: [{ sign: "G", line: 2 }],
      measures: [
        {
          id: "m1",
          index: 0,
          number: "1",
          keySignature: {
            fifths: 0,
            mode: "major",
            tonic: "C",
          },
          timeSignature: {
            beats: 4,
            beatType: 4,
          },
          tempo: {
            bpm: 92,
            beatUnit: "quarter",
            text: "Practice Tempo",
          },
          voices: [
            {
              id: "v1",
              events: [
                {
                  id: "n1",
                  kind: "note",
                  tickStart: 0,
                  tickDuration: 480,
                  pitch: {
                    step: "C",
                    alter: 0,
                    octave: 4,
                    midi: 60,
                    spelling: "C4",
                  },
                  duration: {
                    divisionUnits: 480,
                    beats: 1,
                    notated: {
                      value: "quarter",
                      dots: 0,
                    },
                  },
                },
                {
                  id: "n2",
                  kind: "note",
                  tickStart: 480,
                  tickDuration: 480,
                  pitch: {
                    step: "C",
                    alter: 0,
                    octave: 4,
                    midi: 60,
                    spelling: "C4",
                  },
                  duration: {
                    divisionUnits: 480,
                    beats: 1,
                    notated: {
                      value: "quarter",
                      dots: 0,
                    },
                  },
                },
                {
                  id: "n3",
                  kind: "note",
                  tickStart: 960,
                  tickDuration: 480,
                  pitch: {
                    step: "G",
                    alter: 0,
                    octave: 4,
                    midi: 67,
                    spelling: "G4",
                  },
                  duration: {
                    divisionUnits: 480,
                    beats: 1,
                    notated: {
                      value: "quarter",
                      dots: 0,
                    },
                  },
                },
                {
                  id: "n4",
                  kind: "note",
                  tickStart: 1440,
                  tickDuration: 480,
                  pitch: {
                    step: "G",
                    alter: 0,
                    octave: 4,
                    midi: 67,
                    spelling: "G4",
                  },
                  duration: {
                    divisionUnits: 480,
                    beats: 1,
                    notated: {
                      value: "quarter",
                      dots: 0,
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          id: "m2",
          index: 1,
          number: "2",
          keySignature: {
            fifths: 0,
            mode: "major",
            tonic: "C",
          },
          timeSignature: {
            beats: 4,
            beatType: 4,
          },
          voices: [
            {
              id: "v1",
              events: [
                {
                  id: "n5",
                  kind: "note",
                  tickStart: 0,
                  tickDuration: 480,
                  pitch: {
                    step: "A",
                    alter: 0,
                    octave: 4,
                    midi: 69,
                    spelling: "A4",
                  },
                  duration: {
                    divisionUnits: 480,
                    beats: 1,
                    notated: {
                      value: "quarter",
                      dots: 0,
                    },
                  },
                },
                {
                  id: "n6",
                  kind: "note",
                  tickStart: 480,
                  tickDuration: 480,
                  pitch: {
                    step: "A",
                    alter: 0,
                    octave: 4,
                    midi: 69,
                    spelling: "A4",
                  },
                  duration: {
                    divisionUnits: 480,
                    beats: 1,
                    notated: {
                      value: "quarter",
                      dots: 0,
                    },
                  },
                },
                {
                  id: "n7",
                  kind: "note",
                  tickStart: 960,
                  tickDuration: 480,
                  pitch: {
                    step: "G",
                    alter: 0,
                    octave: 4,
                    midi: 67,
                    spelling: "G4",
                  },
                  duration: {
                    divisionUnits: 480,
                    beats: 1,
                    notated: {
                      value: "quarter",
                      dots: 0,
                    },
                  },
                },
                {
                  id: "r1",
                  kind: "rest",
                  tickStart: 1440,
                  tickDuration: 480,
                  duration: {
                    divisionUnits: 480,
                    beats: 1,
                    notated: {
                      value: "quarter",
                      dots: 0,
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

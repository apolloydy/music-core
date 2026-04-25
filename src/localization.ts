export type Locale = "zh-CN" | "en" | "fr" | "es" | "ja";

export interface LocalizationContent {
  languageLabel: string;
  metronome: {
    sectionLabel: string;
    title: string;
    description: string;
    start: string;
    stop: string;
    tapTempo: string;
    accentPattern: string;
    strong: string;
    medium: string;
    mute: string;
    bpm: string;
    beatsPerBar: string;
    subdivision: string;
    subdivisionLabels: {
      quarter: string;
      eighth: string;
      sixteenth: string;
    };
  };
}

export const localeLabels: Record<Locale, string> = {
  "zh-CN": "中文",
  en: "English",
  fr: "Français",
  es: "Español",
  ja: "日本語",
};

export const localization: Record<Locale, LocalizationContent> = {
  "zh-CN": {
    languageLabel: "语言",
    metronome: {
      sectionLabel: "Metronome",
      title: "练习用节拍器",
      description: "设置速度、拍号、细分和重音，开始一段稳定的练习节拍。",
      start: "开始",
      stop: "停止",
      tapTempo: "Tap Tempo",
      accentPattern: "重音设置",
      strong: "强拍",
      medium: "普通",
      mute: "静音",
      bpm: "BPM",
      beatsPerBar: "每小节拍数",
      subdivision: "细分",
      subdivisionLabels: {
        quarter: "四分音符",
        eighth: "八分音符",
        sixteenth: "十六分音符",
      },
    },
  },
  en: {
    languageLabel: "Language",
    metronome: {
      sectionLabel: "Metronome",
      title: "Practice metronome",
      description: "Set tempo, meter, subdivision, and accents for a steady practice pulse.",
      start: "Start",
      stop: "Stop",
      tapTempo: "Tap Tempo",
      accentPattern: "Accent Pattern",
      strong: "Strong",
      medium: "Medium",
      mute: "Mute",
      bpm: "BPM",
      beatsPerBar: "Beats / Bar",
      subdivision: "Subdivision",
      subdivisionLabels: {
        quarter: "Quarter",
        eighth: "Eighth",
        sixteenth: "16th",
      },
    },
  },
  fr: {
    languageLabel: "Langue",
    metronome: {
      sectionLabel: "Métronome",
      title: "Métronome de pratique",
      description: "Réglez le tempo, la mesure, la subdivision et les accents pour un battement stable.",
      start: "Démarrer",
      stop: "Arrêter",
      tapTempo: "Tap Tempo",
      accentPattern: "Motif d'accent",
      strong: "Fort",
      medium: "Moyen",
      mute: "Muet",
      bpm: "BPM",
      beatsPerBar: "Temps / Mesure",
      subdivision: "Subdivision",
      subdivisionLabels: {
        quarter: "Noire",
        eighth: "Croche",
        sixteenth: "Double croche",
      },
    },
  },
  es: {
    languageLabel: "Idioma",
    metronome: {
      sectionLabel: "Metrónomo",
      title: "Metrónomo de práctica",
      description: "Ajusta tempo, compás, subdivisión y acentos para practicar con un pulso estable.",
      start: "Iniciar",
      stop: "Detener",
      tapTempo: "Tap Tempo",
      accentPattern: "Patrón de acentos",
      strong: "Fuerte",
      medium: "Medio",
      mute: "Silencio",
      bpm: "BPM",
      beatsPerBar: "Pulsos / Compás",
      subdivision: "Subdivisión",
      subdivisionLabels: {
        quarter: "Negra",
        eighth: "Corchea",
        sixteenth: "Semicorchea",
      },
    },
  },
  ja: {
    languageLabel: "言語",
    metronome: {
      sectionLabel: "メトロノーム",
      title: "練習用メトロノーム",
      description: "テンポ、拍子、サブディビジョン、アクセントを設定して安定した拍で練習できます。",
      start: "開始",
      stop: "停止",
      tapTempo: "Tap Tempo",
      accentPattern: "アクセント",
      strong: "強",
      medium: "中",
      mute: "ミュート",
      bpm: "BPM",
      beatsPerBar: "拍 / 小節",
      subdivision: "サブディビジョン",
      subdivisionLabels: {
        quarter: "四分音符",
        eighth: "八分音符",
        sixteenth: "十六分音符",
      },
    },
  },
};

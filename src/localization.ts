export type Locale = "zh-CN" | "en" | "fr" | "es" | "ja";

export interface LocalizationContent {
  languageLabel: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  p0Goals: [string, string, string];
  whyP0Exists: string;
  signalCards: Array<{
    label: string;
    value: string;
  }>;
  nextLabel: string;
  nextSystems: Array<{
    title: string;
    description: string;
  }>;
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
    heroEyebrow: "Music Core / P0",
    heroTitle: "先把节拍器做稳，因为反馈系统先要有时钟。",
    heroDescription:
      "这个产品最终要做到“听你演奏然后反馈”，但在那之前，必须先把 timing core 做稳。现在先把 metronome、bar accent、subdivision 和 visual pulse 变成可运行的基础能力。",
    p0Goals: [
      "稳定 click，不跟 UI repaint 抢时间",
      "支持 bar accent 和 subdivision",
      "把 timing core 设计成后面能接听音反馈",
    ],
    whyP0Exists: "为什么先做 P0",
    signalCards: [
      {
        label: "Clock source",
        value: "先有稳定 beat timing，再谈 pitch analysis",
      },
      {
        label: "Evaluation base",
        value: "后面的 note feedback 需要知道 beat 和 bar position",
      },
      {
        label: "Current scope",
        value: "Web Audio click engine + transport UI",
      },
    ],
    nextLabel: "下一步",
    nextSystems: [
      {
        title: "P1 Listening",
        description: "接 microphone input、monophonic pitch detection、confidence 和 cents error。",
      },
      {
        title: "Practice Loop",
        description: "把 timing grid 扩成 phrase loop、count-in、bar range 和 restart behavior。",
      },
      {
        title: "Score Sync",
        description: "后面把每个 beat / note anchor 接到 Score IR 和 rendered score 上。",
      },
    ],
    metronome: {
      sectionLabel: "P0 Metronome",
      title: "先把 timing core 做出来。",
      description:
        "先做稳定 click、bar accent、subdivision 和 visual pulse。后面的 pitch feedback、practice loop、score sync 都要站在这个 timing core 上。",
      start: "开始",
      stop: "停止",
      tapTempo: "Tap Tempo",
      accentPattern: "Accent Pattern",
      strong: "强拍",
      medium: "普通",
      mute: "静音",
      bpm: "BPM",
      beatsPerBar: "每小节拍数",
      subdivision: "Subdivision",
      subdivisionLabels: {
        quarter: "四分音符",
        eighth: "八分音符",
        sixteenth: "十六分音符",
      },
    },
  },
  en: {
    languageLabel: "Language",
    heroEyebrow: "Music Core / P0",
    heroTitle: "Metronome first, because feedback needs a clock.",
    heroDescription:
      "This product is meant to listen to your playing and respond, but before that the timing core has to be stable. P0 turns the metronome, bar accent, subdivision, and visual pulse into a working foundation.",
    p0Goals: [
      "Keep the click stable instead of competing with UI repaint timing",
      "Support bar accent and subdivision",
      "Shape the timing core so P1 listening can attach cleanly",
    ],
    whyP0Exists: "Why P0 Exists",
    signalCards: [
      {
        label: "Clock source",
        value: "Stable beat timing before pitch analysis",
      },
      {
        label: "Evaluation base",
        value: "Future note feedback needs beat and bar position",
      },
      {
        label: "Current scope",
        value: "Web Audio click engine + transport UI",
      },
    ],
    nextLabel: "Next",
    nextSystems: [
      {
        title: "P1 Listening",
        description: "Add microphone input, monophonic pitch detection, confidence, and cents error.",
      },
      {
        title: "Practice Loop",
        description: "Extend the timing grid into phrase loop, count-in, bar range, and restart behavior.",
      },
      {
        title: "Score Sync",
        description: "Later, connect each beat and note anchor to Score IR and the rendered score.",
      },
    ],
    metronome: {
      sectionLabel: "P0 Metronome",
      title: "Ship the timing core first.",
      description:
        "Start with a stable click, bar accent, subdivision, and visual pulse. Pitch feedback, practice loop, and score sync all depend on this timing core.",
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
    heroEyebrow: "Music Core / P0",
    heroTitle: "Le métronome d'abord, parce que le feedback a besoin d'une horloge.",
    heroDescription:
      "Ce produit doit écouter votre jeu et réagir, mais avant cela le noyau temporel doit être stable. P0 transforme le métronome, l'accent de mesure, la subdivision et le pulse visuel en base fonctionnelle.",
    p0Goals: [
      "Garder un clic stable sans dépendre du rythme de repaint de l'UI",
      "Prendre en charge l'accent de mesure et la subdivision",
      "Préparer un timing core propre pour la phase d'écoute P1",
    ],
    whyP0Exists: "Pourquoi P0",
    signalCards: [
      {
        label: "Source d'horloge",
        value: "Un timing de battement stable avant l'analyse de hauteur",
      },
      {
        label: "Base d'évaluation",
        value: "Le futur feedback des notes a besoin du battement et de la mesure",
      },
      {
        label: "Portée actuelle",
        value: "Moteur de clic Web Audio + interface de transport",
      },
    ],
    nextLabel: "Ensuite",
    nextSystems: [
      {
        title: "P1 Listening",
        description: "Ajouter l'entrée micro, la détection monophonique, la confiance et l'erreur en cents.",
      },
      {
        title: "Practice Loop",
        description: "Étendre la grille temporelle au phrase loop, count-in, plage de mesures et restart behavior.",
      },
      {
        title: "Score Sync",
        description: "Connecter plus tard chaque battement et ancre de note à Score IR et au score rendu.",
      },
    ],
    metronome: {
      sectionLabel: "P0 Métronome",
      title: "Livrer d'abord le timing core.",
      description:
        "Commencer par un clic stable, l'accent de mesure, la subdivision et le pulse visuel. Le feedback de hauteur, le practice loop et la synchronisation du score reposent sur ce noyau.",
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
    heroEyebrow: "Music Core / P0",
    heroTitle: "Primero el metrónomo, porque el feedback necesita un reloj.",
    heroDescription:
      "Este producto debe escuchar tu interpretación y responder, pero antes de eso el núcleo temporal tiene que ser estable. P0 convierte el metrónomo, el acento de compás, la subdivisión y el pulso visual en una base funcional.",
    p0Goals: [
      "Mantener el clic estable sin competir con el repaint de la UI",
      "Soportar acento de compás y subdivisión",
      "Diseñar el timing core para conectar luego la escucha de P1",
    ],
    whyP0Exists: "Por qué existe P0",
    signalCards: [
      {
        label: "Fuente de reloj",
        value: "Beat timing estable antes del análisis de pitch",
      },
      {
        label: "Base de evaluación",
        value: "El feedback futuro necesita beat y posición dentro del compás",
      },
      {
        label: "Alcance actual",
        value: "Motor de clic con Web Audio + transport UI",
      },
    ],
    nextLabel: "Siguiente",
    nextSystems: [
      {
        title: "P1 Listening",
        description: "Agregar entrada de micrófono, detección monofónica, confidence y error en cents.",
      },
      {
        title: "Practice Loop",
        description: "Extender la timing grid hacia phrase loop, count-in, rango de compases y restart behavior.",
      },
      {
        title: "Score Sync",
        description: "Después conectar cada beat y note anchor a Score IR y al score renderizado.",
      },
    ],
    metronome: {
      sectionLabel: "P0 Metrónomo",
      title: "Primero hay que sacar el timing core.",
      description:
        "Empieza con un clic estable, acento de compás, subdivisión y pulso visual. El feedback de pitch, el practice loop y la sincronización con partitura dependen de este núcleo.",
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
    heroEyebrow: "Music Core / P0",
    heroTitle: "まずメトロノーム。フィードバックには基準となる時計が必要です。",
    heroDescription:
      "このプロダクトは最終的に演奏を聴いて反応する必要がありますが、その前に timing core を安定させる必要があります。P0 では metronome、bar accent、subdivision、visual pulse を動く基盤にします。",
    p0Goals: [
      "UI repaint に引っ張られず click を安定させる",
      "bar accent と subdivision を扱えるようにする",
      "後続の listening feedback を接続しやすい timing core にする",
    ],
    whyP0Exists: "なぜ P0 から始めるのか",
    signalCards: [
      {
        label: "Clock source",
        value: "pitch analysis の前に安定した beat timing が必要",
      },
      {
        label: "Evaluation base",
        value: "将来の note feedback には beat と bar position が必要",
      },
      {
        label: "Current scope",
        value: "Web Audio click engine + transport UI",
      },
    ],
    nextLabel: "次",
    nextSystems: [
      {
        title: "P1 Listening",
        description: "microphone input、monophonic pitch detection、confidence、cents error を追加する。",
      },
      {
        title: "Practice Loop",
        description: "timing grid を phrase loop、count-in、bar range、restart behavior に広げる。",
      },
      {
        title: "Score Sync",
        description: "その後で各 beat / note anchor を Score IR と rendered score に接続する。",
      },
    ],
    metronome: {
      sectionLabel: "P0 メトロノーム",
      title: "まず timing core を作る。",
      description:
        "安定した click、bar accent、subdivision、visual pulse から始めます。pitch feedback、practice loop、score sync はすべてこの timing core に依存します。",
      start: "開始",
      stop: "停止",
      tapTempo: "Tap Tempo",
      accentPattern: "Accent Pattern",
      strong: "強",
      medium: "中",
      mute: "ミュート",
      bpm: "BPM",
      beatsPerBar: "拍 / 小節",
      subdivision: "Subdivision",
      subdivisionLabels: {
        quarter: "四分音符",
        eighth: "八分音符",
        sixteenth: "十六分音符",
      },
    },
  },
};

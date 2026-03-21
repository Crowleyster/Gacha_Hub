// ============================================================
// MOCK DATA — Datos de desarrollo
// Última actualización: Marzo 2026
// Todas las imageUrl han sido verificadas como URLs reales
// ============================================================

// ── CÓDIGOS ACTIVOS ────────────────────────────────────────

export const CODES_DATA = {
  "Wuthering Waves": {
    icon: "https://static.wikia.nocookie.net/wutheringwaves/images/7/77/Item_Wuthering_Waves.png",
    codes: [
      { code: "WUTHERINGGIFT", rewards: "50 Astrite, 2 Premium Resonance Potion", expires: "31 Mar 2026" },
      { code: "WUTHERING2024", rewards: "10,000 Shell Credits", expires: "31 Mar 2026" },
      { code: "WUWA333", rewards: "60 Astrite, 1 Sealed Tube", expires: "28 Mar 2026" },
      { code: "KUROLAUNCH", rewards: "80 Astrite, 3 Hero EXP", expires: "29 Mar 2026" },
      { code: "WW2ANNI", rewards: "50 Astrite", expires: "15 Abr 2026" },
      { code: "WAVEBB888", rewards: "30 Astrite, 5,000 Shell Credits", expires: "10 Abr 2026" },
    ],
  },

  "Genshin Impact": {
    icon: "https://static.wikia.nocookie.net/gensin-impact/images/d/d4/Item_Genshin_Impact.png",
    codes: [
      { code: "GENSHINGIFT", rewards: "50 Primogemas, 3 Ingenio del Héroe", expires: "31 Mar 2026" },
      { code: "BS3DLY6VARE9", rewards: "100 Primogemas", expires: "28 Mar 2026" },
      { code: "GENSHIN2024", rewards: "60 Primogemas, 5 Mena mística", expires: "30 Mar 2026" },
      { code: "XTNH3HMHAXH7", rewards: "100 Primogemas, 10,000 Mora", expires: "29 Mar 2026" },
      { code: "GIFTSUMM2024", rewards: "80 Primogemas, 2 Ingenio del Héroe", expires: "01 Abr 2026" },
    ],
  },

  "Honkai: Star Rail": {
    icon: "https://static.wikia.nocookie.net/houkai-star-rail/images/5/58/Item_Honkai_Star_Rail.png",
    codes: [
      { code: "STARRAILGIFT", rewards: "50 Jade Estelar", expires: "31 Mar 2026" },
      { code: "HSR2024GIFT", rewards: "100 Jade Estelar, 3 Guía del Viajero", expires: "29 Mar 2026" },
      { code: "STARRAILCODE", rewards: "80 Jade Estelar, 2 Registro de Aventuras", expires: "28 Mar 2026" },
      { code: "PIONEERCAMP", rewards: "60 Jade Estelar", expires: "30 Mar 2026" },
    ],
  },

  "Zenless Zone Zero": {
    icon: "https://static.wikia.nocookie.net/zenless-zone-zero/images/8/89/Item_Zenless_Zone_Zero.png",
    codes: [
      { code: "ZZZGIFT2024", rewards: "50 Policromías", expires: "31 Mar 2026" },
      { code: "WELCOMEZNZ", rewards: "80 Policromías, 2 Batería de W-Engine", expires: "28 Mar 2026" },
      { code: "ZZZEARLYGAME", rewards: "100 Policromías, 1 Master Tape", expires: "02 Abr 2026" },
      { code: "ZZZ27LAUNCH", rewards: "60 Policromías, 3 Módulo de datos", expires: "07 Abr 2026" },
    ],
  },

  "Arknights: Endfield": {
    icon: "https://static.wikia.nocookie.net/arknights/images/f/f6/Arknights_Endfield_Icon.png",
    codes: [
      { code: "ENDFIELDSTART", rewards: "50 Oroberyl, 2 Contrato de reclutamiento", expires: "22 Abr 2026" },
      { code: "TALOS2LAUNCH", rewards: "30 Oroberyl, 5,000 Créditos", expires: "31 Mar 2026" },
      { code: "ENDFIELD11", rewards: "60 Oroberyl, 1 Contrato de reclutamiento", expires: "12 Abr 2026" },
    ],
  },

  "NIKKE": {
    icon: "https://static.wikia.nocookie.net/nikke-goddess-of-victory-international/images/3/33/Item_Goddess_of_Victory_Nikke.png",
    codes: [
      { code: "NIKKEGIFT", rewards: "200 Gemas, 1 Vale de reclutamiento avanzado", expires: "09 Abr 2026" },
      { code: "2X2LOVE2026", rewards: "100 Gemas, materiales de desarrollo", expires: "09 Abr 2026" },
      { code: "DEVNOTE0326", rewards: "150 Gemas", expires: "01 Abr 2026" },
    ],
  },
};

// ── NOTICIAS DESTACADAS ────────────────────────────────────

export const newsData = [
  {
    id: 1,
    gameId: "wuthering-waves",
    title: "Versión 3.2 en vivo — Sigrika y Qiuyuan se unen al roster de WuWa",
    tag: "Nueva versión",
    gameIconUrl: "https://static.wikia.nocookie.net/wutheringwaves/images/7/77/Item_Wuthering_Waves.png",
    imageUrl: "https://static.wikia.nocookie.net/wutheringwaves/images/6/64/Wuthering_Waves_Key_Visual.png",
  },
  {
    id: 2,
    gameId: "genshin-impact",
    title: "Genshin Impact Luna V — Varka regresa a Mondstadt y debuta en combate",
    tag: "Nueva versión",
    gameIconUrl: "https://static.wikia.nocookie.net/gensin-impact/images/d/d4/Item_Genshin_Impact.png",
    imageUrl: "https://upload-os-bbs.hoyolab.com/upload/2021/08/11/73565430/e42d7b5b5c92c8152c1e81fcfa9343ee_1549721727768564177.png",
  },
  {
    id: 3,
    gameId: "honkai-star-rail",
    title: "HSR — Ashveil llega en 4.1 con el trailer 'The Wolf is Coming'",
    tag: "Nuevo personaje",
    gameIconUrl: "https://static.wikia.nocookie.net/houkai-star-rail/images/5/58/Item_Honkai_Star_Rail.png",
    imageUrl: "https://upload-os-bbs.hoyolab.com/upload/2023/04/24/73565430/92946c65ba991669c5e3f43b67e7c913_5264003291244431952.png",
  },
  {
    id: 4,
    gameId: "zenless-zone-zero",
    title: "ZZZ — Nangong Yu completa las Angels of Delusion en la versión 2.7",
    tag: "Nuevo personaje",
    gameIconUrl: "https://static.wikia.nocookie.net/zenless-zone-zero/images/8/89/Item_Zenless_Zone_Zero.png",
    imageUrl: "https://upload-os-bbs.hoyolab.com/upload/2022/05/13/73565430/328fc836c4b2b2ff513c1fdf4d538eec_8664124376510468305.png",
  },
  {
    id: 5,
    gameId: "arknights-endfield",
    title: "Arknights: Endfield 1.1 — Tangtang y Rossi llegan a Qingbo Stockade",
    tag: "Nueva versión",
    gameIconUrl: "https://static.wikia.nocookie.net/arknights/images/f/f6/Arknights_Endfield_Icon.png",
    imageUrl: "https://static.wikia.nocookie.net/arknights/images/1/14/Arknights_Endfield_Key_Visual.png",
  },
  {
    id: 6,
    gameId: "nikke",
    title: "NIKKE x Lycoris Recoil — Chisato y Takina se unen al roster",
    tag: "Colaboración",
    gameIconUrl: "https://static.wikia.nocookie.net/nikke-goddess-of-victory-international/images/3/33/Item_Goddess_of_Victory_Nikke.png",
    imageUrl: "https://static.wikia.nocookie.net/nikke-goddess-of-victory-international/images/8/87/Goddess_of_Victory_Nikke_Key_Visual.png",
  },
];

// ── EVENTOS ───────────────────────────────────────────────

export const EVENTS_DATA = [
  {
    id: "ev-ww-1",
    gameId: "wuthering-waves",
    gameName: "Wuthering Waves",
    gameIconUrl: "https://static.wikia.nocookie.net/wutheringwaves/images/7/77/Item_Wuthering_Waves.png",
    title: "Tapes of Last Words",
    type: "Evento de historia",
    startDate: "2026-03-19",
    endDate: "2026-04-29",
    status: "active",
  },
  {
    id: "ev-gi-1",
    gameId: "genshin-impact",
    gameName: "Genshin Impact",
    gameIconUrl: "https://static.wikia.nocookie.net/gensin-impact/images/d/d4/Item_Genshin_Impact.png",
    title: "Travelers' Tales",
    type: "Evento principal",
    startDate: "2026-02-25",
    endDate: "2026-04-07",
    status: "active",
  },
  {
    id: "ev-hsr-1",
    gameId: "honkai-star-rail",
    gameName: "Honkai: Star Rail",
    gameIconUrl: "https://static.wikia.nocookie.net/houkai-star-rail/images/5/58/Item_Honkai_Star_Rail.png",
    title: "Selector gratuito de personaje 5 estrellas",
    type: "Evento limitado",
    startDate: "2026-02-12",
    endDate: "2026-04-30",
    status: "active",
  },
  {
    id: "ev-zzz-1",
    gameId: "zenless-zone-zero",
    gameName: "Zenless Zone Zero",
    gameIconUrl: "https://static.wikia.nocookie.net/zenless-zone-zero/images/8/89/Item_Zenless_Zone_Zero.png",
    title: "Versión 2.7 — Angels of Delusion completo",
    type: "Nuevo contenido",
    startDate: "2026-03-24",
    endDate: "2026-05-05",
    status: "upcoming",
  },
  {
    id: "ev-ae-1",
    gameId: "arknights-endfield",
    gameName: "Arknights: Endfield",
    gameIconUrl: "https://static.wikia.nocookie.net/arknights/images/f/f6/Arknights_Endfield_Icon.png",
    title: "Break the Siege — 10 contratos gratis",
    type: "Evento de bienvenida",
    startDate: "2026-03-12",
    endDate: "2026-05-12",
    status: "active",
  },
  {
    id: "ev-nk-1",
    gameId: "nikke",
    gameName: "NIKKE",
    gameIconUrl: "https://static.wikia.nocookie.net/nikke-goddess-of-victory-international/images/3/33/Item_Goddess_of_Victory_Nikke.png",
    title: "2X2 LOVE — Dating Sim Story Event",
    type: "Evento de historia",
    startDate: "2026-03-19",
    endDate: "2026-04-09",
    status: "active",
  },
];
const LEGACY_STORAGE_KEY = "sirius-archive-campaign-v1";
const DB_KEY = "hogwarts-archive-db-v2";
const SETTINGS_KEY = "sirius-archive-ai-settings-v1";
const MAX_DOSSIER_CHARS = 30000;

const timeCycle = ["清晨", "上午", "下午", "夜晚", "深夜"];

const defaultMemoryLayer = {
  worldMemory: [
    "世界會隨時間流動；NPC 即使不在畫面中，也可能依照自身目標行動。",
    "玩家只扮演自己的角色；AI DM 主持世界、NPC、時間、後果與事件。"
  ],
  loreDatabase: {
    tone: "安靜、細節感、小說體，像夜裡翻書時怕驚動什麼。",
    rules: [
      "不可重置角色或否定既有存檔。",
      "不可把 NPC 寫成任務機器。",
      "自由探索必須考慮地點、時間、NPC 記憶、事件旗標與權限。"
    ]
  },
  campaignSummary: "尚未建立長期摘要。"
};

const statDescriptions = {
  魔法感知: "感受魔力、辨識異常、察覺詛咒或魔法痕跡。常用於神秘事件、古物、星象與危險預兆。",
  勇氣: "面對恐懼、壓力、威脅或高風險選擇時保持行動。常用於衝突、保護他人、夜間探索。",
  觀察: "注意細節、讀懂環境、找出線索與判斷 NPC 的微妙反應。常用於調查、探索、看穿隱瞞。",
  社交: "說服、安撫、交涉、建立關係與發起自然對話。常用於 NPC 互動與學院人際。",
  意志: "抵抗誘惑、恐懼、精神影響與長期壓力。常用於黑魔法、秘密、夢境與情緒考驗。"
};

const defaultVisualIdentity = {
  locked: false,
  identitySeed: "",
  fixedDescription: "",
  portraitImage: "",
  fullBodyImage: "",
  bustImage: "",
  activePortraitMode: "fullBody",
  sceneImage: "assets/scenes/twilight-archive.png",
  portraitPrompt: "",
  fullBodyPrompt: "",
  bustPrompt: "",
  scenePrompt: ""
};

const defaultRuleSettings = {
  diceEnabled: false
};

const defaultLocations = {
  "斜角巷": {
    unlocked: true,
    explored: false,
    npcs: ["路過的學生", "店員"],
    events: ["入學前採購"],
    timeRules: "白天較熱鬧，夜晚多數店鋪關閉。",
    quests: ["採購清單"],
    sceneImage: "",
    scenePrompt: "A bustling magical shopping street in late summer morning, crooked storefronts, cobblestone lane, school supply shops, warm window light, no close-up characters, no readable text, wide 16:9 background.",
    sceneGeneratedAt: ""
  },
  "麗痕書店": {
    unlocked: true,
    explored: false,
    npcs: ["書店店員", "排隊的新生"],
    events: ["課本採購"],
    timeRules: "上午到下午人潮最多。",
    quests: ["一年級書單"],
    sceneImage: "",
    scenePrompt: "Interior of a magical bookstore, towering shelves, stacks of schoolbooks, warm brass lamps, afternoon crowd implied but no close-up characters, no readable text, wide 16:9 background.",
    sceneGeneratedAt: ""
  },
  "霍格華茲大廳": {
    unlocked: false,
    explored: false,
    npcs: ["教授", "高年級學生"],
    events: ["分院前後事件"],
    timeRules: "用餐與公告時間會觸發不同事件。",
    quests: [],
    sceneImage: "",
    scenePrompt: "A vast magical school great hall, long tables, floating candlelight, enchanted ceiling impression without recognizable emblems, ceremonial atmosphere, no close-up characters, no readable text, wide 16:9 background.",
    sceneGeneratedAt: ""
  },
  "圖書館": {
    unlocked: false,
    explored: false,
    npcs: ["圖書館管理員", "用功的學生"],
    events: ["禁書區線索"],
    timeRules: "深處區域可能需要教授評價或權限。",
    quests: [],
    sceneImage: "",
    scenePrompt: "A grand old magical library, high shelves, reading desks, restricted deep aisles fading into shadow, quiet academic mood, no close-up characters, no readable text, wide 16:9 background.",
    sceneGeneratedAt: ""
  },
  "天文塔": {
    unlocked: false,
    explored: false,
    npcs: ["天文學教授", "夜間觀星的學生"],
    events: ["星象盤夜空事件"],
    timeRules: "夜晚與深夜才容易觸發星象事件。",
    quests: [],
    sceneImage: "",
    scenePrompt: "A high stone astronomy tower at night, open sky, brass telescope, star charts, cold moonlight, wind over ancient stone, no close-up characters, no readable text, wide 16:9 background.",
    sceneGeneratedAt: ""
  },
  "斯萊特林交誼廳": {
    unlocked: false,
    explored: false,
    npcs: ["同院學生", "高年級女生"],
    events: ["學院人際事件"],
    timeRules: "需分院後且符合學院權限。",
    quests: [],
    sceneImage: "",
    scenePrompt: "An underwater-adjacent green-lit common room in an old magical school dungeon, dark stone, elegant old furniture, lake-like light ripples, no close-up characters, no readable text, wide 16:9 background.",
    sceneGeneratedAt: ""
  },
  "葛來分多交誼廳": {
    unlocked: false,
    explored: false,
    npcs: ["同院學生", "高年級學生"],
    events: ["學院人際事件"],
    timeRules: "需分院後且符合學院權限。",
    quests: [],
    sceneImage: "",
    scenePrompt: "A warm tower common room in an old magical school, red and gold textiles, fireplace, round windows, cozy evening atmosphere, no close-up characters, no readable text, wide 16:9 background.",
    sceneGeneratedAt: ""
  },
  "雷文克勞交誼廳": {
    unlocked: false,
    explored: false,
    npcs: ["同院學生", "高年級學生"],
    events: ["學院人際事件"],
    timeRules: "需分院後且符合學院權限。",
    quests: [],
    sceneImage: "",
    scenePrompt: "An airy tower common room in an old magical school, blue and bronze details, arched windows, books, starry ceiling mood, quiet intellectual atmosphere, no close-up characters, no readable text, wide 16:9 background.",
    sceneGeneratedAt: ""
  },
  "赫夫帕夫交誼廳": {
    unlocked: false,
    explored: false,
    npcs: ["同院學生", "高年級學生"],
    events: ["學院人際事件"],
    timeRules: "需分院後且符合學院權限。",
    quests: [],
    sceneImage: "",
    scenePrompt: "A warm earth-toned common room in an old magical school, round doors, plants, low comfortable furniture, golden afternoon light, welcoming atmosphere, no close-up characters, no readable text, wide 16:9 background.",
    sceneGeneratedAt: ""
  },
  "黑湖邊": {
    unlocked: false,
    explored: false,
    npcs: ["散步的學生"],
    events: ["湖邊支線"],
    timeRules: "清晨與夜晚氣氛截然不同。",
    quests: [],
    sceneImage: "",
    scenePrompt: "A quiet black lake shore near an old magical school, misty water, distant castle lights, reeds and stones, dusk or early night, no close-up characters, no readable text, wide 16:9 background.",
    sceneGeneratedAt: ""
  }
};

const sceneCatalog = {
  "暮海星圖檔案館": {
    sceneImage: "assets/scenes/twilight-archive.png",
    scenePrompt: "A quiet magical archive at night, old stone school corridor opening into an astronomy archive, shelves of handwritten files, brass star charts, faint blue sea-glass light, candle glow, no characters, no readable text, wide 16:9 background.",
    sceneGeneratedAt: "2026-05-31"
  },
  "活米村": {
    sceneImage: "",
    scenePrompt: "A snowy magical village street, crooked roofs, warm shop windows, winter atmosphere, no close-up characters, no readable text, wide 16:9 background.",
    sceneGeneratedAt: ""
  },
  "禁忌森林": {
    sceneImage: "",
    scenePrompt: "A dark ancient forest at the edge of a magical school, moonlit roots, mist, hidden paths, quiet danger, no close-up characters, no readable text, wide 16:9 background.",
    sceneGeneratedAt: ""
  },
  "學生寢室": {
    sceneImage: "",
    scenePrompt: "A quiet magical student dormitory, old wood beds, trunks, folded robes, rain at the window, intimate night mood, no close-up characters, no readable text, wide 16:9 background.",
    sceneGeneratedAt: ""
  }
};

const sampleCampaign = {
  version: 2,
  campaignId: crypto.randomUUID(),
  title: "希瑞爾斯・米勒｜範例世界線",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  startedAt: new Date().toISOString(),
  playSeconds: 0,
  ruleSettings: {
    diceEnabled: true
  },
  player: {
    name: "希瑞爾斯・米勒",
    age: 11,
    bloodStatus: "混血",
    gender: "未設定",
    house: "未分院",
    money: "12 加隆 7 西可",
    appearance: "深色頭髮，眼神像潮汐退去後仍亮著的星。衣著整潔，常帶著舊紙與海風的氣味。",
    family: "米勒家族留下的資料很少，母親的木盒與幾個星名是最穩定的線索。",
    visualIdentity: {
      ...structuredClone(defaultVisualIdentity),
      identitySeed: "sirius-miller-sample",
      fixedDescription: "深色頭髮，眼神像潮汐退去後仍亮著的星。衣著整潔，常帶著舊紙與海風的氣味。"
    }
  },
  stats: {
    魔法感知: 7,
    勇氣: 5,
    觀察: 8,
    社交: 4,
    意志: 6
  },
  worldState: {
    year: "1991",
    term: "入學前夕",
    season: "夏末",
    timeOfDay: "夜晚",
    weather: "薄霧與小雨",
    location: "暮海星圖檔案館",
    currentMood: "安靜，像有人剛把一本書闔上"
  },
  locations: {
    ...structuredClone(defaultLocations),
    "暮海星圖檔案館": {
      unlocked: true,
      explored: true,
      npcs: [],
      events: ["世界線整理"],
      timeRules: "可隨時回顧檔案與存檔。",
      quests: [],
      sceneImage: "assets/scenes/twilight-archive.png",
      scenePrompt: "A quiet magical archive at night, old stone school corridor opening into an astronomy archive, shelves of handwritten files, brass star charts, faint blue sea-glass light, candle glow, no characters, no readable text, wide 16:9 background.",
      sceneGeneratedAt: "2026-05-31"
    },
    "夜鴞舊藏": {
      unlocked: true,
      explored: true,
      mentioned: true,
      npcs: ["夜鴞舊藏店主"],
      events: ["星象盤線索"],
      timeRules: "傍晚後才真正開門。",
      quests: ["星象盤借閱"],
      sceneImage: "",
      scenePrompt: "A narrow old magical curio shop open at dusk, owl-shaped sign, dusty glass cabinets, antique star instruments, dim amber and blue light, no close-up characters, no readable text, wide 16:9 background.",
      sceneGeneratedAt: ""
    }
  },
  inventory: [
    { name: "母親的木盒", note: "內襯有褪色星圖，鎖扣冰涼。", tags: ["支線", "家族"] },
    { name: "旅行箱", note: "比外表更深，角落有淡淡海鹽味。", tags: ["容器"] },
    { name: "暮海藍", note: "一小枚藍色石片，夜裡像含著星光。", tags: ["魔法物品"] }
  ],
  npcMemory: {
    "夜鴞舊藏店主": {
      impression: "覺得希瑞爾斯太安靜，卻懂得守約。",
      trust: 42,
      affection: 18,
      emotion: "戒備中的好奇",
      secrets: ["知道星象盤曾被借給米勒家的人"],
      memories: ["第一次見面時，希瑞爾斯沒有碰櫃檯下那只銀盒。"]
    }
  },
  flags: {
    mother_box_known: { label: "母親木盒支線已開啟", value: true, permanent: true },
    star_plate_borrowed: { label: "星象盤尚未借出", value: false, permanent: false },
    thestral_event: { label: "夜騏事件未發生", value: false, permanent: false }
  },
  storySummary: "希瑞爾斯・米勒的長期世界線剛被整理進暮海星圖檔案館。母親的木盒、暮海藍與夜鴞舊藏店主構成目前最重要的線索。",
  memoryLayer: {
    ...structuredClone(defaultMemoryLayer),
    campaignSummary: "希瑞爾斯・米勒的長期世界線剛被整理進暮海星圖檔案館。母親的木盒、暮海藍與夜鴞舊藏店主構成目前最重要的線索。",
    worldMemory: [
      "希瑞爾斯・米勒不是從零開始；這份範例世界線已有母親木盒、暮海藍與夜鴞舊藏店主線索。",
      "夜鴞舊藏店主記得希瑞爾斯守約，對他有戒備中的好奇。"
    ]
  },
  options: [
    "打開母親的木盒，檢查內襯星圖",
    "前往夜鴞舊藏，詢問星象盤",
    "整理旅行箱裡的物品",
    "在檔案館中回想先前跑團"
  ],
  turns: [
    {
      id: crypto.randomUUID(),
      kind: "dm",
      time: new Date().toISOString(),
      meta: "夜晚｜暮海星圖檔案館",
      text: "檔案館的窗映著一層薄薄雨光。希瑞爾斯・米勒的名字被寫在深色封皮上，墨跡尚未乾透，像某種剛被允許存在的命運。母親的木盒放在桌角，暮海藍在它旁邊安靜發亮；遠處書架之間，星圖紙卷緩慢舒展，又自行收攏。這不是故事的開頭，更像一段被保存下來的人生終於找到可以繼續呼吸的地方。",
      options: []
    }
  ],
  pensieve: [
    {
      title: "寄放於夜色中的希瑞爾",
      prompt: "夜色、暗門、母親木盒、藍色星光與一個安靜孩子的背影",
      note: "初始記憶相片，可在後續接入圖像生成。",
      location: "暮海星圖檔案館",
      time: new Date().toISOString(),
      summary: "希瑞爾斯的名字被收進深色封皮，世界線開始被檔案館保存。"
    }
  ]
};

const els = {
  homeView: document.querySelector("#homeView"),
  gameView: document.querySelector("#gameView"),
  choiceDock: document.querySelector("#choiceDock"),
  saveList: document.querySelector("#saveList"),
  archivedSaveList: document.querySelector("#archivedSaveList"),
  saveCount: document.querySelector("#saveCount"),
  storyLog: document.querySelector("#storyLog"),
  sceneMeta: document.querySelector("#sceneMeta"),
  timePanel: document.querySelector("#timePanel"),
  profileFields: document.querySelector("#profileFields"),
  statList: document.querySelector("#statList"),
  worldFields: document.querySelector("#worldFields"),
  inventoryList: document.querySelector("#inventoryList"),
  flagList: document.querySelector("#flagList"),
  npcList: document.querySelector("#npcList"),
  pensieveList: document.querySelector("#pensieveList"),
  mapView: document.querySelector("#mapView"),
  locationList: document.querySelector("#locationList"),
  talkList: document.querySelector("#talkList"),
  choiceList: document.querySelector("#choiceList"),
  actionForm: document.querySelector("#actionForm"),
  freeAction: document.querySelector("#freeAction"),
  sendBtn: document.querySelector("#sendBtn"),
  brandLocation: document.querySelector("#brandLocation"),
  sceneLayer: document.querySelector("#sceneLayer"),
  characterLayer: document.querySelector("#characterLayer"),
  portraitFallback: document.querySelector("#portraitFallback"),
  importDialog: document.querySelector("#importDialog"),
  dossierDialog: document.querySelector("#dossierDialog"),
  dossierFiles: document.querySelector("#dossierFiles"),
  dossierFileList: document.querySelector("#dossierFileList"),
  dossierNote: document.querySelector("#dossierNote"),
  settingsDialog: document.querySelector("#settingsDialog"),
  creatorDialog: document.querySelector("#creatorDialog"),
  worldlineDialog: document.querySelector("#worldlineDialog"),
  memoryDialog: document.querySelector("#memoryDialog"),
  memoryTitle: document.querySelector("#memoryTitle"),
  memoryDetail: document.querySelector("#memoryDetail"),
  newSaveDialog: document.querySelector("#newSaveDialog"),
  newDossierFiles: document.querySelector("#newDossierFiles"),
  newDossierFileList: document.querySelector("#newDossierFileList"),
  newDossierNote: document.querySelector("#newDossierNote"),
  statHelpDialog: document.querySelector("#statHelpDialog"),
  statHelpContent: document.querySelector("#statHelpContent"),
  rollDialog: document.querySelector("#rollDialog"),
  rollStat: document.querySelector("#rollStat"),
  rollDc: document.querySelector("#rollDc"),
  rollResult: document.querySelector("#rollResult"),
  promptDialog: document.querySelector("#promptDialog"),
  promptTitle: document.querySelector("#promptTitle"),
  promptText: document.querySelector("#promptText"),
  statConfirmDialog: document.querySelector("#statConfirmDialog"),
  statConfirmList: document.querySelector("#statConfirmList"),
  renameSaveDialog: document.querySelector("#renameSaveDialog"),
  renameSaveInput: document.querySelector("#renameSaveInput"),
  restoreDialog: document.querySelector("#restoreDialog"),
  restoreText: document.querySelector("#restoreText"),
  authDialog: document.querySelector("#authDialog"),
  authEmail: document.querySelector("#authEmail"),
  authStatus: document.querySelector("#authStatus")
};

let db = loadDb();
let settings = loadSettings();
let campaign = getActiveCampaign();
let pendingImport = null;
let pendingRenameSaveId = null;
let editingSaveId = null;

bootApp();

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => switchTab(tab.dataset.tab));
});

document.querySelector("#homeBtn").addEventListener("click", showHome);
document.querySelector("#newSaveBtn").addEventListener("click", openNewSave);
document.querySelector("#homeImportBtn").addEventListener("click", openImport);
document.querySelector("#homeSettingsBtn").addEventListener("click", openSettings);

document.querySelector("#saveBtn").addEventListener("click", () => {
  saveActiveCampaign();
  flashButton("#saveBtn", "✓");
});

document.querySelector("#backupBtn").addEventListener("click", backupAllWorldlines);
document.querySelector("#restoreBtn").addEventListener("click", openRestoreDialog);
document.querySelector("#authBtn").addEventListener("click", openAuthDialog);
document.querySelector("#importBtn").addEventListener("click", openImport);
document.querySelector("#dossierBtn").addEventListener("click", openDossierDialog);
document.querySelector("#dossierFiles").addEventListener("change", renderDossierFileList);
document.querySelector("#appendDossierBtn").addEventListener("click", (event) => {
  event.preventDefault();
  appendDossiersToCampaign();
});
document.querySelector("#newDossierFiles").addEventListener("change", () => renderFileList(els.newDossierFiles, els.newDossierFileList));
document.querySelector("#settingsBtn").addEventListener("click", openSettings);
document.querySelector("#creatorBtn").addEventListener("click", openCreator);
document.querySelector("#scenePromptBtn").addEventListener("click", () => openVisualPrompt("scene"));
document.querySelector("#portraitPromptBtn").addEventListener("click", () => openVisualPrompt("portrait"));
document.querySelector("#lockVisualBtn").addEventListener("click", toggleVisualLock);
document.querySelector("#portraitUpload").addEventListener("change", importPortraitImage);
document.querySelectorAll("[data-portrait-mode]").forEach((button) => {
  button.addEventListener("click", () => setPortraitMode(button.dataset.portraitMode));
});
document.querySelector("#statHelpBtn").addEventListener("click", openStatHelp);
document.querySelector("#rollDiceBtn").addEventListener("click", openRollDialog);
document.querySelector("#doRollBtn").addEventListener("click", (event) => {
  event.preventDefault();
  doRoll();
});
document.querySelector("#copyPromptBtn").addEventListener("click", async (event) => {
  event.preventDefault();
  try {
    await navigator.clipboard.writeText(els.promptText.value);
    flashButton("#copyPromptBtn", "已複製");
  } catch {
    els.promptText.select();
    flashButton("#copyPromptBtn", "請手動複製");
  }
});
document.querySelector("#confirmImportedStatsBtn").addEventListener("click", (event) => {
  event.preventDefault();
  confirmImportedStats();
});
document.querySelector("#confirmRenameSaveBtn").addEventListener("click", (event) => {
  event.preventDefault();
  confirmRenameSave();
});
document.querySelector("#confirmRestoreBtn").addEventListener("click", (event) => {
  event.preventDefault();
  restoreAllWorldlines();
});
document.querySelector("#magicLinkBtn").addEventListener("click", () => showCloudNotConfigured("Email magic link"));
document.querySelector("#googleLoginBtn").addEventListener("click", () => showCloudNotConfigured("Google 登入"));
document.querySelector("#worldlineBtn").addEventListener("click", openWorldline);
document.querySelector("#exportJsonBtn").addEventListener("click", exportJson);
document.querySelector("#exportNovelBtn").addEventListener("click", exportNovel);
document.querySelector("#exportSummaryBtn").addEventListener("click", exportSummary);

document.querySelector("#createSaveBtn").addEventListener("click", async (event) => {
  event.preventDefault();
  await createSaveFromForm();
});

document.querySelector("#importJsonConfirmBtn").addEventListener("click", (event) => {
  event.preventDefault();
  importJson();
});

document.querySelector("#importRawBtn").addEventListener("click", (event) => {
  event.preventDefault();
  importRawText();
});

document.querySelector("#saveSettingsBtn").addEventListener("click", (event) => {
  event.preventDefault();
  settings = {
    provider: document.querySelector("#aiProvider").value,
    endpoint: document.querySelector("#apiEndpoint").value.trim(),
    model: document.querySelector("#apiModel").value.trim(),
    apiKey: document.querySelector("#apiKey").value.trim(),
    dmInstructions: document.querySelector("#dmInstructions").value.trim(),
    dmKnowledge: document.querySelector("#dmKnowledge").value.trim(),
    dmStyleExamples: document.querySelector("#dmStyleExamples").value.trim(),
    desktopMode: document.querySelector("#desktopMode").checked
  };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  els.settingsDialog.close();
});

document.querySelector("#aiProvider").addEventListener("change", applyProviderDefaultsToForm);

document.querySelector("#saveCharacterBtn").addEventListener("click", (event) => {
  event.preventDefault();
  applyCharacterForm();
});

document.querySelector("#assistCharacterBtn").addEventListener("click", async (event) => {
  event.preventDefault();
  await assistCharacter();
});

els.actionForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const action = els.freeAction.value.trim();
  if (!action || !campaign) return;
  els.freeAction.value = "";
  await submitAction(action);
});

function loadDb() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) return normalizeDb(JSON.parse(raw));
  } catch {
    // Fall through to migration.
  }

  try {
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy) {
      const migrated = normalizeCampaign(JSON.parse(legacy));
      return normalizeDb({ activeSaveId: migrated.campaignId, saves: [migrated] });
    }
  } catch {
    // Fall through to sample.
  }

  return normalizeDb({ activeSaveId: sampleCampaign.campaignId, saves: [structuredClone(sampleCampaign)] });
}

function normalizeDb(data) {
  const saves = Array.isArray(data.saves) ? data.saves.map(normalizeCampaign) : [];
  const activeSaveId = saves.some((save) => save.campaignId === data.activeSaveId && !save.archived)
    ? data.activeSaveId
    : saves.find((save) => !save.archived)?.campaignId || null;
  return { activeSaveId, saves };
}

function saveDb() {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

function getActiveCampaign() {
  return db.saves.find((save) => save.campaignId === db.activeSaveId) || null;
}

function setActiveCampaign(id) {
  const target = db.saves.find((save) => save.campaignId === id);
  if (!target || target.archived) return;
  db.activeSaveId = id;
  campaign = getActiveCampaign();
  saveDb();
  showGame();
}

function loadSettings() {
  try {
    return { ...defaultSettings(), ...(JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {}) };
  } catch {
    return defaultSettings();
  }
}

function defaultSettings() {
  return {
    provider: "openai-compatible",
    endpoint: "https://api.openai.com/v1/responses",
    model: "gpt-4.1-mini",
    apiKey: "",
    dmInstructions: "",
    dmKnowledge: "",
    dmStyleExamples: "",
    desktopMode: false
  };
}

const providerDefaults = {
  "openai-compatible": {
    endpoint: "https://api.openai.com/v1/responses",
    model: "gpt-4.1-mini"
  },
  "lm-studio": {
    endpoint: "http://localhost:1234/v1/chat/completions",
    model: "local-model"
  },
  "ollama": {
    endpoint: "http://localhost:11434/api/generate",
    model: "llama3.1"
  },
  "custom-local": {
    endpoint: "http://localhost:8080/generate",
    model: "local-model"
  }
};

function bootApp() {
  const activeSaves = db.saves.filter((save) => !save.archived);
  if (settings.desktopMode && activeSaves.length) {
    const recent = activeSaves.slice().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0];
    db.activeSaveId = recent.campaignId;
    campaign = getActiveCampaign();
    showGame();
    return;
  }
  render();
  showHome();
}

function createBlankCampaign(form = {}) {
  const now = new Date().toISOString();
  const name = form.name || "未命名角色";
  return normalizeCampaign({
    version: 2,
    campaignId: crypto.randomUUID(),
    title: form.title || `${name}｜新的世界線`,
    createdAt: now,
    updatedAt: now,
    startedAt: now,
    playSeconds: 0,
    archived: false,
    archivedAt: "",
    ruleSettings: {
      ...structuredClone(defaultRuleSettings),
      diceEnabled: Boolean(form.diceEnabled)
    },
    player: {
      name,
      age: form.age || 11,
      bloodStatus: form.bloodStatus || "未設定",
      gender: form.gender || "未設定",
      house: form.house || "未分院",
      money: "0 加隆",
      appearance: form.appearance || "尚未建立完整外觀。",
      family: form.family || "尚未建立家族背景。",
      visualIdentity: {
        ...structuredClone(defaultVisualIdentity),
        identitySeed: crypto.randomUUID(),
        fixedDescription: form.appearance || "尚未建立完整外觀。"
      }
    },
    stats: {
      魔法感知: 5,
      勇氣: 5,
      觀察: 5,
      社交: 5,
      意志: 5
    },
    worldState: {
      year: "1991",
      term: "入學前",
      season: "夏末",
      timeOfDay: "上午",
      weather: "晴朗",
      location: "斜角巷",
      currentMood: "新的世界線尚未被舊劇情影響"
    },
    locations: structuredClone(defaultLocations),
    inventory: [],
    npcMemory: {},
    flags: {
      new_worldline: { label: "全新世界線", value: true, permanent: true }
    },
    storySummary: `${name}的世界線剛被建立，尚未帶入任何既有跑團劇情。`,
    memoryLayer: {
      ...structuredClone(defaultMemoryLayer),
      campaignSummary: `${name}的世界線剛被建立，尚未帶入任何既有跑團劇情。`,
      worldMemory: [
        `${name}是全新角色，目前不受範例劇情影響。`,
        "此世界線從斜角巷入學前採購開始，可走出不同路線。"
      ]
    },
    options: [
      "確認入學採購清單",
      "前往麗痕書店",
      "觀察斜角巷的人潮",
      "思考自己想成為什麼樣的巫師"
    ],
    turns: [
      {
        id: crypto.randomUUID(),
        kind: "dm",
        time: now,
        meta: "上午｜斜角巷",
        text: `${name}站在斜角巷的石板路上，新的世界線還沒有被任何舊故事染色。櫥窗、招牌、陌生人的袍角與遠處傳來的笑聲，都像尚未落筆的段落。接下來的每一個選擇，都會成為這份檔案自己的歷史。`,
        options: []
      }
    ],
    pensieve: []
  });
}

function normalizeCampaign(data) {
  const base = structuredClone(sampleCampaign);
  const now = new Date().toISOString();
  const campaignId = data.campaignId || crypto.randomUUID();
  const normalized = {
    ...base,
    ...data,
    version: 2,
    campaignId,
    title: data.title || `${data.player?.name || "未命名角色"}｜世界線`,
    createdAt: data.createdAt || now,
    updatedAt: data.updatedAt || now,
    startedAt: data.startedAt || data.createdAt || now,
    playSeconds: Number(data.playSeconds || 0),
    archived: Boolean(data.archived),
    archivedAt: data.archivedAt || "",
    ruleSettings: {
      ...structuredClone(defaultRuleSettings),
      ...(data.ruleSettings || {})
    },
    player: normalizePlayer({ ...base.player, ...(data.player || {}) }),
    stats: { ...base.stats, ...(data.stats || {}) },
    worldState: { ...base.worldState, ...(data.worldState || {}) },
    locations: mergeLocations(data.locations),
    inventory: Array.isArray(data.inventory) ? data.inventory : [],
    npcMemory: data.npcMemory || {},
    flags: data.flags || {},
    memoryLayer: normalizeMemoryLayer(data.memoryLayer, data.storySummary),
    turns: Array.isArray(data.turns) ? data.turns : [],
    pensieve: Array.isArray(data.pensieve) ? data.pensieve : [],
    options: Array.isArray(data.options) ? data.options : []
  };
  if (!normalized.turns.length) {
    normalized.turns = createBlankCampaign({ name: normalized.player.name, title: normalized.title }).turns;
  }
  return normalized;
}

function normalizePlayer(player) {
  return {
    ...player,
    visualIdentity: {
      ...structuredClone(defaultVisualIdentity),
      ...(player.visualIdentity || {}),
      fixedDescription: player.visualIdentity?.fixedDescription || player.appearance || "",
      identitySeed: player.visualIdentity?.identitySeed || crypto.randomUUID()
    }
  };
}

function normalizeMemoryLayer(memoryLayer = {}, fallbackSummary = "") {
  const layer = {
    ...structuredClone(defaultMemoryLayer),
    ...(memoryLayer || {})
  };
  layer.worldMemory = Array.isArray(layer.worldMemory) ? layer.worldMemory : [];
  layer.importedDossiers = Array.isArray(layer.importedDossiers) ? layer.importedDossiers : [];
  layer.loreDatabase = {
    ...structuredClone(defaultMemoryLayer.loreDatabase),
    ...(layer.loreDatabase || {})
  };
  layer.loreDatabase.rules = Array.isArray(layer.loreDatabase.rules) ? layer.loreDatabase.rules : [];
  layer.campaignSummary = layer.campaignSummary || fallbackSummary || defaultMemoryLayer.campaignSummary;
  return layer;
}

function mergeLocations(locations = {}) {
  const merged = structuredClone(defaultLocations);
  Object.entries(sceneCatalog).forEach(([name, data]) => {
    merged[name] = { ...(merged[name] || {}), ...data };
  });
  Object.entries(locations || {}).forEach(([name, data]) => {
    merged[name] = { ...(merged[name] || {}), ...(sceneCatalog[name] || {}), ...data };
  });
  return merged;
}

function saveActiveCampaign() {
  if (!campaign || campaign.archived) return;
  campaign.updatedAt = new Date().toISOString();
  const index = db.saves.findIndex((save) => save.campaignId === campaign.campaignId);
  if (index >= 0) db.saves[index] = campaign;
  saveDb();
  renderHome();
}

function backupAllWorldlines() {
  saveActiveCampaign();
  const payload = {
    app: "hogwarts-ai-archive",
    version: 2,
    exportedAt: new Date().toISOString(),
    db
  };
  download(`hogwarts-worldlines-backup-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(payload, null, 2), "application/json");
}

function openRestoreDialog() {
  els.restoreText.value = "";
  els.restoreDialog.showModal();
}

function restoreAllWorldlines() {
  const text = els.restoreText.value.trim();
  if (!text) return;
  try {
    const parsed = JSON.parse(text);
    const restoredDb = parsed.db ? parsed.db : parsed;
    const normalized = normalizeDb(restoredDb);
    if (!normalized.saves.length) throw new Error("backup has no saves");
    db = normalized;
    campaign = getActiveCampaign();
    saveDb();
    els.restoreDialog.close();
    showHome();
  } catch {
    alert("備份 JSON 無法還原，請確認格式。");
  }
}

function openAuthDialog() {
  els.authEmail.value = "";
  els.authStatus.textContent = "雲端尚未設定，不會傳送任何登入資料。";
  els.authDialog.showModal();
}

function showCloudNotConfigured(method) {
  els.authStatus.textContent = `${method} 已列入介面，但目前尚未設定 Supabase 專案，因此不會傳送登入資料。設定完成後，這裡會同步世界線與存檔。`;
}

function render() {
  if (campaign) {
    renderStory();
    renderSidebar();
    renderChoices();
  }
  renderHome();
  saveActiveCampaign();
}

function renderHome() {
  const activeSaves = db.saves.filter((save) => !save.archived);
  const archivedSaves = db.saves.filter((save) => save.archived);
  els.saveCount.textContent = `${activeSaves.length} 份進行中｜${archivedSaves.length} 份封存`;
  els.saveList.innerHTML = activeSaves
    .slice()
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .map((save) => saveCard(save, false))
    .join("") || `<div class="memory-card"><strong>沒有進行中的存檔</strong><p>可以新增存檔、匯入舊紀錄，或從封存區重新開啟。</p></div>`;

  els.archivedSaveList.innerHTML = archivedSaves
    .slice()
    .sort((a, b) => new Date(b.archivedAt || b.updatedAt) - new Date(a.archivedAt || a.updatedAt))
    .map((save) => saveCard(save, true))
    .join("") || `<div class="memory-card"><strong>沒有封存存檔</strong></div>`;

  document.querySelectorAll("[data-load-save]").forEach((button) => {
    button.addEventListener("click", () => setActiveCampaign(button.dataset.loadSave));
  });
  document.querySelectorAll("[data-edit-save]").forEach((button) => {
    button.addEventListener("click", () => toggleEditSave(button.dataset.editSave));
  });
  document.querySelectorAll("[data-rename-save]").forEach((button) => {
    button.addEventListener("click", () => openRenameSave(button.dataset.renameSave));
  });
  document.querySelectorAll("[data-copy-save]").forEach((button) => {
    button.addEventListener("click", () => copySave(button.dataset.copySave));
  });
  document.querySelectorAll("[data-archive-save]").forEach((button) => {
    button.addEventListener("click", () => archiveSave(button.dataset.archiveSave));
  });
  document.querySelectorAll("[data-unarchive-save]").forEach((button) => {
    button.addEventListener("click", () => unarchiveSave(button.dataset.unarchiveSave));
  });
  document.querySelectorAll("[data-delete-save]").forEach((button) => {
    button.addEventListener("click", () => deleteSave(button.dataset.deleteSave));
  });
}

function saveCard(save, archived) {
  const editing = editingSaveId === save.campaignId;
  return `
    <article class="save-card ${archived ? "archived" : ""}">
      <div>
        <h3>${escapeHtml(save.title)}</h3>
        <p>${escapeHtml(save.player.name)}｜${escapeHtml(save.worldState.term)}・${escapeHtml(save.worldState.location)}</p>
        <p>最後遊玩時間：${formatDate(save.updatedAt)}｜遊玩時長：${formatDuration(save.playSeconds)}</p>
        <p>目前地點：${escapeHtml(save.worldState.location)}${archived ? `｜封存：${formatDate(save.archivedAt || save.updatedAt)}` : ""}</p>
      </div>
      <div class="save-actions">
        ${archived
          ? `<button class="wide-btn" data-unarchive-save="${escapeHtml(save.campaignId)}">重新開啟</button>`
          : `<button class="wide-btn" data-load-save="${escapeHtml(save.campaignId)}">繼續</button>`}
        <button class="wide-btn" data-edit-save="${escapeHtml(save.campaignId)}">${editing ? "收合" : "編輯"}</button>
        <div class="save-edit-menu ${editing ? "" : "hidden"}">
          <button class="wide-btn" data-rename-save="${escapeHtml(save.campaignId)}">改名</button>
          <button class="wide-btn" data-copy-save="${escapeHtml(save.campaignId)}">複製世界線</button>
          ${archived
            ? `<button class="wide-btn" data-unarchive-save="${escapeHtml(save.campaignId)}">解除封存</button>`
            : `<button class="wide-btn" data-archive-save="${escapeHtml(save.campaignId)}">封存</button>`}
          <button class="wide-btn danger-btn" data-delete-save="${escapeHtml(save.campaignId)}">刪除</button>
        </div>
      </div>
    </article>
  `;
}

function toggleEditSave(id) {
  editingSaveId = editingSaveId === id ? null : id;
  renderHome();
}

function renderStory() {
  els.brandLocation.textContent = campaign.worldState.location || "未定地點";
  els.sceneMeta.textContent = `${campaign.worldState.year}｜${campaign.worldState.term}｜${campaign.worldState.timeOfDay}｜${campaign.worldState.location}`;
  els.storyLog.innerHTML = campaign.turns
    .map((turn) => `
      <section class="turn ${turn.kind === "player" ? "player" : ""}">
        <div class="turn-meta">${escapeHtml(turn.kind === "player" ? campaign.player.name : "AI DM")}｜${escapeHtml(turn.meta || "")}</div>
        <p>${escapeHtml(turn.text)}</p>
      </section>
    `)
    .join("");
  els.storyLog.scrollTop = els.storyLog.scrollHeight;
}

function openRenameSave(id) {
  const save = db.saves.find((item) => item.campaignId === id);
  if (!save) return;
  pendingRenameSaveId = id;
  els.renameSaveInput.value = save.title;
  els.renameSaveDialog.showModal();
}

function confirmRenameSave() {
  const save = db.saves.find((item) => item.campaignId === pendingRenameSaveId);
  const title = els.renameSaveInput.value.trim();
  if (!save || !title) return;
  save.title = title;
  save.updatedAt = new Date().toISOString();
  if (campaign?.campaignId === save.campaignId) campaign = save;
  pendingRenameSaveId = null;
  els.renameSaveDialog.close();
  saveDb();
  renderHome();
  if (!els.gameView.classList.contains("hidden")) renderStory();
}

function copySave(id) {
  const source = db.saves.find((item) => item.campaignId === id);
  if (!source) return;
  const now = new Date().toISOString();
  const copy = normalizeCampaign(structuredClone(source));
  copy.campaignId = crypto.randomUUID();
  copy.title = `${source.title}｜複製`;
  copy.createdAt = now;
  copy.updatedAt = now;
  copy.archived = false;
  copy.archivedAt = "";
  copy.copiedFrom = {
    campaignId: source.campaignId,
    title: source.title,
    copiedAt: now
  };
  copy.memoryLayer.worldMemory = mergeList(copy.memoryLayer.worldMemory, [
    `此世界線複製自「${source.title}」。AI DM 只能讀取此複製存檔自己的 memoryLayer。`
  ]);
  db.saves.push(copy);
  saveDb();
  renderHome();
}

function archiveSave(id) {
  const save = db.saves.find((item) => item.campaignId === id);
  if (!save) return;
  save.archived = true;
  save.archivedAt = new Date().toISOString();
  if (editingSaveId === id) editingSaveId = null;
  if (db.activeSaveId === id) {
    db.activeSaveId = db.saves.find((item) => !item.archived)?.campaignId || null;
    campaign = getActiveCampaign();
    showHome();
  }
  saveDb();
  renderHome();
}

function unarchiveSave(id) {
  const save = db.saves.find((item) => item.campaignId === id);
  if (!save) return;
  save.archived = false;
  save.archivedAt = "";
  save.updatedAt = new Date().toISOString();
  if (editingSaveId === id) editingSaveId = null;
  saveDb();
  renderHome();
}

function deleteSave(id) {
  const save = db.saves.find((item) => item.campaignId === id);
  if (!save) return;
  const ok = confirm(`確定刪除「${save.title}」？此動作無法復原。`);
  if (!ok) return;
  db.saves = db.saves.filter((item) => item.campaignId !== id);
  if (db.activeSaveId === id) {
    db.activeSaveId = db.saves.find((item) => !item.archived)?.campaignId || null;
    campaign = getActiveCampaign();
    showHome();
  }
  saveDb();
  renderHome();
}

function renderSidebar() {
  const p = campaign.player;
  renderVisualLayers();
  els.profileFields.innerHTML = rows({
    名字: p.name,
    年齡: p.age,
    血統: p.bloodStatus,
    性別: p.gender,
    學院: p.house,
    金錢: p.money
  });
  els.profileFields.insertAdjacentHTML("beforeend", `
    <div class="memory-card">
      <strong>外觀</strong>
      <p>${escapeHtml(p.appearance || "尚未建立外觀描述。")}</p>
    </div>
  `);
  els.statList.innerHTML = Object.entries(campaign.stats)
    .map(([name, value]) => `<div class="stat-row"><span>${escapeHtml(name)}</span><strong>${escapeHtml(value)}</strong></div>`)
    .join("");

  renderTimePanel();

  els.worldFields.innerHTML = rows({
    年份: campaign.worldState.year,
    學期: campaign.worldState.term,
    季節: campaign.worldState.season,
    時間: campaign.worldState.timeOfDay,
    天氣: campaign.worldState.weather,
    地點: campaign.worldState.location,
    擲骰規則: campaign.ruleSettings?.diceEnabled ? "啟用" : "未啟用"
  });

  els.inventoryList.innerHTML = campaign.inventory.length
    ? campaign.inventory.map((item) => `<li><strong>${escapeHtml(item.name)}</strong><br><span>${escapeHtml(item.note || "")}</span></li>`).join("")
    : `<li>目前沒有物品。</li>`;

  els.flagList.innerHTML = Object.keys(campaign.flags).length
    ? Object.entries(campaign.flags).map(([, flag]) => `<li>${flag.value ? "●" : "○"} ${escapeHtml(flag.label)}${flag.permanent ? "｜永久" : ""}</li>`).join("")
    : `<li>目前沒有事件旗標。</li>`;

  els.npcList.innerHTML = Object.keys(campaign.npcMemory).length
    ? Object.entries(campaign.npcMemory).map(([name, npc]) => `
      <div class="npc-card">
        <strong>${escapeHtml(name)}</strong>
        <p>信任 ${escapeHtml(npc.trust ?? 0)}｜好感 ${escapeHtml(npc.affection ?? 0)}｜${escapeHtml(npc.emotion || "未明")}</p>
        ${relationshipBars(npc)}
        <p>${escapeHtml(npc.impression || "")}</p>
      </div>
    `).join("")
    : `<div class="memory-card"><strong>尚未建立 NPC 記憶</strong><p>探索與對話後會逐步出現。</p></div>`;

  els.pensieveList.innerHTML = campaign.pensieve.length
    ? campaign.pensieve.map((memory, index) => `
      <button class="memory-card memory-button" data-memory-index="${index}">
        <strong>${escapeHtml(memory.title)}</strong>
        <p>${escapeHtml(memory.note || memory.summary || memory.prompt || "")}</p>
      </button>
    `).join("")
    : `<div class="memory-card"><strong>尚無記憶相片</strong><p>重要劇情後可收錄於儲思盆。</p></div>`;
  document.querySelectorAll("[data-memory-index]").forEach((button) => {
    button.addEventListener("click", () => openMemory(Number(button.dataset.memoryIndex)));
  });

  renderExplore();
  renderRuleControls();
}

function renderRuleControls() {
  document.querySelector("#rollDiceBtn").classList.toggle("hidden", !campaign.ruleSettings?.diceEnabled);
}

function renderVisualLayers() {
  const visual = campaign.player.visualIdentity || defaultVisualIdentity;
  const currentLocation = campaign.locations?.[campaign.worldState.location];
  const sceneImage = currentLocation?.sceneImage || visual.sceneImage || "assets/scenes/twilight-archive.png";
  const mode = visual.activePortraitMode || "fullBody";
  const portraitImage = mode === "bust"
    ? (visual.bustImage || visual.portraitImage || visual.fullBodyImage)
    : (visual.fullBodyImage || visual.portraitImage || visual.bustImage);
  els.sceneLayer.src = sceneImage;
  if (portraitImage) {
    els.characterLayer.src = portraitImage;
    els.characterLayer.classList.remove("hidden");
    els.characterLayer.classList.toggle("bust", mode === "bust");
    els.portraitFallback.classList.add("hidden");
  } else {
    els.characterLayer.removeAttribute("src");
    els.characterLayer.classList.add("hidden");
    els.characterLayer.classList.remove("bust");
    els.portraitFallback.classList.remove("hidden");
  }
  document.querySelector("#lockVisualBtn").textContent = visual.locked ? "形象已鎖定" : "鎖定形象";
  document.querySelectorAll("[data-portrait-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.portraitMode === mode);
  });
  document.querySelector("#portraitUploadLabel").textContent = mode === "bust" ? "匯入半身" : "匯入全身";
}

function renderTimePanel() {
  const w = campaign.worldState;
  els.timePanel.innerHTML = `
    <div class="time-main">
      <strong>${escapeHtml(w.timeOfDay || "未定時間")}</strong>
      <span>${escapeHtml(w.weather || "未定天氣")}</span>
    </div>
    <div class="time-grid">
      <div class="time-chip"><span>年份</span>${escapeHtml(w.year || "未定")}</div>
      <div class="time-chip"><span>學期</span>${escapeHtml(w.term || "未定")}</div>
      <div class="time-chip"><span>季節</span>${escapeHtml(w.season || "未定")}</div>
      <div class="time-chip"><span>地點</span>${escapeHtml(w.location || "未定")}</div>
    </div>
  `;
}

function relationshipBars(npc) {
  const trust = clamp(Number(npc.trust ?? 0), 0, 100);
  const affection = clamp(Number(npc.affection ?? 0), -100, 100);
  const affectionDisplay = Math.round((affection + 100) / 2);
  return `
    <div class="relationship-bars">
      <div class="relationship-row">
        <span>信任</span>
        <div class="bar-track"><div class="bar-fill" style="width:${trust}%"></div></div>
        <span>${trust}</span>
      </div>
      <div class="relationship-row">
        <span>好感</span>
        <div class="bar-track"><div class="bar-fill affection" style="width:${affectionDisplay}%"></div></div>
        <span>${affection}</span>
      </div>
    </div>
  `;
}

function renderExplore() {
  const locations = Object.entries(campaign.locations || {}).filter(([, loc]) => loc.unlocked || loc.mentioned);
  els.mapView.innerHTML = locations
    .map(([name, loc]) => {
      const isCurrent = name === campaign.worldState.location;
      const npcText = loc.npcs?.length ? `NPC：${loc.npcs.slice(0, 2).join("、")}` : "暫無可見 NPC";
      return `
        <button class="map-node ${isCurrent ? "current" : ""} ${loc.unlocked ? "" : "locked"}" data-map-location="${escapeHtml(name)}" ${loc.unlocked ? "" : "disabled"}>
          <strong>${escapeHtml(name)}</strong>
          <span>${isCurrent ? "目前所在地" : loc.unlocked ? "可前往" : "提及但未解鎖"}｜${loc.explored ? "已探索" : "未探索"}</span>
          <small>${escapeHtml(npcText)}</small>
        </button>
      `;
    })
    .join("");
  document.querySelectorAll("[data-map-location]").forEach((button) => {
    button.addEventListener("click", () => exploreLocation(button.dataset.mapLocation));
  });

  els.locationList.innerHTML = locations
    .map(([name, loc]) => `
      <button class="location-card ${loc.unlocked ? "" : "locked"}" data-location="${escapeHtml(name)}" ${loc.unlocked ? "" : "disabled"}>
        <strong>${loc.unlocked ? "開放" : "提及"}｜${escapeHtml(name)}</strong>
        <span>${loc.explored ? "已探索" : "未探索"}｜${escapeHtml(loc.timeRules || "無特殊時間條件")}</span>
      </button>
    `)
    .join("");
  document.querySelectorAll("[data-location]").forEach((button) => {
    button.addEventListener("click", () => exploreLocation(button.dataset.location));
  });

  const current = campaign.locations?.[campaign.worldState.location];
  const npcs = current?.npcs || [];
  els.talkList.innerHTML = npcs.length
    ? npcs.map((npc) => `<button class="talk-card" data-talk="${escapeHtml(npc)}">與${escapeHtml(npc)}談話</button>`).join("")
    : `<div class="memory-card"><strong>此地暫無可對話對象</strong><p>時間或事件推進後可能改變。</p></div>`;
  document.querySelectorAll("[data-talk]").forEach((button) => {
    button.addEventListener("click", () => submitAction(`與${button.dataset.talk}談話`));
  });
}

function rows(data) {
  return Object.entries(data)
    .map(([label, value]) => `<div class="data-row"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`)
    .join("");
}

function renderChoices() {
  els.choiceList.innerHTML = campaign.options
    .slice(0, 4)
    .map((choice, index) => `<button class="choice" data-choice="${escapeHtml(choice)}">${String.fromCharCode(65 + index)}. ${escapeHtml(choice)}</button>`)
    .join("");
  document.querySelectorAll(".choice").forEach((button) => {
    button.addEventListener("click", () => submitAction(button.dataset.choice));
  });
}

async function submitAction(action) {
  if (!campaign) return;
  setBusy(true);
  const start = Date.now();
  addTurn("player", action);
  renderStory();

  try {
    const response = isAiConfigured() ? await callAiDm(action) : localDm(action);
    applyDmResponse(response);
  } catch (error) {
    applyDmResponse(localDm(action, `AI 連線未完成：${error.message}`));
  } finally {
    campaign.playSeconds += Math.max(1, Math.round((Date.now() - start) / 1000));
    setBusy(false);
    render();
  }
}

function exploreLocation(name) {
  const loc = campaign.locations[name];
  if (!loc?.unlocked) return;
  loc.explored = true;
  submitAction(`前往${name}自由探索`);
}

function addTurn(kind, text, options = []) {
  campaign.turns.push({
    id: crypto.randomUUID(),
    kind,
    time: new Date().toISOString(),
    meta: `${campaign.worldState.timeOfDay}｜${campaign.worldState.location}`,
    text,
    options,
    snapshot: snapshotState()
  });
}

function snapshotState() {
  return {
    player: structuredClone(campaign.player),
    stats: structuredClone(campaign.stats),
    worldState: structuredClone(campaign.worldState),
    locations: structuredClone(campaign.locations),
    inventory: structuredClone(campaign.inventory),
    npcMemory: structuredClone(campaign.npcMemory),
    flags: structuredClone(campaign.flags),
    memoryLayer: structuredClone(campaign.memoryLayer)
  };
}

async function callAiDm(action) {
  const prompt = buildDmPrompt(action);
  const provider = settings.provider || "openai-compatible";
  const request = buildAiRequest(provider, prompt);
  const res = await fetch(settings.endpoint || getProviderDefaults(provider).endpoint, request);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const raw = await res.text();
  let data = raw;
  try {
    data = JSON.parse(raw);
  } catch {
    // Some local servers return plain text directly.
  }
  return parseDmJson(extractAiText(provider, data));
}

function isAiConfigured() {
  const provider = settings.provider || "openai-compatible";
  if (!settings.endpoint && !getProviderDefaults(provider).endpoint) return false;
  if (provider === "openai-compatible") return Boolean(settings.apiKey && settings.endpoint && settings.model);
  return Boolean((settings.endpoint || getProviderDefaults(provider).endpoint) && (settings.model || getProviderDefaults(provider).model));
}

function buildAiRequest(provider, prompt) {
  if (provider === "ollama") {
    return {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: settings.model || getProviderDefaults(provider).model,
        prompt,
        stream: false,
        options: { temperature: 0.85 }
      })
    };
  }

  if (provider === "lm-studio") {
    return {
      method: "POST",
      headers: buildAiHeaders(false),
      body: JSON.stringify({
        model: settings.model || getProviderDefaults(provider).model,
        messages: [
          { role: "system", content: "你是沉浸式長期跑團的 AI DM。遵循使用者 prompt，且只回傳有效 JSON。" },
          { role: "user", content: prompt }
        ],
        temperature: 0.85
      })
    };
  }

  if (provider === "custom-local") {
    return {
      method: "POST",
      headers: buildAiHeaders(Boolean(settings.apiKey)),
      body: JSON.stringify({
        model: settings.model || getProviderDefaults(provider).model,
        prompt,
        temperature: 0.85
      })
    };
  }

  return {
    method: "POST",
    headers: buildAiHeaders(true),
    body: JSON.stringify({
      model: settings.model || getProviderDefaults(provider).model,
      input: prompt,
      temperature: 0.85
    })
  };
}

function buildAiHeaders(requireKey) {
  const headers = { "Content-Type": "application/json" };
  if (settings.apiKey || requireKey) headers.Authorization = `Bearer ${settings.apiKey || ""}`;
  return headers;
}

function extractAiText(provider, data) {
  if (typeof data === "string") return data;
  if (provider === "ollama") return data.response || data.message?.content || "";
  if (provider === "lm-studio") return data.choices?.[0]?.message?.content || data.choices?.[0]?.text || "";
  if (provider === "custom-local") return data.text || data.response || data.output_text || data.content || "";
  return data.output_text || data.output?.flatMap((x) => x.content || []).map((x) => x.text || "").join("\n") || "";
}

function buildDmProfilePrompt() {
  const sections = [
    ["GPT Instructions", settings.dmInstructions],
    ["知識／世界規則摘要", settings.dmKnowledge],
    ["回覆範例／風格樣本", settings.dmStyleExamples]
  ].filter(([, value]) => value?.trim());

  if (!sections.length) return "";

  return `
自訂 AI DM 設定檔：
以下內容來自玩家自己的 Custom GPT 設定。請盡量遵循其風格、人設、世界規則與禁忌，但不得違反上方硬性規則、不得讀取其他世界線，且最後仍必須回傳指定 JSON。

${sections.map(([title, value]) => `### ${title}\n${value.trim()}`).join("\n\n")}
`;
}

function buildDmPrompt(action) {
  const diceRule = campaign.ruleSettings?.diceEnabled
    ? "本世界線啟用擲骰系統。若行動結果具有高不確定性，可以要求玩家進行 D20 檢定，或根據 last_roll 旗標描述成敗後果。"
    : "本世界線未啟用擲骰系統。請直接用世界狀態、角色能力、NPC 記憶與事件旗標做敘事判定，不要要求玩家擲骰。";
  const dmProfile = buildDmProfilePrompt();
  return `你是《霍格華茲》的 AI DM。請用繁體中文主持長期人生模擬。

硬性規則：
- 玩家只扮演自己的角色：${campaign.player.name}；你主持世界、NPC、時間與後果。
- 必須使用小說體，不要變成純聊天。
- 不重置世界，不否定既有存檔。
- NPC 要有自主感、記憶與情緒，不是任務機器。
- 自由探索時，需判定是否能去、會遇到誰、是否觸發事件、是否消耗時間、是否改變數值。
- 擲骰規則：${diceRule}
- 可在 statePatch.locations 中新增 AI 自行建構的新地點；未解鎖但被提及的地點請設 mentioned: true。
- 回覆必須是單一 JSON，不要 Markdown。
${dmProfile}

JSON 格式：
{
  "narrative": "小說體敘事，約 350 到 700 字",
  "options": ["選項A", "選項B", "選項C", "選項D"],
  "statePatch": {
    "worldState": {},
    "stats": {},
    "locations": {
      "新地點名稱": {"unlocked": true, "mentioned": true, "explored": false, "npcs": [], "events": [], "timeRules": "", "quests": []}
    },
    "inventoryAdd": [],
    "inventoryRemove": [],
    "npcMemory": {},
    "flags": {},
    "memoryLayer": {
      "worldMemoryAdd": [],
      "loreDatabase": {},
      "campaignSummary": "更新後長期摘要"
    },
    "storySummary": "更新後摘要"
  },
  "pensieve": {"title": "記憶相片標題", "summary": "回憶摘要", "prompt": "可生成場景圖的提示", "note": "短註"}
}

目前存檔：
${JSON.stringify(snapshotState(), null, 2)}

AI DM 記憶層：
${JSON.stringify(campaign.memoryLayer, null, 2)}

最近回合：
${campaign.turns.slice(-8).map((t) => `${t.kind}: ${t.text}`).join("\n")}

玩家行動：
${action}`;
}

function parseDmJson(text) {
  const cleaned = text.trim().replace(/^```json\s*/i, "").replace(/```$/i, "");
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("AI 回覆不是 JSON");
  return JSON.parse(cleaned.slice(start, end + 1));
}

function localDm(action, prefix = "") {
  const nextTime = advanceTime();
  const location = inferLocation(action);
  const loc = campaign.locations[location];
  const canGo = !loc || loc.unlocked;
  const finalLocation = canGo ? location : campaign.worldState.location;
  const locationLine = canGo
    ? `${campaign.player.name}的腳步轉向${finalLocation}。`
    : `${campaign.player.name}意識到${location}還不是此刻能抵達的地方；也許需要時間、權限，或某個尚未發生的事件。`;
  const narrative = `${prefix ? prefix + "\n\n" : ""}${locationLine}\n\n世界沒有因為自由探索而靜止。${campaign.worldState.timeOfDay}的光線沿著石板與窗框慢慢移動，遠處的人聲改變了方向，某些 NPC 也在自己的時間裡做出選擇。${action}這個念頭被檔案館記下時，周圍的細節開始回應：可抵達的門變得清晰，還未開啟的門則保持沉默。\n\n當時間推進到${nextTime}，${campaign.player.name}感覺這不是被主線牽著走，而是在一個會記得他的世界中行動。每個地點、每段對話、每一次拖延，都可能在日後變成新的支線或代價。`;
  return {
    narrative,
    options: [
      "查看目前地點還有誰在附近",
      "主動發起一段對話",
      "觀察是否有支線事件正在變化",
      "打開自由探索列表選擇下一個地點"
    ],
    statePatch: {
      worldState: { timeOfDay: nextTime, location: finalLocation, currentMood: "世界仍在流動" },
      stats: { 觀察: Math.min(10, (campaign.stats.觀察 || 0) + 1) },
      locations: {
        [finalLocation]: { explored: true }
      },
      flags: {
        last_action_recorded: { label: "最近行動已被檔案館記錄", value: true, permanent: false }
      },
      memoryLayer: {
        worldMemoryAdd: [`${campaign.player.name}在${campaign.worldState.timeOfDay}選擇：${action}`],
        campaignSummary: `${campaign.storySummary} 最近，${campaign.player.name}選擇「${action}」，世界時間推進到${nextTime}，目前地點為${finalLocation}。`
      },
      storySummary: `${campaign.storySummary} 最近，${campaign.player.name}選擇「${action}」，世界時間推進到${nextTime}，目前地點為${finalLocation}。`
    },
    pensieve: {
      title: `記憶相片：${nextTime}的${finalLocation}`,
      prompt: `A quiet magical location called ${finalLocation}, a student exploring, ${nextTime}, atmospheric archive memory`,
      note: `由本回合「${action}」產生。`,
      summary: `${campaign.player.name}在${nextTime}抵達或確認了${finalLocation}的狀態。`
    }
  };
}

function applyDmResponse(response) {
  const patch = response.statePatch || {};
  campaign.worldState = { ...campaign.worldState, ...(patch.worldState || {}) };
  campaign.stats = { ...campaign.stats, ...(patch.stats || {}) };
  campaign.locations = mergeLocations({ ...campaign.locations, ...(patch.locations || {}) });
  applyInventoryPatch(patch);
  applyNpcPatch(patch.npcMemory || {});
  campaign.flags = { ...campaign.flags, ...(patch.flags || {}) };
  applyMemoryLayerPatch(patch.memoryLayer || {});
  campaign.storySummary = patch.storySummary || campaign.storySummary;
  campaign.options = Array.isArray(response.options) && response.options.length ? response.options : campaign.options;
  if (response.pensieve?.title) {
    campaign.pensieve.push({
      ...response.pensieve,
      time: response.pensieve.time || new Date().toISOString(),
      location: response.pensieve.location || campaign.worldState.location,
      snapshot: response.pensieve.snapshot || snapshotState()
    });
  }
  addTurn("dm", response.narrative || "世界安靜了一瞬，等待下一個選擇。", campaign.options);
}

function applyMemoryLayerPatch(patch) {
  campaign.memoryLayer = normalizeMemoryLayer(campaign.memoryLayer, campaign.storySummary);
  campaign.memoryLayer.worldMemory = mergeList(campaign.memoryLayer.worldMemory, patch.worldMemoryAdd || patch.worldMemory || []);
  campaign.memoryLayer.loreDatabase = {
    ...campaign.memoryLayer.loreDatabase,
    ...(patch.loreDatabase || {})
  };
  if (patch.campaignSummary) {
    campaign.memoryLayer.campaignSummary = patch.campaignSummary;
  }
}

function applyInventoryPatch(patch) {
  if (Array.isArray(patch.inventoryRemove)) {
    const remove = new Set(patch.inventoryRemove.map((item) => typeof item === "string" ? item : item.name));
    campaign.inventory = campaign.inventory.filter((item) => !remove.has(item.name));
  }
  if (Array.isArray(patch.inventoryAdd)) {
    campaign.inventory.push(...patch.inventoryAdd.filter((item) => item?.name));
  }
}

function applyNpcPatch(npcs) {
  Object.entries(npcs).forEach(([name, patch]) => {
    const current = campaign.npcMemory[name] || { impression: "", trust: 0, affection: 0, emotion: "", secrets: [], memories: [] };
    campaign.npcMemory[name] = {
      ...current,
      ...patch,
      trust: clamp((current.trust || 0) + (patch.trust || 0), 0, 100),
      affection: clamp((current.affection || 0) + (patch.affection || 0), -100, 100),
      secrets: mergeList(current.secrets, patch.secrets),
      memories: mergeList(current.memories, patch.memories)
    };
  });
}

function advanceTime() {
  const index = timeCycle.indexOf(campaign.worldState.timeOfDay);
  return timeCycle[(index + 1 + timeCycle.length) % timeCycle.length];
}

function inferLocation(action) {
  const names = Object.keys(campaign.locations || {});
  return names.find((name) => action.includes(name)) || campaign.worldState.location;
}

function openNewSave() {
  document.querySelector("#newSaveTitle").value = "新的世界線";
  document.querySelector("#newCharName").value = "未命名角色";
  document.querySelector("#newCharAge").value = 11;
  document.querySelector("#newCharBlood").value = "未設定";
  document.querySelector("#newCharGender").value = "未設定";
  document.querySelector("#newCharHouse").value = "未分院";
  document.querySelector("#newDiceEnabled").checked = false;
  document.querySelector("#newCharFamily").value = "";
  document.querySelector("#newCharAppearance").value = "";
  els.newDossierFiles.value = "";
  els.newDossierNote.value = "";
  renderFileList(els.newDossierFiles, els.newDossierFileList);
  els.newSaveDialog.showModal();
}

async function createSaveFromForm() {
  const newCampaign = createBlankCampaign({
    title: document.querySelector("#newSaveTitle").value.trim() || "新的世界線",
    name: document.querySelector("#newCharName").value.trim() || "未命名角色",
    age: Number(document.querySelector("#newCharAge").value) || 11,
    bloodStatus: document.querySelector("#newCharBlood").value.trim() || "未設定",
    gender: document.querySelector("#newCharGender").value.trim() || "未設定",
    house: document.querySelector("#newCharHouse").value.trim() || "未分院",
    diceEnabled: document.querySelector("#newDiceEnabled").checked,
    family: document.querySelector("#newCharFamily").value.trim(),
    appearance: document.querySelector("#newCharAppearance").value.trim()
  });
  const openingNote = els.newDossierNote.value.trim();
  const dossiers = await collectDossiersFromFiles(els.newDossierFiles.files, openingNote);
  if (dossiers.length) {
    applyDossiersToCampaign(newCampaign, dossiers, openingNote, {
      initial: true,
      addTurn: true
    });
  }
  db.saves.push(newCampaign);
  els.newSaveDialog.close();
  setActiveCampaign(newCampaign.campaignId);
}

function openImport() {
  document.querySelector("#importTitle").value = "";
  document.querySelector("#importText").value = "";
  els.importDialog.showModal();
}

function importJson() {
  const text = document.querySelector("#importText").value.trim();
  try {
    const imported = normalizeCampaign(JSON.parse(text));
    imported.title = document.querySelector("#importTitle").value.trim() || imported.title;
    imported.campaignId = imported.campaignId || crypto.randomUUID();
    imported.updatedAt = new Date().toISOString();
    db.saves.push(imported);
    els.importDialog.close();
    setActiveCampaign(imported.campaignId);
  } catch {
    alert("JSON 格式無法解析。");
  }
}

function importRawText() {
  const text = document.querySelector("#importText").value.trim();
  if (!text) return;
  const title = document.querySelector("#importTitle").value.trim() || "匯入舊紀錄";
  const imported = createBlankCampaign({ title, name: "待整理角色" });
  imported.storySummary = summarizeRawText(text);
  const statDraft = inferStatsFromLegacyText(text);
  imported.stats = Object.fromEntries(Object.entries(statDraft).map(([name, data]) => [name, data.value]));
  imported.flags.stats_inferred_from_legacy = { label: "數值已由舊紀錄擷取／推定", value: true, permanent: true };
  imported.memoryLayer.campaignSummary = imported.storySummary;
  imported.memoryLayer.worldMemory = mergeList(imported.memoryLayer.worldMemory, [
    "此存檔由舊跑團全文匯入，AI DM 必須延續而非重開。",
    imported.storySummary
  ]);
  imported.turns.push({
    id: crypto.randomUUID(),
    kind: "dm",
    time: new Date().toISOString(),
    meta: "匯入｜舊跑團",
    text: `舊跑團紀錄已收入檔案館。以下摘要將作為後續世界線的接續基底：\n\n${imported.storySummary}`,
    options: imported.options,
    snapshot: snapshotStateFor(imported)
  });
  imported.flags.imported_legacy_run = { label: "已匯入舊跑團全文", value: true, permanent: true };
  els.importDialog.close();
  pendingImport = { campaign: imported, statDraft };
  openStatConfirm(statDraft);
}

function openDossierDialog() {
  els.dossierFiles.value = "";
  els.dossierNote.value = "";
  renderDossierFileList();
  els.dossierDialog.showModal();
}

function renderDossierFileList() {
  renderFileList(els.dossierFiles, els.dossierFileList);
}

function renderFileList(input, target) {
  const files = Array.from(input.files || []);
  if (!files.length) {
    target.textContent = "尚未選擇檔案";
    return;
  }
  target.innerHTML = files.map((file) => `
    <div class="dossier-file">
      <strong>${escapeHtml(file.name)}</strong>
      <span>${formatBytes(file.size)} · ${escapeHtml(file.type || "text")}</span>
    </div>
  `).join("");
}

async function appendDossiersToCampaign() {
  const note = els.dossierNote.value.trim();
  const dossiers = await collectDossiersFromFiles(els.dossierFiles.files, note);
  if (!dossiers.length || !campaign) return;

  applyDossiersToCampaign(campaign, dossiers, note, { addTurn: true });
  saveActiveCampaign();
  els.dossierDialog.close();
  render();
}

async function collectDossiersFromFiles(fileList, note = "") {
  const files = Array.from(fileList || []);
  const dossiers = [];

  for (const file of files) {
    const text = await readFileAsText(file);
    const parsed = parseDossierText(text, file.name);
    dossiers.push({
      id: crypto.randomUUID(),
      filename: file.name,
      type: file.type || inferFileType(file.name),
      size: file.size,
      importedAt: new Date().toISOString(),
      note,
      title: parsed.title,
      summary: parsed.summary,
      content: parsed.content,
      truncated: parsed.truncated,
      sourceKind: parsed.sourceKind
    });
  }

  return dossiers;
}

function applyDossiersToCampaign(targetCampaign, dossiers, note = "", options = {}) {
  targetCampaign.memoryLayer = normalizeMemoryLayer(targetCampaign.memoryLayer, targetCampaign.storySummary);
  targetCampaign.memoryLayer.importedDossiers.push(...dossiers);

  const actionText = options.initial
    ? `玩家建立世界線時加入 ${dossiers.length} 份開局卷宗。這些資料只屬於 active campaign「${targetCampaign.title}」，AI DM 不得讀取其他世界線或封存存檔。`
    : `玩家於遊玩中追加 ${dossiers.length} 份卷宗到目前世界線。這些資料只屬於 active campaign「${targetCampaign.title}」，AI DM 不得讀取其他世界線或封存存檔。`;

  targetCampaign.memoryLayer.worldMemory = mergeList(targetCampaign.memoryLayer.worldMemory, [
    actionText,
    ...dossiers.map((item) => `${options.initial ? "開局卷宗" : "追加卷宗"}「${item.filename}」：${item.summary}`)
  ]);
  if (note) {
    targetCampaign.memoryLayer.worldMemory = mergeList(targetCampaign.memoryLayer.worldMemory, [`卷宗補充說明：${note}`]);
  }

  targetCampaign.memoryLayer.campaignSummary = summarizeRawText(`${targetCampaign.memoryLayer.campaignSummary || targetCampaign.storySummary} ${dossiers.map((item) => item.summary).join(" ")}`);
  targetCampaign.storySummary = summarizeRawText(`${targetCampaign.storySummary} ${dossiers.map((item) => item.summary).join(" ")}`);
  targetCampaign.flags.dossiers_appended = { label: options.initial ? "已加入開局卷宗" : "已於遊玩中追加卷宗", value: true, permanent: true };

  if (options.addTurn) {
    targetCampaign.turns.push({
      id: crypto.randomUUID(),
      kind: "dm",
      time: new Date().toISOString(),
      meta: options.initial ? "開局｜卷宗匯入" : `${targetCampaign.worldState.timeOfDay}｜${targetCampaign.worldState.location}`,
      text: buildDossierTurnText(dossiers, note, options),
      options: targetCampaign.options,
      snapshot: snapshotStateFor(targetCampaign)
    });
  }
}

function parseDossierText(text, filename) {
  const trimmed = text.trim();
  let title = filename;
  let sourceKind = "text";
  let summarySource = trimmed;

  if (filename.toLowerCase().endsWith(".json")) {
    try {
      const json = JSON.parse(trimmed);
      sourceKind = json.campaignId || json.memoryLayer || json.worldState ? "campaign-json-reference" : "json";
      title = json.title || json.player?.name || filename;
      summarySource = [
        json.storySummary,
        json.memoryLayer?.campaignSummary,
        Array.isArray(json.memoryLayer?.worldMemory) ? json.memoryLayer.worldMemory.join(" ") : "",
        Array.isArray(json.turns) ? json.turns.slice(-5).map((turn) => turn.text).join(" ") : ""
      ].filter(Boolean).join(" ");
    } catch {
      sourceKind = "json-text";
    }
  }

  const content = trimmed.length > MAX_DOSSIER_CHARS ? trimmed.slice(0, MAX_DOSSIER_CHARS) : trimmed;
  return {
    title,
    sourceKind,
    summary: summarizeRawText(summarySource || trimmed || filename),
    content,
    truncated: trimmed.length > MAX_DOSSIER_CHARS
  };
}

function buildDossierTurnText(dossiers, note, options = {}) {
  const list = dossiers.map((item) => `- ${item.filename}：${item.summary}${item.truncated ? "（原文過長，已保留前段於本地記憶層）" : ""}`).join("\n");
  const intro = options.initial ? "開局卷宗已收入新的世界線。" : "新的卷宗已收入目前世界線。";
  return `${intro}\n\n${list}${note ? `\n\n補充說明：${note}` : ""}\n\nAI DM 之後接續主持時，應把這些卷宗視為目前存檔的補充記憶；它們不會套用到其他世界線。`;
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("檔案讀取失敗"));
    reader.readAsText(file);
  });
}

function inferFileType(filename) {
  const lower = filename.toLowerCase();
  if (lower.endsWith(".json")) return "application/json";
  if (lower.endsWith(".md") || lower.endsWith(".markdown")) return "text/markdown";
  return "text/plain";
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function inferStatsFromLegacyText(text) {
  const stats = {};
  Object.keys(statDescriptions).forEach((name) => {
    const explicit = extractExplicitStat(text, name);
    stats[name] = explicit !== null
      ? { value: explicit, source: "舊紀錄明確數值", note: `偵測到「${name}」的既有數值。` }
      : inferMissingStat(text, name);
  });
  return stats;
}

function extractExplicitStat(text, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(`${escaped}\\s*[：:=]\\s*(\\d{1,2})`, "i"),
    new RegExp(`${escaped}\\s+(\\d{1,2})`, "i"),
    new RegExp(`${escaped}[^\\d]{0,8}(\\d{1,2})`, "i")
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return clamp(Number(match[1]), 1, 10);
  }
  return null;
}

function inferMissingStat(text, name) {
  const keywordMap = {
    魔法感知: ["魔力", "感知", "異常", "星象", "詛咒", "預兆", "古物", "魔法痕跡"],
    勇氣: ["勇敢", "保護", "衝進", "面對", "危險", "恐懼", "挺身", "冒險"],
    觀察: ["觀察", "注意", "細節", "線索", "察覺", "發現", "推理", "看見"],
    社交: ["說服", "交涉", "安撫", "談話", "信任", "朋友", "關係", "好感"],
    意志: ["忍耐", "抵抗", "壓力", "夢", "誘惑", "恐懼", "秘密", "堅持"]
  };
  const count = (keywordMap[name] || []).reduce((sum, word) => sum + countOccurrences(text, word), 0);
  const value = clamp(5 + Math.min(3, Math.floor(count / 2)), 3, 9);
  return {
    value,
    source: "劇情推定",
    note: count ? `依 ${count} 個相關線索推定。` : "舊紀錄未見明確線索，先給中性值。"
  };
}

function countOccurrences(text, word) {
  return text.split(word).length - 1;
}

function openStatConfirm(statDraft) {
  els.statConfirmList.innerHTML = Object.entries(statDraft).map(([name, data]) => `
    <label class="stat-confirm-row">
      <span>
        <strong>${escapeHtml(name)}</strong>
        <span>${escapeHtml(data.source)}｜${escapeHtml(data.note)}</span>
      </span>
      <input data-import-stat="${escapeHtml(name)}" type="number" min="1" max="10" value="${escapeHtml(data.value)}">
    </label>
  `).join("");
  els.statConfirmDialog.showModal();
}

function confirmImportedStats() {
  if (!pendingImport) return;
  document.querySelectorAll("[data-import-stat]").forEach((input) => {
    pendingImport.campaign.stats[input.dataset.importStat] = clamp(Number(input.value) || 5, 1, 10);
  });
  pendingImport.campaign.memoryLayer.worldMemory = mergeList(pendingImport.campaign.memoryLayer.worldMemory, [
    "匯入時已先擷取舊紀錄中的明確數值；缺失欄位已由劇情推定並經玩家確認。"
  ]);
  db.saves.push(pendingImport.campaign);
  const id = pendingImport.campaign.campaignId;
  pendingImport = null;
  els.statConfirmDialog.close();
  setActiveCampaign(id);
}

function snapshotStateFor(save) {
  return {
    player: structuredClone(save.player),
    stats: structuredClone(save.stats),
    worldState: structuredClone(save.worldState),
    locations: structuredClone(save.locations),
    inventory: structuredClone(save.inventory),
    npcMemory: structuredClone(save.npcMemory),
    flags: structuredClone(save.flags),
    memoryLayer: structuredClone(save.memoryLayer)
  };
}

function summarizeRawText(text) {
  const compact = text.replace(/\s+/g, " ").trim();
  return compact.length > 900 ? `${compact.slice(0, 900)}...` : compact;
}

function exportJson() {
  download(`${campaign.title}-save.json`, JSON.stringify(campaign, null, 2), "application/json");
}

function exportNovel() {
  const novel = campaign.turns
    .map((turn) => turn.kind === "player" ? `【${campaign.player.name}】\n${turn.text}` : turn.text)
    .join("\n\n");
  download(`${campaign.title}-novel.txt`, novel, "text/plain;charset=utf-8");
}

function exportSummary() {
  download(`${campaign.title}-summary.md`, buildSummary(), "text/markdown;charset=utf-8");
}

function buildSummary() {
  return `# ${campaign.title}

## 角色
${Object.entries(campaign.player).map(([k, v]) => `- ${k}: ${v}`).join("\n")}

## 世界狀態
${Object.entries(campaign.worldState).map(([k, v]) => `- ${k}: ${v}`).join("\n")}

## 數值
${Object.entries(campaign.stats).map(([k, v]) => `- ${k}: ${v}`).join("\n")}

## 地點
${Object.entries(campaign.locations).map(([name, loc]) => `- ${name}: ${loc.unlocked ? "已解鎖" : "未解鎖"} / ${loc.explored ? "已探索" : "未探索"}`).join("\n")}

## AI DM 記憶層
- campaign_summary: ${campaign.memoryLayer?.campaignSummary || campaign.storySummary}
- world_memory:
${(campaign.memoryLayer?.worldMemory || []).map((item) => `  - ${item}`).join("\n")}

## 追加卷宗
${(campaign.memoryLayer?.importedDossiers || []).map((item) => `- ${item.filename}: ${item.summary}${item.truncated ? "（原文過長，已截取保存）" : ""}`).join("\n") || "- 無"}

## 物品
${campaign.inventory.map((item) => `- ${item.name}: ${item.note || ""}`).join("\n")}

## NPC
${Object.entries(campaign.npcMemory).map(([name, npc]) => `- ${name}: ${npc.impression || ""} 信任 ${npc.trust ?? 0}, 好感 ${npc.affection ?? 0}`).join("\n")}

## 事件
${Object.values(campaign.flags).map((flag) => `- [${flag.value ? "x" : " "}] ${flag.label}`).join("\n")}

## 摘要
${campaign.storySummary}
`;
}

function openSettings() {
  document.querySelector("#aiProvider").value = settings.provider || defaultSettings().provider;
  document.querySelector("#apiEndpoint").value = settings.endpoint || getProviderDefaults(settings.provider).endpoint;
  document.querySelector("#apiModel").value = settings.model || getProviderDefaults(settings.provider).model;
  document.querySelector("#apiKey").value = settings.apiKey || "";
  document.querySelector("#dmInstructions").value = settings.dmInstructions || "";
  document.querySelector("#dmKnowledge").value = settings.dmKnowledge || "";
  document.querySelector("#dmStyleExamples").value = settings.dmStyleExamples || "";
  document.querySelector("#desktopMode").checked = Boolean(settings.desktopMode);
  els.settingsDialog.showModal();
}

function getProviderDefaults(provider) {
  return providerDefaults[provider] || providerDefaults["openai-compatible"];
}

function applyProviderDefaultsToForm() {
  const provider = document.querySelector("#aiProvider").value;
  const defaults = getProviderDefaults(provider);
  const endpoint = document.querySelector("#apiEndpoint");
  const model = document.querySelector("#apiModel");
  const knownEndpoints = Object.values(providerDefaults).map((item) => item.endpoint);
  const knownModels = Object.values(providerDefaults).map((item) => item.model);
  if (!endpoint.value.trim() || knownEndpoints.includes(endpoint.value.trim())) {
    endpoint.value = defaults.endpoint;
  }
  if (!model.value.trim() || knownModels.includes(model.value.trim())) {
    model.value = defaults.model;
  }
}

function openCreator() {
  document.querySelector("#charName").value = campaign.player.name;
  document.querySelector("#charAge").value = campaign.player.age;
  document.querySelector("#charBlood").value = campaign.player.bloodStatus;
  document.querySelector("#charGender").value = campaign.player.gender;
  document.querySelector("#charHouse").value = campaign.player.house;
  document.querySelector("#charFamily").value = campaign.player.family;
  document.querySelector("#charAppearance").value = campaign.player.appearance;
  bindCreatorPreview();
  updateCreatorPreview();
  els.creatorDialog.showModal();
}

function applyCharacterForm() {
  const currentVisual = campaign.player.visualIdentity || structuredClone(defaultVisualIdentity);
  const nextAppearance = document.querySelector("#charAppearance").value.trim() || campaign.player.appearance;
  campaign.player = {
    ...campaign.player,
    name: document.querySelector("#charName").value.trim() || campaign.player.name,
    age: Number(document.querySelector("#charAge").value) || campaign.player.age,
    bloodStatus: document.querySelector("#charBlood").value.trim() || campaign.player.bloodStatus,
    gender: document.querySelector("#charGender").value.trim() || campaign.player.gender,
    house: document.querySelector("#charHouse").value.trim() || campaign.player.house,
    family: document.querySelector("#charFamily").value.trim() || campaign.player.family,
    appearance: nextAppearance,
    visualIdentity: {
      ...currentVisual,
      fixedDescription: currentVisual.locked ? currentVisual.fixedDescription : nextAppearance
    }
  };
  campaign.turns.push({
    id: crypto.randomUUID(),
    kind: "dm",
    time: new Date().toISOString(),
    meta: "角色更新",
    text: `${campaign.player.name}的角色檔案被重新整理。檔案館沒有改寫過去，只是把那些原本模糊的邊緣補上墨色。`,
    options: campaign.options,
    snapshot: snapshotState()
  });
  els.creatorDialog.close();
  render();
}

function openVisualPrompt(type) {
  const visual = campaign.player.visualIdentity || defaultVisualIdentity;
  const prompt = type === "scene" ? buildScenePrompt() : buildPortraitPrompt();
  const mode = visual.activePortraitMode || "fullBody";
  campaign.player.visualIdentity = {
    ...visual,
    [type === "scene" ? "scenePrompt" : "portraitPrompt"]: prompt,
    ...(type === "portrait" ? { [mode === "bust" ? "bustPrompt" : "fullBodyPrompt"]: prompt } : {})
  };
  saveActiveCampaign();
  els.promptTitle.textContent = type === "scene" ? "場景背景生成提示" : "固定角色立繪生成提示";
  els.promptText.value = prompt;
  els.promptDialog.showModal();
}

function buildScenePrompt() {
  const w = campaign.worldState;
  const currentLocation = campaign.locations?.[w.location];
  if (currentLocation?.scenePrompt) return currentLocation.scenePrompt;
  return `Use case: illustration-story
Asset type: layered scene background for a narrative simulator
Primary request: ${w.location} at ${w.timeOfDay}, ${w.weather}, quiet magical school atmosphere
Composition/framing: wide 16:9 background, no foreground character, clear empty center area for separate character portrait layer
Lighting/mood: ${w.currentMood || "quiet, atmospheric, long-form novel mood"}
Constraints: background layer only; no people in close-up; no readable text; no logos; no watermark; avoid recognizable franchise emblems`;
}

function buildPortraitPrompt() {
  const p = campaign.player;
  const visual = p.visualIdentity || defaultVisualIdentity;
  const fixedDescription = visual.fixedDescription || p.appearance;
  const mode = visual.activePortraitMode || "fullBody";
  const framing = mode === "bust"
    ? "half-body portrait from head to waist, centered, expressive face and upper body, transparent-friendly with no background scene"
    : "full-body standing pose, centered, visible shoes and silhouette, generous padding, transparent-friendly with no background scene";
  return `Use case: illustration-story
Asset type: consistent ${mode === "bust" ? "half-body" : "full-body"} character portrait layer
Primary request: ${mode === "bust" ? "half-body" : "full-body"} character portrait of ${p.name}
Identity lock: ${visual.identitySeed}
Fixed appearance: ${fixedDescription}
Character metadata: ${p.bloodStatus} | ${p.gender} | ${p.house}
Style/medium: painterly character concept art, transparent-friendly portrait pose
Composition/framing: ${framing}
Constraints: keep the same face, hair, body type, age impression, and distinguishing features every time; do not change identity between generations; no readable text; no logos; no watermark`;
}

function setPortraitMode(mode) {
  campaign.player.visualIdentity = {
    ...(campaign.player.visualIdentity || structuredClone(defaultVisualIdentity)),
    activePortraitMode: mode
  };
  saveActiveCampaign();
  renderVisualLayers();
}

function toggleVisualLock() {
  const visual = campaign.player.visualIdentity || structuredClone(defaultVisualIdentity);
  visual.locked = !visual.locked;
  visual.fixedDescription = visual.fixedDescription || campaign.player.appearance;
  campaign.player.visualIdentity = visual;
  saveActiveCampaign();
  renderSidebar();
}

function importPortraitImage(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const visual = campaign.player.visualIdentity || structuredClone(defaultVisualIdentity);
    const mode = visual.activePortraitMode || "fullBody";
    campaign.player.visualIdentity = {
      ...visual,
      portraitImage: reader.result,
      [mode === "bust" ? "bustImage" : "fullBodyImage"]: reader.result
    };
    saveActiveCampaign();
    renderSidebar();
  });
  reader.readAsDataURL(file);
  event.target.value = "";
}

function openStatHelp() {
  els.statHelpContent.innerHTML = Object.entries(statDescriptions)
    .map(([name, text]) => `
      <section class="memory-detail-section">
        <h3>${escapeHtml(name)}</h3>
        <p>${escapeHtml(text)}</p>
      </section>
    `)
    .join("");
  els.statHelpDialog.showModal();
}

function openRollDialog() {
  els.rollStat.innerHTML = Object.keys(campaign.stats)
    .map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}（${escapeHtml(campaign.stats[name])}）</option>`)
    .join("");
  els.rollDc.value = 12;
  els.rollResult.textContent = "等待擲骰。";
  els.rollDialog.showModal();
}

function doRoll() {
  const stat = els.rollStat.value;
  const dc = Number(els.rollDc.value) || 12;
  const statValue = Number(campaign.stats[stat] || 0);
  const d20 = Math.floor(Math.random() * 20) + 1;
  const total = d20 + statValue;
  const success = total >= dc;
  const resultText = `${stat} 檢定：D20 ${d20} + 數值 ${statValue} = ${total}，DC ${dc}，${success ? "成功" : "失敗"}。`;
  els.rollResult.textContent = resultText;
  campaign.flags.last_roll = {
    label: resultText,
    value: success,
    permanent: false
  };
  campaign.memoryLayer.worldMemory = mergeList(campaign.memoryLayer.worldMemory, [`最近一次擲骰：${resultText}`]);
  saveActiveCampaign();
  renderSidebar();
}

async function assistCharacter() {
  const family = document.querySelector("#charFamily");
  const appearance = document.querySelector("#charAppearance");
  family.value = family.value || "家族背景尚未完全公開，只留下幾封舊信、一段模糊的親族關係，以及一個能被未來劇情慢慢揭開的秘密。";
  appearance.value = appearance.value || "身形偏瘦，眼神安靜，說話前常先觀察四周。外觀細節可在後續世界線裡由 AI DM 與玩家共同補完。";
  document.querySelector("#charBlood").value ||= "未設定";
  document.querySelector("#charHouse").value ||= "未分院";
  updateCreatorPreview();
}

function bindCreatorPreview() {
  if (els.creatorDialog.dataset.previewBound) return;
  ["#charName", "#charBlood", "#charGender", "#charHouse", "#charAppearance"].forEach((selector) => {
    document.querySelector(selector).addEventListener("input", updateCreatorPreview);
  });
  els.creatorDialog.dataset.previewBound = "true";
}

function updateCreatorPreview() {
  const name = document.querySelector("#charName").value.trim() || "未命名角色";
  const blood = document.querySelector("#charBlood").value.trim() || "未設定血統";
  const gender = document.querySelector("#charGender").value.trim() || "未設定";
  const house = document.querySelector("#charHouse").value.trim() || "未分院";
  const appearance = document.querySelector("#charAppearance").value.trim() || "尚未建立外觀描述。";
  document.querySelector("#previewName").textContent = name;
  document.querySelector("#previewMeta").textContent = `${blood}｜${gender}｜${house}`;
  document.querySelector("#previewAppearance").textContent = appearance;
}

function openWorldline() {
  document.querySelector("#worldlineText").textContent = JSON.stringify({
    storySummary: campaign.storySummary,
    memoryLayer: campaign.memoryLayer,
    locations: campaign.locations,
    latestSnapshots: campaign.turns.slice(-5).map((turn) => ({
      time: turn.time,
      kind: turn.kind,
      text: turn.text,
      snapshot: turn.snapshot
    }))
  }, null, 2);
  els.worldlineDialog.showModal();
}

function openMemory(index) {
  const memory = campaign.pensieve[index];
  if (!memory) return;
  els.memoryTitle.textContent = memory.title || "回憶";
  els.memoryDetail.innerHTML = `
    <section class="memory-detail-section">
      <h3>劇情摘要</h3>
      <p>${escapeHtml(memory.summary || memory.note || "尚未整理摘要。")}</p>
    </section>
    <section class="memory-detail-section">
      <h3>記憶照片提示</h3>
      <p>${escapeHtml(memory.prompt || "尚未建立圖像提示。")}</p>
    </section>
    <section class="memory-detail-section">
      <h3>當時狀態</h3>
      <p>時間：${escapeHtml(memory.time ? formatDate(memory.time) : "未記錄")}</p>
      <p>地點：${escapeHtml(memory.location || "未記錄")}</p>
    </section>
    <section class="memory-detail-section">
      <h3>狀態快照</h3>
      <pre>${escapeHtml(JSON.stringify(memory.snapshot || {}, null, 2))}</pre>
    </section>
    <section class="memory-detail-section">
      <h3>分支世界線</h3>
      <p>從這段回憶建立新存檔，原本的主世界線不會被覆蓋。</p>
      <button id="branchFromMemoryBtn" class="wide-btn" type="button">從此回憶另開分支</button>
    </section>
  `;
  document.querySelector("#branchFromMemoryBtn").addEventListener("click", () => createBranchFromMemory(index));
  els.memoryDialog.showModal();
}

function createBranchFromMemory(index) {
  const memory = campaign.pensieve[index];
  if (!memory) return;
  const now = new Date().toISOString();
  const sourceTitle = campaign.title;
  const branch = normalizeCampaign(structuredClone(campaign));
  branch.campaignId = crypto.randomUUID();
  branch.title = `${campaign.player.name}｜分支：${memory.title || "未命名回憶"}`;
  branch.createdAt = now;
  branch.updatedAt = now;
  branch.startedAt = now;
  branch.playSeconds = 0;
  branch.branchOf = {
    campaignId: campaign.campaignId,
    title: sourceTitle,
    memoryTitle: memory.title || "未命名回憶",
    createdAt: now
  };

  if (memory.snapshot && Object.keys(memory.snapshot).length) {
    branch.player = structuredClone(memory.snapshot.player || branch.player);
    branch.stats = structuredClone(memory.snapshot.stats || branch.stats);
    branch.worldState = structuredClone(memory.snapshot.worldState || branch.worldState);
    branch.locations = mergeLocations(memory.snapshot.locations || branch.locations);
    branch.inventory = structuredClone(memory.snapshot.inventory || branch.inventory);
    branch.npcMemory = structuredClone(memory.snapshot.npcMemory || branch.npcMemory);
    branch.flags = structuredClone(memory.snapshot.flags || branch.flags);
    branch.memoryLayer = normalizeMemoryLayer(memory.snapshot.memoryLayer || branch.memoryLayer, branch.storySummary);
  }

  branch.memoryLayer.worldMemory = mergeList(branch.memoryLayer.worldMemory, [
    `此世界線從回憶「${memory.title || "未命名回憶"}」另開分支，來源存檔為「${sourceTitle}」。`
  ]);
  branch.storySummary = `此為從「${memory.title || "未命名回憶"}」另開的分支世界線。${branch.storySummary}`;
  branch.memoryLayer.campaignSummary = branch.storySummary;
  branch.turns.push({
    id: crypto.randomUUID(),
    kind: "dm",
    time: now,
    meta: `分支｜${branch.worldState.location}`,
    text: `檔案館替「${memory.title || "未命名回憶"}」開出一條新的分支。原本的世界線仍安靜保存；這一份新存檔將從當時的狀態繼續，允許另一種選擇慢慢長出自己的後果。`,
    options: branch.options,
    snapshot: snapshotStateFor(branch)
  });

  db.saves.push(branch);
  els.memoryDialog.close();
  setActiveCampaign(branch.campaignId);
}

function showHome() {
  els.homeView.classList.remove("hidden");
  els.gameView.classList.add("hidden");
  els.choiceDock.classList.add("hidden");
  renderHome();
}

function showGame() {
  els.homeView.classList.add("hidden");
  els.gameView.classList.remove("hidden");
  els.choiceDock.classList.remove("hidden");
  render();
}

function switchTab(name) {
  document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === name));
  document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.remove("active"));
  document.querySelector(`#${name}Tab`).classList.add("active");
}

function setBusy(isBusy) {
  els.sendBtn.disabled = isBusy;
  els.sendBtn.textContent = isBusy ? "生成中" : "送出";
}

function download(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function formatDate(date) {
  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(date));
}

function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return hours ? `${hours} 小時 ${minutes} 分` : `${Math.max(1, minutes)} 分`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function mergeList(a = [], b = []) {
  return [...new Set([...(Array.isArray(a) ? a : []), ...(Array.isArray(b) ? b : [])])];
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function flashButton(selector, label) {
  const button = document.querySelector(selector);
  const old = button.textContent;
  button.textContent = label;
  setTimeout(() => {
    button.textContent = old;
  }, 900);
}

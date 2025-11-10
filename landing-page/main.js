import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBRiQilSMsCtkRfU8eE_-ZoGPBb3mAyHZc",
  authDomain: "big-bucks-project.firebaseapp.com",
  projectId: "big-bucks-project",
  storageBucket: "big-bucks-project.firebasestorage.app",
  messagingSenderId: "936438266969",
  appId: "1:936438266969:web:28d5049a770947ed230548",
  measurementId: "G-CVC6B08RW5"
};

const translations = {
  en: {
    "nav.name": "Big Bucks Project",
    "hero.eyebrow": "Official IB® Content Partner",
    "hero.heading":
      "Big Bucks Project delivers IB HL & SL past papers with guided tagging, insights, and dedicated support.",
    "hero.body":
      "We’re bringing verified IB past papers across Math, Sciences, Economics, Computer Science, ESS, and more—powered by smart ingestion workflows, curriculum-aligned tagging, and analytics designed for ambitious students and teachers.",
    "hero.cta.waitlist": "Join the waitlist",
    "hero.cta.contact": "Talk to us",
    "hero.legal":
      "<strong>New:</strong> Licensed by the International Baccalaureate Organization to publish official past paper questions.",
    "hero.card.label": "Sample Question Preview",
    "hero.card.title": "Physics HL Paper 1",
    "hero.card.meta": "May 2024 TZ1 — Question 8",
    "hero.card.question":
      "An electric motor has 1.8 kJ of energy transferred to it in 0.50 minutes. The efficiency of the motor is 40%. What is the useful power output?<br />A. 1.5 W &nbsp; B. 24 W &nbsp; C. 150 W &nbsp; D. 360 W",
    "hero.card.tagsLabel": "Tags:",
    "hero.card.tagEnergy": "Energy",
    "hero.card.tagPower": "Power",
    "hero.answer.reveal": "Reveal markscheme + AI explanation",
    "hero.answer.hide": "Hide markscheme + AI explanation",
    "hero.answer.content":
      "<p><strong>Answer:</strong> <span class=\"hero__answer-highlight\">B. 24 W</span></p><p>AI reasoning: <code>1.8&nbsp;kJ&nbsp;/&nbsp;0.50&nbsp;min = 1800&nbsp;J&nbsp;/&nbsp;30&nbsp;s = 60&nbsp;W</code>. With 40% efficiency, <code>0.40&nbsp;×&nbsp;60&nbsp;W = 24&nbsp;W</code>. The only option matching 24 W is B.</p>",
    "highlights.exam.title": "Exam-grade materials",
    "highlights.exam.body":
      "Every question is sourced from official IB exams with our new publication license, so you can rely on authentic rigor.",
    "highlights.bank.title": "Curriculum-aligned bank",
    "highlights.bank.body":
      "Past paper questions sorted by IB subject, paper, and syllabus topics so teachers and students can drill exactly what they need.",
    "highlights.beta.title": "Curated beta access",
    "highlights.beta.body":
      "Invite-only testers get early access, feature previews, and direct chat with the founding team.",
    "subjects.eyebrow": "Subjects launching first",
    "subjects.heading": "Built for high-performing IB HL & SL cohorts",
    "subjects.body":
      "Each subject includes structured notes, past paper walkthroughs, and tag-aware recommendations. More HL/SL subjects are on the roadmap.",
    "subjects.physics.title": "Physics SL/HL",
    "subjects.physics.body":
      "Mechanics, waves, fields, energy, and option topics with diagram-ready assets and calculator flags.",
    "subjects.physics.item1": "Paper 1–3 coverage",
    "subjects.physics.item2": "Topic + skill tagging",
    "subjects.physics.item3": "Worked solution pipeline",
    "subjects.chem.title": "Chemistry SL/HL",
    "subjects.chem.body":
      "Stoichiometry, energetics, kinetics, organic chemistry, and data booklet references tied to every question.",
    "subjects.chem.item1": "Structured question metadata",
    "subjects.chem.item2": "Diagram and data assets",
    "subjects.chem.item3": "Future lab practice sets",
    "subjects.math.title": "Math AA SL/HL",
    "subjects.math.body":
      "Analysis & Approaches HL past papers with sub-topic cues and calculator policy indicators for every problem.",
    "subjects.math.item1": "Calculator rule tagging",
    "subjects.math.item2": "Difficulty & time estimates",
    "subjects.math.item3": "Future adaptive problem sets",
    "subjects.cs.title": "Computer Science SL/HL",
    "subjects.cs.body":
      "Pseudocode, data structures, databases, and system design mapped to the IB syllabus with topic-aware tagging.",
    "subjects.cs.item1": "Paper 1 & Paper 2 coverage",
    "subjects.cs.item2": "Case study alignment",
    "subjects.cs.item3": "Algorithm-focused annotations",
    "timeline.eyebrow": "How it works",
    "timeline.heading": "Invite-only beta, transparent roadmap",
    "timeline.step1.title": "Join the waitlist",
    "timeline.step1.body":
      "Tell us which subjects you care about. We prioritize educators and IB cohorts who bring feedback.",
    "timeline.step2.title": "Secure access",
    "timeline.step2.body":
      "Receive an invite code linked to your email. Early users get direct support from the founding team.",
    "timeline.step3.title": "Shape the platform",
    "timeline.step3.body":
      "Share feature requests via the admin feedback loop; our ingestion tooling enables fast iteration and publishing.",
    "waitlist.eyebrow": "Get early access",
    "waitlist.heading": "Join the invite-only waitlist",
    "waitlist.body":
      "We onboard IB teachers, coordinators, and high-performing cohorts in small waves so we can give personalized support.",
    "waitlist.nameLabel": "Full name",
    "waitlist.namePlaceholder": "Alex Chen",
    "waitlist.emailLabel": "Email",
    "waitlist.emailPlaceholder": "you@email.com",
    "waitlist.subjectLabel": "Preferred subject",
    "waitlist.subjectDefault": "Select one",
    "waitlist.subject.physicsHl": "Physics HL",
    "waitlist.subject.physicsSl": "Physics SL",
    "waitlist.subject.chemHl": "Chemistry HL",
    "waitlist.subject.chemSl": "Chemistry SL",
    "waitlist.subject.mathHl": "Math AA HL",
    "waitlist.subject.mathSl": "Math AA SL",
    "waitlist.subject.econHl": "Economics HL",
    "waitlist.subject.econSl": "Economics SL",
    "waitlist.subject.bioHl": "Biology HL",
    "waitlist.subject.bioSl": "Biology SL",
    "waitlist.subject.csHl": "Computer Science HL",
    "waitlist.subject.csSl": "Computer Science SL",
    "waitlist.subject.essSl": "Environmental Systems & Societies SL",
    "waitlist.subject.other": "Other (tell us below)",
    "waitlist.schoolLabel": "Are you currently attending an IB school?",
    "waitlist.school.yes": "Yes",
    "waitlist.school.no": "No",
    "waitlist.school.prospective": "Planning to enroll",
    "waitlist.noteLabel": "Tell us about yourself (optional)",
    "waitlist.notePlaceholder":
      "e.g., IB coordinator supporting May 2025 cohort, focusing on Physics SL",
    "waitlist.submit": "Request invite",
    "contact.eyebrow": "Need something specific?",
    "contact.heading": "Talk directly to the founding team",
    "contact.body":
      "Whether you are an IB coordinator, teacher, or student, we would love to hear how we can support your upcoming exam cycle.",
    "contact.nameLabel": "Name",
    "contact.namePlaceholder": "Your name",
    "contact.emailLabel": "Email",
    "contact.emailPlaceholder": "you@email.com",
    "contact.messageLabel": "Message",
    "contact.messagePlaceholder": "Share goals, timelines, or integration needs...",
    "contact.submit": "Send message",
    "team.eyebrow": "Who’s behind Big Bucks Project",
    "team.heading": "Three admins, one mission-driven build",
    "team.member1.role": "Product & curriculum lead",
    "team.member1.body":
      "Designs the learning journey, curates subject releases, and drives teacher partnerships.",
    "team.member2.role": "Engineering & ingestion lead",
    "team.member2.body":
      "Builds the OCR → LLM ingestion pipeline, manages Firebase/Stripe, and ensures data integrity.",
    "team.member3.role": "Operations & community",
    "team.member3.body":
      "Handles onboarding, feedback loops, and keeps every beta tester heard along the way.",
    "footer.copy": "Copyright © <span id=\"year\"></span>. All rights reserved.",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
    "status.sending": "Sending...",
    "status.success": "Message received! We’ll be in touch shortly.",
    "status.error": "Something went wrong. Please try again or email us directly.",
  },
  zh: {
    "nav.name": "Big Bucks Project",
    "hero.eyebrow": "IB® 官方內容合作夥伴",
    "hero.heading": "Big Bucks Project 提供 IB HL 與 SL 歷屆試題，搭配引導式標籤、洞察與專屬支援。",
    "hero.body":
      "我們整合經官方授權的 IB 數學、自然科學、經濟、資工、ESS 等歷屆試題，串接智慧匯入流程、課綱對應標籤與分析工具，協助進取的學生與教師。",
    "hero.cta.waitlist": "加入等候名單",
    "hero.cta.contact": "聯絡我們",
    "hero.legal":
      "<strong>最新消息：</strong>已獲國際文憑組織授權，可刊登官方歷屆試題。",
    "hero.card.label": "示例試題預覽",
    "hero.card.title": "物理 HL 試卷一",
    "hero.card.meta": "2024 年 5 月 TZ1 — 第 8 題",
    "hero.card.question":
      "一具電動馬達在 0.50 分鐘內獲得 1.8 kJ 的輸入能量，其效率為 40%。求此馬達的有效輸出功率。<br />A. 1.5 W &nbsp; B. 24 W &nbsp; C. 150 W &nbsp; D. 360 W",
    "hero.card.tagsLabel": "標籤：",
    "hero.card.tagEnergy": "能量",
    "hero.card.tagPower": "功率",
    "hero.answer.reveal": "顯示評分準則 + AI 解說",
    "hero.answer.hide": "收合評分準則 + AI 解說",
    "hero.answer.content":
      "<p><strong>答案：</strong><span class=\"hero__answer-highlight\">B. 24 W</span></p><p>AI 解說：<code>1.8&nbsp;kJ&nbsp;/&nbsp;0.50&nbsp;min = 1800&nbsp;J&nbsp;/&nbsp;30&nbsp;s = 60&nbsp;W</code>。效率 40% 時，<code>0.40&nbsp;×&nbsp;60&nbsp;W = 24&nbsp;W</code>，故選項 B 正確。</p>",
    "highlights.exam.title": "考試等級的題庫",
    "highlights.exam.body":
      "所有題目皆來自官方 IB 試卷並取得授權，確保內容難度與品質。",
    "highlights.bank.title": "課綱對應題庫",
    "highlights.bank.body":
      "依科目、試卷、課綱主題分類，學生與教師可精準練習所需內容。",
    "highlights.beta.title": "封測優先權",
    "highlights.beta.body":
      "僅邀請制測試者可率先體驗、搶先試用功能，並直接與團隊交流。",
    "subjects.eyebrow": "率先上線的科目",
    "subjects.heading": "專為 IB HL / SL 高階學習者打造",
    "subjects.body":
      "每個科目都包含結構化講義、題解與標籤推薦；更多 HL/SL 科目陸續推出。",
    "subjects.physics.title": "物理 SL/HL",
    "subjects.physics.body": "力學、波動、場與選修主題皆附圖示與計算器提示。",
    "subjects.physics.item1": "試卷一至三完整覆蓋",
    "subjects.physics.item2": "主題與技能雙標籤",
    "subjects.physics.item3": "逐步解題管線",
    "subjects.chem.title": "化學 SL/HL",
    "subjects.chem.body": "化學計量、熱化學、動力學、有機化與資料手冊完全連結。",
    "subjects.chem.item1": "題目結構化中繼資料",
    "subjects.chem.item2": "反應圖與數據素材",
    "subjects.chem.item3": "預約未來實驗題套件",
    "subjects.math.title": "數學 AA SL/HL",
    "subjects.math.body": "提供子題提示與計算器政策標註，建立完整解題脈絡。",
    "subjects.math.item1": "計算器使用規則標記",
    "subjects.math.item2": "難度與時間估算",
    "subjects.math.item3": "即將推出的自適應題集",
    "subjects.cs.title": "電腦科學 SL/HL",
    "subjects.cs.body": "偽代碼、資料結構、資料庫與系統設計皆依課綱建索引。",
    "subjects.cs.item1": "試卷一、二完整拆解",
    "subjects.cs.item2": "年度個案研究對應",
    "subjects.cs.item3": "演算法重點註記",
    "timeline.eyebrow": "運作流程",
    "timeline.heading": "邀請制封測與透明路線圖",
    "timeline.step1.title": "加入等候名單",
    "timeline.step1.body": "告訴我們關注的科目；我們優先邀請能提供回饋的教師與學生。",
    "timeline.step2.title": "取得邀請",
    "timeline.step2.body": "收到綁定信箱的邀請碼後即可登入，並獲得團隊即時支援。",
    "timeline.step3.title": "共同打造平台",
    "timeline.step3.body": "透過回饋迴路提交需求，我們的匯入系統可快速更新題庫。",
    "waitlist.eyebrow": "搶先體驗",
    "waitlist.heading": "加入邀請制等候名單",
    "waitlist.body":
      "我們分批邀請 IB 教師、協調員與高表現班級，確保能提供客製支援。",
    "waitlist.nameLabel": "姓名",
    "waitlist.namePlaceholder": "陳同學或指導老師姓名",
    "waitlist.emailLabel": "電子郵件",
    "waitlist.emailPlaceholder": "you@email.com",
    "waitlist.subjectLabel": "首選科目",
    "waitlist.subjectDefault": "請選擇",
    "waitlist.subject.physicsHl": "物理 HL",
    "waitlist.subject.physicsSl": "物理 SL",
    "waitlist.subject.chemHl": "化學 HL",
    "waitlist.subject.chemSl": "化學 SL",
    "waitlist.subject.mathHl": "數學 AA HL",
    "waitlist.subject.mathSl": "數學 AA SL",
    "waitlist.subject.econHl": "經濟 HL",
    "waitlist.subject.econSl": "經濟 SL",
    "waitlist.subject.bioHl": "生物 HL",
    "waitlist.subject.bioSl": "生物 SL",
    "waitlist.subject.csHl": "電腦科學 HL",
    "waitlist.subject.csSl": "電腦科學 SL",
    "waitlist.subject.essSl": "環境系統與社會 SL",
    "waitlist.subject.other": "其他（請在下方補充）",
    "waitlist.schoolLabel": "目前是否就讀 IB 學校？",
    "waitlist.school.yes": "是",
    "waitlist.school.no": "否",
    "waitlist.school.prospective": "即將就讀",
    "waitlist.noteLabel": "自我介紹／班級概況（選填）",
    "waitlist.notePlaceholder": "例如：2025 年 5 月考季的物理 SL 班，共 20 名學生",
    "waitlist.submit": "送出邀請申請",
    "contact.eyebrow": "有特別需求？",
    "contact.heading": "直接與創辦團隊對話",
    "contact.body":
      "無論是 IB 協調員、授課教師或學生，都歡迎分享需求，我們會協助規劃下一步。",
    "contact.nameLabel": "姓名",
    "contact.namePlaceholder": "您的稱呼",
    "contact.emailLabel": "電子郵件",
    "contact.emailPlaceholder": "you@email.com",
    "contact.messageLabel": "訊息內容",
    "contact.messagePlaceholder": "分享目標、時程、希望整合的服務……",
    "contact.submit": "傳送訊息",
    "team.eyebrow": "幕後團隊",
    "team.heading": "三位管理者，同一個使命",
    "team.member1.role": "產品與課程策展",
    "team.member1.body": "規劃學習旅程、安排科目上線並拓展教師合作。",
    "team.member2.role": "工程與匯入系統",
    "team.member2.body": "建置 OCR → LLM 匯入流程，負責 Firebase / Stripe 與資料安全。",
    "team.member3.role": "營運與社群",
    "team.member3.body": "負責使用者上線、回饋蒐集，確保封測夥伴的聲音被聽見。",
    "footer.copy": "Copyright © <span id=\"year\"></span>. All rights reserved.",
    "footer.privacy": "隱私權政策",
    "footer.terms": "使用條款",
    "status.sending": "傳送中…",
    "status.success": "訊息已收到！我們會盡快與您聯絡。",
    "status.error": "發生錯誤，請重試或直接寫信給我們。",
  },
};

let firestore = null;
let currentLanguage = "en";

try {
  const app = initializeApp(firebaseConfig);
  firestore = getFirestore(app);
} catch (error) {
  console.error("Firebase init failed. Check config values.", error);
}

initThemeToggle();
initLanguageToggle();

const saveFormData = async (collectionName, payload) => {
  if (!firestore) {
    throw new Error("Firestore not initialized");
  }

  await addDoc(collection(firestore, collectionName), {
    ...payload,
    createdAt: serverTimestamp(),
    source: "landing-page",
  });
};

const attachFormHandler = (formId, statusId, collectionName) => {
  const form = document.getElementById(formId);
  const status = document.getElementById(statusId);

  if (!form || !status) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    showStatus(status, t("status.sending"), "info");

    try {
      await saveFormData(collectionName, payload);
      showStatus(status, t("status.success"), "success");
      form.reset();
    } catch (error) {
      console.error(`Failed to submit ${collectionName}`, error);
      showStatus(status, t("status.error"), "error");
    }
  });
};

attachFormHandler("waitlist-form", "waitlist-status", "waitlist");
attachFormHandler("contact-form", "contact-status", "contactMessages");

const initAnswerToggles = () => {
  const buttons = document.querySelectorAll("[data-answer-target]");
  buttons.forEach((button) => {
    const targetId = button.getAttribute("data-answer-target");
    const target = document.getElementById(targetId);
    if (!target) return;

    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeAnswer(button, target);
      } else {
        openAnswer(button, target);
      }
    });
  });
};

initAnswerToggles();

const STATUS_TIMEOUT = 3500;

function initLanguageToggle() {
  const STORAGE_KEY = "bbp-language";
  const toggle = document.getElementById("lang-toggle");
  const stored = localStorage.getItem(STORAGE_KEY);
  const initial = stored || (navigator.language?.toLowerCase().includes("zh") ? "zh" : "en");

  setLanguage(initial);

  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = currentLanguage === "en" ? "zh" : "en";
      setLanguage(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }
}

function setLanguage(lang) {
  currentLanguage = translations[lang] ? lang : "en";
  document.documentElement.lang = currentLanguage === "zh" ? "zh-Hant" : "en";
  document.documentElement.dataset.lang = currentLanguage;
  document.body.classList.add("language-switching");

  const toggle = document.getElementById("lang-toggle");
  if (toggle) {
    toggle.setAttribute("aria-pressed", currentLanguage === "zh");
    toggle.dataset.lang = currentLanguage;
    toggle
      .querySelectorAll(".lang-toggle__text")
      .forEach((el) => (el.dataset.active = el.dataset.lang === currentLanguage ? "true" : "false"));
  }

  updateLanguageTexts();
  updateAnswerToggleText();

  window.clearTimeout(setLanguage.fadeTimeout);
  setLanguage.fadeTimeout = window.setTimeout(() => {
    document.body.classList.remove("language-switching");
  }, 250);
}
setLanguage.fadeTimeout = null;

function updateLanguageTexts() {
  const textNodes = document.querySelectorAll("[data-i18n]");
  const htmlNodes = document.querySelectorAll("[data-i18n-html]");
  const placeholderNodes = document.querySelectorAll("[data-i18n-placeholder]");

  const animateNodes = [...textNodes, ...htmlNodes];
  animateNodes.forEach((el) => el.classList.add("language-transition", "language-transition--enter"));

  requestAnimationFrame(() => {
    textNodes.forEach((el) => {
      const key = el.dataset.i18n;
      const value = t(key);
      if (value !== undefined) el.textContent = value;
    });

    htmlNodes.forEach((el) => {
      const key = el.dataset.i18nHtml;
      const value = t(key);
      if (value !== undefined) el.innerHTML = value;
    });

    placeholderNodes.forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      const value = t(key);
      if (value !== undefined && el.placeholder !== undefined) {
        el.placeholder = value;
      }
    });

    requestAnimationFrame(() => {
      animateNodes.forEach((el) => el.classList.remove("language-transition--enter"));
    });
  });

  updateYearStamp();
}

function t(key) {
  return translations[currentLanguage]?.[key] ?? translations.en[key] ?? key;
}

function initThemeToggle() {
  const STORAGE_KEY = "bbp-theme";
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  const stored = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = stored || (prefersDark ? "dark" : "light");
  applyTheme(initialTheme, toggle);

  toggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark"
      ? "light"
      : "dark";
    applyTheme(nextTheme, toggle);
    localStorage.setItem(STORAGE_KEY, nextTheme);
  });

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handlePreferenceChange = (event) => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const theme = event.matches ? "dark" : "light";
    applyTheme(theme, toggle);
  };

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", handlePreferenceChange);
  } else if (mediaQuery.addListener) {
    mediaQuery.addListener(handlePreferenceChange);
  }
}

function applyTheme(theme, toggleButton) {
  document.documentElement.dataset.theme = theme;
  if (toggleButton) {
    toggleButton.dataset.theme = theme;
    toggleButton.setAttribute("aria-pressed", theme === "dark");
  }
}

function openAnswer(button, panel) {
  panel.hidden = false;
  panel.classList.add("hero__answer--open");
  button.setAttribute("aria-expanded", "true");
  button.textContent = t("hero.answer.hide");

  const fullHeight = panel.scrollHeight;
  panel.style.maxHeight = `${fullHeight}px`;

  const onTransitionEnd = (event) => {
    if (event.target !== panel) return;
    panel.style.maxHeight = "none";
    panel.removeEventListener("transitionend", onTransitionEnd);
  };

  panel.addEventListener("transitionend", onTransitionEnd);
}

function closeAnswer(button, panel) {
  button.setAttribute("aria-expanded", "false");
  button.textContent = t("hero.answer.reveal");

  // if currently set to 'none', capture height first
  if (panel.style.maxHeight === "none" || panel.style.maxHeight === "") {
    panel.style.maxHeight = `${panel.scrollHeight}px`;
  }

  // allow browser to apply the height before shrinking
  requestAnimationFrame(() => {
    panel.classList.remove("hero__answer--open");
    panel.style.maxHeight = "0px";
  });

  const onTransitionEnd = (event) => {
    if (event.target !== panel) return;
    panel.hidden = true;
    panel.style.maxHeight = "";
    panel.removeEventListener("transitionend", onTransitionEnd);
  };

  panel.addEventListener("transitionend", onTransitionEnd);
}

function updateAnswerToggleText() {
  const button = document.querySelector("[data-answer-target]");
  if (!button) return;
  const isOpen = button.getAttribute("aria-expanded") === "true";
  button.textContent = isOpen ? t("hero.answer.hide") : t("hero.answer.reveal");
}

function updateYearStamp() {
  const yearNode = document.getElementById("year");
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }
}

function showStatus(element, message, type) {
  const types = ["success", "error", "info"];
  types.forEach((t) => element.classList.remove(`form-status--${t}`));
  element.classList.remove("form-status--show");

  // force reflow to restart animation
  void element.offsetWidth;

  element.textContent = message;
  element.classList.add("form-status--show");
  element.classList.add(`form-status--${type || "info"}`);

  if (element.dataset.timeoutId) {
    clearTimeout(Number(element.dataset.timeoutId));
  }

  const timeoutId = window.setTimeout(() => {
    element.classList.remove("form-status--show");
    element.classList.remove(`form-status--${type || "info"}`);
    element.textContent = "";
    delete element.dataset.timeoutId;
  }, STATUS_TIMEOUT);

  element.dataset.timeoutId = timeoutId;
}

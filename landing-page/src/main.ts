import { initializeApp, FirebaseApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  Firestore,
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRiQilSMsCtkRfU8eE_-ZoGPBb3mAyHZc",
  authDomain: "big-bucks-project.firebaseapp.com",
  projectId: "big-bucks-project",
  storageBucket: "big-bucks-project.firebasestorage.app",
  messagingSenderId: "936438266969",
  appId: "1:936438266969:web:28d5049a770947ed230548",
  measurementId: "G-CVC6B08RW5",
};

// Initialize Firebase
let app: FirebaseApp | null = null;
let firestore: Firestore | null = null;

try {
  app = initializeApp(firebaseConfig);
  firestore = getFirestore(app);
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

// Types
interface FormData {
  [key: string]: string;
}

type StatusType = "success" | "error" | "info";
type Language = "en" | "zh";

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    siteName: "Big Bucks Project",
    navSubjects: "Subjects",
    navWaitlist: "Waitlist",
    loginBtn: "Login",
    heroEyebrow: "Official IB® Content Partner",
    heroTitle: "Master IB HL & SL with Official Past Papers",
    heroDesc: "Access verified IB past papers across Math, Sciences, Economics, and Computer Science with AI-powered insights and curriculum-aligned tagging.",
    heroCTA1: "Join Waitlist",
    heroCTA2: "Contact Us",
    sampleLabel: "Sample Question",
    sampleQuestion: "An electric motor has 1.8 kJ of energy transferred to it in 0.50 minutes. The efficiency is 40%. What is the useful power output?",
    tagEnergy: "Energy",
    tagPower: "Power",
    revealBtn: "Reveal Answer",
    answerLabel: "Answer:",
    answerExplanation: "Calculation: 1800 J ÷ 30 s = 60 W. With 40% efficiency: 0.40 × 60 W = 24 W",
    feature1Title: "Official Content",
    feature1Desc: "Licensed IB exam materials with verified authenticity",
    feature2Title: "Curriculum-Aligned",
    feature2Desc: "Questions sorted by subject, paper, and syllabus topics",
    feature3Title: "Beta Access",
    feature3Desc: "Early users get direct support from our team",
    subjectsEyebrow: "Launching First",
    subjectsTitle: "Available Subjects",
    subjectsDesc: "Past papers with structured solutions and topic tagging",
    subject1Title: "Physics HL",
    subject1Desc: "Mechanics, waves, fields, energy with diagram assets",
    subject1Feature1: "✓ Paper 1–3 coverage",
    subject1Feature2: "✓ Topic tagging",
    subject1Feature3: "✓ Worked solutions",
    subject2Title: "Chemistry HL",
    subject2Desc: "Stoichiometry, energetics, kinetics, organic chemistry",
    subject2Feature1: "✓ Question metadata",
    subject2Feature2: "✓ Diagram assets",
    subject2Feature3: "✓ Data booklet refs",
    subject3Title: "Math AA HL",
    subject3Desc: "Analysis & Approaches with calculator policy indicators",
    subject3Feature1: "✓ Calculator tagging",
    subject3Feature2: "✓ Difficulty estimates",
    subject3Feature3: "✓ Adaptive problem sets",
    subject4Title: "Computer Science HL",
    subject4Desc: "Programming, data structures, algorithms, system design",
    subject4Feature1: "✓ Code examples",
    subject4Feature2: "✓ Algorithm analysis",
    subject4Feature3: "✓ IA guidance",
    waitlistEyebrow: "Get Early Access",
    waitlistTitle: "Join the Waitlist",
    waitlistDesc: "We onboard teachers and students in small waves for personalized support.",
    formNameLabel: "Full Name",
    formEmailLabel: "Email",
    formSubjectLabel: "Preferred Subject",
    formSubjectOption0: "Select one",
    formSubjectOption1: "Physics HL",
    formSubjectOption2: "Chemistry HL",
    formSubjectOption3: "Math AA HL",
    formSubjectOption4: "Computer Science HL",
    formSubjectOption5: "Other",
    waitlistSubmitBtn: "Request Invite",
    contactEyebrow: "Get in Touch",
    contactTitle: "Contact Our Team",
    contactDesc: "Questions about integration, timelines, or specific needs? We're here to help.",
    formMessageLabel: "Message",
    contactSubmitBtn: "Send Message",
    footerName: "Big Bucks Project",
    footerCopyright: "All rights reserved.",
    footerContact: "Contact",
    footerTerms: "Terms",
    loginTitle: "Login",
    loginUsernameLabel: "Username",
    loginPasswordLabel: "Password",
    loginSubmitBtn: "Sign In",
    loginNoAccount: "Don't have an account?",
    loginJoinWaitlist: "Join the waitlist",
  },
  zh: {
    siteName: "大钱项目",
    navSubjects: "科目",
    navWaitlist: "候补名单",
    loginBtn: "登录",
    heroEyebrow: "官方 IB® 内容合作伙伴",
    heroTitle: "通过官方历年试题掌握 IB HL 和 SL",
    heroDesc: "访问经过验证的IB历年试题，涵盖数学、科学、经济学和计算机科学，配备AI驱动的洞察和课程对齐的标签。",
    heroCTA1: "加入候补名单",
    heroCTA2: "联系我们",
    sampleLabel: "示例问题",
    sampleQuestion: "一台电动机在0.50分钟内传递了1.8 kJ的能量。效率为40%。有用的功率输出是多少？",
    tagEnergy: "能量",
    tagPower: "功率",
    revealBtn: "显示答案",
    answerLabel: "答案：",
    answerExplanation: "计算：1800 J ÷ 30 s = 60 W。效率40%：0.40 × 60 W = 24 W",
    feature1Title: "官方内容",
    feature1Desc: "经过验证的官方IB考试材料",
    feature2Title: "课程对齐",
    feature2Desc: "按科目、试卷和教学大纲主题分类的问题",
    feature3Title: "测试版访问",
    feature3Desc: "早期用户获得我们团队的直接支持",
    subjectsEyebrow: "首批推出",
    subjectsTitle: "可用科目",
    subjectsDesc: "带有结构化解决方案和主题标记的历年试题",
    subject1Title: "物理 HL",
    subject1Desc: "力学、波、场、能量，配备图表资源",
    subject1Feature1: "✓ 试卷 1-3 覆盖",
    subject1Feature2: "✓ 主题标记",
    subject1Feature3: "✓ 详细解答",
    subject2Title: "化学 HL",
    subject2Desc: "化学计量、能量学、动力学、有机化学",
    subject2Feature1: "✓ 问题元数据",
    subject2Feature2: "✓ 图表资源",
    subject2Feature3: "✓ 数据手册参考",
    subject3Title: "数学 AA HL",
    subject3Desc: "分析与方法，配备计算器政策指示",
    subject3Feature1: "✓ 计算器标记",
    subject3Feature2: "✓ 难度估计",
    subject3Feature3: "✓ 自适应问题集",
    subject4Title: "计算机科学 HL",
    subject4Desc: "编程、数据结构、算法、系统设计",
    subject4Feature1: "✓ 代码示例",
    subject4Feature2: "✓ 算法分析",
    subject4Feature3: "✓ IA 指导",
    waitlistEyebrow: "获得早期访问",
    waitlistTitle: "加入候补名单",
    waitlistDesc: "我们分批次引入教师和学生，以提供个性化支持。",
    formNameLabel: "全名",
    formEmailLabel: "电子邮件",
    formSubjectLabel: "首选科目",
    formSubjectOption0: "选择一个",
    formSubjectOption1: "物理 HL",
    formSubjectOption2: "化学 HL",
    formSubjectOption3: "数学 AA HL",
    formSubjectOption4: "计算机科学 HL",
    formSubjectOption5: "其他",
    waitlistSubmitBtn: "请求邀请",
    contactEyebrow: "取得联系",
    contactTitle: "联系我们的团队",
    contactDesc: "有关集成、时间表或特定需求的问题？我们随时为您提供帮助。",
    formMessageLabel: "留言",
    contactSubmitBtn: "发送消息",
    footerName: "大钱项目",
    footerCopyright: "版权所有。",
    footerContact: "联系",
    footerTerms: "条款",
    loginTitle: "登录",
    loginUsernameLabel: "用户名",
    loginPasswordLabel: "密码",
    loginSubmitBtn: "登录",
    loginNoAccount: "还没有账户？",
    loginJoinWaitlist: "加入候补名单",
  },
};

// Initialize theme
let currentTheme: "light" | "dark" = "light";
let currentLang: Language = "en";

// Load saved preferences
const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
const savedLang = localStorage.getItem("lang") as Language | null;

if (savedTheme) {
  currentTheme = savedTheme;
  if (currentTheme === "dark") {
    document.documentElement.classList.add("dark");
  }
}

if (savedLang) {
  currentLang = savedLang;
  updateLanguage(currentLang);
}

// Theme toggle
const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    currentTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", currentTheme);
  });
}

// Language toggle
const langToggle = document.getElementById("lang-toggle");
if (langToggle) {
  langToggle.textContent = currentLang === "en" ? "EN" : "中文";
  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "zh" : "en";
    langToggle.textContent = currentLang === "en" ? "EN" : "中文";
    localStorage.setItem("lang", currentLang);
    updateLanguage(currentLang);
  });
}

// Update language function
function updateLanguage(lang: Language): void {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (key && translations[lang][key]) {
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        (element as HTMLInputElement).placeholder = translations[lang][key];
      } else {
        element.textContent = translations[lang][key];
      }
    }
  });
}

// Set current year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear().toString();
}

// Save form data to Firestore
const saveFormData = async (
  collectionName: string,
  payload: FormData
): Promise<void> => {
  if (!firestore) {
    throw new Error("Firestore not initialized");
  }

  await addDoc(collection(firestore, collectionName), {
    ...payload,
    createdAt: serverTimestamp(),
    source: "landing-page",
  });
};

// Form handler attachment
const attachFormHandler = (
  formId: string,
  statusId: string,
  collectionName: string
): void => {
  const form = document.getElementById(formId) as HTMLFormElement | null;
  const status = document.getElementById(statusId) as HTMLElement | null;

  if (!form || !status) return;

  form.addEventListener("submit", async (event: Event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const payload: FormData = Object.fromEntries(formData.entries()) as FormData;

    showStatus(status, "Sending...", "info");

    try {
      await saveFormData(collectionName, payload);
      showStatus(
        status,
        "Message received! We'll be in touch shortly.",
        "success"
      );
      form.reset();
    } catch (error) {
      console.error(`Failed to submit ${collectionName}:`, error);
      showStatus(
        status,
        "Something went wrong. Please try again or email us directly.",
        "error"
      );
    }
  });
};

// Attach form handlers
attachFormHandler("waitlist-form", "waitlist-status", "waitlist");
attachFormHandler("contact-form", "contact-status", "contactMessages");

// Reveal answer toggle
const revealBtn = document.getElementById("reveal-answer");
const answerSection = document.getElementById("answer-section");

if (revealBtn && answerSection) {
  revealBtn.addEventListener("click", () => {
    answerSection.classList.toggle("hidden");
    const isHidden = answerSection.classList.contains("hidden");
    revealBtn.textContent = isHidden
      ? translations[currentLang].revealBtn
      : currentLang === "en" ? "Hide Answer" : "隐藏答案";
  });
}

// Login modal functionality - Simplified MVP
const loginBtn = document.getElementById("login-btn");
const loginModal = document.getElementById("login-modal");
const closeModalBtn = document.getElementById("close-modal");
const loginForm = document.getElementById("login-form") as HTMLFormElement | null;
const joinWaitlistLink = document.getElementById("join-waitlist-link");

// Open login modal
if (loginBtn && loginModal) {
  loginBtn.addEventListener("click", () => {
    loginModal.style.display = "flex";
  });
}

// Close login modal
const closeModal = (): void => {
  if (loginModal) {
    loginModal.style.display = "none";
  }
};

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeModal);
}

// Close modal when clicking outside
if (loginModal) {
  loginModal.addEventListener("click", (e: MouseEvent) => {
    if (e.target === loginModal) {
      closeModal();
    }
  });
}

// Close modal when clicking join waitlist link
if (joinWaitlistLink) {
  joinWaitlistLink.addEventListener("click", closeModal);
}

// Handle login form submission - MVP version (just validate and show message)
if (loginForm) {
  loginForm.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    // MVP: Simple validation (just check if fields are filled)
    if (username && password) {
      // In MVP, just show success message
      const successMessage = currentLang === "en" 
        ? `Welcome back, ${username}!` 
        : `欢迎回来，${username}！`;
      alert(successMessage);
      closeModal();
      loginForm.reset();
      
      // Optional: Store logged-in state
      localStorage.setItem("loggedInUser", username);
      
      // Update login button to show username
      if (loginBtn) {
        loginBtn.textContent = username;
      }
    } else {
      const errorMessage = currentLang === "en"
        ? "Please enter both username and password"
        : "请输入用户名和密码";
      alert(errorMessage);
    }
  });
}

// Check if user is already logged in
const loggedInUser = localStorage.getItem("loggedInUser");
if (loggedInUser && loginBtn) {
  loginBtn.textContent = loggedInUser;
}

// Status message display
const STATUS_TIMEOUT = 3500;

function showStatus(
  element: HTMLElement,
  message: string,
  type: StatusType
): void {
  const types: StatusType[] = ["success", "error", "info"];
  types.forEach((t) => element.classList.remove(`status-${t}`));
  element.classList.remove("status-show");

  // Force reflow to restart animation
  void element.offsetWidth;

  element.textContent = message;
  element.classList.add("status-show");

  // Apply color based on type
  if (type === "success") {
    element.style.color = "#10b981";
  } else if (type === "error") {
    element.style.color = "#ef4444";
  } else {
    element.style.color = "#6b7280";
  }

  const existingTimeoutId = element.dataset.timeoutId;
  if (existingTimeoutId) {
    clearTimeout(Number(existingTimeoutId));
  }

  const timeoutId = window.setTimeout(() => {
    element.classList.remove("status-show");
    element.textContent = "";
    delete element.dataset.timeoutId;
  }, STATUS_TIMEOUT);

  element.dataset.timeoutId = timeoutId.toString();
}

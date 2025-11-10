# Big Bucks Project Landing Page

Multilingual, theme-aware landing page for the Big Bucks Project (BBJ). It introduces the product, showcases sample IB content, and collects waitlist + contact submissions via Firebase.

---

## ✨ Features Overview

| Feature | Details |
| ------- | ------- |
| Hero sample | Real IB Physics HL question with revealable markscheme + AI explanation |
| Subjects | Physics, Chemistry, Math AA, Computer Science (HL/SL) highlight cards |
| Timeline | Explains waitlist → invite → feedback workflow |
| Forms | Waitlist + contact forms write directly to Firestore with loading/success states |
| Localization | Instant English ↔ Traditional Chinese toggle with smooth transitions |
| Theming | Light/Dark theme switch that persists per user |
| Navbar | Sticky top navigation with BBJ logo and toggles |
| Firebase-ready | Waitlist + contact collections, easy deploy via Firebase Hosting |

---

## 📁 Project Tree

```
landing-page/
├── README.md
├── index.html        # Main layout with data-i18n hooks and sections
├── styles.css        # Global theme vars, layout, responsiveness, transitions
├── main.js           # Firebase init, form handling, theme + language logic
└── favicon.svg
functions/
├── package.json / index.js  # Firebase Functions scaffold (currently hello world)
firebase.json, .firebaserc, etc.
```

> Note: All landing assets live inside `landing-page/` per project structure guidelines.

---

## 🔧 Prerequisites

1. **Node + npm** for Firebase CLI.
2. **Firebase project** with Hosting + Firestore enabled.
3. Optional: SendGrid (if you later add email notifications).

---

## 🚀 Quick Start

### 1. Install & Authenticate Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

### 2. Serve Locally

```bash
cd landing-page
python3 -m http.server 8000
# Visit http://localhost:8000
```

### 3. Configure Firebase in `main.js`

Replace the `firebaseConfig` object with your project credentials:

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
};
```

### 4. Firestore Rules (minimum)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /waitlist/{docId} {
      allow write: if request.resource.data.name is string
                   && request.resource.data.email is string
                   && request.resource.data.subject is string
                   && request.resource.data.ibSchoolStatus is string;
      allow read: if false;
    }
    match /contactMessages/{docId} {
      allow write: if request.resource.data.name is string
                   && request.resource.data.email is string
                   && request.resource.data.message is string;
      allow read: if false;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### 5. Deploy to Firebase Hosting

```bash
cd ..
firebase deploy --only hosting
```

---

## 🧩 Forms & Firestore

| Form | Collection | Fields |
| ---- | ---------- | ------ |
| Waitlist | `waitlist` | `name`, `email`, `subject`, `ibSchoolStatus`, `message?`, `createdAt`, `source` |
| Contact | `contactMessages` | `name`, `email`, `message`, `createdAt`, `source` |

- Both forms use `addDoc` from the Firebase Web SDK (no custom backend needed).
- `main.js` includes placeholder success/error messages with ARIA live regions.
- To add email notifications, hook a Cloud Function or a third-party automation.

---

## 🌗 Theme & Localization

- Theme toggle updates the `data-theme` attribute and persists via `localStorage`. CSS variables control colors/shadows across sections.
- Language toggle switches between English (`en`) and Traditional Chinese (`zh-Hant`):
  - All UI text uses `data-i18n`, `data-i18n-html`, or `data-i18n-placeholder`.
  - `main.js` contains the translation map. To add a new language, extend `translations`.
  - Transition effect dims the page briefly and animates text so switches feel smooth.

---

## 🔍 Sections Breakdown

1. **Navbar (`<nav class="site-nav">`)**: logo + toggles.
2. **Hero**: Eyebrow, headline, description, CTAs, IB sample question card.
3. **Highlights**: Key product value props.
4. **Subjects grid**: Four cards (Physics, Chemistry, Math AA, Computer Science).
5. **Timeline**: Waitlist → invite → feedback steps.
6. **Waitlist form**: Full form with subject dropdown+IB status, placeholder copy localized.
7. **Contact form**: Simple name/email/message block.
8. **Team**: Bio blurbs for the three admins.
9. **Footer**: Contact emails and policy placeholders.

---

## 🛠️ Customization Tips

- **Add nav links**: The `.site-nav__inner` container can host additional `<a>` anchors; just tag them with `data-i18n`.
- **New translations**: Add keys to both `translations.en` and `translations.zh`. For other languages, add a new object and update `setLanguage`.
- **Form fields**: If you add fields, update both the HTML and the Firestore rules, and consider adding validation before `addDoc`.
- **Animations**: `styles.css` organizes transitions near the relevant sections (hero, forms, status messages). Adjust durations there.

---

## 🧪 Testing Checklist

- [ ] Language toggle switches every section (hero, forms, footer) with smooth animation.
- [ ] Theme toggle updates colors, backgrounds, and text contrast in all sections.
- [ ] Waitlist + contact submissions appear in Firestore with correct fields.
- [ ] Mobile layout: toggles remain accessible; cards stack cleanly.
- [ ] Deployment: `firebase deploy --only hosting` publishes the latest build.

---

## 🤝 Contributing / Next Steps

- Hook waitlist/contact notifications to a Cloud Function email integration (e.g., SendGrid).
- Add nav anchors to scroll to sections (IDs already exist: `#subjects`, `#waitlist`, `#contact`).
- Plug into a CMS or Markdown pipeline for the content cards if needed.

Questions or feature ideas? Open an issue or ping the team—this landing page is designed to evolve alongside the BBJ roadmap.

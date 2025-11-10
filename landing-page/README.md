# Big Bucks Project - Landing Page

A modern, responsive landing page for Big Bucks Project built with TypeScript, Tailwind CSS, and Firebase.

## Features

- 🎨 **Modern UI** - Built with Tailwind CSS and flexbox layout
- 🔐 **Login System** - Firebase Authentication integration with login modal
- 📝 **Form Handling** - Waitlist and contact forms connected to Firestore
- 📱 **Responsive Design** - Mobile-first approach with flexible layouts
- ⚡ **TypeScript** - Type-safe code with full TypeScript support
- 🚀 **Vite** - Fast build tool and development server

## Project Structure

```
landing-page/
├── src/
│   └── main.ts          # Main TypeScript file with Firebase integration
├── index.html           # Main HTML file with Tailwind CSS
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── vite.config.ts       # Vite build configuration
└── postcss.config.js    # PostCSS configuration
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd landing-page
npm install
```

### 2. Development

Run the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### 3. Build for Production

Create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

### 4. Preview Production Build

```bash
npm run preview
```

## Key Changes from Original

### 1. **Flexbox Layout**
- Replaced CSS Grid with flexbox for more flexible, responsive layouts
- Used `flex`, `flex-col`, `flex-row`, `flex-wrap` classes throughout

### 2. **More Concise Content**
- Reduced hero section text
- Simplified features to 3 key points
- Streamlined subject cards (3 instead of more)
- Combined timeline into simpler flow
- Removed team section for cleaner focus

### 3. **Login Section**
- Added sticky header with login button in top-right corner
- Created modal popup for login functionality
- Integrated Firebase Authentication
- Smooth transitions and modern UI

### 4. **Modern Tech Stack**
- **Tailwind CSS** - Utility-first CSS framework (using CDN for simplicity)
- **TypeScript** - Type-safe JavaScript with proper interfaces
- **Vite** - Modern build tool
- **Firebase** - Authentication and Firestore database

## Features Implemented

### Navigation
- Sticky header with logo and login button
- Quick navigation links to sections
- Responsive mobile menu (hidden on small screens)

### Login Modal
- Email/password authentication
- Firebase Auth integration
- Error handling with user-friendly messages
- Link to waitlist for new users

### Forms
- **Waitlist Form** - Capture early access requests
- **Contact Form** - Direct communication with team
- Real-time status messages
- Firebase Firestore integration

### UI/UX Improvements
- Gradient backgrounds
- Smooth hover transitions
- Card-based layouts with shadows
- Responsive flexbox columns
- Modern color scheme with primary/secondary colors

## Firebase Configuration

The Firebase configuration is already set up in `src/main.ts`. Ensure your Firebase project has:

1. **Authentication** enabled (Email/Password provider)
2. **Firestore Database** with collections:
   - `waitlist` - For waitlist submissions
   - `contactMessages` - For contact form submissions

## Customization

### Colors
Edit the Tailwind config in the `<script>` tag of `index.html`:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#1f4dee',      // Main brand color
        'primary-dark': '#1536a8', // Hover state
        secondary: '#0f172a',    // Dark text color
      }
    }
  }
}
```

### Content
Edit `index.html` directly - all content is in plain HTML with Tailwind classes.

### Functionality
Edit `src/main.ts` to modify form handling, login logic, or add new features.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Copyright © 2025 Big Bucks Project. All rights reserved.

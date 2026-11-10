# Tabs Component with React

A simple tabs component built with **React only**, with no extra packages.

## Features

- Click a tab title to switch the page content
- Remembers the last active tab (saved in `localStorage`) and shows it on the next visit
- Animated underline that slides to the active tab
- Fade-in animation for the content
- Keyboard navigation (← → Home End) and ARIA roles for accessibility

## Tech

- React (Create React App)
- CSS (no UI libraries)

## Getting Started

```bash
git clone <repo-url>
cd my-app
npm install
npm start
```

The app runs at http://localhost:3000.

## Project Structure

```
src/
├── components/
│   └── Tabs.js
├── App.js
└── App.css
```

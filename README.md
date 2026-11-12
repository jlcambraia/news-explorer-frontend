# News Explorer — Frontend

A responsive news discovery application built with **React 19 and Vite 6**, featuring keyword search, article collections, and authentication-aware navigation.

**[Live Demo](https://news-explorer-frontend-coral.vercel.app/)** · **[Backend Repository](https://github.com/jlcambraia/news-explorer-backend)**

## Overview

News Explorer lets users search for news, browse article cards, and save articles to a personal collection. The interface communicates with a separate backend responsible for authentication and saved articles.

Developed during the **TripleTen Full Stack Web Development program**.

## Features

- Keyword-based news search and article cards
- Save and view articles
- Registration and login modals
- Authentication-aware navigation and protected routes
- Session token handling
- Form validation with feedback
- Modal closing through overlay clicks and Escape
- Responsive layout

## Tech Stack

React 19 · Vite 6 · React Router 6 · JavaScript · HTML5 · CSS3 · BEM · React Hooks · REST APIs

## Architecture

```text
React / Vite frontend
        |
      REST APIs
        |
Node.js / Express backend
        |
      MongoDB
```

## Getting Started

Requires Node.js and npm.

```bash
git clone https://github.com/jlcambraia/news-explorer-frontend.git
cd news-explorer-frontend
npm install
npm run dev
```

Open the local URL displayed by Vite. API integration must be configured for the backend environment you intend to use.

To build and preview:

```bash
npm run build
npm run preview
```

## Related Repository

[News Explorer — Backend](https://github.com/jlcambraia/news-explorer-backend)

## Potential Improvements

- Automated frontend tests
- More detailed loading and error states
- Accessibility improvements
- Additional search filters

## Author

**João Luiz Cambraia** · [GitHub](https://github.com/jlcambraia) · [LinkedIn](https://www.linkedin.com/in/joaoluizcambraia/)

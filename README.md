# Subarna Katwal — AI Automation Architect Portfolio

Dark-mode, Technical Mono-Brutalism portfolio built with Next.js, Tailwind CSS, and Framer Motion.

## Stack

- **Next.js 15** (App Router)
- **Tailwind CSS 3.4**
- **Framer Motion 11** — magnetic hover, staggered entrance
- **Geist Sans + Geist Mono** — via `geist` npm package

## Setup

> Requires **Node.js 18+** — install from https://nodejs.org

```bash
cd portfolio
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

## Adding Log Entries

Edit `lib/log-data.ts` — add a new object to the `logEntries` array:

```ts
{
  id: "7",
  date: "2026-03-25",
  hash: "g6h9i2j",
  title: "Your commit title here",
  body: "What you did and learned.",
  tags: ["Tool", "Concept"],
  type: "feat", // feat | fix | learn | deploy | build
}
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Dashboard — Hero, Status, Tech Stack, Lab Preview |
| `/log` | The Log — git-commit style learning timeline |

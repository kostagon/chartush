# Mister Charts - Initial Plan

## Project Overview
Create a web application that allows users to create beautiful animated charts and export them as GIFs or PNGs.

## Core Features
1. **Chart Editor** - Create and customize charts with multiple data points (terms)
2. **Chart Types** - Support different visualization styles (bars, circles, rectangles, donut)
3. **Animations** - Smooth animated transitions when previewing charts
4. **Export** - Download charts as animated GIF or static PNG
5. **Gallery** - Save charts locally and manage the collection

## Tech Stack
- React, TS, Zustand
- Canvas API for chart rendering
- gif.js library for GIF generation
- LocalStorage for data persistence
- Lucide icons 

## Architecture (MVC)
```
js/
├── main.tsx            # App entry
├── pages/
│   ├── AboutPage.tsx   # About
│   └── HomePage.tsx    # Home
└── services/
    ├── chart.service.ts       # Chart data model
    ├── gallery.service.ts     # LocalStorage operations
    └── util.service.ts        # Colors, fonts, helpers
```

## Data Model

### Chart Object
```javascript
{
  type: 'circles',           // 'circles' | 'bars' | 'rectangles' | 'donut'
  title: 'Chart Title',
  style: {
    font: 'Arial',
    fontSize: '45px',
    backgroundColor: 'transparent'
  },
  valueType: 'value',        // 'value' | 'percent'
  terms: [
    { label: 'Item A', value: 42, color: '#a8d5e5' },
    { label: 'Item B', value: 58, color: '#7ec8e3' }
  ]
}
```


# Plan: Chart Editor & Preview

## Overview
Implement a chart editor page with a live preview panel, allowing users to edit chart data and see real-time updates.

## Proposed Architecture

### Component Structure
```
src/
  components/
    Editor/
      ChartEditor.tsx       # Main editor container (splits editor & preview)
      ChartPreview.tsx      # Canvas-based chart renderer
      EditorPanel.tsx       # Left panel with form inputs
      TermList.tsx          # List of chart terms (items)
      TermItem.tsx          # Single term row (label, value, color picker)
      ChartTypeSelector.tsx # Chart type selection (bars, circles, etc.)
      StylePanel.tsx        # Font, fontSize, backgroundColor controls
    Charts/
      BarsChart.tsx         # Bar chart renderer
      CirclesChart.tsx      # Circles chart renderer
      DonutChart.tsx        # Donut chart renderer
      RectanglesChart.tsx   # Rectangles chart renderer
```

### Layout Concept
```
+------------------------------------------+
|              ChartEditor                 |
+------------------+-----------------------+
|   EditorPanel    |    ChartPreview       |
|                  |                       |
| [Type Selector]  |   +---------------+   |
| [Title Input]    |   |               |   |
| [Term List]      |   |    Canvas     |   |
|   - Item 1       |   |   (Chart)     |   |
|   - Item 2       |   |               |   |
|   - Item 3       |   +---------------+   |
| [+ Add Term]     |                       |
| [Style Panel]    |                       |
+------------------+-----------------------+
```

### State Management Options

**Option A: Local state in ChartEditor (Recommended for simplicity)**
- `useState` for the current chart being edited
- Pass down props and callbacks to child components
- Good for single-chart editing

**Option B: Zustand store**  
- Add chart state to `appStore.ts`
- Better if we need to persist across pages or share state

---

## Questions

1. **Where should the editor be rendered?**
   V A) New dedicated page `/editor` (EditorPage.tsx)
   - B) Replace the HomePage content
   - C) Modal/overlay on the HomePage

2. **State management approach?**
   - A) Local React state in ChartEditor (simple, recommended)
   V B) Zustand global store (if persistence/sharing needed)

3. **Preview rendering method?**
   V A) HTML Canvas (as per skill guidelines)
   - B) SVG-based rendering
   - C) Pure CSS/HTML (divs with inline styles)

4. **Should preview update live (on every keystroke) or on blur/debounced?**
   V A) Live updates (immediate feedback)
   - B) Debounced (300ms delay, better performance)
   - C) Manual "Apply" button

5. **Initial implementation scope?**
   - A) Full editor with all 4 chart types working
   V B) Start with one chart type (bars) and expand later

---

## Confirmed Decisions
- **Page:** New `/editor` route with `EditorPage.tsx`
- **State:** Zustand store (`chartStore.ts`)
- **Rendering:** HTML Canvas
- **Updates:** Live (on every change)
- **Scope:** Bars chart first, then expand

---

## Implementation Steps

### Step 1: Create Chart Store ✅
File: `src/store/chartStore.ts`
- Store the current chart being edited
- Actions: `setChart`, `updateTitle`, `updateType`, `addTerm`, `updateTerm`, `removeTerm`, `updateStyle`

### Step 2: Create EditorPage ✅
File: `src/pages/EditorPage.tsx`
- Import and render `ChartEditor` component
- Add route in `App.tsx`

### Step 3: Create ChartEditor Component ✅
File: `src/components/Editor/ChartEditor.tsx`
- Split layout: EditorPanel (left) + ChartPreview (right)
- Initialize chart from store or create empty

### Step 4: Create EditorPanel ✅
File: `src/components/Editor/EditorPanel.tsx`
- Title input
- Chart type selector (disabled types except bars for now)
- TermList with add/remove functionality
- Style controls

### Step 5: Create ChartPreview ✅
File: `src/components/Editor/ChartPreview.tsx`
- Canvas element with ref
- `useEffect` to redraw on chart changes
- Call `drawBarsChart()` based on chart type

### Step 6: Create BarsChart Renderer ✅
File: `src/components/Charts/BarsChart.ts`
- `drawBarsChart(ctx, chart, width, height)` function
- Draw bars based on term values
- Show labels and values

### Step 7: CSS Styling ✅
File: `src/style/cmps/editor.css`
- Flexbox layout for editor/preview split
- Form styling for inputs
- Responsive adjustments

### Step 8: Wire Up Navigation ✅
- Add link to editor in header navigation

---

## Status: COMPLETED ✅

All implementation steps have been completed. The chart editor is available at `/editor` route.

### Future Enhancements
- Add remaining chart types (circles, rectangles, donut)
- Add style panel for font/background customization
- Add chart save/load functionality
- Add export to image feature

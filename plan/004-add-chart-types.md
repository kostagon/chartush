# Plan: Add Remaining Chart Types

## Overview
Add support for the remaining chart types: **circles**, **rectangles**, and **donut**.

## Current State
- ✅ `bars` chart type implemented
- Chart types defined in `src/types/chart.types.ts`: `'circles' | 'bars' | 'rectangles' | 'donut'`
- ChartPreview has switch statement ready for new types
- EditorPanel has type selector (other types currently disabled)

## Chart Type Specifications

### 1. Circles Chart
Proportional circles arranged horizontally, sized by value.

```
    ●●●●●        ●●●●       ●●●
   ●●●●●●●      ●●●●●●     ●●●●●
  ●●●●●●●●●    ●●●●●●●●    ●●●●●
   ●●●●●●●      ●●●●●●     ●●●●●
    ●●●●●        ●●●●       ●●●
   Item A       Item B     Item C
     40           30         30
```

**Drawing approach:**
- Calculate max radius based on canvas size and term count
- Scale circle radius proportionally to value (sqrt for area-based scaling)
- Draw filled circles with labels below

### 2. Rectangles Chart  
Proportional rectangles (like a treemap-lite), sized by value.

```
+-------------+----------+--------+
|             |          |        |
|   Item A    |  Item B  | Item C |
|     40      |    30    |   30   |
|             |          |        |
+-------------+----------+--------+
```

**Drawing approach:**
- Calculate total value
- Divide canvas width proportionally
- Draw filled rectangles side by side
- Center labels inside each rectangle

### 3. Donut Chart
Pie chart with a hole in the center.

```
      ●●●●●●●●●
    ●●●●    ●●●●●
   ●●●        ●●●●
  ●●●   TOTAL  ●●●
   ●●●   100   ●●●
    ●●●●    ●●●●
      ●●●●●●●●
```

**Drawing approach:**
- Calculate angles based on percentages
- Draw arcs for each term
- Leave center hole (inner radius ~50% of outer)
- Show total or selected value in center
- Draw legend on the side

---

## Questions

1. **Legend placement for donut chart?**
   - A) Right side of the chart (recommended)
   V B) Below the chart
   - C) No legend, just the donut with center value

2. **Circles scaling method?**
   V A) Area-based (sqrt of value) - visually accurate
   - B) Diameter-based (linear) - simpler but less accurate

3. **Rectangles orientation?**
   V A) Horizontal side-by-side (recommended)
   - B) Vertical stacked

4. **Implementation order?**
   - A) Rectangles → Circles → Donut (easiest to hardest)
   - B) Donut → Circles → Rectangles
   V C) All at once

---

## Implementation Steps

### Step 1: Create RectanglesChart.ts ✅
- `drawRectanglesChart(ctx, chart, width, height)`
- Calculate proportional widths
- Draw rectangles with labels

### Step 2: Create CirclesChart.ts ✅
- `drawCirclesChart(ctx, chart, width, height)`
- Calculate proportional radii (area-based sqrt scaling)
- Position circles horizontally

### Step 3: Create DonutChart.ts ✅
- `drawDonutChart(ctx, chart, width, height)`
- Calculate arc angles
- Draw donut segments and legend below

### Step 4: Update ChartPreview.tsx ✅
- Import all chart drawing functions
- Add cases to switch statement

### Step 5: Enable Type Selector ✅
- Remove `disabled` property from EditorPanel options

### Step 6: Export Functions ✅
- Update `src/components/Charts/index.ts`

---

## Status: COMPLETED ✅

All four chart types are now available:
- **Bars** - Vertical bars sized by value
- **Circles** - Proportional circles (area-based scaling)
- **Rectangles** - Side-by-side blocks proportional to value
- **Donut** - Pie chart with center hole and legend below

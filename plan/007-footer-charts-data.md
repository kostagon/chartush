# Plan: Footer with Charts Data Display

## Current State

- ✅ Gallery page displays saved charts from localStorage
- ✅ Chart editor creates/edits charts
- ✅ `gallery.service.ts` manages chart persistence
- ✅ `RootLayout.tsx` has header structure
- Need: Footer component to display charts summary/statistics

## Questions for Requirements

Before implementation, please clarify:

### 1. **Footer Content & Purpose**

- What specific data should the footer show?
  - [V] Total number of saved charts?
  - [ ] Recently edited charts?
  - [ ] Chart type distribution/statistics?
  - [V] Total charts created count?
  - [ ] Other metrics?

### 2. **Display/Interaction**

- Should the footer be:
  - [ ] Static (read-only display)?
  - [V] Interactive (clickable to navigate)?
  - [ ] Collapsible/expandable?
- Should it show real-time updates when charts are saved/deleted?

### 3. **Visibility & Layout**

- Should the footer appear on:
  - [V] All pages (home, gallery, editor, about)?
  - [ ] Specific pages only?
- Should it be:
  - [ ] Sticky (always visible at bottom)?
  - [V] Fixed in viewport?
  - [ ] Regular footer (scrolls with content)?

### 4. **Design**

- Any specific styling preferences?
  no
- Should it follow existing theme system (light/dark mode)?
  yes
- Minimal vs detailed layout?
  minimal

## Proposed Architecture (pending answers)

```
src/
  components/
    Footer/
      Footer.tsx               # Main footer component
      index.ts                 # Export
      footer.css              # Styles

  RootLayout.tsx              # Include <Footer /> at bottom
```

### Data Flow

```
Gallery                 Footer
  |                       |
  +---[charts from store]-+

localStorage → chartStore → Footer (displays stats)
```

### Implementation Plan

**Footer Features:**

- Display total saved charts count
- Make footer interactive (clickable) to navigate to gallery
- Show on all pages
- Fixed in viewport (always visible at bottom)
- Minimal layout with existing theme support

### Implementation Steps

1. ✅ Create `src/components/Footer/` directory
2. ✅ Create `Footer.tsx` component
   - Imports `useChartStore` to get reactive chart count
   - Displays total charts count
   - Adds click handler to navigate to gallery
3. ✅ Create `footer.css` with minimal styling
   - Supports light/dark theme via CSS variables
   - Hover effect on footer
   - Fixed positioning at bottom of viewport
4. ✅ Integrate Footer into `RootLayout.tsx`
   - Added import and component to layout
5. ✅ Add reactive state tracking with Zustand store
   - Added `chartsCount` to `ChartState` interface
   - Added `updateChartsCount()` method to sync with localStorage
   - Updated `saveToGallery()` to call `updateChartsCount()`
   - Added `deleteChartFromGallery()` for reactive deletion
6. ✅ Update `GalleryPage.tsx` to use store method for deletion
   - Now calls `deleteChartFromGallery()` which updates footer
7. ✅ Update tests for Footer component
   - Mock store instead of service layer

### Files Created

- `src/components/Footer/Footer.tsx` - Main footer component
- `src/components/Footer/footer.css` - Styling
- `src/components/Footer/Footer.test.tsx` - Unit tests
- `src/components/Footer/index.ts` - Export

### Files Modified

- `src/layouts/RootLayout.tsx` - Added Footer component
- `src/store/chartStore.ts` - Added reactive chart count tracking
- `src/pages/GalleryPage.tsx` - Use store deletion method
- `src/components/Footer/Footer.test.tsx` - Updated mock strategy

---

**Status:** ✅ Footer updates reactively on chart save/delete!

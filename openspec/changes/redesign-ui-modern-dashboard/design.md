## Context

The app currently uses inline styles and basic HTML tables. It works but looks like a prototype. We need to modernize the visual design while keeping all existing functionality intact.

## Goals / Non-Goals

**Goals:**
- Create a clean, modern, professional-looking interface
- Maintain all existing CRUD functionality (work modes, employees)
- Keep the codebase simple - no new dependencies
- Improve user experience with better visual hierarchy and feedback

**Non-Goals:**
- Adding new features (search, filtering, etc.)
- Changing the data model or API
- Adding authentication or authorization
- Mobile-responsive design (desktop-first is fine)
- Adding animations or complex transitions

## Decisions

### 1. Styling Approach: Plain CSS file

**Decision**: Create a single `styles.css` file imported in `main.tsx`

**Why**:
- No new dependencies (CSS modules require build config, Tailwind adds complexity)
- Simple to understand and maintain
- Good learning exercise for CSS fundamentals
- Easy to see all styles in one place

**Alternatives considered**:
- CSS Modules: Would require config changes, slightly more complex
- Tailwind CSS: Popular but adds build complexity
- Styled Components: Adds runtime dependency

### 2. Color Scheme

**Decision**: Clean white background with accent colors

```
Primary:     #2563EB (blue)
Background:  #FFFFFF (white)
Surface:     #F8FAFC (light gray)
Text:        #1E293B (dark gray)
Muted:       #64748B (medium gray)
Border:      #E2E8F0 (light border)
Error:       #DC2626 (red)
Success:     #16A34A (green)
```

### 3. Navigation Style

**Decision**: Keep tab-based navigation but style it as pills/buttons

**Why**:
- Familiar pattern for users
- Simple to implement
- Clean look matches the reference design

### 4. Table Design

**Decision**: Card-style tables with rounded borders and hover effects

**Features**:
- Rounded corners on table container
- Alternating row backgrounds (subtle)
- Hover effect on rows
- Better padding and spacing
- Styled action buttons (edit/delete)

### 5. Form Design

**Decision**: Keep inline forms but style them as cards with better inputs

**Features**:
- Card container with shadow
- Styled input fields with focus states
- Better button styling (primary/secondary)
- Clear validation messages

## Risks / Trade-offs

1. **Risk**: Single CSS file could become large
   → **Mitigation**: Keep styles organized with comments, refactor if needed

2. **Risk**: Inline styles in components may conflict with CSS
   → **Mitigation**: Gradually remove inline styles, use CSS classes

3. **Risk**: May not look perfect on all screen sizes
   → **Mitigation**: Focus on desktop, basic responsiveness is bonus

## Migration Plan

1. Create `styles.css` with all styles
2. Update `main.tsx` to import the CSS file
3. Update each component to use CSS classes instead of inline styles
4. Test all functionality still works
5. Visual review and adjustments

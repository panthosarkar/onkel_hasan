# GitHub Copilot Prompt: Animated One-Page Portfolio Website

## Project Overview
Build a stunning **one-page portfolio website** with a logo, address, opening hours, and **maximum visual effects & animations**. Use **ONLY plain HTML, CSS, and JavaScript** — no frameworks, no libraries, no overhead.

---

## Visual Design Requirements

### Color Scheme (Dark Cyan Neon Aesthetic)
- **Background**: `#231F20` (very dark gray)
- **Accent/Glow**: `#EC2227` (pure red)
- **Text**: `#ffffff` (pure white)
- **Secondary Accent**: `#EC2227` (pure red)

### Layout
- **Single centered column** with flex layout
- **Logo at top**: Large, prominent, animated
- **Two info blocks below**: Address and Opening Hours
- **Full viewport height**: Centered on screen
- **Responsive**: Works on mobile and desktop

---

## Required Animations & Effects

### 1. **Logo Animations**
- `float`: Gentle up-down movement (3s cycle)
- `glow`: Text shadow pulsing (2s cycle)
- Combine both animations simultaneously
- Apply `text-shadow: 0 0 20px rgba(0, 238, 255, 0.5), 0 0 40px rgba(0, 200, 255, 0.3);`

### 2. **Info Block Animations**
- `slideUp`: Fade in + slide from bottom on page load (0.8s)
- Stagger animation delays (1st block: 0.1s, 2nd block: 0.3s)
- `::before` pseudo-element: Horizontal gradient sweep across top border (2s infinite)

### 3. **Hover Effects on Info Blocks**
- Border color change: `#00eeff` → `#00ffff`
- Add glowing box-shadow: `0 0 30px rgba(0, 238, 255, 0.4), inset 0 0 30px rgba(0, 238, 255, 0.1)`
- Lift effect: `transform: translateY(-5px)`
- Smooth transition (0.3s)

### 4. **Background Effects**
- **Gradient background**: Linear gradient 135deg from `#0a0f1a` to `#1a0f2e` to `#0f1a2e`
- **Radial glow overlays**: 
  - Circle at 20% 50%: `rgba(0, 238, 255, 0.08)`
  - Circle at 80% 80%: `rgba(0, 200, 255, 0.06)`
- Apply as `::before` pseudo-element with `fixed` positioning

### 5. **Floating Particles**
- Generate **30 particles** dynamically via JavaScript
- Each particle: 4×4px cyan dots (`#00eeff`)
- **Animation**: `float-particle` (8s, infinite, ease-in-out)
  - Start: opacity 0
  - 10%: opacity 0.6
  - 90%: opacity 0.6
  - End: opacity 0, moved up and right
- Random horizontal offset per particle
- Responsive to mouse: increase opacity when cursor is within 100px

### 6. **Corner Accent Elements**
- **Top-left**: 200×200px border box, top & right borders only
- **Bottom-right**: 200×200px border box, bottom & left borders only
- Border color: `rgba(0, 238, 255, 0.2)`
- Animation: `cornerPulse` (3s infinite)
  - 0%/100%: opacity 0.2
  - 50%: opacity 0.6
- Stagger: bottom-right has 0.5s delay

### 7. **Icon Pulse Effect**
- Small icons (address, phone, hours): Pulsing opacity (2s infinite)
- Stagger each icon by 0.3s delay
- Pulse: 0%/100% opacity 1, 50% opacity 0.5

### 8. **Divider Lines**
- Thin horizontal line (1px) between title and content
- Gradient: transparent → cyan → transparent
- Creates visual separation

---

## HTML Structure

### Logo Section
```
<div class="logo">STUDIO</div>
```

### Info Block Template
```
<div class="info-block">
    <h2>📍 Address</h2>
    <div class="divider"></div>
    <div class="address-item">
        <span class="label">Main Studio</span>
        <p class="value">
            123 Creative Street<br>
            Design City, DC 10001<br>
            United States
        </p>
    </div>
</div>

<div class="info-block">
    <h2>🕐 Opening Hours</h2>
    <div class="divider"></div>
    <div class="hours-item">
        <span class="label">Monday - Friday</span>
        <p class="value">9:00 AM - 6:00 PM</p>
    </div>
    <div class="hours-item">
        <span class="label">Saturday</span>
        <p class="value">10:00 AM - 4:00 PM</p>
    </div>
    <div class="hours-item">
        <span class="label">Sunday</span>
        <p class="value">Closed</p>
    </div>
</div>
```

### Particle & Corner Elements
```
<div class="floating-particles" id="particles"></div>
<div class="corner-accent top-left"></div>
<div class="corner-accent bottom-right"></div>
```

---

## CSS Requirements

### Global Styles
- **Box-sizing**: `border-box` on all elements
- **Font-family**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Overflow-x**: hidden (no horizontal scrolling)

### Body Styling
- **Background**: Multi-layer (gradient + radial overlays)
- **Min-height**: 100vh
- **Position**: relative
- **Color**: `#e2f4ff`

### Container (Flexbox)
- **Position**: relative with z-index 1
- **Display**: flex, column direction
- **Justify-content**: center
- **Align-items**: center
- **Min-height**: 100vh
- **Padding**: 40px 20px

### Info Block Styling
- **Background**: `rgba(10, 15, 26, 0.6)` with `backdrop-filter: blur(10px)`
- **Border**: 2px solid `#00eeff`
- **Border-radius**: 12px
- **Padding**: 40px
- **Responsive hover states** (see Hover Effects section)

### Typography
- **Logo**: 48px, bold, letter-spacing 2px
- **Block Heading (h2)**: 20px, uppercase, letter-spacing 3px, color `#00eeff`
- **Block Content (p)**: 16px, line-height 1.8, color `#e2f4ff`
- **Labels**: 12px, uppercase, letter-spacing 2px, color `#00eeff`, font-weight 600
- **Values**: 15px, color `#e2f4ff`

### Responsive Design
- **Mobile (max-width: 600px)**:
  - Logo: 36px
  - Info block padding: 30px
  - Info block h2: 18px

---

## JavaScript Requirements

### Particle System
1. **Create function**: `createParticles()`
   - Generate 30 particles dynamically
   - Append to `.floating-particles` container
   - Randomize initial position (0-100% left, 0-100% top)
   - Randomize animation duration (6-10 seconds)
   - Randomize animation delay (0-2 seconds)

2. **Mouse Interaction**: 
   - Listen to `mousemove` event
   - For each particle, calculate distance to cursor
   - If distance < 100px: set opacity to 1 (brighten particle)
   - Otherwise: maintain default animation opacity

3. **Call on load**: Execute `createParticles()` on page load

---

## Keyframe Animations (CSS)

### `@keyframes float`
- 0%, 100%: `translateY(0px)`
- 50%: `translateY(-20px)`

### `@keyframes glow`
- 0%, 100%: text-shadow with 0.5 opacity
- 50%: text-shadow with 0.8 opacity

### `@keyframes slideUp`
- From: opacity 0, `translateY(40px)`
- To: opacity 1, `translateY(0)`

### `@keyframes sweep`
- 0%: opacity 0
- 50%: opacity 1
- 100%: opacity 0

### `@keyframes pulse`
- 0%, 100%: opacity 1
- 50%: opacity 0.5

### `@keyframes float-particle`
- 0%: opacity 0, `translateY(0) translateX(0)`
- 10%: opacity 0.6
- 90%: opacity 0.6
- 100%: opacity 0, `translateY(-100vh) translateX(100px)`

### `@keyframes cornerPulse`
- 0%, 100%: opacity 0.2
- 50%: opacity 0.6

---

## File Structure
```
project-root/
├── index.html
└── (All CSS and JS embedded in HTML file)
```

---

## Quality Checklist

✅ All animations smooth (no jank)
✅ Logo floats and glows simultaneously
✅ Info blocks slide up on load with staggered timing
✅ Hover effects add depth and interactivity
✅ Particles float smoothly and react to mouse
✅ Corner accents pulse in background
✅ Dividers have gradient effect
✅ No external libraries or frameworks
✅ Responsive on mobile (max-width 600px)
✅ Dark cyan neon aesthetic maintained throughout
✅ All effects run at 60fps (no performance issues)

---

## Notes for Copilot

- **Priority**: Visual effects first, then responsiveness
- **Performance**: Use CSS animations (GPU-accelerated), minimize JavaScript reflows
- **Cross-browser**: Ensure backdrop-filter, gradient, and animation support
- **Accessibility**: Keep semantic HTML, ensure readability with sufficient contrast
- **The effect density matters**: Client expects "pagla" (wild) animations — don't hold back on effects

---

## Example Content (Can Be Customized)

### Logo
- "STUDIO" (or client's name)

### Address
- Main Studio
- 123 Creative Street
- Design City, DC 10001
- United States

### Opening Hours
- Monday - Friday: 9:00 AM - 6:00 PM
- Saturday: 10:00 AM - 4:00 PM
- Sunday: Closed

---

**End of Prompt**

# Design System Strategy: The Compassionate Exchange

## 1. Overview & Creative North Star
The "Compassionate Exchange" is the creative North Star of this design system. We are moving away from the "utility-only" look of standard logistics software to create an **Editorial SaaS** experience. Our goal is to balance the high-stakes precision of a marketplace with the soulful, human-centric nature of food donation.

Instead of a rigid, boxed-in grid, we utilize **Organic Structure**. This means using intentional white space, subtle overlapping layers, and a hierarchy that feels like a premium lifestyle magazine. We don't just "show data"; we "narrate impact." By using asymmetrical layouts and tonal depth, we ensure the platform feels sophisticated, trustworthy, and inherently modern.

---

## 2. Colors & Surface Philosophy
The palette is rooted in nature and urgency. We use `primary` (#154212) to ground the experience in sustainability, while `secondary` (#855300) provides the warmth of a shared meal.

### The "No-Line" Rule
To achieve a high-end feel, **1px solid borders are prohibited for sectioning.** We define boundaries through background shifts. For example, a dashboard sidebar should use `surface_container_low` against a `surface` main content area. This creates a "soft edge" that feels integrated rather than partitioned.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of fine paper. 
- **Base Layer:** `surface` (#f8f9fa)
- **Sectioning:** `surface_container_low` (#f3f4f5) for large layout blocks.
- **Interactive Elements:** `surface_container_lowest` (#ffffff) for primary cards and input fields to make them "pop."
- **Nesting:** Never place two surfaces of the same tone adjacent to each other. Always step up or down one tier to define hierarchy.

### The "Glass & Gradient" Rule
Standard flat colors are for utilities; we are building a movement. 
- **Floating Modals/Nav Bars:** Use `surface` at 80% opacity with a `backdrop-blur` of 12px to create a frosted glass effect.
- **Hero Transitions:** Use a subtle linear gradient from `primary` (#154212) to `primary_container` (#2d5a27) to add depth and "soul" to high-impact areas.

---

## 3. Typography
We utilize **Inter** to maintain a clean, SaaS-inspired legibility, but we apply it with editorial intent.

*   **Display (lg/md/sm):** Reserved for impact statements (e.g., "3,000 Meals Diverted"). Use tight letter-spacing (-0.02em) to give it an authoritative, custom look.
*   **Headline (lg/md/sm):** Your primary navigational anchors. These should feel bold and intentional.
*   **Title (lg/md/sm):** Used for card headings and section titles.
*   **Body (lg/md/sm):** The workhorse. Always use `on_surface_variant` (#42493e) for secondary body text to reduce visual vibration and increase "warmth."
*   **Labels:** Use `label-md` in all-caps with +0.05em tracking for category tags or small metadata to distinguish it from body prose.

---

## 4. Elevation & Depth
In this system, depth is a function of light and layering, not heavy shadows.

*   **The Layering Principle:** Softness over structure. To elevate a card, don't reach for a shadow first; reach for `surface_container_lowest`. The contrast against a `surface_container` background provides all the "lift" needed.
*   **Ambient Shadows:** If an element must float (like a FAB or a Dropdown), use an extra-diffused shadow: `box-shadow: 0 12px 32px rgba(25, 28, 29, 0.04)`. The shadow color is a tinted version of `on_surface`, never pure black.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use `outline_variant` at 15% opacity. It should be felt, not seen.
*   **Glassmorphism:** Use `surface_variant` with 60% alpha for elements that need to feel lightweight and modern, allowing the underlying brand colors to bleed through softly.

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary_container`), `md` (12px) corners. High-contrast `on_primary` text.
- **Secondary:** `surface_container_high` background with `primary` text. No border.
- **Tertiary:** Pure text with `primary` color. Use for low-emphasis actions like "Cancel."

### Cards & Lists
- **The Divider Ban:** Never use horizontal lines to separate list items. Use 16px–24px of vertical white space (from our spacing scale) or alternate background tints (`surface` vs `surface_container_low`).
- **Cards:** Use `radius-lg` (16px) for a friendlier, community feel.

### Input Fields
- **Default State:** `surface_container_lowest` background with a subtle `outline_variant` (20% opacity).
- **Focus State:** Transition the "Ghost Border" to a 2px `primary` glow.

### Signature Component: The Impact Meter
A bespoke progress bar using a gradient of `secondary` (#855300) to `secondary_container` (#fea619). This visualizes "urgency" and "warmth" simultaneously, encouraging donors to complete their listing.

---

## 6. Do’s and Don’ts

### Do
*   **Do use asymmetrical white space.** Let the layout "breathe" to evoke a sense of calm and trust.
*   **Do use Tonal Layering.** Create depth by stacking slightly different shades of off-white and grey.
*   **Do use "Primary Fixed" colors** for static elements that need to remain legible regardless of theme shifts.

### Don’t
*   **Don’t use 100% black text.** Use `on_surface` (#191c1d) to keep the "warm SaaS" vibe.
*   **Don’t use standard 1px borders.** They make the app look like a generic template.
*   **Don’t over-use the Secondary (Amber) color.** It is a "spark" of urgency; if used everywhere, it loses its power. Save it for CTAs and status alerts.
*   **Don’t use sharp corners.** Everything in this ecosystem should feel approachable; adhere strictly to the `md` (8px) and `lg` (16px) rounding scale.
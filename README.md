# HVAC AI Answering Service, marketing site

Landing page for a 24/7 AI phone receptionist sold to HVAC business owners.
The receptionist answers missed calls, triages emergencies, books jobs into
the customer's calendar, and pushes qualified leads to their CRM.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:5173

```bash
npm run build     # production build to dist/
npm run preview   # serve the production build
```

## Stack

- React 19 + TypeScript, Vite
- Tailwind v4 (`@tailwindcss/vite`, tokens defined in `src/index.css`)
- Motion (`motion/react`) for all animation
- Phosphor icons
- Outfit for text, Space Grotesk for the feature-section title

## Structure

```
src/
  sections/    Home page sections, in render order
  pages/       Routed pages: Home, Solutions, Testimonials, Contact
  components/  Nav, Footer, Orb
  data/        Review content
  hooks/       useMediaQuery
public/        Generated hero and orb loops, favicon
PRODUCT.md     Confirmed product facts and open decisions
```

## Design constraints

- Locked palette: off-white `#FFFDF7` and royal blue `#274AB3`. Amber appears
  once, on the star rating, as a review convention rather than a second accent.
- No em-dashes or en-dashes anywhere in visible copy.
- One light theme throughout. No section inverts.
- Radius system: buttons full pill, cards 16px, inputs 8px.
- All motion honors `prefers-reduced-motion`.

## Video loops

`public/hero-loop.mp4` and `public/orb-loop.mp4` are palindrome encodes: the
source plays forward then reverse, so `loop` never hard cuts. The duplicate
frames at the turnaround and the loop point are trimmed. Regenerating them
from new source requires the same treatment, otherwise the seam returns.

The hero file also has its color correction baked in rather than applied as a
CSS filter, since a fullscreen `hue-rotate` repaints every frame.

## Placeholders, replace before launch

These are stand-ins. None of them are real.

- **Logo.** The company name, Lead Digital, is real and in place. The circular
  orb mark beside it in the nav and footer is a stand-in for a real logo file.
- **Agent naming is inconsistent.** The nav says Lead Digital, the hero CTA
  says "Talk to our AI", and the hero subtext, FAQ, Solutions, and Contact
  pages still call the receptionist "Sarah". Pick one and apply it.
- **Reviews.** Everything in `src/data/testimonials.ts` is invented, and is
  marked as such in that file. Replace with real reviews quoted verbatim,
  with permission and attribution.
- **Ratings and counts.** The 4.9 star average, "120+ HVAC businesses", and
  the 110,926 answered-calls figure are placeholders.
- **Pricing.** The $9,000 vs $500 comparison and the $102,000 annual saving
  came from the brief and have not been verified.
- **Integrations.** The site says jobs are booked into the customer's
  calendar but never names a system. Do not add ServiceTitan, Housecall Pro,
  Jobber, or any partner logo without confirming the integration exists.

## Stubs, not wired up

- "Call Agent" in the demo section does nothing yet.
- "Sign In" in the nav is a non-functional placeholder.
- The contact form validates and shows a success state, but does not submit
  anywhere. Point it at a real endpoint before launch.

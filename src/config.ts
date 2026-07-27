/* Single place for the outbound links, so changing one changes it everywhere. */

export const PHONE_DISPLAY = "(888) 861-0275";
export const PHONE_HREF = "tel:+18888610275";

/* TODO: replace with the real Calendly URL. It was mentioned but not
   supplied, so every audit button currently falls back to the contact
   page rather than pointing at a broken link. */
export const CALENDLY_URL = "";

/* Where an audit button should send someone: Calendly when it is set,
   the contact form until then. */
export const bookingTarget = CALENDLY_URL || "/contact";
export const bookingIsExternal = Boolean(CALENDLY_URL);

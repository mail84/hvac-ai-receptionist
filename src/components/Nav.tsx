import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { List, X } from "@phosphor-icons/react";
import BookButton from "./BookButton";

/* TODO: swap the orb mark for the real logo file once provided. */
function Wordmark() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Lead Digital, home">
      <span aria-hidden className="block h-6 w-6 rounded-full orb-surface" />
      <span className="text-lg font-semibold tracking-tight">Lead Digital</span>
    </Link>
  );
}

const links = [
  { to: "/solutions", label: "Solutions" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Wordmark />

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm transition-colors hover:text-royal ${
                  isActive ? "text-royal" : "text-slate"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {/* Sign In is a placeholder, not wired to anything yet. */}
          <button
            type="button"
            className="rounded-full px-4 py-2 text-sm text-slate transition-colors hover:text-ink"
          >
            Sign In
          </button>
          <BookButton className="rounded-full bg-royal px-5 py-2.5 text-sm font-medium text-cream transition-[background-color,transform] hover:bg-royal-deep active:scale-[0.98]" />
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-full p-2 text-ink md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
        </button>
      </nav>

      {open && (
        <div className="z-50 border-t border-line bg-cream px-4 pb-5 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[15px] text-ink hover:bg-royal-soft"
              >
                {l.label}
              </NavLink>
            ))}
            <button
              type="button"
              className="rounded-lg px-3 py-2.5 text-left text-[15px] text-slate"
            >
              Sign In
            </button>
            <BookButton className="mt-2 block rounded-full bg-royal px-5 py-3 text-center text-[15px] font-medium text-cream" />
          </div>
        </div>
      )}
    </header>
  );
}

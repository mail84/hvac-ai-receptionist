import { Link } from "react-router-dom";
import { LinkedinLogo, XLogo, YoutubeLogo } from "@phosphor-icons/react";

const columns = [
  {
    heading: "Product",
    items: [
      { label: "Solutions", to: "/solutions" },
      { label: "Testimonials", to: "/testimonials" },
      { label: "Book a Demo", to: "/contact" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "Contact", to: "/contact" },
      { label: "Sign In", to: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="block h-6 w-6 rounded-full orb-surface" />
            <span className="text-lg font-semibold tracking-tight">Sarah</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate">
            The 24/7 AI answering service built for HVAC companies. Every call
            answered, every job booked.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="#" aria-label="X" className="rounded-full border border-line p-2 text-slate transition-colors hover:text-royal">
              <XLogo size={17} />
            </a>
            <a href="#" aria-label="LinkedIn" className="rounded-full border border-line p-2 text-slate transition-colors hover:text-royal">
              <LinkedinLogo size={17} />
            </a>
            <a href="#" aria-label="YouTube" className="rounded-full border border-line p-2 text-slate transition-colors hover:text-royal">
              <YoutubeLogo size={17} />
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.heading}>
            <h3 className="text-sm font-semibold">{col.heading}</h3>
            <ul className="mt-3 space-y-2.5">
              {col.items.map((item) => (
                <li key={item.label}>
                  {item.to.startsWith("/") ? (
                    <Link to={item.to} className="text-sm text-slate transition-colors hover:text-royal">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="cursor-default text-sm text-slate">{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-5 text-xs text-slate sm:px-6">
          <span>Sarah AI receptionist for HVAC</span>
          <a href="mailto:mail@leaddigital.org" className="transition-colors hover:text-royal">
            mail@leaddigital.org
          </a>
        </div>
      </div>
    </footer>
  );
}

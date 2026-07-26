import { useState, type FormEvent } from "react";
import { CircleNotch, CheckCircle } from "@phosphor-icons/react";

type Status = "idle" | "submitting" | "done";

/*
  Demo booking form. Submission is a stub for now: validates, shows a
  loading beat, then confirms. Wire to the real endpoint before launch.
*/
export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(data.get("name")).trim()) next.name = "Please add your name.";
    if (!String(data.get("company")).trim()) next.company = "Please add your company name.";
    const phone = String(data.get("phone")).trim();
    if (!phone || phone.replace(/\D/g, "").length < 10) {
      next.phone = "Please add a phone number we can reach you at.";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("submitting");
    window.setTimeout(() => setStatus("done"), 900);
  }

  if (status === "done") {
    return (
      <div className="mx-auto max-w-xl px-4 py-28 text-center sm:px-6">
        <CheckCircle size={52} weight="fill" className="mx-auto text-royal" />
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">
          You are booked for a callback
        </h1>
        <p className="mt-3 text-slate">
          We will call you within one business day to run your audit. It takes
          about 20 minutes, on your own phone line.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-20 sm:px-6 md:py-24">
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Book your free audit</h1>
      <p className="mt-4 text-lg text-slate">
        20 minutes with our team. We look at the calls you are missing, show
        you the AI answering one, and you decide from there.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-6">
        <Field label="Your name" name="name" error={errors.name} autoComplete="name" />
        <Field label="Company" name="company" error={errors.company} autoComplete="organization" />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          error={errors.phone}
          autoComplete="tel"
          help="We call you, so you hear the product on a real line."
        />
        <Field label="Email (optional)" name="email" type="email" autoComplete="email" />

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-royal px-7 py-4 font-medium text-cream transition-[background-color,transform] hover:bg-royal-deep active:scale-[0.98] disabled:opacity-70 sm:w-auto"
        >
          {status === "submitting" && <CircleNotch size={18} className="animate-spin" />}
          {status === "submitting" ? "Booking" : "Book my free audit"}
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  help,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  help?: string;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : help ? `${name}-help` : undefined}
        className={`rounded-lg border bg-white px-4 py-3 text-[15px] outline-none transition-colors focus:border-royal focus:ring-2 focus:ring-royal/25 ${
          error ? "border-cost-red" : "border-line"
        }`}
      />
      {help && !error && (
        <p id={`${name}-help`} className="text-[13px] text-slate">
          {help}
        </p>
      )}
      {error && (
        <p id={`${name}-error`} className="text-[13px] font-medium text-cost-red">
          {error}
        </p>
      )}
    </div>
  );
}

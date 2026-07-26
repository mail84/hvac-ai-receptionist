import { useEffect, useState } from "react";

/*
  Used to mount desktop-only and mobile-only branches rather than hiding
  them with CSS. The feature section has a video in its desktop branch;
  hiding it with `display:none` would still download it on phones.
*/
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

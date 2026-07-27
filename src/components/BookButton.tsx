import { Link } from "react-router-dom";
import { bookingTarget, bookingIsExternal } from "../config";

/*
  Every "book an audit" control on the site. Renders an external anchor
  once a Calendly URL is set, and an internal link to the contact form
  until then, so no button is ever dead.
*/
export default function BookButton({
  children = "Book Free Audit",
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  if (bookingIsExternal) {
    return (
      <a href={bookingTarget} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={bookingTarget} className={className}>
      {children}
    </Link>
  );
}

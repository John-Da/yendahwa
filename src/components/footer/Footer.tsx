import "../../index.css";
import "./Footer.css";
import { SOCIALICONS, SKILLICONS } from "../../assets/iconsvg/iconList";
import { SOCIALLINKS } from "../../PathTO"; // Removed unused PATHTO + Link

// Define props type
interface FooterProps {
  footerFor: "home" | "project" | string;
}

function Footer({ footerFor }: FooterProps) {
  return (
    <>
      {footerFor === "home" ? (
        <div className="footer-container">
          <span>© 2025 | @dada&apos;s Portfolio |</span>
          <ul>
            <li>
              <a target="_blank" href={SOCIALLINKS.gh}>
                <img src={SKILLICONS["gh"]} alt="GitHub" />
              </a>
            </li>
            <li>
              <a target="_blank" href={SOCIALLINKS.fb}>
                <img src={SOCIALICONS["fb"]} alt="Facebook" />
              </a>
            </li>
            <li>
              <a target="_blank" href={SOCIALLINKS.ig}>
                <img src={SOCIALICONS["ig"]} alt="Instagram" />
              </a>
            </li>
            <li>
              <a target="_blank" href={SOCIALLINKS.th}>
                <img src={SOCIALICONS["at"]} alt="Thread" />
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <div className="footer-container">
          <span>© 2025 | @dada&apos;s Portfolio |</span>
          <span>
            <ul>
              <li>
                <a target="_blank" href={SOCIALLINKS.gh}>
                  <img src={SKILLICONS["gh"]} alt="GitHub" />
                </a>
              </li>
              <li>
                <a target="_blank" href={SOCIALLINKS.fb}>
                  <img src={SOCIALICONS["fb"]} alt="Facebook" />
                </a>
              </li>
              <li>
                <a target="_blank" href={SOCIALLINKS.ig}>
                  <img src={SOCIALICONS["ig"]} alt="Instagram" />
                </a>
              </li>
              <li>
                <a target="_blank" href={SOCIALLINKS.th}>
                  <img src={SOCIALICONS["at"]} alt="Thread" />
                </a>
              </li>
            </ul>
          </span>
        </div>
      )}
    </>
  );
}

export default Footer;

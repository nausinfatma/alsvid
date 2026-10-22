import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { nav, services, site } from '../data/site';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col-main">
          <Link to="/" className="footer-logo-link" aria-label={`${site.name} Home`}>
            <img
              src="/images/logo.png"
              alt={site.name}
              className="footer-logo"
              width="180"
              height="48"
            />
          </Link>
          <p className="footer-lead">{site.tagline}</p>
          <p className="footer-desc">{site.description}</p>

          <div className="footer-contact-list">
            <a href={`tel:${site.phone}`} className="footer-contact-item">
              <Phone size={16} aria-hidden />
              <span>{site.phoneDisplay}</span>
            </a>
            <a href={`mailto:${site.email}`} className="footer-contact-item">
              <Mail size={16} aria-hidden />
              <span>{site.email}</span>
            </a>
            <div className="footer-contact-item">
              <MapPin size={16} aria-hidden />
              <span>{site.address}</span>
            </div>
          </div>
        </div>

        <nav className="footer-col" aria-label="Services Navigation">
          <h2>Our Services</h2>
          <ul>
            {services.map(s => (
              <li key={s.slug}>
                <Link to={s.path}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Company Navigation">
          <h2>Company</h2>
          <ul>
            {nav
              .filter(n => ['/about', '/gallery', '/contact'].includes(n.to))
              .map(n => (
                <li key={n.to}>
                  <Link to={n.to}>{n.label}</Link>
                </li>
              ))}
          </ul>

          <h2 className="footer-social-title">Connect With Us</h2>
          <div className="footer-social-links">
            <a
              href={site.socials.facebook}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Facebook"
            >
              Facebook
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href={site.socials.twitter}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="X (Twitter)"
            >
              X
            </a>
            <a
              href={site.socials.youtube}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="YouTube"
            >
              YouTube
            </a>
          </div>
        </nav>
      </div>

      <div className="container footer-base">
        <div>
          © {currentYear} {site.name}. All rights reserved.
        </div>
        <div className="footer-base-links">
          <span>Kolkata, West Bengal, India</span>
        </div>
      </div>
    </footer>
  );
}

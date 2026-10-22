import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { nav, site } from '../data/site';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="header">
      <div className="container header-row">
        <Link to="/" className="brand" aria-label={`${site.name} Home`}>
          <img
            src="/images/logo.png"
            alt={site.name}
            className="brand-logo"
            width="170"
            height="46"
          />
        </Link>

        <button
          className="menu-btn"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(o => !o)}
        >
          {open ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>

        <nav id="main-nav" className={`nav ${open ? 'is-open' : ''}`} aria-label="Main Navigation">
          <ul>
            {nav.map(item => (
              <li key={item.to} className={item.children ? 'has-sub' : undefined}>
                <NavLink to={item.to} end={item.to === '/'}>
                  {item.label}
                  {item.children && <ChevronDown size={14} aria-hidden className="sub-icon" />}
                </NavLink>
                {item.children && (
                  <ul className="sub">
                    {item.children.map(c => (
                      <li key={c.to}>
                        <NavLink to={c.to}>{c.label}</NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-cta">
          <a href={`tel:${site.phone}`} className="phone-badge" title="Call Us">
            <Phone size={15} aria-hidden />
            <span>{site.phoneDisplay}</span>
          </a>
          <Link to="/contact" className="btn btn-sm">
            Get Support
          </Link>
        </div>
      </div>
    </header>
  );
}

import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import { gallery, partners, services, site, whyChooseUs } from '../data/site';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function Home() {
  useDocumentMeta(
    'Alsvid Infocom Pvt Ltd - IT & Skill Development Training',
    site.lead
  );

  const core = services.filter(s => s.group === 'core');
  const bpo = services.filter(s => s.group === 'bpo');

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            
            <h1>Expert IT Support and Training for Skill Development</h1>
            <p className="lead">{site.lead}</p>
            <div className="actions">
              <Link className="btn btn-primary" to="/contact">
                Get Support Now
              </Link>
              <Link className="btn btn-secondary" to="/bpo">
                Explore BPO Solutions
              </Link>
            </div>
            <div className="hero-quick-contact">
              <span>Direct Support Helpline:</span>
              <a href={`tel:${site.phone}`} className="hero-phone-link">
                <Phone size={15} aria-hidden /> {site.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card-main">
              <img
                src="/images/hero-bg.webp"
                alt="IT professionals at Alsvid Infocom"
                className="hero-card-img"
              />
              <div className="hero-card-overlay">
                <div className="hero-stat">
                  <strong>100% Dedicated</strong>
                  <span>IT & ITeS Skill Partner</span>
                </div>
                <div className="hero-stat-tag">Kolkata, WB</div>
              </div>
            </div>
            <ul className="hero-service-pills" aria-label="Key Services">
              <li>
                <Link to="/professional-services">
                  <span>Explore all Professional Services</span>
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Program Partners Section */}
      <section className="partners-section">
        <div className="container">
          <div className="partners-inner">
            <div className="partners-header">
              <span className="section-label">Official Collaborations</span>
              <h2>Our Skill Training Program Partners</h2>
              <p>Proudly contributing to government-backed skill development initiatives</p>
            </div>
            <div className="partners-grid">
              {partners.map(p => (
                <div key={p.name} className="partner-card">
                  <img src={p.logo} alt={p.name} className="partner-logo" loading="lazy" />
                  <div className="partner-info">
                    <strong>{p.name}</strong>
                    <span>{p.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core IT Services */}
      <section className="section" id="it-services">
        <div className="container">
          <div className="section-header">
            <span className="section-label">What We Do</span>
            <h2>Professional Services</h2>
            <p className="lead">
              Explore IT support, training, skill development, and specialist software services for energy and electrical operations.
            </p>
          </div>
          <div className="grid-3">
            {core.map(s => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section why-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-label">Why Partner With Us</span>
            <h2>Why Choose Alsvid Infocom</h2>
            <p className="lead center-lead">
              Alsvid Infocom provides trusted IT and ITeS skill solutions in India, combining technical expertise with personalized service.
            </p>
          </div>
          <div className="why-grid">
            {whyChooseUs.map(item => (
              <div key={item.num} className="why-card">
                <span className="why-num">{item.num}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BPO Section */}
      <section className="section tint" id="bpo-services">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Outsourcing & Support</span>
            <h2>Business Process Outsourcing (BPO)</h2>
            <p className="lead">
              With our years of experience as a BPO services provider in nearshore BPO services and call center outsourcing, we employ our expert agents so you can focus your resources on your core competencies.
            </p>
          </div>
          <div className="grid-3">
            {bpo.map(s => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
          <div className="bpo-cta-banner">
            <div>
              <h3>Need tailored BPO operations for your enterprise?</h3>
              <p>We build dedicated agent teams for healthcare, insurance, and academic organizations.</p>
            </div>
            <Link to="/contact" className="btn btn-primary">
              Discuss BPO Requirements
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Highlight */}
      <section className="section">
        <div className="container">
          <div className="section-header flex-between">
            <div>
              <span className="section-label">Workspace & Facilities</span>
              <h2>Inside Alsvid's World</h2>
              <p className="lead">
                Explore snapshots capturing our IT support, hands-on training sessions, and skill development moments within our vibrant workspace.
              </p>
            </div>
            <Link to="/gallery" className="btn btn-secondary btn-more">
              View All Photos <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
          <div className="gallery-preview-grid">
            {gallery.slice(0, 4).map((img, i) => (
              <div key={img.src} className={`gallery-item gallery-item-${i + 1}`}>
                <img src={img.src} alt={img.alt} loading="lazy" />
                {img.caption && <span className="gallery-caption">{img.caption}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reach Out CTA Section */}
      <section className="section reachout-section">
        <div className="container">
          <div className="reachout-card">
            <div className="reachout-text">
              <span className="reachout-tag">Get In Touch</span>
              <h2>Reach Out to Alsvid</h2>
              <p>
                Connect with us via phone, email, or visit our Kolkata center. We're here to assist you with IT services and skill development training.
              </p>
              <div className="reachout-details">
                <a href={`tel:${site.phone}`} className="reachout-item">
                  <Phone size={18} aria-hidden />
                  <span>{site.phoneDisplay}</span>
                </a>
                <a href={`mailto:${site.email}`} className="reachout-item">
                  <Mail size={18} aria-hidden />
                  <span>{site.email}</span>
                </a>
                <div className="reachout-item">
                  <MapPin size={18} aria-hidden />
                  <span>{site.address}</span>
                </div>
              </div>
            </div>
            <div className="reachout-action">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Send Us a Message
              </Link>
              <span className="reachout-subtext">Prompt response within 24 business hours</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

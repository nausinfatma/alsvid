import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Award, Compass, Eye, HeartHandshake, ShieldCheck, UserRound } from 'lucide-react';
import PageHero from '../components/PageHero';
import { partners, site, whyChooseUs } from '../data/site';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function About() {
  const [founderImageMissing, setFounderImageMissing] = useState(false);
  useDocumentMeta('About Us', `About ${site.name} - IT & Skill Development Partner`);

  return (
    <>
      <PageHero
        title="Empowering IT & Skills"
        intro="Alsvid Infocom Pvt Ltd is a dedicated Indian company supporting IT & IT-enabled services along with skill development training."
      />

      {/* Overview Section */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <span className="section-label">Company Overview</span>
              <h2>Building Human Potential & Technical Reliability</h2>
              <p className="lead">
                Alsvid Infocom Pvt Ltd empowers clients through robust IT support and comprehensive skill-building initiatives, fostering growth, employability, and sustainable operational expertise.
              </p>
              <p>
                Based in Kolkata, West Bengal, we bridge the gap between academic institutions and the requirements of modern corporate enterprises. From providing hands-on hardware and network maintenance to empowering hundreds of youth through accredited skill development curriculums, we take pride in being a dependable technology partner.
              </p>
              <div className="about-highlights">
                <div className="highlight-item">
                  <ShieldCheck size={20} className="highlight-icon" />
                  <div>
                    <strong>Recognized Collaboration</strong>
                    <span>Partner with Government of West Bengal & Utkarsh Bangla</span>
                  </div>
                </div>
                <div className="highlight-item">
                  <Award size={20} className="highlight-icon" />
                  <div>
                    <strong>Industry-Ready Training</strong>
                    <span>Practical laboratory experience, live projects, and certified instructors</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-visual">
              <div className="about-img-card">
                {founderImageMissing ? (
                  <div className="founder-photo-placeholder" role="img" aria-label="Founder portrait placeholder">
                    <UserRound size={72} strokeWidth={1.25} aria-hidden />
                    <span>Founder portrait</span>
                  </div>
                ) : (
                  <img
                    src="/images/founder/founder.jpg"
                    alt="Founder of Alsvid Infocom"
                    loading="lazy"
                    onError={() => setFounderImageMissing(true)}
                  />
                )}
                <div className="about-badge">
                  <strong>Founder</strong>
                  <span>Alsvid Infocom Pvt Ltd</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="section tint">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-label">Our Foundation</span>
            <h2>Vision, Mission & Core Values</h2>
          </div>
          <div className="vmv-grid">
            <div className="vmv-card">
              <div className="vmv-icon-wrap">
                <Eye size={28} />
              </div>
              <h3>Vision</h3>
              <p>{site.vision}</p>
            </div>
            <div className="vmv-card">
              <div className="vmv-icon-wrap">
                <Compass size={28} />
              </div>
              <h3>Mission</h3>
              <p>{site.mission}</p>
            </div>
            <div className="vmv-card">
              <div className="vmv-icon-wrap">
                <HeartHandshake size={28} />
              </div>
              <h3>Values</h3>
              <p>{site.values}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Alsvid */}
      <section className="section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-label">Our Advantages</span>
            <h2>Why Choose Alsvid Infocom</h2>
            <p className="lead center-lead">
              We provide trusted IT and skill development solutions across India, combining technical proficiency with personalized service delivery.
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

      {/* Skill Training Partners */}
      <section className="partners-section">
        <div className="container">
          <div className="partners-inner">
            <div className="partners-header">
              <span className="section-label">Accreditations & Alliances</span>
              <h2>Our Skill Training Program Partners</h2>
              <p>Driving impactful skill development alongside state training initiatives</p>
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

      {/* Action Banner */}
      <section className="section">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to collaborate with Alsvid Infocom?</h2>
            <p>
              Whether you need dependable IT systems support, skill development programs, or dedicated BPO teams, we are ready to assist.
            </p>
            <div className="actions">
              <Link to="/contact" className="btn btn-primary">
                Contact Our Team
              </Link>
              <a href={`tel:${site.phone}`} className="btn btn-secondary">
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import { Link } from 'react-router-dom';
import { Award, CheckCircle2, Headphones, Lock, ShieldCheck, Users } from 'lucide-react';
import PageHero from '../components/PageHero';
import ServiceCard from '../components/ServiceCard';
import { services, site } from '../data/site';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function Bpo() {
  useDocumentMeta(
    'Business Process Outsourcing (BPO) - Alsvid Infocom',
    'Specialized BPO services for Healthcare, Insurance, and Education organizations.'
  );

  const bpoServices = services.filter(s => s.group === 'bpo');

  return (
    <>
      <PageHero
        title="Business Process Outsourcing (BPO)"
        intro="With our years of experience as a BPO services provider in nearshore BPO services and call center outsourcing, we employ our expert agents so you can focus your resources on your core competencies."
        badge="Specialized Outsourcing"
      />

      <section className="section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-label">Tailored Industry Solutions</span>
            <h2>Our Core BPO Domains</h2>
            <p className="lead center-lead">
              Back-office, customer support, and administrative processing customized to regulatory standards and operational workflows.
            </p>
          </div>
          <div className="grid-3">
            {bpoServices.map(s => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section tint">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-label">Operational Excellence</span>
            <h2>Why Outsource to Alsvid Infocom</h2>
          </div>
          <div className="bpo-features-grid">
            <div className="bpo-feature-card">
              <Headphones size={28} className="bpo-feature-icon" />
              <h3>Trained & Dedicated Agents</h3>
              <p>Specialized agent pods thoroughly onboarded on your specific software, HIPAA guidelines, and workflows.</p>
            </div>
            <div className="bpo-feature-card">
              <Lock size={28} className="bpo-feature-icon" />
              <h3>Strict Data Privacy & Security</h3>
              <p>Robust workstation policies, encrypted transmissions, and rigorous compliance for sensitive records.</p>
            </div>
            <div className="bpo-feature-card">
              <ShieldCheck size={28} className="bpo-feature-icon" />
              <h3>SLA-Driven Delivery</h3>
              <p>Guaranteed turnaround times, daily accuracy audits, and transparent operational metrics.</p>
            </div>
            <div className="bpo-feature-card">
              <Users size={28} className="bpo-feature-icon" />
              <h3>Scalable Team Size</h3>
              <p>Flexibly ramp up seasonal admissions, claims volume surges, or year-end processing requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="section">
        <div className="container">
          <div className="cta-box">
            <h2>Start Your BPO Partnership With Us</h2>
            <p>
              Connect with our operations leads to design a pilot program or schedule a consultation.
            </p>
            <div className="actions">
              <Link to="/contact" className="btn btn-primary">
                Request BPO Consultation
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

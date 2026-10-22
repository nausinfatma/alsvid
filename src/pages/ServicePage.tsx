import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronRight, Phone } from 'lucide-react';
import PageHero from '../components/PageHero';
import { site, type Service } from '../data/site';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function ServicePage({ service }: { service: Service }) {
  useDocumentMeta(`${service.title} - ${site.name}`, service.summary);

  return (
    <>
      <PageHero
        title={service.title}
        intro={service.intro}
        badge={service.group === 'core' ? 'Professional Services' : 'Business Process Outsourcing'}
      />

      <section className="section">
        <div className="container service-detail-grid">
          <div className="service-main-content">
            <div className="service-overview-box">
              <h2>Service Overview</h2>
              <p className="lead">{service.summary}</p>
            </div>

            {service.image && (
              <div className="service-featured-image-wrap">
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-featured-image"
                  loading="lazy"
                />
              </div>
            )}

            <div className="service-scope-box">
              <h2>What Is Included in Our Service</h2>
              <p>Key deliverables and support channels provided by Alsvid Infocom:</p>
              <ul className="service-checks-list">
                {service.points.map(p => (
                  <li key={p}>
                    <CheckCircle2 size={20} className="check-icon" aria-hidden />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="service-sidebar">
            <div className="sidebar-card cta-card">
              <h3>Need {service.title}?</h3>
              <p>
                Get in touch with our solutions team to discuss timelines, customized training batches, or service level agreements.
              </p>
              <Link to="/contact" className="btn btn-primary btn-block">
                Inquire About {service.title} <ArrowRight size={16} />
              </Link>
              <a href={`tel:${site.phone}`} className="sidebar-phone">
                <Phone size={15} />
                <span>Call {site.phoneDisplay}</span>
              </a>
            </div>

            <div className="sidebar-card info-card">
              <h4>Why Choose Alsvid</h4>
              <ul className="sidebar-features">
                <li>Certified instructors & experienced IT engineers</li>
                <li>Official Government of West Bengal training partner</li>
                <li>Transparent reporting & dedicated relationship manager</li>
                <li>Tailored programs for individual or enterprise needs</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

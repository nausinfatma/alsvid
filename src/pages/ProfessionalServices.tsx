import ServiceCard from '../components/ServiceCard';
import PageHero from '../components/PageHero';
import { services, site } from '../data/site';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function ProfessionalServices() {
  useDocumentMeta('Professional Services', `Professional services from ${site.name}.`);
  const professionalServices = services.filter(service => service.group === 'core');

  return (
    <>
      <PageHero
        title="Professional Services"
        intro="Technology, training, energy monitoring, and electrical software services for growing teams."
      />
      <section className="section">
        <div className="container">
          <div className="grid-3">
            {professionalServices.map(service => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Service } from '../data/site';

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link to={service.path} className="card service-card">
      {service.image && (
        <div className="card-image-wrap">
          <img
            src={service.image}
            alt={service.title}
            className="card-image"
            loading="lazy"
          />
        </div>
      )}
      <div className="card-body">
        <span className="card-category">
          {service.group === 'core' ? 'Professional Service' : 'BPO Solution'}
        </span>
        <h3>{service.title}</h3>
        <p>{service.summary}</p>
        <span className="card-more">
          Learn more <ArrowRight size={16} aria-hidden />
        </span>
      </div>
    </Link>
  );
}

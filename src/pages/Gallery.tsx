import { useState } from 'react';
import { Camera, X } from 'lucide-react';
import PageHero from '../components/PageHero';
import { gallery, site } from '../data/site';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function Gallery() {
  useDocumentMeta('Gallery', "Inside Alsvid's World - Workspace, IT training and student moments.");
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; caption?: string } | null>(null);

  return (
    <>
      <PageHero
        title="Inside Alsvid's World"
        intro="Explore snapshots capturing our IT support, hands-on training sessions, and skill development moments within our vibrant workspace."
      />

      <section className="section">
        <div className="container">
          <div className="gallery-header-bar">
            <div className="gallery-counter">
              <Camera size={18} aria-hidden />
              <span>{gallery.length} Verified Workspace & Training Photos</span>
            </div>
          </div>

          <div className="gallery-cards-grid">
            {gallery.map(g => (
              <figure
                key={g.src}
                className="gallery-card"
                onClick={() => setSelectedImage(g)}
                tabIndex={0}
                role="button"
                aria-label={`View ${g.caption || g.alt}`}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setSelectedImage(g)}
              >
                <div className="gallery-img-container">
                  <img src={g.src} alt={g.alt} loading="lazy" />
                  <div className="gallery-hover-overlay">
                    <span>Click to Enlarge</span>
                  </div>
                </div>
                {g.caption && (
                  <figcaption className="gallery-card-caption">
                    <strong>{g.caption}</strong>
                    <span>{site.shortName} Facilities</span>
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="lightbox-backdrop"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button
              className="lightbox-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Close dialog"
            >
              <X size={24} />
            </button>
            <img src={selectedImage.src} alt={selectedImage.alt} />
            <div className="lightbox-caption">
              <strong>{selectedImage.caption || selectedImage.alt}</strong>
              <span>{site.name} • Kolkata Center</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

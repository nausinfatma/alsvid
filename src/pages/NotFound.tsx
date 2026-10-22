import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function NotFound() {
  useDocumentMeta('404 Page Not Found', 'The requested page could not be located.');

  return (
    <>
      <PageHero
        title="404 - Page Not Found"
        intro="The address may be mistyped, or the page you are looking for has moved."
        badge="Error"
      />
      <section className="section">
        <div className="container text-center">
          <div className="cta-box">
            <h2>Looking for IT Support or Training?</h2>
            <p>Return to our home page or reach out to our team directly.</p>
            <div className="actions">
              <Link className="btn btn-primary" to="/">
                Back to Home
              </Link>
              <Link className="btn btn-secondary" to="/contact">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

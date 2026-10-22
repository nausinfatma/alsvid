export default function PageHero({
  title,
  intro,
  badge,
}: {
  title: string;
  intro: string;
  badge?: string;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        {badge && <span className="hero-pill-badge">{badge}</span>}
        <h1>{title}</h1>
        <p className="lead">{intro}</p>
      </div>
    </section>
  );
}


import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Clock3,
} from "lucide-react";
import { articles, getArticleBySlug } from "../../data/articles";
import "./ArticlePage.css";

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug);

  useEffect(() => {
    if (!article) return;

    document.title = `${article.title} | WattSpring`;

    return () => {
      document.title = "WattSpring";
    };
  }, [article]);

  if (!article) {
    return <Navigate to="/history" replace />;
  }

  const relatedArticles = articles
    .filter(
      (item) =>
        item.slug !== article.slug &&
        (item.category === article.category ||
          item.collection === article.collection)
    )
    .slice(0, 3);

  return (
    <main className="article-page">
      <nav className="article-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to={article.collection === "history" ? "/history" : "/learn"}>
          {article.collection === "history" ? "History" : "Learn"}
        </Link>
        <span>/</span>
        <span className="article-breadcrumb-current">{article.title}</span>
      </nav>

      <header className="article-header">
        <span className="article-category">{article.category}</span>

        <h1>{article.title}</h1>

        <p className="article-description">{article.description}</p>

        <div className="article-meta">
          <span>
            <BookOpen size={15} />
            {article.author}
          </span>
          <span>
            <CalendarDays size={15} />
            {article.publishedAt}
          </span>
          <span>
            <Clock3 size={15} />
            {article.readingTime}
          </span>
        </div>
      </header>

      <figure className="article-cover">
        <img src={article.image} alt={article.imageAlt} />
      </figure>

      <div className="article-layout">
        <aside className="article-sidebar">
          <div className="article-toc">
            <h2>On this page</h2>
            <a href="#introduction">Introduction</a>

            {article.sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.heading}
              </a>
            ))}

            <a href="#references">References</a>
          </div>
        </aside>

        <article className="article-content">
          <section id="introduction" className="article-introduction">
            <span className="article-section-label">INTRODUCTION</span>
            <p>{article.introduction}</p>
          </section>

          {article.sections.map((section, index) => (
            <section
              id={section.id}
              className="article-section"
              key={section.id}
            >
              <h2>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {section.heading}
              </h2>

              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex}>{paragraph}</p>
              ))}

              {article.slug === "voltage-current-resistance" &&
                section.id === "ohms-law" && (
                  <div className="article-formula">
                    <span>OHM'S LAW</span>
                    <strong>V = I × R</strong>
                    <p>
                      Voltage = Current × Resistance
                    </p>
                  </div>
                )}
            </section>
          ))}

          <section id="references" className="article-references">
            <h2>References & further reading</h2>
            <p>
              Use these sources to explore the topic further. WattSpring
              articles should distinguish sourced facts from explanations and
              editorial interpretation.
            </p>

            <ol>
              {article.references.map((reference) => (
                <li key={reference.url}>
                  <a
                    href={reference.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {reference.title}
                    <ArrowUpRight size={14} />
                  </a>
                </li>
              ))}
            </ol>
          </section>

          <div className="article-back">
            <Link
              to={article.collection === "history" ? "/history" : "/learn"}
            >
              <ArrowLeft size={16} />
              Back to {article.collection === "history" ? "History" : "Learn"}
            </Link>
          </div>
        </article>
      </div>

      {relatedArticles.length > 0 && (
        <section className="article-related">
          <span className="article-section-label">KEEP EXPLORING</span>
          <h2>Related reading</h2>

          <div className="article-related-grid">
            {relatedArticles.map((related) => (
              <Link
                to={`/${related.collection}/${related.slug}`}
                className="article-related-card"
                key={related.slug}
              >
                <img src={related.image} alt={related.imageAlt} loading="lazy" />
                <span>{related.category}</span>
                <h3>{related.title}</h3>
                <p>{related.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

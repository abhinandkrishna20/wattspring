
import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  History as HistoryIcon,
  Search,
} from "lucide-react";
import "./History.css";

type HistoryCategory =
  | "Discoveries"
  | "Inventors"
  | "Energy History"
  | "Electrical Technology";

type HistoryArticle = {
  id: number;
  title: string;
  description: string;
  category: HistoryCategory;
  image: string;
  imageAlt: string;
  year: string;
};

const articles: HistoryArticle[] = [
  {
    id: 1,
    title: "How Humans First Discovered Electricity",
    description:
      "From ancient observations of amber to early experiments, explore humanity's first encounters with electrical phenomena.",
    category: "Discoveries",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Atmospheric scientific and natural landscape",
    year: "Ancient world",
  },
  {
    id: 2,
    title: "William Gilbert and the Early Study of Electricity",
    description:
      "Discover how systematic experiments helped distinguish electrical attraction from magnetism.",
    category: "Inventors",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Writing and research materials",
    year: "1600",
  },
  {
    id: 3,
    title: "Benjamin Franklin's Experiments with Electricity",
    description:
      "Explore the experiments and ideas that shaped early scientific understanding of lightning and electricity.",
    category: "Discoveries",
    image:
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Scientific laboratory equipment",
    year: "18th century",
  },
  {
    id: 4,
    title: "Michael Faraday and Electromagnetic Induction",
    description:
      "Learn how experiments with magnetism and electric current led to a principle behind modern generators.",
    category: "Inventors",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    imageAlt: "A modern engineering laboratory",
    year: "1831",
  },
  {
    id: 5,
    title: "The Invention and Evolution of the Electric Battery",
    description:
      "Follow the development of batteries and the changing ways people store and use electrical energy.",
    category: "Electrical Technology",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Battery technology",
    year: "1800 onwards",
  },
  {
    id: 6,
    title: "How Electric Lighting Changed Everyday Life",
    description:
      "Explore the development of electric lighting and its impact on homes, workplaces and cities.",
    category: "Energy History",
    image:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=80",
    imageAlt: "A city illuminated at night",
    year: "19th century",
  },
  {
    id: 7,
    title: "The Rise of Electric Power Stations",
    description:
      "Discover how power stations and distribution networks made electricity available to more communities.",
    category: "Energy History",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Electrical power infrastructure",
    year: "19th–20th century",
  },
  {
    id: 8,
    title: "The Development of Electric Motors",
    description:
      "Trace the progress of electric motors and their growing role in industry, transport and household devices.",
    category: "Electrical Technology",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Engineering and mechanical equipment",
    year: "19th century onwards",
  },
  {
    id: 9,
    title: "Nikola Tesla and the Alternating Current Era",
    description:
      "Understand the development of alternating-current systems and their importance in electrical distribution.",
    category: "Inventors",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Electrical transmission infrastructure",
    year: "Late 19th century",
  },
  {
    id: 10,
    title: "How Hydroelectricity Became a Major Power Source",
    description:
      "Learn how moving water became a practical way to generate electricity at scale.",
    category: "Energy History",
    image:
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Flowing water in a natural landscape",
    year: "19th century onwards",
  },
  {
    id: 11,
    title: "The Early History of Solar Cells",
    description:
      "Explore the scientific discoveries that eventually made solar photovoltaic electricity possible.",
    category: "Discoveries",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Solar panels in sunlight",
    year: "19th–20th century",
  },
  {
    id: 12,
    title: "How Electronics Transformed Modern Technology",
    description:
      "Discover how advances in electronic components paved the way for smaller and more capable devices.",
    category: "Electrical Technology",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Electronic circuit board",
    year: "20th century",
  },
  {
    id: 13,
    title: "The Story of Early Electrical Experiments",
    description:
      "See how observation, experimentation and scientific instruments advanced the study of electricity.",
    category: "Discoveries",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Laboratory research equipment",
    year: "17th–19th century",
  },
  {
    id: 14,
    title: "The Evolution of Electrical Measurement",
    description:
      "Explore the tools and methods used to measure voltage, current, resistance and electrical power.",
    category: "Electrical Technology",
    image:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Technical instruments and engineering",
    year: "19th century onwards",
  },
  {
    id: 15,
    title: "From Coal to Renewables: Changing Power Sources",
    description:
      "Understand how electricity generation has evolved and why the energy mix continues to change.",
    category: "Energy History",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Wind turbines generating electricity",
    year: "20th–21st century",
  },
  {
    id: 16,
    title: "The Growth of Microelectronics",
    description:
      "Learn how semiconductor advances helped bring computing and intelligent control into everyday devices.",
    category: "Electrical Technology",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Close-up of electronic circuitry",
    year: "20th century onwards",
  },
];

const categories = [
  "All",
  "Discoveries",
  "Inventors",
  "Energy History",
  "Electrical Technology",
] as const;

const PAGE_SIZE = 8;

export default function History() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredArticles = useMemo(() => {
    const query = search.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === "All" || article.category === activeCategory;

      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.year.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const totalPages = Math.ceil(filteredArticles.length / PAGE_SIZE);
  const safePage = Math.min(currentPage, Math.max(totalPages, 1));

  const visibleArticles = filteredArticles.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  function changeCategory(category: (typeof categories)[number]) {
    setActiveCategory(category);
    setCurrentPage(1);
  }

  function changeSearch(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  function goToPage(page: number) {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    document
      .getElementById("history-articles")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function getPageNumbers() {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (safePage <= 3) {
      return [1, 2, 3, -1, totalPages];
    }

    if (safePage >= totalPages - 2) {
      return [1, -1, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, -1, safePage - 1, safePage, safePage + 1, -2, totalPages];
  }

  return (
    <main className="history-page">
      <section className="history-intro">
        <span className="history-eyebrow">
          <HistoryIcon size={14} /> WATTSPRING ARCHIVE
        </span>
        <h1>History of Electricity</h1>
        <p>
          Discover the people, experiments and inventions that changed how
          humanity understands and uses electricity.
        </p>
      </section>

      <section className="history-archive">
        <div className="history-toolbar">
          <div className="history-category-tabs" aria-label="Filter history articles">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => changeCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <label className="history-search">
            <Search size={16} />
            <input
              type="search"
              placeholder="Search history..."
              value={search}
              onChange={(event) => changeSearch(event.target.value)}
            />
          </label>
        </div>

        <div className="history-results-heading">
          <h2 id="history-articles">Explore all articles</h2>
          <span>
            {filteredArticles.length}{" "}
            {filteredArticles.length === 1 ? "article" : "articles"}
          </span>
        </div>

        {visibleArticles.length > 0 ? (
          <div className="history-article-grid">
            {visibleArticles.map((article) => (
              <article className="history-article-card" key={article.id}>
                <div className="history-image-wrap">
                  <img
                    src={article.image}
                    alt={article.imageAlt}
                    loading="lazy"
                  />
                  <span className="history-image-year">{article.year}</span>
                </div>

                <div className="history-article-body">
                  <span className="history-article-category">
                    {article.category}
                  </span>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="history-empty">
            <Search size={26} />
            <h3>No articles found</h3>
            <p>Try another search term or select a different category.</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                changeCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}

        {totalPages > 1 && (
          <nav className="history-pagination" aria-label="History article pages">
            <button
              type="button"
              className="history-page-direction"
              disabled={safePage === 1}
              onClick={() => goToPage(safePage - 1)}
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>

            <div className="history-page-numbers">
              {getPageNumbers().map((page, index) =>
                page < 0 ? (
                  <span className="history-ellipsis" key={`ellipsis-${index}`}>
                    …
                  </span>
                ) : (
                  <button
                    type="button"
                    key={page}
                    aria-label={`Go to page ${page}`}
                    aria-current={safePage === page ? "page" : undefined}
                    className={safePage === page ? "active" : ""}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              type="button"
              className="history-page-direction"
              disabled={safePage === totalPages}
              onClick={() => goToPage(safePage + 1)}
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </nav>
        )}

        <p className="history-page-caption">
          {filteredArticles.length === 0
            ? "No results to display"
            : `Showing ${(safePage - 1) * PAGE_SIZE + 1}–${Math.min(
                safePage * PAGE_SIZE,
                filteredArticles.length
              )} of ${filteredArticles.length} articles`}
        </p>
      </section>
    </main>
  );
}

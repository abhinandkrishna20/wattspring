
import { useMemo, useState } from "react";
import {
  Zap,
  BatteryCharging,
  CircuitBoard,
  Cpu,
  Sun,
  Gauge,
  Waves,
  Radio,
  Lightbulb,
  Activity,
  Plug,
  BookOpen,
  Search,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Wind,
  House,
  Microscope,
  Calculator,
} from "lucide-react";
import "./Learn.css";
import { Link } from "react-router-dom";
import { articles } from "../../data/articles";

const topics = [
  { name: "Electricity Basics", description: "Voltage, current and resistance", icon: Zap, count: 12 },
  { name: "AC Circuits", description: "Alternating current and circuits", icon: Waves, count: 8 },
  { name: "DC Circuits", description: "Direct current and circuit laws", icon: BatteryCharging, count: 10 },
  { name: "Electronic Components", description: "Components and their functions", icon: CircuitBoard, count: 14 },
  { name: "Semiconductors", description: "Diodes, transistors and more", icon: Cpu, count: 9 },
  { name: "Digital Electronics", description: "Binary numbers and logic gates", icon: Calculator, count: 11 },
  { name: "Sensors & IoT", description: "Smart devices and connected systems", icon: Radio, count: 13 },
  { name: "Power & Energy", description: "Watts, units and energy usage", icon: Gauge, count: 10 },
  { name: "Electric Motors", description: "Motors, generators and machines", icon: Activity, count: 7 },
  { name: "Batteries & Storage", description: "Battery technologies and charging", icon: BatteryCharging, count: 8 },
  { name: "Solar Energy", description: "Photovoltaics and solar systems", icon: Sun, count: 12 },
  { name: "Wind Energy", description: "Wind power and generation", icon: Wind, count: 6 },
  { name: "Home Electricity", description: "Everyday electrical systems", icon: House, count: 9 },
  { name: "Energy Efficiency", description: "Reduce waste and save electricity", icon: Lightbulb, count: 8 },
  { name: "Power Electronics", description: "Converters and control systems", icon: Plug, count: 7 },
  { name: "Electrical Measurements", description: "Meters and testing instruments", icon: Gauge, count: 8 },
  { name: "Embedded Systems", description: "Microcontrollers and firmware", icon: Cpu, count: 11 },
  { name: "Research & Experiments", description: "Explore data and practical science", icon: Microscope, count: 5 },
];

const tutorials = [
  {
    title: "Voltage, Current and Resistance Explained",
    description:
      "Understand three essential electrical quantities, how they relate to one another, and where they appear in everyday circuits.",
    category: "Electricity Basics",
    readTime: "6 min read",
    icon: Zap,
  },
  {
    title: "What Is a Kilowatt-hour?",
    description:
      "Learn what an electricity unit means, how energy consumption is measured, and how appliances contribute to your bill.",
    category: "Power & Energy",
    readTime: "5 min read",
    icon: Gauge,
  },
  {
    title: "How Does a Solar Panel Generate Electricity?",
    description:
      "Explore the photovoltaic effect and follow the journey from sunlight to usable electrical power.",
    category: "Solar Energy",
    readTime: "7 min read",
    icon: Sun,
  },
  {
    title: "Introduction to Electronic Components",
    description:
      "Meet resistors, capacitors, diodes and transistors, and discover the different jobs they perform in a circuit.",
    category: "Electronic Components",
    readTime: "8 min read",
    icon: CircuitBoard,
  },
  {
    title: "Build Your First Sensor Project",
    description:
      "Discover how sensors collect information and how a microcontroller can use those readings in a simple project.",
    category: "Sensors & IoT",
    readTime: "10 min read",
    icon: Radio,
  },
  {
    title: "Practical Ways to Reduce Home Electricity Use",
    description:
      "Learn how appliance power ratings, usage hours and energy-efficient habits affect household consumption.",
    category: "Energy Efficiency",
    readTime: "6 min read",
    icon: Lightbulb,
  },
];

export default function Learn() {
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const visibleTopics = showAllTopics ? topics : topics.slice(0, 12);

  const filteredTutorials = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tutorials.filter((tutorial) => {
      const matchesCategory =
        activeCategory === "All" || tutorial.category === activeCategory;

      const matchesSearch =
        !query ||
        tutorial.title.toLowerCase().includes(query) ||
        tutorial.description.toLowerCase().includes(query) ||
        tutorial.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <main className="learn-page">
      <section className="learn-intro">
        <div className="learn-intro-copy">
          <span className="learn-eyebrow">
            <BookOpen size={14} /> WATTSPRING LEARNING LIBRARY
          </span>

          <h1>
            Explore the world
            <br />
            of <span>electricity.</span>
          </h1>

          <p>
            From electrons and circuits to renewable energy and smart devices,
            build your understanding of the technology powering our world.
          </p>

          <a href="#learn-topics" className="learn-primary-link">
            Explore topics <ArrowUpRight size={17} />
          </a>
        </div>

        <div className="learn-intro-art" aria-hidden="true">
          <div className="learn-art-orbit orbit-one" />
          <div className="learn-art-orbit orbit-two" />
          <div className="learn-art-core">
            <Zap size={66} strokeWidth={1.4} />
          </div>
          <span className="learn-art-label label-top">ENERGY</span>
          <span className="learn-art-label label-bottom">CURIOSITY → DISCOVERY</span>
        </div>
      </section>

      <section id="learn-topics" className="learn-topics-section">
        <div className="learn-section-heading">
          <div>
            <span className="learn-eyebrow">01 / EXPLORE</span>
            <h2>Browse by topic</h2>
            <p>Find a subject, start with the basics, and keep learning.</p>
          </div>

          <span className="learn-count">
            {topics.length} TOPICS
          </span>
        </div>

        <div className="learn-topic-grid">
          {visibleTopics.map((topic) => {
            const Icon = topic.icon;

            return (
              <button
                type="button"
                className="learn-topic-card"
                key={topic.name}
                onClick={() => {
                  setActiveCategory(
                    tutorials.some((item) => item.category === topic.name)
                      ? topic.name
                      : "All"
                  );
                  setSearch("");
                  document
                    .getElementById("latest-tutorials")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="learn-topic-icon">
                  <Icon size={23} strokeWidth={1.7} />
                </span>

                <span className="learn-topic-copy">
                  <strong>{topic.name}</strong>
                  <small>{topic.description}</small>
                </span>

                <span className="learn-topic-count">{topic.count}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="learn-view-toggle"
          onClick={() => setShowAllTopics((current) => !current)}
        >
          {showAllTopics ? "View less" : "View all topics"}
          {showAllTopics ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>
      </section>

      <section id="latest-tutorials" className="learn-latest-section">
        <div className="learn-section-heading">
          <div>
            <span className="learn-eyebrow">02 / READ & DISCOVER</span>
            <h2>Latest tutorials</h2>
            <p>Practical explanations for curious minds.</p>
          </div>
        </div>

        <div className="learn-tutorial-controls">
          <label className="learn-search">
            <Search size={18} />
            <input
              type="search"
              placeholder="Search tutorials..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <select
            aria-label="Filter tutorials by topic"
            value={activeCategory}
            onChange={(event) => setActiveCategory(event.target.value)}
          >
            <option value="All">All topics</option>
            {[...new Set(tutorials.map((item) => item.category))].map(
              (category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              )
            )}
          </select>
        </div>

        <div className="learn-tutorial-list">
          {/* {filteredTutorials.map((tutorial) => {
            const Icon = tutorial.icon;

            return (
              <article className="learn-tutorial-card" key={tutorial.title}>
                <div className="learn-tutorial-art" aria-hidden="true">
                  <Icon size={38} strokeWidth={1.4} />
                  <span>W / LAB</span>
                </div>

                <div className="learn-tutorial-copy">
                  <span className="learn-tutorial-category">
                    {tutorial.category}
                  </span>
                  <h3>{tutorial.title}</h3>
                  <p>{tutorial.description}</p>
                  <span className="learn-tutorial-meta">
                    <BookOpen size={14} /> {tutorial.readTime}
                  </span>
                </div>

                <span className="learn-tutorial-arrow" aria-hidden="true">
                  <ArrowUpRight size={19} />
                </span>
              </article>
            );
          })} */}
          
{filteredTutorials.map((tutorial) => {
  const Icon = tutorial.icon;

  const article = articles.find(
    (item) =>
      item.collection === "learn" &&
      item.title === tutorial.title
  );

  const cardContent = (
    <>
      <div className="learn-tutorial-art" aria-hidden="true">
        <Icon size={38} strokeWidth={1.4} />
        <span>W / LAB</span>
      </div>

      <div className="learn-tutorial-copy">
        <span className="learn-tutorial-category">
          {tutorial.category}
        </span>
        <h3>{tutorial.title}</h3>
        <p>{tutorial.description}</p>
        <span className="learn-tutorial-meta">
          <BookOpen size={14} /> {tutorial.readTime}
        </span>
      </div>

      <span className="learn-tutorial-arrow" aria-hidden="true">
        <ArrowUpRight size={19} />
      </span>
    </>
  );

  return article ? (
    <Link
      to={`/learn/${article.slug}`}
      className="learn-tutorial-card learn-tutorial-card-link"
      key={tutorial.title}
      aria-label={`Read ${tutorial.title}`}
    >
      {cardContent}
    </Link>
  ) : (
    <article
      className="learn-tutorial-card"
      key={tutorial.title}
    >
      {cardContent}
    </article>
  );
})}


          {filteredTutorials.length === 0 && (
            <div className="learn-empty-state">
              <Search size={25} />
              <h3>No tutorials found</h3>
              <p>Try a different search or choose another topic.</p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="learn-bottom-note">
        <div className="learn-bottom-icon">
          <Microscope size={25} />
        </div>
        <div>
          <span className="learn-eyebrow">KEEP EXPLORING</span>
          <h2>Learn it. Build it. Understand it.</h2>
          <p>
            WattSpring will bring together scientific explanations, practical
            projects, experiments and research in one learning community.
          </p>
        </div>
      </section>
    </main>
  );
}

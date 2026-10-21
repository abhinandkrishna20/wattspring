
export type ArticleSection = {
  id: string;
  heading: string;
  paragraphs: string[];
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  collection: "learn" | "history";
  image: string;
  imageAlt: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  introduction: string;
  sections: ArticleSection[];
  references: { title: string; url: string }[];
};

export const articles: Article[] = [
  {
    slug: "voltage-current-resistance",
    title: "Voltage, Current and Resistance Explained",
    description:
      "Understand three essential electrical quantities and how they relate to one another.",
    category: "Electricity Basics",
    collection: "learn",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Electronic circuit board",
    author: "WattSpring Editorial",
    publishedAt: "October 2026",
    readingTime: "6 min read",
    introduction:
      "Voltage, current and resistance are three fundamental ideas used to understand electrical circuits. Together, they help explain how electrical energy is transferred and how components behave.",
    sections: [
      {
        id: "voltage",
        heading: "What is voltage?",
        paragraphs: [
          "Voltage is the electric potential difference between two points. It describes the amount of energy transferred per unit of electric charge between those points.",
          "Voltage is measured in volts (V). A battery provides a potential difference that can drive current through a connected circuit.",
        ],
      },
      {
        id: "current",
        heading: "What is electric current?",
        paragraphs: [
          "Electric current describes the rate at which electric charge passes a point in a circuit. Its SI unit is the ampere (A).",
          "In a simple circuit, current depends on the voltage applied and the electrical properties of the components in the circuit.",
        ],
      },
      {
        id: "resistance",
        heading: "What is resistance?",
        paragraphs: [
          "Resistance describes how strongly a component opposes electric current. It is measured in ohms (Ω).",
          "For an ohmic resistor under suitable conditions, increasing voltage increases current proportionally, while increasing resistance reduces current for the same voltage.",
        ],
      },
      {
        id: "ohms-law",
        heading: "How are they related?",
        paragraphs: [
          "Ohm's law expresses the relationship between voltage, current and resistance for an ohmic component: V = I × R.",
          "For example, a 6 V supply across a 3 Ω resistor produces a current of 2 A under the assumptions of this simple circuit.",
        ],
      },
      {
        id: "key-takeaways",
        heading: "Key takeaways",
        paragraphs: [
          "Voltage is measured in volts, current in amperes, and resistance in ohms. These quantities are useful starting points for understanding circuits and electronic devices.",
          "Real circuits can include components that do not follow a simple linear voltage-current relationship, so always consider the component's specifications and operating conditions.",
        ],
      },
    ],
    references: [
      {
        title: "OpenStax — University Physics, Electric Current",
        url: "https://openstax.org/books/university-physics-volume-2/pages/9-1-current",
      },
      {
        title: "OpenStax — University Physics, Ohm's Law",
        url: "https://openstax.org/books/university-physics-volume-2/pages/9-4-ohms-law",
      },
    ],
  },
  {
    slug: "kilowatt-hour-explained",
    title: "What Is a Kilowatt-hour?",
    description:
      "Learn what an electricity unit means and how energy consumption is measured.",
    category: "Power & Energy",
    collection: "learn",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Electric power transmission infrastructure",
    author: "WattSpring Editorial",
    publishedAt: "October 2026",
    readingTime: "5 min read",
    introduction:
      "A kilowatt-hour (kWh) is a unit of energy. Electricity bills commonly use this unit to report how much electrical energy a household or business consumes over a billing period.",
    sections: [
      {
        id: "power-and-energy",
        heading: "Power versus energy",
        paragraphs: [
          "Power describes the rate at which energy is transferred or used. It is measured in watts (W) or kilowatts (kW). Energy describes the total amount used over time.",
          "A kilowatt is 1,000 watts. A kilowatt-hour is the energy used by a 1 kW load operating for one hour.",
        ],
      },
      {
        id: "calculate-consumption",
        heading: "How to calculate energy use",
        paragraphs: [
          "For a device with a known power rating, estimated energy use in kWh is power in watts multiplied by hours of use, then divided by 1,000.",
          "For example, a 100 W device running for 5 hours uses 100 × 5 ÷ 1,000 = 0.5 kWh, assuming its average power remains 100 W.",
        ],
      },
      {
        id: "household-use",
        heading: "What this means for a home",
        paragraphs: [
          "Household energy use adds up across lighting, fans, refrigerators, pumps and other appliances. Actual consumption depends on real power draw, operating cycles and usage patterns.",
          "A calculated estimate can help you understand usage, but it is not a replacement for a meter reading or an official electricity bill.",
        ],
      },
    ],
    references: [
      {
        title: "U.S. Energy Information Administration — Measuring Electricity",
        url: "https://www.eia.gov/energyexplained/electricity/measuring-electricity.php",
      },
    ],
  },
  {
    slug: "michael-faraday-electromagnetic-induction",
    title: "Michael Faraday and Electromagnetic Induction",
    description:
      "Discover the experiments behind a principle used in electric generators.",
    category: "Inventors",
    collection: "history",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Engineering laboratory",
    author: "WattSpring Editorial",
    publishedAt: "October 2026",
    readingTime: "7 min read",
    introduction:
      "Michael Faraday's experiments in the early nineteenth century helped establish electromagnetic induction: the production of an electromotive force when the magnetic flux through a circuit changes.",
    sections: [
      {
        id: "early-life",
        heading: "A scientist driven by experimentation",
        paragraphs: [
          "Michael Faraday was an English scientist whose experimental work made lasting contributions to electromagnetism and electrochemistry.",
          "His investigations focused on how electricity and magnetism interact, using carefully designed experiments to test physical ideas.",
        ],
      },
      {
        id: "discovery",
        heading: "The discovery of induction",
        paragraphs: [
          "In 1831, Faraday demonstrated that changing magnetic conditions could induce an electrical effect in a nearby circuit. This established a foundation for electromagnetic induction.",
          "The essential idea is that a changing magnetic flux through a circuit can induce an electromotive force. The details depend on the circuit and how the magnetic field changes.",
        ],
      },
      {
        id: "modern-impact",
        heading: "Why the discovery matters today",
        paragraphs: [
          "Electromagnetic induction is central to the operation of many electric generators and transformers. It helps explain how mechanical energy can be converted into electrical energy in power-generation systems.",
          "The principle remains important in electrical engineering, power systems and many everyday technologies.",
        ],
      },
      {
        id: "summary",
        heading: "Key takeaway",
        paragraphs: [
          "Faraday's experiments connected changing magnetic fields with induced electrical effects. That insight became one of the foundations of modern electrical technology.",
        ],
      },
    ],
    references: [
      {
        title: "Encyclopaedia Britannica — Michael Faraday",
        url: "https://www.britannica.com/biography/Michael-Faraday",
      },
      {
        title: "The Royal Institution — Michael Faraday",
        url: "https://www.rigb.org/",
      },
    ],
  },
  {
    slug: "how-solar-panels-generate-electricity",
    title: "How Does a Solar Panel Generate Electricity?",
    description:
      "Explore the photovoltaic effect and how sunlight becomes electrical power.",
    category: "Solar Energy",
    collection: "learn",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Solar panels in sunlight",
    author: "WattSpring Editorial",
    publishedAt: "October 2026",
    readingTime: "7 min read",
    introduction:
      "Solar photovoltaic panels convert part of the energy in sunlight into electrical energy. Their operation relies on the properties of semiconductor materials and the photovoltaic effect.",
    sections: [
      {
        id: "sunlight",
        heading: "From sunlight to electric charge",
        paragraphs: [
          "Light arriving at a photovoltaic cell can transfer energy to electrons in its semiconductor material. The cell's internal electric field helps separate charge carriers and produce a voltage.",
          "When the cell is connected to a suitable circuit, this voltage can drive an electric current and deliver electrical power.",
        ],
      },
      {
        id: "solar-panel",
        heading: "How a panel produces useful power",
        paragraphs: [
          "Individual photovoltaic cells are interconnected to form modules. Modules can be combined into arrays to produce the voltage and current required for an application.",
          "An inverter is commonly used in grid-connected systems to convert the panels' direct-current output into alternating current suitable for the electrical system.",
        ],
      },
      {
        id: "what-affects-output",
        heading: "What affects solar output?",
        paragraphs: [
          "Solar output depends on sunlight intensity, panel orientation, shading, temperature, equipment and system losses.",
          "A panel's rated power is a test-condition rating, not a promise that it will produce that power continuously throughout the day.",
        ],
      },
    ],
    references: [
      {
        title: "U.S. Department of Energy — Solar Photovoltaic Technology Basics",
        url: "https://www.energy.gov/eere/solar/solar-photovoltaic-technology-basics",
      },
    ],
  },
];

export function getArticleBySlug(slug: string | undefined) {
  return articles.find((article) => article.slug === slug);
}

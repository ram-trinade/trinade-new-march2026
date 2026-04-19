/**
 * Blog SEO data — titles and excerpts match `app/blog/page.tsx` (FEATURED_ARTICLE + ARTICLES).
 * ISO dates align with the display dates on those cards.
 */
export type BlogEntry = {
  slug: string
  title: string
  description: string
  author: string
  datePublished: string
  image: string
}

export const BLOG_ENTRIES: BlogEntry[] = [
  {
    slug: 'why-ai-first-thinking-changes-everything',
    title: 'Why AI-First Thinking Changes Everything',
    description:
      "At Trinade, we don't bolt AI onto existing workflows. We rethink the entire solution from an intelligence-first perspective — across healthcare, legal, finance, and beyond. Here's how that philosophy shapes every product we build.",
    author: 'Trinade Team',
    datePublished: '2026-03-08',
    image: '/blog/featured.png',
  },
  {
    slug: 'ai-in-healthcare-from-diagnostics-to-patient-centric-care',
    title: 'AI in Healthcare: From Diagnostics to Patient-Centric Care',
    description:
      "How intelligent systems are transforming clinical workflows, enhancing diagnostic accuracy, and creating patient experiences that feel personal — without compromising on compliance or data security. From radiology imaging analysis to predictive patient monitoring, AI is becoming the silent partner in every clinician's toolkit, enabling earlier interventions and reducing the cognitive burden on overworked medical teams across the globe.",
    author: 'Priya Sharma',
    datePublished: '2026-03-01',
    image: '/blog/article-1.png',
  },
  {
    slug: 'intelligent-contract-analysis-how-ai-is-reshaping-legal-operations',
    title: 'Intelligent Contract Analysis: How AI Is Reshaping Legal Operations',
    description:
      'Law firms and legal departments are adopting AI not to replace counsel, but to surface insights buried in thousands of documents — turning weeks of review into hours of strategic action. Natural language models trained on legal corpora can now identify risk clauses, flag inconsistencies across contract versions, and generate compliance summaries that would take a junior associate days to produce manually.',
    author: 'Arjun Mehta',
    datePublished: '2026-02-22',
    image: '/blog/article-2.png',
  },
  {
    slug: 'predictive-intelligence-in-financial-services',
    title: 'Predictive Intelligence in Financial Services',
    description:
      'From fraud detection to portfolio optimization, AI-first financial solutions are redefining how institutions manage risk, serve customers, and stay ahead of regulatory complexity. Machine learning models now process millions of transactions in real time, identifying anomalous patterns that human analysts would miss entirely — while adaptive algorithms continuously refine their accuracy with every new data point that flows through the system.',
    author: 'Kavitha Rao',
    datePublished: '2026-02-14',
    image: '/blog/article-3.png',
  },
  {
    slug: 'smart-factories-where-ai-meets-the-production-floor',
    title: 'Smart Factories: Where AI Meets the Production Floor',
    description:
      'Predictive maintenance, quality control, and supply chain intelligence — the factory of tomorrow is already here, and it runs on adaptive AI that learns from every production cycle. Sensor-driven analytics detect equipment degradation weeks before failure, while computer vision systems inspect products at speeds no human eye can match — reducing waste, minimizing downtime, and transforming manufacturing from reactive to proactive.',
    author: 'Vikram Desai',
    datePublished: '2026-02-06',
    image: '/blog/article-4.png',
  },
  {
    slug: 'building-secure-ai-infrastructure-at-scale',
    title: 'Building Secure AI Infrastructure at Scale',
    description:
      'Enterprise AI demands more than just powerful models. It requires zero-trust architectures, automated compliance, and infrastructure that scales without sacrificing security or governance. As organizations push sensitive workloads to the cloud, the intersection of AI and cybersecurity becomes critical — with intelligent threat detection, automated incident response, and continuous compliance monitoring forming the backbone of modern enterprise defense.',
    author: 'Neha Kapoor',
    datePublished: '2026-01-28',
    image: '/blog/article-5.png',
  },
  {
    slug: 'from-pilot-to-production-scaling-ai-across-the-enterprise',
    title: 'From Pilot to Production: Scaling AI Across the Enterprise',
    description:
      "Most AI initiatives stall at proof-of-concept. We explore the organizational, technical, and strategic patterns that separate successful enterprise AI deployments from abandoned experiments. The gap between a working prototype and a production system isn't just technical — it demands executive alignment, data governance maturity, cross-functional teams, and a culture willing to iterate on imperfect solutions rather than waiting for theoretical perfection.",
    author: 'Rohan Iyer',
    datePublished: '2026-01-19',
    image: '/blog/article-6.png',
  },
]

const bySlug = new Map(BLOG_ENTRIES.map((e) => [e.slug, e]))

export function getBlogEntry(slug: string): BlogEntry | undefined {
  return bySlug.get(slug)
}

export interface Achievement {
  year: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  color: string;
}

export const achievements: Achievement[] = [
  {
    year: "2024",
    title: "AI Startup Acquired",
    description: "Built and sold an ML-powered SaaS platform for automated data analysis.",
    metric: "$2.5M",
    metricLabel: "Acquisition",
    color: "primary",
  },
  {
    year: "2024",
    title: "DeFi Protocol Launch",
    description: "Launched a decentralized lending protocol with $10M+ TVL in first month.",
    metric: "$10M+",
    metricLabel: "TVL",
    color: "secondary",
  },
  {
    year: "2023",
    title: "Design Award Winner",
    description: "Won Awwwards Site of the Day for an immersive 3D brand experience.",
    metric: "SOTD",
    metricLabel: "Awwwards",
    color: "accent",
  },
  {
    year: "2023",
    title: "Open Source Impact",
    description: "Created a React component library with 15K+ GitHub stars and 200+ contributors.",
    metric: "15K+",
    metricLabel: "Stars",
    color: "primary",
  },
  {
    year: "2023",
    title: "Conference Speaker",
    description: "Keynote speaker at Web Summit on the intersection of AI and blockchain.",
    metric: "5K+",
    metricLabel: "Attendees",
    color: "secondary",
  },
  {
    year: "2022",
    title: "NFT Collection",
    description: "Designed and launched a generative art collection — sold out in under 2 minutes.",
    metric: "10K",
    metricLabel: "Items Sold",
    color: "accent",
  },
  {
    year: "2022",
    title: "ML Research Paper",
    description: "Published a novel approach to few-shot learning at NeurIPS with 200+ citations.",
    metric: "200+",
    metricLabel: "Citations",
    color: "primary",
  },
  {
    year: "2021",
    title: "Hackathon Champion",
    description: "Won ETHGlobal with a cross-chain bridge using zero-knowledge proofs.",
    metric: "1st",
    metricLabel: "Place",
    color: "secondary",
  },
];

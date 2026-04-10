// src/data/Experience.ts

export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  type: "Current" | "Previous" | "Earlier";
  description: string;
  achievements: string[];
  skills: string[];
};

export type Academic = {
  program: string;
  institution: string;
  location: string;
  period: string;
  status: "Completed" | "Ongoing";
  description: string;
  highlights: string[];
};

export type Certification = {
  title: string;
  issuer: string;
  period: string;
  category: "Certification" | "Specialization";
  description: string;
  skills: string[];
  link?: string;
};

export const experiences: Experience[] = [
  {
    role: "Software Developer",
    company: "Africa Block Chain Youth Ambassadors - (ABYA)",
    location: "Kenya",
    period: "2024 — Present",
    type: "Current",
    description:
      "Leading the development of a decentralized identity (DID) system and profile management DApp for ABYA, enabling secure, user-centric identity solutions in the web3 ecosystem.",
    achievements: [
      "Architected and implemented end-to-end DID & Profile DApp, following the W3C Decentralized Identifiers (DID) specification to Generate → Resolve → Store → Retrieve Flows using Ethereum-based DIDs (ethr-did), JSON-LD DID Documents, IPFS, and a custom ERC-1056 DID Registry.",
      "Developed DID Documents in JSON-LD format containing essential cryptographic information (public keys, service endpoints), and integrated the ethr-did-registry smart contract as a Verifiable Data Registry for on-chain creation, verification, and management of DIDs.",
      "Designed a globally unique DID system leveraging Ethereum addresses and secp256k1 public keys in alignment with W3C DID standards, ensuring secure, verifiable interactions across the ABYA ecosystem.",
      "Implemented a user-friendly interface for managing DIDs, including creation, resolution, and retrieval of DID Documents, while ensuring compliance with W3C specifications and best practices for decentralized identity management.",
      "Collaborated with cross-functional teams to integrate the DID system into ABYA's broader platform, enabling seamless user authentication, profile management, and secure interactions within the decentralized ecosystem.",
      "Built a DID prototype module system for hackathons and workshops, showcasing the practical application of decentralized identity principles and fostering community engagement with cutting-edge web3 technologies.",
    ],
    skills: [
      "React",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
      "API Integration",
      "GSAP",
      "DID",
      "Ethereum",
      "IPFS",
      "Smart Contracts",
    ],
  },

  {
    role: "Web Developer",
    company: "Creative Divine Concepts",
    location: "Remote",
    period: "2024 — 2025",
    type: "Previous",
    description:
      "Worked on client-facing interfaces, landing pages, and business platforms with emphasis on clarity and speed.",
    achievements: [
      "Develop responsive and interactive user interfaces using HTML, CSS, JavaScript, and frameworks like React or Angular.",
      "Implement UI/UX designs from wire-frames and prototypes into fully functional web pages",
      "Manage server-side components and databases to ensure seamless communication between front-end and back-end systems.",
      "Contributed to the development of a client-facing business platform, enhancing user experience and engagement through intuitive design and efficient functionality.",
      "Optimized landing pages for performance and SEO, resulting in improved load times and increased organic traffic.",
      "Supported redesigns and feature enhancements across multiple projects.",
    ],
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Angular",
      "Node.js",
      "Database Management",
    ],
  },

  {
    role: "Junior Machine Learning Engineer",
    company: "OMDENA",
    location: "Kenya",
    period: "August — December 2023",
    type: "Earlier",
    description:
      "Contributed to machine learning projects through data collection, analysis, feature engineering, model development, and deployment, while collaborating with cross-functional teams to ensure successful project delivery.",
    achievements: [
      "Actively contributed to assigned tasks including problem stating, knowledge sharing, and collaborative team efforts.",
      "Engaged in data collection and data pre-processing to ensure high-quality and relevant datasets for machine learning projects.",
      "Conducted a comprehensive exploratory data analysis to uncover insights and inform feature engineering processes.",
      "Developed and engineered features to enhance model performance and accuracy.",
      "Participated in the development of machine learning models, employing various algorithms and techniques.",
      "Integrated and deployed machine learning models into production environments, ensuring that they function as intended and deliver value.",
      "Collaborated with cross-functional teams to ensure successful project delivery and alignment with organizational goals.",
    ],
    skills: [
      "python",
      "Data Collection",
      "Data Analysis",
      "Feature Engineering",
      "Model Development",
      "Deployment",
    ],
  },

  {
    role: "Monitoring & Evaluation Assistant",
    company: "Kenya Revenue Authority - (KRA)",
    location: "Nairobi, Kenya",
    period: "January — December 2022",
    type: "Earlier",
    description:
      "Supported the execution of project activities, documentation, and monitoring & evaluation processes for a government agency, contributing to the successful delivery of projects and the development of project management tools and systems.",
    achievements: [
      "Use Robotic Process Automation to develop a Chat-bot & Automate Optical Character Recognition process using both Druid AI & UI-Path.",
      "Assist in Solving System Integration issues and support the development of data management systems.",
      "Attend AWS training sessions and support the implementation of cloud-based solutions.",
      "Execution of Project Activities according to the approved Project Plan and Prince 2 Agile best practices.",
      "Preparation of project documentation according to project standard.",
      "Support the project team in the development and maintenance of project management tools and systems.",
      "Assist in the monitoring and evaluation of project activities, including data collection, analysis, and reporting.",
      "Collaborate with cross-functional teams to ensure effective communication and coordination of project activities.",
    ],
    skills: [
      "RPA",
      "Python",
      "Druid AI",
      "UI-Path",
      "AWS",
      "Project Management",
      "Data Analysis",
    ],
  },

  {
    role: "ICT Technical Support Assistant",
    company: "Kenya Power and Lighting Company - (KPLC)",
    location: "Kenya",
    period: "January — March 2021",
    type: "Earlier",
    description:
      "Explored the intersection of design, motion, and code through early product and portfolio work.",
    achievements: [
      "Computer installation, updating, configuration and maintenance of systems, that is; Integrated Customer services, Design and Construction systems, system Application and products.",
      "Data Networking and Telecommunication that is; Switches, Routers, Network cable termination, Activating port, Router configuration, IP phones problems, Switch configuration(LAN, WAN, cabling, Trunking, Fiber optics systems), Radio communication, SCADA and Telephony-CISCO.",
      "Printer installation and connection, both local and network printers using IP address, printer maintenance.",
      "Handling Domain errors, i.e., migrating a PC/laptop from one domain to another, trust relationship errors between the workstation and the primary domain.",
      "Taking inventory of I.T and Telecommunication equipment, that is; Computers, Laptops, Printers, Network equipment, Telecommunication equipment, and other related equipment.",
      "Providing technical support to users, including troubleshooting hardware and software issues, and providing training on new systems and technologies.",
    ],
    skills: [
      "Computer Maintenance",
      "Data Networking",
      "Telecommunication",
      "Printer Support",
      "Domain Management",
      "Technical Support",
    ],
  },
];

export const academics: Academic[] = [
  {
    program: "Bachelor of Science in Computer Science",
    institution: "St. Paul's University",
    location: "Nairobi, Kenya",
    period: "2017 — 2021",
    status: "Completed",
    description:
      "This program provided a comprehensive foundation in computer science principles, programming languages, and software development practices. It prepared me for a career in technology with a focus on practical skills and real-world applications.",
    highlights: [
      "System Architecture: Advanced ability to design, implement, and maintain complex, large-scale computing systems.",
      "Advanced Programming: Mastery of multiple high-level languages (Java, Python, C++) and software engineering principles.",
      "Data Intelligence: Specialized training in extracting actionable insights from Big Data and managing complex databases.",
      "Software Engineering: Strong foundation in software development lifecycle, testing, and deployment.",
      "Data Structures and Algorithms: In-depth understanding of core computer science concepts.",
      "Final Year Project: Built  Hidden Markov Model for Credit Card Fraud Detection, achieving 95% accuracy and demonstrating practical application of machine learning techniques.",
    ],
  },
  {
    program: "Diploma in Computer Science",
    institution: "St. Paul's University",
    location: "Nairobi, Kenya",
    period: "2016 — 2017",
    status: "Completed",
    description:
      "This program provides a bridge between theoretical concepts and practical applications. It is ideal for roles focused on implementation and technical support.",
    highlights: [
      "Programming Fundamentals: Proficiency in core programming concepts and languages (Java, Python).",
      "Database Management: Understanding of database design, SQL, and data manipulation.",
      "Web Development: Basic skills in HTML, CSS, and JavaScript for building web applications.",
      "Software Development Practices: Introduction to software development lifecycle and version control.",
      "Networking Basics: Foundational knowledge of computer networks and protocols.",
    ],
  },
  {
    program: "Self-Taught Learning & Independent Study",
    institution: "Continuous Learning Path",
    location: "Online",
    period: "2021 — Present",
    status: "Ongoing",
    description:
      "Continuously expanding technical knowledge through hands-on practice, documentation, and real-world projects.",
    highlights: [
      "Studying advanced frontend patterns and performance optimization.",
      "Exploring motion design, product thinking, and scalable architecture.",
      "Learning through building, testing, and iterating on live projects.",
      "Balancing technical growth with design sensibility and user experience focus.",
      "Backend Fundamentals: Gaining practical experience with Node.js, Express, and database management.",
      "API Integration: Building and consuming RESTful APIs to connect frontend applications with backend services.",
      "Blockchain Basics: Exploring the fundamentals of blockchain technology and its applications in web development.",
      "Decentralized Application (DApp) Development: Learning how to build decentralized applications using frameworks like Ethereum and Solidity.",
      "Smart Contract Development: Understanding the principles of smart contract development and deployment on blockchain platforms.",
      "Ecosystem Exploration: Keeping up with emerging technologies and trends in the web development ecosystem, including new frameworks, tools, and best practices.",
      "Deployment & DevOps: Learning about modern deployment workflows, containerization with Docker, and continuous integration/continuous deployment (CI/CD) practices.",
      "Machine Learning Introduction: Gaining a basic understanding of machine learning concepts and their applications in data analysis and predictive modeling.",
      "Model Engineering: Exploring the principles of designing and optimizing machine learning models for real-world applications.",
      "Hyperparameter Tuning: Learning techniques for optimizing machine learning model performance through hyperparameter tuning and experimentation.",
      "Data Visualization: Developing skills in visualizing complex data sets to extract insights and communicate findings effectively.",
      "Data Wharehousing: Understanding the principles of data warehousing and building efficient data storage solutions for large-scale applications.",
    ],
  },
];

export const certifications: Certification[] = [
  {
    title: "Data Engineering Foundations",
    issuer: "Coursera / IBM",
    period: "2023",
    category: "Specialization",
    description:
      "Introduction to Data Engineering, Python for Data Science - AI & Development, Python Project for Data Engineering, Introduction to Relational Databases (RDBMS), Databases and SQL for Data Science with Python",
    skills: [
      "Big Data",
      "Data Architecture",
      "Data Import/Export",
      "Data Pipelines",
      "Data Storage",
      "Data Storage Technologies",
      "Databases",
      "Database Design",
      "Database Management",
      "Extract - Transform - Load",
      "IBM DB2",
      "PostgreSQL",
    ],
    link: "https://www.coursera.org/account/accomplishments/specialization/TNYWMU7DPQUB",
  },

  {
    title: "Google IT Support",
    issuer: "Coursera / Google",
    period: "2022",
    category: "Specialization",
    description:
      "Technical Support Fundamentals, The Bits and Bytes of Computer Networking, Operating Systems and You: Becoming a Power User, System Administration and IT Infrastructure Services, IT Security: Defense against the digital dark arts",
    skills: [
      "Applicant Tracking Systems",
      "Chef (Configuration Management Tool)",
      "Computer Hardware",
      "Computer Networking",
      "File Systems",
      "Git (Version Control System)",
      "Interviewing Skills",
      "IT Automation",
      "IT Infrastructure",
      "IT Security Architecture",
      "Microsoft Windows",
      "Network Security",
    ],
    link: "https://www.coursera.org/account/accomplishments/specialization/DE2WCYJW6E46",
  },

  {
    title: "IBM Data Science",
    issuer: "Coursera / IBM",
    period: "2022",
    category: "Specialization",
    description:
      "What is Data Science?, Tools for Data Science, Data Science Methodology, Python for Data Science - AI & Development, Python Project for Data Science, Databases and SQL for Data Science with Python, Data Analysis with Python, Data Visualization with Python, Machine Learning with Python, Applied Data Science Capstone",
    skills: [
      "Dashboard",
      "Data Analysis",
      "Data Literacy",
      "Data Manipulation",
      "Data Storytelling",
      "Data Visualization Software",
      "Data Tranformation",
      "Exploratory Data Analysis",
      "Python",
      "Generative AI",
      "Interactive Data Visualization",
    ],
    link: "https://www.coursera.org/account/accomplishments/specialization/BCX57NANZV96",
  },

  {
    title: "Scrum Fundamentals Certified",
    issuer: "Scrum Study",
    period: "2022",
    category: "Certification",
    description:
      "Validation of knowledge and understanding of Scrum framework, principles, and practices for effective project management and team collaboration.",
    skills: [
      "Agile Methodology",
      "Scrum Framework",
      "Project Management",
      "Team Collaboration",
      "Sprint Planning",
      "Product Backlog Management",
      "Scrum Roles",
      "Scrum Events",
    ],
    link: "https://drive.google.com/file/d/1t-UWNTQi45qcbaA1TCe6IJc8TibgvXOt/view?usp=sharing",
  },

  {
    title: "IT Fundamentals for Cybersecurity",
    issuer: "Certifying Body / Platform",
    period: "2020",
    category: "Specialization",
    description:
      "Introduction to Cybersecurity Tools & Cyberattacks, Operating Systems: Overview, Administration, and Security, Cybersecurity Compliance Framework, Standards & Regulations, Computer Networks and Network Security",
    skills: [
      "Cloud Computing",
      "Cyber Security",
      "Cyber Attacks",
      "Cybersecurity",
      "Governance Risk Management and Compliance",
      "Identity and Access Management",
      "Incident Response",
      "Information Technology",
      "Information Technology Infrastructure Library (ITIL)",
      "IT Service Management",
      "Linux Administration",
      "Linux Commands",
    ],
    link: "https://www.coursera.org/account/accomplishments/specialization/56XKE3G8C257",
  },

  {
    title: "Cisco Networking Basics",
    issuer: "Certifying Body / Platform",
    period: "2024",
    category: "Certification",
    description:
      "Internet Connection: How to Get Online?, Network Protocols and Architecture, Data Communications and Network Services, Home Networking Basics, Introduction to Cisco Networking",
    skills: [
      "Cisco Networking",
      "Data Communications",
      "Home Networking",
      "Internet Protocols",
      "Network Architecture",
      "Network Services",
      "Network Troubleshooting",
      "Networking Basics",
      "OSI Model",
      "TCP/IP Protocol Suite",
    ],
    link: "https://www.coursera.org/account/accomplishments/specialization/U64539UZLUT5",
  },
];

export const typeStyles: Record<Experience["type"], string> = {
  Current: "bg-emerald-500/10 text-emerald-300 border-emerald-400/20",
  Previous: "bg-sky-500/10 text-sky-300 border-sky-400/20",
  Earlier: "bg-violet-500/10 text-violet-300 border-violet-400/20",
};

export const statusStyles: Record<Academic["status"], string> = {
  Completed: "bg-emerald-500/10 text-emerald-300 border-emerald-400/20",
  Ongoing: "bg-amber-500/10 text-amber-300 border-amber-400/20",
};

export const categoryStyles: Record<Certification["category"], string> = {
  Certification: "bg-sky-500/10 text-sky-300 border-sky-400/20",
  Specialization: "bg-violet-500/10 text-violet-300 border-violet-400/20",
};

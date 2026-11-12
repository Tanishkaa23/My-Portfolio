
export const profile = {
  name: "Tanishka Gupta",
  role: "Backend-Focused Full Stack Developer",
  tagline: "Backend Development • MERN • APIs • Systems",
  location: "India", 
  email: "tanishkagupta1123@gmail.com", 
  greeting: "Hey, I'm Tanishka.",
  subGreeting: "Backend Developer • MERN • APIs • Systems",
  hint: "Click around. There might be something interesting here.",
};

export const about = {
  heading: "Who am I?",
  intro:
    "I build the parts of an application most people never see The systems that keep data correct, requests fast, and services standing up under load.",
  interests: [
    { label: "Backend Engineering", detail: "Designing services that stay predictable as they grow." },
    { label: "APIs", detail: "REST interfaces that are easy to read and hard to misuse." },
    { label: "Databases", detail: "Schema design, indexing, and query performance." },
    { label: "Distributed Systems", detail: "Thinking through failure modes before they happen." },
    { label: "AI Integrations", detail: "Wiring LLM APIs into real product workflows." },
    { label: "Scalable Applications", detail: "Architecture that survives its first real traffic spike." },
  ],
  note: "Currently focused on strengthening backend architecture and distributed systems fundamentals.",
};

// Backend-system node graph shown in the Skills section.
// category → list of technologies. Keep 4 categories for the visual graph.
export const skills = {
  heading: "How it's put together",
  sub: "A backend system, roughly diagrammed.",
  categories: [
    {
      id: "frontend",
      label: "Client",
      description: "What the user actually touches.",
      items: ["React", "JavaScript", "HTML", "CSS"],
    },
    {
      id: "server",
      label: "Server",
      description: "Where requests are handled and business logic lives.",
      items: ["Node.js", "Express.js", "REST APIs"],
    },
    {
      id: "database",
      label: "Database",
      description: "Where state lives and has to stay correct.",
      items: ["MongoDB", "PostgreSQL", "Supabase"],
    },
    {
      id: "auth",
      label: "Auth",
      description: "Who's allowed to do what.",
      items: ["Authentication", "JWT"],
    },
  ],
  tools: {
    label: "Tooling",
    items: ["Git", "GitHub", "Docker", "Three.js", "AI / LLM APIs"],
  },
};

// Replace freely — this drives both the 3D project cards and the DOM list.
export const projects = [
  {
    id: "proj-1",
    title: "Track Your Job",
    description: "A MERN-based platform to manage job applications, track progress, and automate follow-ups with AI and Google Calendar integration",
    problem: "Simplifies job searching by eliminating manual application tracking, helping users monitor application progress, manage deadlines, and stay on top of follow-ups",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "AI/LLM APIs", "Google OAuth", "Google Calendar API"],
    github: "https://github.com/Tanishkaa23/JobTracker",
    live: "https://jobtracker-68jw.onrender.com/", 
    image: "/public/tyj.png",
  },
  {
    id: "proj-2",
    title: "SmartRAG",
    description:
      "An AI-powered RAG application that answers queries using PDFs and general knowledge, featuring semantic caching for faster, efficient responses.",
    problem: "Reduces the time spent searching through lengthy documents by providing relevant, context-aware answers from uploaded PDFs and general knowledge using AI",
    tech: ["React.js", "Node.js", "Express.js", "LangChain", "LangGraph", "Groq API", "RAG", "Vector Embeddings", "Semantic Caching"],    
    github: "https://github.com/Tanishkaa23/SmartRag/", 
    live: "https://smartrag-zeta.vercel.app/",
    image: "/public/smartRAG.png ",
  }
];

// Timeline entries — most recent first. Add real entries as they happen.
export const responsibilities = {
  heading: "Position of Responsibility",
  intro:
    "I enjoy taking ownership beyond code tasks by helping teams collaborate better, guiding peers, and contributing to a healthier developer ecosystem.",
  items: [
    {
      title: "Google Developer Groups on Campus Organizer 2025-27",
      organization: "Student Community / Tech Network",
      period: "Ongoing",
      detail:
      "Lead campus developer community initiatives by organizing technical events, workshops, and learning sessions, fostering collaboration, and encouraging students to explore emerging technologies and build practical skills."    }
  ],
};

export const experience = [
  {
    id: "exp-1",
    role: "Frontend Intern",
    company: "Cloud Pivot",
    duration: "May 2025 - July 2025",
    summary: "Worked on frontend development, building and improving features for a web application using React.js, TailwindCSS, and JavaScript.",
    tech: ["React.js" ,"TailwindCSS", "JavaScript"]
  },
  {
    id: "exp-1",
    role: "Full Stack Intern",
    company: "HPS Lab Designs Pvt Ltd",
    duration: "August 2025 - August 2026",
    summary: "Worked on CRM development, building and improving backend and frontend features for device mapping, memberships, subscriptions, fuel logs, and fuel stations.",
    tech: ["Node.js", "Express.js", "MongoDB","Redis", "React.js" ,"REST APIs",]
  }
];

export const resume = {
  url: "/resume.pdf",
  label: "Resume",
};

export const socials = {
  github: "https://github.com/Tanishkaa23", 
  linkedin: "https://linkedin.com/in/tanishka23", 
  email: "tanishkagupta1123@gmail.com", 
};

// Order + labels for both the floating nav and the scroll journey.
export const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "responsibilities", label: "Responsibilities" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

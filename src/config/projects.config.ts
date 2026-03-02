export interface Project {
  id: string;
  title: string;
  description: string;
  techTags: string[];
  projectUrl: string;
  githubUrl?: string;
  visible: boolean;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Multi-Agent Research System",
    description:
      "Built a production multi-agent system using LangGraph that orchestrates 5+ specialized agents for autonomous research, synthesis, and report generation. Handles 10K+ queries/day.",
    techTags: ["LangGraph", "Python", "FastAPI", "GPT-4", "Redis"],
    projectUrl: "#",
    githubUrl: "#",
    visible: true,
  },
  {
    id: "2",
    title: "Enterprise RAG Pipeline",
    description:
      "Designed and deployed a retrieval-augmented generation pipeline processing 50K+ documents with hybrid search, re-ranking, and citation tracking for a Fortune 500 client.",
    techTags: ["LangChain", "Pinecone", "Python", "FastAPI", "Docker"],
    projectUrl: "#",
    githubUrl: "#",
    visible: true,
  },
  {
    id: "3",
    title: "AI Code Review Agent",
    description:
      "Autonomous code review agent that analyzes PRs, detects bugs, suggests fixes, and auto-generates documentation using Claude and custom tool chains.",
    techTags: ["Claude API", "GitHub Actions", "TypeScript", "LangGraph"],
    projectUrl: "#",
    githubUrl: "#",
    visible: true,
  },
  {
    id: "4",
    title: "Voice-Driven AI Assistant",
    description:
      "Real-time voice AI assistant with multi-turn memory, tool use, and streaming responses. Deployed to production handling 1K+ concurrent sessions.",
    techTags: ["Python", "WebSockets", "Claude", "FastAPI", "React"],
    projectUrl: "#",
    visible: true,
  },
];

import { SystemRole } from "@/store/useSystemStore";

export type ProjectStatus = 
  | "v1.5 PRODUCTION" 
  | "TDD_STABLE" 
  | "BETA" 
  | "EXECUTION_PHASE" 
  | "STABLE" 
  | "PLANNING";

export interface Project {
  id: string;
  title: string;
  category: SystemRole;
  emoji: string;
  github: string; // Required for the GitHub icon link
  demo: string;   // Required for the Globe icon link
  specs: {
    status: ProjectStatus;
    latency?: string;
    engine: string;
  };
  description: string;
  techStack: string[];
  architecture: string;
}

export const PROJECTS: Project[] = [
  {
    id: "smartflow",
    title: "SmartFlow",
    category: "DATA_ENGINEER",
    emoji: "🌊",
    github: "https://github.com/dhananjaykr9/SmartFlow", // Add your actual link
    demo: "https://smartflow-demo.com",                // Add your actual link
    specs: {
      status: "v1.5 PRODUCTION",
      engine: "ISOLATION_FOREST",
    },
    description: "Automated Data Quality & Validation Pipeline designed to solve the 'Garbage In, Garbage Out' problem using LLM parsing and ML anomaly detection.",
    techStack: ["Python", "FastAPI", "SQL Server", "Scikit-Learn", "Gemini API"],
    architecture: `
      graph LR
        Raw[Raw Ingestion] --> Parse(LLM Parser)
        Parse --> Val{Validation Logic}
        Val -->|Anomaly| ISO(Isolation Forest)
        Val -->|Clean| SQL[(SQL Server)]
        ISO --> Alert[Diagnostic Flag]
        style Raw fill:#111,stroke:#333
        style SQL fill:#064e3b,stroke:#10b981
    `
  },
  {
    id: "metricmind",
    title: "MetricMind",
    category: "ML_ENGINEER",
    emoji: "🧠",
    github: "https://github.com/dhananjaykr9/MetricMind",
    demo: "https://metricmind.app",
    specs: {
      status: "TDD_STABLE",
      engine: "RANDOM_FOREST",
    },
    description: "End-to-End Predictive Analytics & Decision Support Pipeline with a What-If Simulator for business forecasting.",
    techStack: ["Python", "SQL", "Streamlit", "Docker", "Pytest"],
    architecture: `
      graph TD
        Data[(Business Data)] --> Engine(Feature Engine)
        Engine --> Model(Random Forest)
        Model --> Sim{What-If Simulator}
        Sim --> Dash[Streamlit UI]
        style Data fill:#111,stroke:#333
        style Dash fill:#064e3b,stroke:#10b981
    `
  },
  {
    id: "documinr",
    title: "DocuMinr",
    category: "AI_ENGINEER",
    emoji: "⛏️",
    github: "https://github.com/dhananjaykr9/DocuMinr",
    demo: "https://documinr.ai",
    specs: {
      status: "BETA",
      engine: "RAG_EXTRACTOR",
    },
    description: "Automated Document-to-Dataset engine equipped with a conversational audit layer to convert unstructured PDFs into structured SQL tables.",
    techStack: ["LangChain", "FAISS", "Gemini API", "PyPDF2", "Pandas"],
    architecture: `
      graph LR
        PDF[PDF Input] --> Text(PyPDF2)
        Text --> Embed(FAISS Vector Store)
        Embed --> RAG(RAG Retrieval)
        RAG --> LLM(Gemini Refinement)
        LLM --> DB[(SQL Export)]
        style PDF fill:#111,stroke:#333
        style DB fill:#064e3b,stroke:#10b981
    `
  },
  {
    id: "cris",
    title: "CRIS",
    category: "DATA_ENGINEER",
    emoji: "🛡️",
    github: "https://github.com/dhananjaykr9/CRIS",
    demo: "https://cris-risk.com",
    specs: {
      status: "EXECUTION_PHASE",
      engine: "SQL_FIRST_FE",
    },
    description: "Customer Risk Intelligence System predicting churn/credit risk using high-performance SQL Server feature aggregation and machine learning.",
    techStack: ["SQL Server", "SQLAlchemy", "Scikit-Learn", "Docker", "Streamlit"],
    architecture: `
      graph TD
        Trans[(Transaction DB)] --> Agg(SQL Aggregation)
        Agg --> FE(Feature Store)
        FE --> ML(Scikit-Learn)
        ML --> Risk[Risk Scorecard]
        style Trans fill:#111,stroke:#333
        style Risk fill:#064e3b,stroke:#10b981
    `
  },
  {
    id: "forecasting-engine",
    title: "Sales Forecasting Engine",
    category: "ML_ENGINEER",
    emoji: "📈",
    github: "https://github.com/dhananjaykr9/Sales-Forecasting",
    demo: "https://forecast-engine.com",
    specs: {
      status: "STABLE",
      engine: "XGBOOST",
    },
    description: "Time-aware machine learning system addresses temporal dependency to predict product demand and optimize inventory.",
    techStack: ["MySQL", "XGBoost", "Pandas", "SHAP", "Docker"],
    architecture: `
      graph LR
        TS[Time Series Data] --> Lag(Lag Engineering)
        Lag --> XGB(XGBoost Model)
        XGB --> Explain(SHAP Interpretability)
        Explain --> Forecast[Inventory Optimization]
        style TS fill:#111,stroke:#333
        style Forecast fill:#064e3b,stroke:#10b981
    `
  },
  {
    id: "puip",
    title: "PUIP",
    category: "AI_ENGINEER",
    emoji: "🛸",
    github: "https://github.com/dhananjaykr9/PUIP",
    demo: "https://puip-intelligence.ai",
    specs: {
      status: "PLANNING",
      engine: "AGENTIC_INSIGHTS",
    },
    description: "Product & User Intelligence Platform combining Advanced SQL sessionization with K-Means clustering and LLM-generated health reports.",
    techStack: ["T-SQL", "K-Means", "Gemini API", "Plotly", "Python"],
    architecture: `
      graph TD
        User[User Sessions] --> SQL(T-SQL Sessionization)
        SQL --> Cluster(K-Means)
        Cluster --> Agent(Gemini Agent)
        Agent --> Report[Health Diagnostics]
        style User fill:#111,stroke:#333
        style Report fill:#064e3b,stroke:#10b981
    `
  },
  {
    id: "prodeploy",
    title: "ProDeploy ML",
    category: "ML_ENGINEER",
    emoji: "🚀",
    github: "https://github.com/dhananjaykr9/ProDeploy-ML",
    demo: "https://prodeploy-ml.com",
    specs: {
      status: "STABLE",
      latency: "< 50ms",
      engine: "ONNX_RUNTIME",
    },
    description: "Production-grade inference architecture with Pydantic validation and non-blocking data drift monitoring (PSI Scoring).",
    techStack: ["FastAPI", "Docker", "ONNX", "PostgreSQL", "Pydantic"],
    architecture: `
      graph TD
        Req[API Request] --> Check(Pydantic Validation)
        Check --> ONNX(ONNX Runtime)
        ONNX --> Resp[Response]
        ONNX -.-> Drift(Drift Monitor)
        style Req fill:#111,stroke:#333
        style Resp fill:#064e3b,stroke:#10b981
    `
  }
];
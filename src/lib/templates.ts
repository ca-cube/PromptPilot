export interface PromptTemplate {
    id: string;
    name: string;
    category: string;
    prompt: string;
    description: string;
}

export const INDUSTRY_TEMPLATES: PromptTemplate[] = [
    {
        id: "sales-email",
        name: "Outbound Sales Email",
        category: "Sales",
        prompt: "Write an outbound email to a CEO about our new product.",
        description: "Cold outreach optimized for high C-level response rates."
    },
    {
        id: "hr-job-desc",
        name: "Senior Software Engineer JD",
        category: "HR",
        prompt: "Draft a job description for a Senior Frontend Engineer specialized in React and Next.js.",
        description: "Standardized HR template for technical roles."
    },
    {
        id: "legal-nda",
        name: "Simple NDA Draft",
        category: "Legal",
        prompt: "Create a simple non-disclosure agreement for a 3-month consulting project.",
        description: "Basic legal framework for confidentiality."
    },
    {
        id: "marketing-blog",
        name: "SaaS Blog Post Outline",
        category: "Marketing",
        prompt: "Create an outline for a blog post titled 'The Future of AI in Enterprise Productivity'.",
        description: "SEO-optimized structure for SaaS content marketing."
    }
];

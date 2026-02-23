import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "PromptPilot | Enterprise AI Prompt Coaching Assistant",
    description: "Analyze, score, and optimize your enterprise AI prompts in real-time.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.className} selection:bg-accent selection:text-white`}>
                {children}
            </body>
        </html>
    );
}

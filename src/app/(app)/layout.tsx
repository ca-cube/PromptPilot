import { Sidebar } from "@/components/layout/sidebar";

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen w-full bg-background overflow-hidden selection:bg-indigo-500/30">
            <Sidebar />
            <main className="flex-1 overflow-y-auto relative custom-scrollbar">
                <div className="absolute inset-0 bg-mesh pointer-events-none opacity-50" />
                <div className="relative z-10 max-w-7xl mx-auto px-8 py-10">
                    {children}
                </div>
            </main>
        </div>
    );
}

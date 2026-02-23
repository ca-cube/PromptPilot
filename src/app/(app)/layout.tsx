import { Sidebar } from "@/components/layout/sidebar";

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen w-full bg-background overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto relative">
                <div className="absolute inset-0 bg-mesh-dark pointer-events-none" />
                <div className="relative z-10 max-w-7xl mx-auto px-8 py-12">
                    {children}
                </div>
            </main>
        </div>
    );
}

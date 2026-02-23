/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                sidebar: "var(--sidebar)",
                accent: {
                    DEFAULT: "var(--accent)",
                    glow: "var(--accent-glow)",
                },
                border: "var(--border)",
            },
            fontFamily: {
                sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
                mono: ["var(--font-geist-mono)", "monospace"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "mesh-dark": "radial-gradient(circle at 50% -10%, rgba(99, 102, 241, 0.08) 0%, transparent 40%)",
            },
            animation: {
                "shimmer": "shimmer 2s linear infinite",
                "border-beam": "border-beam 4s ease infinite",
            },
            keyframes: {
                shimmer: {
                    "100%": { transform: "translateX(100%)" },
                },
                "border-beam": {
                    "100%": { "offset-distance": "100%" },
                },
            },
        },
    },
    plugins: [],
};

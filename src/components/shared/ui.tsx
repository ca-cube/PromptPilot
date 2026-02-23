import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "accent" | "outline" | "destructive";
}

export const Badge = ({ children, variant = "default", className, ...props }: BadgeProps) => {
    const variants = {
        default: "bg-white/5 text-zinc-400 border-white/10",
        accent: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
        outline: "bg-transparent border-white/10 text-zinc-400",
        destructive: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    };

    return (
        <div
            className={cn(
                "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-colors",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    glass?: boolean;
}

export const Card = ({ children, glass = true, className, ...props }: CardProps) => {
    return (
        <div
            className={cn(
                "rounded-2xl border border-white/[0.04]",
                glass && "bg-white/[0.01] backdrop-blur-xl shadow-2xl shadow-black/50",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "outline";
    size?: "sm" | "md" | "lg";
}

export const Button = ({
    children,
    variant = "primary",
    size = "md",
    className,
    ...props
}: ButtonProps) => {
    const variants = {
        primary: "bg-white text-black hover:bg-zinc-200",
        secondary: "bg-white/5 text-white hover:bg-white/10 border border-white/10",
        ghost: "bg-transparent text-zinc-400 hover:text-white hover:bg-white/5",
        outline: "bg-transparent border border-white/10 text-white hover:bg-white/5",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-8 py-4 text-base",
    };

    return (
        <button
            className={cn(
                "rounded-xl font-bold transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export const Input = ({ className, ...props }: InputProps) => {
    return (
        <input
            className={cn(
                "w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-zinc-600",
                className
            )}
            {...props}
        />
    );
};

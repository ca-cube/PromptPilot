import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "accent" | "outline" | "destructive" | "success" | "warning";
}

export const Badge = ({ children, variant = "default", className, ...props }: BadgeProps) => {
    const variants = {
        default: "bg-white/5 text-zinc-400 border-white/10",
        accent: "bg-indigo-500/10 text-indigo-400 border-indigo-500/25",
        outline: "bg-transparent border-white/10 text-zinc-400",
        destructive: "bg-rose-500/10 text-rose-500 border-rose-500/25",
        success: "bg-emerald-500/10 text-emerald-500 border-emerald-500/25",
        warning: "bg-amber-500/10 text-amber-500 border-amber-500/25",
    };

    return (
        <div
            className={cn(
                "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all duration-300",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export interface CardProps extends HTMLMotionProps<"div"> {
    glass?: boolean;
    hover?: boolean;
}

export const Card = ({ children, glass = true, hover = true, className, ...props }: CardProps) => {
    return (
        <motion.div
            whileHover={hover ? { y: -4, scale: 1.005 } : undefined}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
                "rounded-2xl border border-white/[0.05] overflow-hidden",
                glass && "glass",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "outline" | "accent";
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
        primary: "bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]",
        secondary: "bg-white/5 text-white hover:bg-white/10 border border-white/10",
        accent: "bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)]",
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

export const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input
            className={cn(
                "w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all placeholder:text-zinc-600",
                className
            )}
            {...props}
        />
    );
};

export const Textarea = ({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    return (
        <textarea
            className={cn(
                "w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all placeholder:text-zinc-600 min-h-[120px] resize-none",
                className
            )}
            {...props}
        />
    );
};

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-[2rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[90vh]"
            >
                {title && (
                    <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between shrink-0">
                        <h3 className="text-xl font-bold tracking-tight">{title}</h3>
                        <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                )}
                <div className="p-8 overflow-y-auto custom-scrollbar">{children}</div>
            </motion.div>
        </div>
    );
};

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean | string;
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', loading, asChild, ...props }, ref) => {

        // Simpler asChild handling: if asChild is true, we expect children to be a single element
        if (asChild && React.isValidElement(props.children)) {
            const Child = props.children;
            return React.cloneElement(Child as React.ReactElement<any>, {
                ...props,
                className: cn(
                    "inline-flex items-center justify-center font-medium ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    {
                        'bg-red-600 text-white hover:bg-red-700 shadow-sm transition-all active:scale-95': variant === 'primary',
                        'bg-slate-900 text-white hover:bg-slate-800 transition-all active:scale-95': variant === 'secondary',
                        'border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-900 transition-all active:scale-95': variant === 'outline',
                        'bg-transparent hover:bg-slate-100 text-slate-900': variant === 'ghost',
                        'bg-red-100 text-red-600 hover:bg-red-200 transition-all active:scale-95': variant === 'danger',
                    }[variant],
                    {
                        'h-8 px-3 text-xs rounded-md': size === 'sm',
                        'h-10 px-4 py-2 rounded-lg': size === 'md',
                        'h-12 px-8 text-lg rounded-xl font-semibold': size === 'lg',
                    }[size],
                    className,
                    Child.props.className
                ),
            } as any);
        }

        return (
            <button
                ref={ref}
                disabled={loading ? true : props.disabled}
                className={cn(
                    "inline-flex items-center justify-center font-medium ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-colors",
                    {
                        'bg-red-600 text-white hover:bg-red-700 shadow-sm active:scale-95': variant === 'primary',
                        'bg-slate-900 text-white hover:bg-slate-800 active:scale-95': variant === 'secondary',
                        'border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-900 active:scale-95': variant === 'outline',
                        'bg-transparent hover:bg-slate-100 text-slate-900': variant === 'ghost',
                        'bg-red-100 text-red-600 hover:bg-red-200 active:scale-95': variant === 'danger',
                    }[variant],
                    {
                        'h-8 px-3 text-xs rounded-md': size === 'sm',
                        'h-10 px-4 py-2 rounded-lg': size === 'md',
                        'h-12 px-8 text-lg rounded-xl font-semibold': size === 'lg',
                    }[size],
                    className
                )}
                {...props}
            >
                {loading && (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                )}
                {props.children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };

import React from 'react';
import { cn } from '../../utils/cn';

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    ...props
}) => {
    const variants = {
        primary: "bg-byakko-red text-white hover:bg-red-700 shadow-md",
        secondary: "bg-byakko-black text-white hover:bg-gray-800",
        outline: "border-2 border-byakko-red text-byakko-red hover:bg-red-50",
        ghost: "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-6 py-2.5 text-base",
        lg: "px-8 py-3.5 text-lg font-bold"
    };

    return (
        <button
            className={cn(
                "rounded-md transition-all duration-200 flex items-center justify-center gap-2 active:scale-95",
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

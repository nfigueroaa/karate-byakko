import React from 'react';
import { cn } from '../../utils/cn';

export const KpiCard = ({ title, value, icon, trend, color = "blue" }) => {
    const colorClasses = {
        blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
        green: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
        red: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
        purple: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
                <div className={cn("p-2 rounded-lg", colorClasses[color])}>
                    {icon}
                </div>
            </div>
            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{value}</span>
                {trend && (
                    <span className={cn("text-xs font-medium", trend > 0 ? "text-green-600" : "text-red-600")}>
                        {trend > 0 ? '+' : ''}{trend}%
                    </span>
                )}
            </div>
        </div>
    );
};

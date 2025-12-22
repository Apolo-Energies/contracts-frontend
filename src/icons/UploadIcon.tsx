import React from "react";

interface UploadIconProps {
    size?: number;
    color?: string;
    className?: string;
}

export const UploadIcon: React.FC<UploadIconProps> = ({
    size = 38,
    className,
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M26.0301 14.0916C31.7301 14.5824 34.0576 17.5116 34.0576 23.9241V24.1299C34.0576 31.2074 31.2234 34.0416 24.1459 34.0416H13.8384C6.76092 34.0416 3.92676 31.2074 3.92676 24.1299V23.9241C3.92676 17.5591 6.22259 14.6299 11.8276 14.1074"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M19 23.75V5.73169"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M24.3041 9.26242L19 3.95825L13.6958 9.26242"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

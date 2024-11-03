import React from 'react';

function Avatar({ name, size = 'md' }) {
    const initials = name.charAt(0).toUpperCase();

    const sizeClasses = {
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg',
    };

    return (
        <div
            className={`
        ${sizeClasses[size]}
        flex items-center justify-center
        rounded-full bg-accent text-gray-50 font-semibold
        flex-shrink-0
      `}
        >
            {initials}
        </div>
    );
}

export default Avatar;
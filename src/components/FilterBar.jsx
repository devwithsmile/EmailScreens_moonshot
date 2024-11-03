import React from 'react';
import { Inbox, Star, Mail, MailOpen } from 'lucide-react';

export const FilterBar = ({ filter, onFilterChange }) => {
    const filters = [
        { id: 'all', label: 'All', icon: Inbox },
        { id: 'unread', label: 'Unread', icon: Mail },
        { id: 'read', label: 'Read', icon: MailOpen },
        { id: 'favorites', label: 'Favorites', icon: Star },
    ];

    return (
        <div className="border-t">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex space-x-1 -mb-px">
                    {filters.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => onFilterChange(id)}
                            className={`
                px-4 py-2 border-b-2 flex items-center gap-2
                ${filter === id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }
              `}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
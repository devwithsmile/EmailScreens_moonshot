import React from 'react';
import Avatar  from './Avatar';
import { formatDate } from '../utils/formatDate';
import { Star, Mail } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';

export const EmailBody = ({ email, body, onFavorite, loading }) => {
    if (loading) return <LoadingSpinner />;
    if (!email || !body) return null;

    return (
        <div className="p-6 bg-read_bg rounded-lg shadow-sm">
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Avatar name={email.from.name} size="lg" />
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">{email.subject}</h2>
                      
                        <p className="text-gray-500 mt-1">{formatDate(email.date)}</p>
                    </div>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onFavorite(email.id);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label={email.favorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <Star
                        className={`w-6 h-6 ${email.favorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
                    />
                </button>   
            </div>
            <div
                className="prose prose-sm max-w-none prose-headings:text-gray-900 text-textt"
                dangerouslySetInnerHTML={{ __html: body.body }}
            />
        </div>
    );
};
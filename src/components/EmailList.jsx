import React from 'react';
import Avatar from './Avatar'
import { formatDate } from '../utils/formatDate';
import { Star } from 'lucide-react';

export const EmailList = ({ emails, selectedId, onSelect, setSelectedId }) => {
    if (emails.length === 0) {
        return (
            <div className="p-8 text-center text-gray-500">
                No emails found for the selected filter.
            </div>
        );
    }

    return (
        <div className="divide-y divide-gray-200">
            {emails.map((email) => (
                <div
                    key={email.id}
                    onClick={() => onSelect(email.id)}
                    className={`p-7 m-4 cursor-pointer transition-colors ${email.read ? 'bg-gray-50' : 'bg-white'
                        } ${selectedId === email.id ? 'border border-accent' : ''} hover:bg-gray-200`}
                >
                    <div className="flex gap-4">
                        <Avatar name={email.from.name} />
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                                <div>
                                    <p className="font-medium text-gray-500">
                                        From: <span className="text-gray-800"> {email.from.name} {`<${email.from.email}>`}</span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {email.favorite && (
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    )}
                                    <span className="text-sm text-gray-500">{formatDate(email.date)}</span>
                                </div>
                            </div>
                            <p className="font-medium text-gray-500 mb-1">Subject:
                                <span className='text-gray-800'> {email.subject}</span></p>
                            <p className="text-gray-600 text-sm line-clamp-2">{email.short_description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
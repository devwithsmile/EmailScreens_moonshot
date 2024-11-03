import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://flipkart-email-mock.now.sh';

export const useEmails = () => {
    const [emails, setEmails] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [bodyLoading, setBodyLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('all');

    const fetchEmails = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${API_BASE_URL}/?page=${page}`);


            const storedData = JSON.parse(localStorage.getItem('emailStates') || '{}');
            const mergedEmails = data.list.map(email => ({
                ...email,
                read: storedData[email.id]?.read || false,
                favorite: storedData[email.id]?.favorite || false,
            }));

            setEmails(mergedEmails);
            
        } catch (error) {
            console.error('Error fetching emails:', error);
        } finally {
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        fetchEmails();
    }, [fetchEmails]);

    const fetchEmailBody = async (id) => {
        setBodyLoading(true);
        try {
            const { data } = await axios.get(`${API_BASE_URL}/?id=${id}`);
            setSelectedEmail(data);

            // Mark as read
            markAsRead(id);
        } catch (error) {
            console.error('Error fetching email body:', error);
        } finally {
            setBodyLoading(false);
        }
    };

    const markAsRead = (id) => {
        const storedData = JSON.parse(localStorage.getItem('emailStates') || '{}');
        storedData[id] = { ...storedData[id], read: true };
        localStorage.setItem('emailStates', JSON.stringify(storedData));

        setEmails(emails.map(email =>
            email.id === id ? { ...email, read: true } : email
        ));
    };

    const toggleFavorite = (id) => {
        const storedData = JSON.parse(localStorage.getItem('emailStates') || '{}');
        const currentFavorite = emails.find(email => email.id === id)?.favorite || false;
        storedData[id] = { ...storedData[id], favorite: !currentFavorite };
        localStorage.setItem('emailStates', JSON.stringify(storedData));

        setEmails(emails.map(email =>
            email.id === id ? { ...email, favorite: !currentFavorite } : email
        ));
    };

    const filteredEmails = emails.filter(email => {
        switch (filter) {
            case 'read':
                return email.read;
            case 'unread':
                return !email.read;
            case 'favorites':
                return email.favorite;
            default:
                return true;
        }
    });

    return {
        emails: filteredEmails,
        selectedEmail,
        loading,
        bodyLoading,
        page,
        filter,
        setPage,
        setFilter,
        fetchEmailBody,
        toggleFavorite,
    };
};
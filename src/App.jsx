import React, { useState } from 'react';
import { EmailList } from './components/EmailList.jsx';
import { EmailBody } from './components/EmailBody.jsx';
import { FilterBar } from './components/FilterBar.jsx';
import { useEmails } from './hooks/useEmail.js';
import { LoadingSpinner } from './components/LoadingSpinner.jsx';

import { ChevronLeft, ChevronRight, Inbox } from 'lucide-react';

function App() {
  const {
    emails,
    selectedEmail,
    loading,
    bodyLoading,
    page,
    filter,
    setPage,
    setFilter,
    fetchEmailBody,
    toggleFavorite,
  } = useEmails();

  const [selectedId, setSelectedId] = useState(null);

  const handleEmailSelect = (id) => {
    console.log(id);
    
    setSelectedId(id);
    fetchEmailBody(id);
  };

  const selectedEmailData = selectedId ? emails.find(e => e.id === selectedId) : undefined;

  return (
    <div className="min-h-screen bg-backgrnd">
      <header className="bg-backgrnd border-b sticky top-0 z-10">
  
        <FilterBar filter={filter} onFilterChange={setFilter} />
      </header>

      <main className="max-w-7xl mx-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-backgrnd rounded-lg shadow-sm overflow-hidden">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                <EmailList
                  emails={emails}
                  selectedId={selectedId}
                  onSelect={handleEmailSelect}
                  setSelectedId = {setSelectedId}
                />
                <div className="flex items-center justify-between p-4 border-t">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm text-gray-600">Page {page}</span>
                  <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={emails.length === 0}
                    className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16 lg:overflow-auto">
            {selectedId && (
              <EmailBody
                email={selectedEmailData}
                body={selectedEmail}
                onFavorite={toggleFavorite}
                loading={bodyLoading}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
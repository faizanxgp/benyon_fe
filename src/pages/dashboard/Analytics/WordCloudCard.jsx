import React from 'react'
import { Card } from '../../../componenets'

const WordCloudCard = ({ className }) => {
  // Sample search file names with frequency/size
  const searchTerms = [
    { text: "user-manual.pdf", size: 32, count: 234 },
    { text: "getting-started.pdf", size: 28, count: 189 },
    { text: "api-documentation.pdf", size: 24, count: 156 },
    { text: "troubleshooting.pdf", size: 20, count: 143 },
    { text: "installation-guide.pdf", size: 18, count: 128 },
    { text: "faq.pdf", size: 16, count: 112 },
    { text: "release-notes.pdf", size: 14, count: 98 },
    { text: "configuration.pdf", size: 14, count: 87 },
    { text: "tutorial.pdf", size: 12, count: 76 },
    { text: "best-practices.pdf", size: 12, count: 65 },
    { text: "security-guide.pdf", size: 10, count: 54 },
    { text: "migration-guide.pdf", size: 10, count: 43 },
    { text: "admin-guide.pdf", size: 8, count: 32 },
    { text: "developer-guide.pdf", size: 8, count: 29 },
    { text: "quick-start.pdf", size: 6, count: 21 },
    { text: "changelog.pdf", size: 6, count: 18 },
    { text: "license.pdf", size: 4, count: 12 },
    { text: "readme.pdf", size: 4, count: 8 },
  ];

  // Arrange terms in a cloud-like layout with different colors
  const getRandomColor = () => {
    const colors = [
      'text-red-600', 'text-red-500', 'text-red-700',
      'text-gray-600', 'text-gray-700', 'text-gray-800',
      'text-slate-600', 'text-slate-700', 'text-slate-800'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomPosition = () => {
    const positions = [
      'self-start', 'self-center', 'self-end',
      'justify-self-start', 'justify-self-center', 'justify-self-end'
    ];
    return positions[Math.floor(Math.random() * positions.length)];
  };

  return (
    <Card className={`${className ? className : ''}`}>
      <Card.Header>
        <Card.Title className="text-base font-bold text-slate-800 dark:text-slate-200">
          Most Searched Files
        </Card.Title>
        <div className="text-xs text-slate-500">
          Popular document searches in the chatbot
        </div>
      </Card.Header>
      <Card.Body className="pt-4">
        <div className="min-h-64 flex flex-wrap gap-2 items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          {searchTerms.map((term, index) => (
            <span
              key={index}
              className={`
                inline-block px-2 py-1 rounded-md cursor-pointer transition-all duration-200 
                hover:bg-red-100 dark:hover:bg-red-900/20 hover:scale-105
                ${getRandomColor()}
                ${getRandomPosition()}
              `}
              style={{
                fontSize: `${Math.max(12, Math.min(24, term.size))}px`,
                fontWeight: term.size > 20 ? 'bold' : term.size > 15 ? '600' : 'normal',
                lineHeight: '1.2'
              }}
              title={`Searched ${term.count} times`}
            >
              {term.text}
            </span>
          ))}
        </div>
        
        {/* Top searches summary */}
        <div className="mt-6">
          <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            Top 5 Most Searched
          </div>
          <div className="space-y-2">
            {searchTerms.slice(0, 5).map((term, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-red-600 text-white text-xs rounded-full flex items-center justify-center mr-3">
                    {index + 1}
                  </span>
                  <span className="text-slate-700 dark:text-slate-300">{term.text}</span>
                </div>
                <div className="text-slate-500 font-medium">{term.count} searches</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick stats */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-3 gap-4 text-center text-xs">
            <div>
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                {searchTerms.length}
              </div>
              <div className="text-slate-500">Unique Files</div>
            </div>
            <div>
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                {searchTerms.reduce((sum, term) => sum + term.count, 0)}
              </div>
              <div className="text-slate-500">Total Searches</div>
            </div>
            <div>
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                {Math.round(searchTerms.reduce((sum, term) => sum + term.count, 0) / searchTerms.length)}
              </div>
              <div className="text-slate-500">Avg per File</div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default WordCloudCard

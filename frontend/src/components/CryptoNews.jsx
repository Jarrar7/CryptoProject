import React, { useState, useEffect } from 'react';
import Header from './Header';
const API_URL = process.env.REACT_APP_API_URL;

const CryptoNews = () => {
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNews = async (page) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/api/news/crypto-news?page=${page}`);
            const data = await response.json();
            setNews(data.articles);
            setFilteredNews(data.articles);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching news:', error);
            setError('Failed to fetch news. Please try again later.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews(currentPage);
    }, [currentPage]);

    // Update filtered news based on search term
    useEffect(() => {
        if (searchTerm) {
            const filtered = news.filter((article) =>
                article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredNews(filtered);
        } else {
            setFilteredNews(news);
        }
    }, [searchTerm, news]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <Header />
            <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
                <h2 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">Latest Crypto News</h2>
                <div className="max-w-4xl mx-auto">
                    {/* Search Input */}
                    <div className="mb-4 flex justify-center">
                        <input
                            type="text"
                            placeholder="🔍 Search news..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-1/2 p-2 px-4 text-sm rounded-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                        />
                    </div>
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                        </div>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : (
                        <>
                            <ul className="space-y-4">
                                {filteredNews.map((article, index) => (
                                    <li
                                        key={index}
                                        className="p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-300"
                                    >
                                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                                            <h3 className="text-2xl font-bold mb-2">{article.title}</h3>
                                            {article.urlToImage && (
                                                <img
                                                    src={article.urlToImage}
                                                    alt={article.title}
                                                    className="w-full h-48 object-cover rounded-lg mb-2"
                                                />
                                            )}
                                            <p className="text-gray-700 dark:text-gray-300 mb-2">{article.description}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Source: {article.source.name}</p>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex justify-between items-center mt-8">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
                                >
                                    Previous
                                </button>
                                <span className="text-gray-800 dark:text-gray-100">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CryptoNews;

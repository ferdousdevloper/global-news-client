import React, { useEffect, useState } from 'react';

const DeleteArticles: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]); // Replace `any` with your article type

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch('https://global-news-server-phi.vercel.app/submitted-articles'); // Update with your API endpoint
      const data = await response.json();
      setArticles(data);
    };
    fetchArticles();
  }, []);

  const handleDelete = async (id: string) => {
    const response = await fetch(`https://global-news-server-phi.vercel.app/delete-article/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setArticles((prev) => prev.filter((article) => article.id !== id));
      alert('Article deleted successfully!');
    } else {
      alert('Failed to delete article');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Delete Articles</h1>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td className="border px-4 py-2">{article.title}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleDelete(article.id)} className="text-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteArticles;

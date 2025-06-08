// src/app/page.tsx
'use client';

import { useState } from 'react';

export default function HomePage() {
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [subdomain, setSubdomain] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) {
      setError('Please enter a description for your business.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      const data = await response.json();
      const { subdomain } = data;
      setSubdomain(subdomain);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
          Commerce in a <span className="text-blue-600">Prompt</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Describe your business in plain English. Get a fully functional online store in minutes.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 w-full">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="e.g., I sell handmade pickle business, traditional recipes, ship across India, ₹200-800"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
          >
            {loading ? 'Building your store... ✨' : 'Create My Store'}
          </button>
        </form>

        {error && <p className="mt-4 text-red-500">{error}</p>}
        
        {loading && (
          <div className="mt-6 text-gray-500">
            <p>Please wait, this can take up to a minute.</p>
            <p>AI is generating your branding, content, logo, and store layout...</p>
          </div>
        )}

        {subdomain && (
          <a
            href={`/store/${subdomain}`}
            className="mt-6 inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300"
          >
            View your store
          </a>
        )}
      </div>
    </div>
  );
}
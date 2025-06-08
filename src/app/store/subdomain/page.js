// app/store/[subdomain]/page.js
import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import Head from 'next/head';

// This function runs on the server during the request
async function getStoreConfig(subdomain) {
  try {
    const dbPath = path.join(process.cwd(), `db/${subdomain}.json`);
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}

// React Server Component
export default async function StorePage({ params }) {
  const { subdomain } = params;
  const config = await getStoreConfig(subdomain);

  if (!config) {
    notFound();
  }

  const { businessInfo, design, content, initialProducts, logoUrl } = config;

  return (
    <>
      {/* We need a Client Component to dynamically inject styles and fonts */}
      <StyleInjector design={design} />

      <div className="store-container">
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt={`${businessInfo.name} Logo`} className="h-12 w-12 object-contain" />
            <h1 className="text-2xl font-bold heading-font">{businessInfo.name}</h1>
          </div>
          <nav className="body-font">
            <a href="#products" className="p-2">Products</a>
            <a href="#about" className="p-2">About</a>
          </nav>
        </header>

        <main>
          {/* Hero Section */}
          <section className="text-center py-20 px-4 hero-section">
            <h2 className="text-5xl font-bold heading-font">{content.heroTitle}</h2>
            <p className="mt-4 text-xl max-w-2xl mx-auto body-font">{content.heroSubtitle}</p>
            <button className="mt-8 px-8 py-3 rounded-full font-bold text-lg cta-button">Shop Now</button>
          </section>

          {/* Products Section */}
          <section id="products" className="py-16 px-4 md:px-8">
            <h3 className="text-4xl font-bold text-center mb-12 heading-font">Our Collection</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {initialProducts.map(product => (
                <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg product-card">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover" />
                  <div className="p-4">
                    <h4 className="text-xl font-semibold heading-font">{product.name}</h4>
                    <p className="mt-2 body-font text-gray-600">{product.description}</p>
                    <p className="mt-4 text-2xl font-bold heading-font text-right">₹{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-16 px-4 about-section">
             <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-4xl font-bold mb-4 heading-font">Our Story</h3>
                <p className="text-lg body-font">{content.aboutSection}</p>
             </div>
          </section>
        </main>

        <footer className="text-center p-6 border-t footer-section">
            <p>&copy; {new Date().getFullYear()} {businessInfo.name}. All rights reserved.</p>
        </footer>

      </div>
    </>
  );
}

// Client Component to handle dynamic styles
// This is necessary because we are manipulating the <head> which is a client-side concern in the App router
'use client';
import { useEffect } from 'react';

const StyleInjector = ({ design }) => {
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            @import url('https://fonts.googleapis.com/css2?family=<span class="math-inline">\{design\.font\.headings\.replace\(/ /g, '\+'\)\}\:wght@700&family\=</span>{design.font.body.replace(/ /g, '+')}:wght@400;700&display=swap');

            :root {
              --primary-color: ${design.palette.primary};
              --secondary-color: ${design.palette.secondary};
              --background-color: ${design.palette.background};
              --text-color: <span class="math-inline">\{design\.palette\.text\};
              --heading-font: '{design.font.headings}', sans-serif;
              --body-font: '${design.font.body}', sans-serif;
}
              body {
                background-color: var(--background-color);
                color: var(--text-color);
            }
            .heading-font { font-family: var(--heading-font); }
            .body-font { font-family: var(--body-font); }
            
            header, .footer-section {
              background-color: var(--background-color);
              border-color: #e5e7eb;
            }
            .hero-section { background-color: #f9fafb; }
            .about-section { background-color: var(--background-color); }

            .cta-button {
              background-color: var(--primary-color);
              color: white;
              transition: background-color 0.3s;
            }
            .cta-button:hover {
              filter: brightness(1.1);
            }
            .product-card {
              background-color: white;
              border-color: #e5e7eb;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, [design]);

    return null;
};

export async function generateMetadata({ params }) {
    const config = await getStoreConfig(params.subdomain);
    if (!config) {
        return {
            title: 'Store Not Found'
        }
    }
    return {
        title: `${config.businessInfo.name} | ${config.businessInfo.slogan}`
    }
}
import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface StoreConfig {
  businessInfo: { name: string; slogan: string };
  design: {
    theme: string;
    palette: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
    font: { headings: string; body: string };
  };
  content: { heroTitle: string; heroSubtitle: string; aboutSection: string };
  initialProducts: {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  }[];
  logoPrompt: string;
  logoUrl?: string;
}

export default async function StorePage({ params }: { params: { subdomain: string } }) {
  const dbPath = path.join(process.cwd(), `db/${params.subdomain}.json`);
  let config: StoreConfig | null = null;
  try {
    const file = await fs.readFile(dbPath, 'utf-8');
    config = JSON.parse(file);
  } catch (e) {
    return notFound();
  }

  if (!config) {
    return notFound();
  }

  return (
    <div style={{ background: config.design.palette.background, color: config.design.palette.text, minHeight: '100vh', fontFamily: config.design.font.body }} className="p-8">
      <div className="max-w-3xl mx-auto">
        <header className="flex flex-col items-center mb-8">
          {config.logoUrl && (
            <Image src={config.logoUrl} alt="Logo" width={120} height={120} className="mb-4 rounded-full bg-white" />
          )}
          <h1 className="text-4xl font-bold" style={{ fontFamily: config.design.font.headings }}>{config.businessInfo.name}</h1>
          <p className="text-lg text-gray-600">{config.businessInfo.slogan}</p>
        </header>
        <section className="mb-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">{config.content.heroTitle}</h2>
          <p className="text-lg mb-4">{config.content.heroSubtitle}</p>
        </section>
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">About Us</h3>
          <p>{config.content.aboutSection}</p>
        </section>
        <section>
          <h3 className="text-xl font-semibold mb-4">Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {config.initialProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                <Image src={product.imageUrl} alt={product.name} width={120} height={120} className="mb-2" />
                <h4 className="font-bold text-lg mb-1">{product.name}</h4>
                <p className="text-gray-700 mb-2">{product.description}</p>
                <span className="font-semibold text-blue-600">₹{product.price}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 
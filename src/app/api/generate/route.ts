// src/app/api/generate/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';

// Define the expected structure for our config
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
  logoUrl?: string; // This will be added later
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to generate a URL-friendly slug from a string
const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

export async function POST(request: NextRequest) {
  try {
    const { prompt }: { prompt: string } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // --- 1. Generate Website Configuration with GPT ---
    const systemPromptForJson = `
      You are an expert e-commerce website designer. A user will provide a business description.
      Your task is to generate a complete JSON configuration for a new online store based on this description.
      The JSON output MUST strictly follow this structure:
      {
        "businessInfo": { "name": "...", "slogan": "..." },
        "design": { "theme": "...", "palette": { "primary": "#...", "secondary": "#...", "background": "#...", "text": "#..." }, "font": { "headings": "...", "body": "..." } },
        "content": { "heroTitle": "...", "heroSubtitle": "...", "aboutSection": "..." },
        "initialProducts": [ { "id": 1, "name": "...", "description": "...", "price": 1200, "imageUrl": "/placeholder.svg" }, { "id": 2, "name": "...", "description": "...", "price": 2500, "imageUrl": "/placeholder.svg" }, { "id": 3, "name": "...", "description": "...", "price": 800, "imageUrl": "/placeholder.svg" } ],
        "logoPrompt": "A simple, clear prompt for DALL-E to generate a minimalist vector logo. Example: 'a minimalist logo of a stylized sun and a necklace, vector art'."
      }
      Analyze the user's prompt to infer the best values. Generate ONLY the JSON object and nothing else.
    `;
    
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPromptForJson },
        { role: 'user', content: prompt },
      ],
      model: 'gpt-4-turbo', // or 'gpt-4-1106-preview'
      response_format: { type: 'json_object' },
    });
    
    const config: StoreConfig = JSON.parse(chatCompletion.choices[0].message.content || '{}');
    const subdomain = slugify(config.businessInfo.name);

    // --- 2. Generate Logo with DALL-E ---
    const logoResponse = await openai.images.generate({
      model: 'dall-e-3',
      prompt: config.logoPrompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    const logoB64 = logoResponse.data[0].b64_json;
    if (!logoB64) throw new Error("Failed to get base64 data for the logo.");

    const logoPath = path.join(process.cwd(), `public/logos/${subdomain}-logo.png`);
    await fs.writeFile(logoPath, logoB64, 'base64');
    config.logoUrl = `/logos/${subdomain}-logo.png`;

    // --- 3. Save Configuration to File ---
    const dbPath = path.join(process.cwd(), `db/${subdomain}.json`);
    await fs.writeFile(dbPath, JSON.stringify(config, null, 2));

    // --- 4. Return the new subdomain ---
    return NextResponse.json({ subdomain });

  } catch (error: any) {
    console.error('Error generating store:', error);
    return NextResponse.json({ error: 'Failed to generate store. ' + error.message }, { status: 500 });
  }
}
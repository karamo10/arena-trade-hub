import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  // Make sure the folder exists
  const uploadDir = path.join(process.cwd(), 'public/images/products');
  await fs.mkdir(uploadDir, { recursive: true });

  // Save file
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const filePath = path.join(uploadDir, file.name);

  await fs.writeFile(filePath, buffer);

  // Return path for json-server
  return NextResponse.json({ url: `/images/products/${file.name}` });
}

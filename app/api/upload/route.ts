// import { NextResponse } from 'next/server';
// import { promises as fs } from 'fs';
// import path from 'path';

// export async function POST(req: Request) {
//   const formData = await req.formData();
//   const file = formData.get('file') as File;

//   if (!file) {
//     return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
//   }

//   // Make sure the folder exists
//   const uploadDir = path.join(process.cwd(), 'public/images/products');
//   await fs.mkdir(uploadDir, { recursive: true });

//   // Save file
//   const arrayBuffer = await file.arrayBuffer();
//   const buffer = Buffer.from(arrayBuffer);
//   const filePath = path.join(uploadDir, file.name);

//   await fs.writeFile(filePath, buffer);

//   // Return path for json-server
//   return NextResponse.json({ url: `/images/products/${file.name}` });
// }

import { v2 as cloudinary } from 'cloudinary';
import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Disable Next.js body parsing for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error parsing files', error: err });
    }

    const file = files.file as any;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      const result = await cloudinary.uploader.upload(file.filepath, {
        folder: 'arena_hub_img', 
      });

      res.status(200).json({ url: result.secure_url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Upload failed', error });
    }
  });
}

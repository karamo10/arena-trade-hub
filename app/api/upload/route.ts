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



// app/api/upload/route.ts
// import { NextResponse } from 'next/server';
// import formidable from 'formidable';
// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
//   api_key: process.env.CLOUDINARY_API_KEY as string,
//   api_secret: process.env.CLOUDINARY_API_SECRET as string,
//   secure: true,
// });


// export const config = { api: { bodyParser: false } };

// export async function POST(req: Request) {
//   const form = new formidable.IncomingForm();

//   return new Promise((resolve) => {
//     form.parse(req as any, async (err, fields, files) => {
//       if (err) {
//         console.error('Formidable error:', err);
//         return resolve(NextResponse.json({ error: 'File parsing failed' }, { status: 500 }));
//       }

//       const file = files.file as any;
//       if (!file) {
//         return resolve(NextResponse.json({ error: 'No file uploaded' }, { status: 400 }));
//       }

//       try {
//         const result = await cloudinary.uploader.upload(file.filepath, { folder: 'arena_hub_img' });
//         resolve(NextResponse.json({ url: result.secure_url }));
//       } catch (error) {
//         console.error('Cloudinary error:', error);
//         resolve(NextResponse.json({ error: 'Upload failed' }, { status: 500 }));
//       }
//     });
//   });
// }




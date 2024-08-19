import { PrismaClient } from "@prisma/client";
import cloudinary from '../../lib/cloudinaryConfig';
import multer from 'multer';
import nextConnect from 'next-connect';

const prisma = PrismaClient()

const upload = multer({
    storage: multer.memoryStorage(), // Simpan file di memori untuk diproses
});

const handler = nextConnect()
  .use(upload.single('file'))
  .use(async (req, res, next) => {
    req.body = JSON.parse(req.body); 
    next();
  })
  .all(async (req, res) => {

    const { id } = req.query;

    switch(req.method) {
        case "GET" :
            try {
                const user = await prisma.user.findMany()
                res.status(200).json(user)
            } catch (error) {
                res.status(500).json({error: error, message: 'Error Server!'})
            }
            break;

        case "POST" :
            try {
                const newUser = await prisma.user.create({
                    data: req.body
                })
                res.status(200).json(newUser)
            } catch (error) {
                res.status(500).json({error: error, message: 'Error Server!'})
            }
            break;

        case "DELETE" :
            try {
                const deleteUser = await prisma.delete({
                    where: {
                        idUnique: { id }
                    }
                })
                res.status(204).end()
            } catch (error) {
                res.status(500).json({error: error, message: 'Error Server!'})
            }
            break;
            
        case "UPDATE":
            try {
                // Jika ada gambar lama, hapus dari Cloudinary

                const { oldImageId, userData } = req.body;

                if (oldImageId) {
                  await cloudinary.uploader.destroy(oldImageId);
                }
      
                // Upload file baru ke Cloudinary
                const file = req.file; // Mengambil file dari Multer
                let imageUrl = null;
                let imagePublicId = null;
      
                if (file) {
                  const result = await cloudinary.uploader.upload(file.buffer, {
                    folder: 'puitisy/photo-profile', // Menentukan folder di Cloudinary
                  });
                  imageUrl = result.secure_url;
                  imagePublicId = result.public_id;
                }
      
                // Update pengguna di database dengan gambar baru jika ada
                await prisma.user.update({
                  where: { idUnique: id },
                  data: {
                    ...userData,
                    avatar: imagePublicId || undefined, // Simpan ID gambar di database
                  },
                });
      
                // Mengirimkan URL gambar sebagai respons
                res.status(200).json({ url: imageUrl, public_id: imagePublicId });
              } catch (error) {
                res.status(500).json({ error: error.message, message: 'Failed to update user' });
              }
              break;

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
});

export default handler
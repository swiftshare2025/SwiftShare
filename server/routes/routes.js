import express from 'express';
import multer from 'multer';
import {
  uploadImage,
  downloadFile,
  getFileMetadata, //its the new controller function
} from '../controller/image-controller.js';

const router = express.Router();

//storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

// Multer upload with size + type validation
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // Max 100MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/', 'application/pdf', 'video/', 'text/'];
    if (allowedTypes.some(type => file.mimetype.startsWith(type))) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  },
});

// POST /upload – Upload a file and send email
router.post('/upload', upload.single('file'), uploadImage);

// GET /download/:downloadId – Download file
router.get('/download/:downloadId', downloadFile);

// GET /metadata/:downloadId – Fetch file metadata (for UI display)
router.get('/metadata/:downloadId', getFileMetadata);

export default router;

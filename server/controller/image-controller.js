import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import DownloadLink from '../models/DownloadLink.js'; //MAKE SURE THIS IS IMPORTED

const uploadImage = async (req, res) => {
  const file = req.file;
  const { recipientEmail, senderName, message } = req.body;

  if (!file || !recipientEmail) {
    return res.status(400).json({ message: 'File and recipient email are required.' });
  }

  const downloadId = uuidv4();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days expiry

  const newLink = new DownloadLink({
    downloadId,
    filePath: file.path,
    originalName: file.originalname,
    recipientEmail,
    senderName,
    message,
    expiresAt,
  });

  try {
    await newLink.save();

    const downloadLink = `http://localhost:8000/download/${downloadId}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: recipientEmail,
      subject: `${senderName || 'Someone'} sent you a file via SwiftShare`,
      html: `
        <p>You've received a file from <strong>${senderName || 'Someone'}</strong>.</p>
        ${message ? `<p>Message: ${message}</p>` : ''}
        <p>Download the file by clicking the link below:</p>
        <a href="${downloadLink}" target="_blank" style="color: #1a73e8;">${downloadLink}</a>
        <p>This link will expire in 7 days.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: 'File sent successfully!',
      downloadId,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error uploading file or sending email.' });
  }
};

const getFileMetadata = async (req, res) => {
  const { downloadId } = req.params;

  try {
    const record = await DownloadLink.findOne({ downloadId });

    if (!record) {
      return res.status(404).json({ message: 'Metadata not found.' });
    }

    res.status(200).json({
      originalName: record.originalName,
      senderName: record.senderName,
      message: record.message,
      expiresAt: record.expiresAt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching file metadata.' });
  }
};

const downloadFile = async (req, res) => {
  const { downloadId } = req.params;

  try {
    const record = await DownloadLink.findOne({ downloadId });

    if (!record) {
      return res.status(404).json({ message: 'Download link not found or expired.' });
    }

    if (record.expiresAt < new Date()) {
      fs.unlink(record.filePath, (err) => {
        if (err) console.error('Error deleting expired file:', err);
      });
      await DownloadLink.deleteOne({ downloadId });
      return res.status(410).json({ message: 'Download link has expired.' });
    }

    const fullPath = path.resolve(record.filePath);
    console.log(`Attempting to download: ${fullPath}`);

    if (!fs.existsSync(fullPath)) {
      console.error('File does not exist:', fullPath);
      return res.status(404).json({ message: 'File not found on server.' });
    }

    res.download(fullPath, record.originalName, (err) => {
      if (err) {
        console.error("Download error:", err);
        res.status(500).json({ message: 'Error downloading file.' });
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error processing download request.' });
  }
};


export { uploadImage, downloadFile, getFileMetadata };

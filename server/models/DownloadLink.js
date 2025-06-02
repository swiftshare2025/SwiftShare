//import mongoose from 'mongoose';

//const DownloadLinkSchema = new mongoose.Schema({
  //downloadId: { type: String, required: true, unique: true },
  //filePath: { type: String, required: true },
  //originalName: { type: String, required: true },
  //recipientEmail: { type: String, required: true },
  //senderName: String,
  //message: String,
  //expiresAt: { type: Date, required: true }
//});

//export default mongoose.model('DownloadLink', DownloadLinkSchema);

import mongoose from 'mongoose';

const DownloadLinkSchema = new mongoose.Schema({
  downloadId: { type: String, required: true, unique: true }, // ✔️ Used for download URL
  filePath: { type: String, required: true },                  // ✔️ Stores file location
  originalName: { type: String, required: true },              // ✔️ For naming on download
  recipientEmail: { type: String, required: true },            // ✔️ Email recipient
  senderName: String,                                          // ✔️ Optional
  message: String,                                             // ✔️ Optional
  expiresAt: { type: Date, required: true }                    // ✔️ Expiry logic
});


export default mongoose.model('DownloadLink', DownloadLinkSchema);

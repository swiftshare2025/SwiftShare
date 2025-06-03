import mongoose from 'mongoose';

const DownloadLinkSchema = new mongoose.Schema({
  downloadId: { type: String, required: true, unique: true }, //used for download URL
  filePath: { type: String, required: true },                  //stores file location
  originalName: { type: String, required: true },              //for naming on download
  recipientEmail: { type: String, required: true },            //for email recipient
  senderName: String,                                          //this is optional
  message: String,                                             //this is optional
  expiresAt: { type: Date, required: true }                    //the expiry logic
});


export default mongoose.model('DownloadLink', DownloadLinkSchema);

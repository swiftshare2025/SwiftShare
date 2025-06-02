import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import vector from "../assets/Vector.png";

import { uploadFile } from "../services/api";
import "./MainPage.css";

function MainPage() {
  const [file, setFile] = useState(null);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setDownloadLink("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !recipientEmail || !senderName) {
      setError("Please select a file, enter recipient email, and your name.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("recipientEmail", recipientEmail);
    formData.append("senderName", senderName);
    formData.append("message", message);

    try {
      const response = await uploadFile(formData);

      if (response.message && response.downloadId) {
        setDownloadLink(`http://localhost:8000/download/${response.downloadId}`);
        setFile(null);
        setRecipientEmail("");
        setSenderName("");
        setMessage("");
        setError("");
        if (fileInputRef.current) fileInputRef.current.value = null;
      } else {
        setError("Unexpected server response.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.response?.data?.message || "Upload failed. Please try again.");
    }
  };

  return (
    <div className="main-container">
      <header style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: "bold",
            cursor: "pointer"
          }}
          onClick={() => navigate("/")}
        >
          SWIFTSHARE
        </h2>
      </header>

      <h1 className="main-title">Securely send and receive files in seconds.</h1>

      <div className="main-content">
        <div className="form-container">
          <h3 className="form-header">Upload File</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="fileInput">Select File</label>
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
            />

            <label htmlFor="recipientEmail">Email To:</label>
            <input
              id="recipientEmail"
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              required
            />

            <label htmlFor="senderName">Your Name:</label>
            <input
              id="senderName"
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              required
            />

            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button type="submit" className="submit-button">Send File</button>
          </form>

          {error && <p className="error-text">{error}</p>}

          {downloadLink && (
            <div className="success-box">
              <p>File uploaded successfully!</p>
              <a href={downloadLink} target="_blank" rel="noopener noreferrer">
                {downloadLink}
              </a>
            </div>
          )}
        </div>

        <div className="image-container">
          <img src={vector} alt="File sharing" className="main-image" />
        </div>
      </div>
    </div>
  );
}

export default MainPage;

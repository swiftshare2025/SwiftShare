import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Upload a file
export const uploadFile = async (formData) => {
  try {
    const response = await api.post('/upload', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch file metadata (for showing filename, size, etc.)
export const getFileMetadata = async (downloadId) => {
  try {
    const response = await api.get(`/metadata/${downloadId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Optional: Download file programmatically (not just via <a href>)
export const downloadFile = async (downloadId) => {
  try {
    const response = await api.get(`/download/${downloadId}`, {
      responseType: 'blob', // important for downloading binary data
    });
    return response;
  } catch (error) {
    throw error;
  }
};

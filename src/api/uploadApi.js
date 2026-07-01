import axiosInstance from '../services/axiosInstance';

// POST /api/upload  multipart/form-data with key "file"
// returns: { url, fileKey }  (S3 public URL + key for deletion)
export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axiosInstance
    .post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((r) => r.data);
};

// DELETE /api/upload/:fileKey
export const deleteFile = (fileKey) =>
  axiosInstance.delete(`/upload/${encodeURIComponent(fileKey)}`).then((r) => r.data);

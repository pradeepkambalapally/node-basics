import { useState, useEffect, useRef } from 'react';
import api from '../api';
import toast from 'react-hot-toast';
import { Upload, Trash2, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Images() {
  const [images, setImages] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef();

  const fetchImages = async (page = 1) => {
    setLoading(true);
    try {
      const res = await api.get(`/images/fetch?page=${page}&limit=8`);
      setImages(res.data.data || []);
      setPagination(res.data.pagination || { page: 1, totalPages: 1 });
    } catch {
      toast.error('Failed to load images');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchImages(); }, []);

  const handleUpload = async (file) => {
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      return toast.error('Only JPEG and PNG files are allowed');
    }
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      await api.post('/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Image uploaded!');
      fetchImages(1);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this image?')) return;
    try {
      await api.delete(`/images/delete/${id}`);
      toast.success('Image deleted');
      fetchImages(pagination.page);
    } catch {
      toast.error('Delete failed');
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

  return (
    <div className="page">
      <div className="page-header row">
        <div>
          <h1>Image Gallery</h1>
          <p>{pagination.totalImages || 0} images stored in Cloudinary</p>
        </div>
        <button className="btn-primary" onClick={() => fileRef.current.click()} disabled={uploading}>
          <Upload size={16} /> {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
        <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/jpg" hidden onChange={e => handleUpload(e.target.files[0])} />
      </div>

      <div
        className={`drop-zone ${dragOver ? 'drag-over' : ''}`}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
      >
        <Upload size={20} />
        <span>Drop an image here to upload</span>
      </div>

      {loading ? (
        <div className="image-grid">
          {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="skeleton-image" />)}
        </div>
      ) : images.length === 0 ? (
        <div className="empty-state">
          <ImageIcon size={48} />
          <h3>No images yet</h3>
          <p>Upload your first image to get started.</p>
        </div>
      ) : (
        <>
          <div className="image-grid">
            {images.map(img => (
              <div key={img._id} className="image-card">
                <img src={img.url} alt="uploaded" loading="lazy" />
                <div className="image-overlay">
                  <button className="btn-icon danger" onClick={() => handleDelete(img._id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="pagination">
              <button className="btn-secondary" onClick={() => fetchImages(pagination.page - 1)} disabled={pagination.page <= 1}>
                <ChevronLeft size={16} />
              </button>
              <span>Page {pagination.page} of {pagination.totalPages}</span>
              <button className="btn-secondary" onClick={() => fetchImages(pagination.page + 1)} disabled={pagination.page >= pagination.totalPages}>
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

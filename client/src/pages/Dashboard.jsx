import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Package, Image, Zap, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="page">
      <div className="page-header">
        <h1>Welcome back, <span className="accent">{user?.username}</span></h1>
        <p>Manage your products and images from one place.</p>
      </div>
      <div className="dashboard-cards">
        <Link to="/products" className="dash-card">
          <div className="dash-card-icon"><Package size={32} /></div>
          <div className="dash-card-body">
            <h3>Products</h3>
            <p>Browse, add, edit and remove products in your catalog.</p>
          </div>
          <ArrowRight size={20} className="dash-card-arrow" />
        </Link>
        <Link to="/images" className="dash-card">
          <div className="dash-card-icon"><Image size={32} /></div>
          <div className="dash-card-body">
            <h3>Image Gallery</h3>
            <p>Upload and manage images via Cloudinary storage.</p>
          </div>
          <ArrowRight size={20} className="dash-card-arrow" />
        </Link>
      </div>
      <div className="stack-badge">
        <Zap size={14} />
        <span>Node.js · Express · MongoDB · Cloudinary · JWT Auth</span>
      </div>
    </div>
  );
}

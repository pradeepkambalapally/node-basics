import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Package, Image, Home, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success('Logged out');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Zap size={20} />
        <span>NodeBase</span>
      </div>
      <div className="navbar-links">
        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
          <Home size={16} /> Dashboard
        </Link>
        <Link to="/products" className={`nav-link ${isActive('/products') ? 'active' : ''}`}>
          <Package size={16} /> Products
        </Link>
        <Link to="/images" className={`nav-link ${isActive('/images') ? 'active' : ''}`}>
          <Image size={16} /> Images
        </Link>
      </div>
      <div className="navbar-user">
        <span className="user-badge">{user.username}</span>
        <button onClick={handleLogout} className="btn-icon" title="Logout">
          <LogOut size={16} />
        </button>
      </div>
    </nav>
  );
}

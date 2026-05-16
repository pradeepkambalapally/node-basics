import { useState, useEffect } from 'react';
import api from '../api';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, X, Check, Package } from 'lucide-react';

const emptyForm = { title: '', category: '', price: '', inStock: true };

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data.data || []);
    } catch {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (p) => {
    setEditing(p._id);
    setForm({ title: p.title, category: p.category, price: p.price, inStock: p.inStock });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, price: parseFloat(form.price) };
      if (editing) {
        await api.put(`/products/${editing}`, payload);
        toast.success('Product updated');
      } else {
        await api.post('/products', payload);
        toast.success('Product added');
      }
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted');
      fetchProducts();
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="page">
      <div className="page-header row">
        <div>
          <h1>Products</h1>
          <p>{products.length} items in catalog</p>
        </div>
        <button className="btn-primary" onClick={openAdd}>
          <Plus size={16} /> Add Product
        </button>
      </div>

      {loading ? (
        <div className="loading-grid">
          {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton-card" />)}
        </div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <Package size={48} />
          <h3>No products yet</h3>
          <p>Add your first product to get started.</p>
          <button className="btn-primary" onClick={openAdd}>Add Product</button>
        </div>
      ) : (
        <div className="products-grid">
          {products.map(p => (
            <div key={p._id} className="product-card">
              <div className="product-header">
                <span className={`stock-badge ${p.inStock ? 'in' : 'out'}`}>
                  {p.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
                <div className="product-actions">
                  <button className="btn-icon" onClick={() => openEdit(p)}><Pencil size={14} /></button>
                  <button className="btn-icon danger" onClick={() => handleDelete(p._id)}><Trash2 size={14} /></button>
                </div>
              </div>
              <h3 className="product-title">{p.title}</h3>
              <span className="product-category">{p.category}</span>
              <div className="product-price">${parseFloat(p.price).toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editing ? 'Edit Product' : 'Add Product'}</h3>
              <button className="btn-icon" onClick={() => setShowModal(false)}><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Title</label>
                <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Product name" required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input value={form.category} onChange={e => setForm({...form, category: e.target.value})} placeholder="e.g. Electronics" required />
              </div>
              <div className="form-group">
                <label>Price ($)</label>
                <input type="number" step="0.01" min="0" value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="0.00" required />
              </div>
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input type="checkbox" checked={form.inStock} onChange={e => setForm({...form, inStock: e.target.checked})} />
                  <span>In Stock</span>
                </label>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : editing ? 'Update' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

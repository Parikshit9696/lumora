import { useState } from 'react';
import { FolderHeart, Plus, Pencil, Trash2, X } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';
import { useCollections } from '../context/CollectionsContext';

export default function Collections() {
  const { collections, createCollection, renameCollection, deleteCollection, removeFromCollection } = useCollections();
  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [renameId, setRenameId] = useState(null);
  const [renameValue, setRenameValue] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    createCollection(newName.trim());
    setNewName('');
    setCreateOpen(false);
  };

  const handleRename = (e) => {
    e.preventDefault();
    renameCollection(renameId, renameValue.trim());
    setRenameId(null);
  };

  return (
    <div className="fade-in section section--tight">
      <div className="container">
        <div className="section-head">
          <div>
            <h1 className="section-title">Your Collections</h1>
            <p className="section-sub">Organise saved photography into personal moodboards.</p>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setCreateOpen(true)}><Plus size={15} /> New Collection</button>
        </div>

        {collections.length === 0 ? (
          <EmptyState icon={FolderHeart} title="No collections yet" message="Create your first collection to start saving inspiration." actionLabel="Create Collection" onAction={() => setCreateOpen(true)} />
        ) : (
          <div className="grid grid-3">
            {collections.map((col) => (
              <div key={col.id} className="card" style={{ padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontSize: 17 }}>{col.name}</h3>
                    <p className="text-stone" style={{ fontSize: 12.5 }}>{col.items.length} items</p>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn-icon" style={{ width: 32, height: 32 }} onClick={() => { setRenameId(col.id); setRenameValue(col.name); }}>
                      <Pencil size={13} />
                    </button>
                    <button className="btn-icon" style={{ width: 32, height: 32 }} onClick={() => deleteCollection(col.id)}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
                {col.items.length === 0 ? (
                  <p className="text-stone" style={{ fontSize: 13 }}>Save photos from the Gallery to add them here.</p>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                    {col.items.slice(0, 6).map((item) => (
                      <div key={item.id} style={{ position: 'relative', aspectRatio: 1, borderRadius: 4, overflow: 'hidden' }}>
                        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button
                          onClick={() => removeFromCollection(col.id, item.id)}
                          style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(21,19,15,0.6)', color: '#fff', border: 'none', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <X size={11} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Create Collection">
        <form onSubmit={handleCreate}>
          <div className="field">
            <label>Collection name</label>
            <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Wedding Ideas" autoFocus />
          </div>
          <button className="btn btn-primary btn-block" type="submit">Create</button>
        </form>
      </Modal>

      <Modal open={!!renameId} onClose={() => setRenameId(null)} title="Rename Collection">
        <form onSubmit={handleRename}>
          <div className="field">
            <label>Collection name</label>
            <input value={renameValue} onChange={(e) => setRenameValue(e.target.value)} autoFocus />
          </div>
          <button className="btn btn-primary btn-block" type="submit">Save</button>
        </form>
      </Modal>
    </div>
  );
}

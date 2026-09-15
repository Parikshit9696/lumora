import { useState, useMemo } from 'react';
import { Search, ImageOff } from 'lucide-react';
import GalleryCard from '../components/GalleryCard';
import ImageGallery from '../components/ImageGallery';
import EmptyState from '../components/EmptyState';
import { galleryPhotos, galleryCategories } from '../data/gallery';
import { useCollections } from '../context/CollectionsContext';
import { useNotifications } from '../context/NotificationContext';

export default function Gallery() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [likedIds, setLikedIds] = useState([]);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const { collections, addToCollection } = useCollections();
  const { addNotification } = useNotifications();

  const filtered = useMemo(() => {
    return galleryPhotos.filter((p) => {
      if (category !== 'All' && p.category !== category && category !== 'Trending' && category !== 'Editorial') return false;
      if (query.trim() && !p.title.toLowerCase().includes(query.trim().toLowerCase())) return false;
      return true;
    });
  }, [category, query]);

  const toggleLike = (photo) => {
    setLikedIds((prev) => (prev.includes(photo.id) ? prev.filter((id) => id !== photo.id) : [...prev, photo.id]));
  };

  const handleSave = (photo, share = false) => {
    if (share) {
      addNotification({ title: 'Link copied', message: `Share link for “${photo.title}” copied (simulated).`, type: 'update' });
      return;
    }
    const target = collections[0];
    if (target) {
      addToCollection(target.id, { id: photo.id, title: photo.title, image: photo.src });
      addNotification({ title: 'Saved to collection', message: `Added “${photo.title}” to ${target.name}.`, type: 'update' });
    }
  };

  return (
    <div className="fade-in">
      <div className="simple-hero">
        <div className="container">
          <h1>The LUMORA Gallery.</h1>
          <p>An ever-growing collection of frames from our photographer community — browse, favourite, and save what inspires you.</p>
        </div>
      </div>

      <div className="section section--tight">
        <div className="container">
          <div className="page-toolbar">
            <div className="search-input">
              <Search size={16} />
              <input type="text" placeholder="Search the gallery…" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
          </div>
          <div className="filter-chip-group" style={{ marginBottom: 32 }}>
            {galleryCategories.map((c) => (
              <button key={c} className={`chip ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <EmptyState icon={ImageOff} title="No photos found" message="Try a different search term or category." />
          ) : (
            <div className="masonry">
              {filtered.map((photo) => (
                <GalleryCard
                  key={photo.id}
                  photo={photo}
                  liked={likedIds.includes(photo.id)}
                  onOpen={setLightboxPhoto}
                  onLike={toggleLike}
                  onSave={handleSave}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {lightboxPhoto && (
        <ImageGallery
          photos={filtered}
          startIndex={filtered.findIndex((p) => p.id === lightboxPhoto.id)}
          onClose={() => setLightboxPhoto(null)}
          onLike={toggleLike}
          likedIds={likedIds}
        />
      )}
    </div>
  );
}

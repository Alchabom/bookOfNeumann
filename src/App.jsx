import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function NeumannPhotobook() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFlipping, setIsFlipping] = useState(false);

  const categories = [
    { id: 'all', name: 'All Adventures', emoji: '📚' },
    { id: 'sleepy', name: 'Sleepy Neumann', emoji: '😴' },
    { id: 'playing', name: 'Playing', emoji: '🎾' },
    { id: 'eating', name: 'Eating', emoji: '🍽️' },
    { id: 'nature', name: 'Nature', emoji: '🌿' }
  ];

  const photos = [
    { id: 1, category: 'sleepy', desc: 'Cozy nap time', emoji: '😴' },
    { id: 2, category: 'playing', desc: 'Chasing toys', emoji: '🎾' },
    { id: 3, category: 'eating', desc: 'Yummy treats', emoji: '🍽️' },
    { id: 4, category: 'nature', desc: 'Garden explorer', emoji: '🌿' },
    { id: 5, category: 'sleepy', desc: 'Sunbeam dreams', emoji: '😴' },
    { id: 6, category: 'playing', desc: 'Pounce attack!', emoji: '🎾' },
    { id: 7, category: 'eating', desc: 'Dinner time', emoji: '🍽️' },
    { id: 8, category: 'nature', desc: 'Window watching', emoji: '🌿' },
  ];

  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(p => p.category === selectedCategory);

  const photosPerPage = 4;
  const totalPages = Math.ceil(filteredPhotos.length / photosPerPage);
  const currentPhotos = filteredPhotos.slice(
    currentPage * photosPerPage,
    (currentPage + 1) * photosPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(0);
  };

  const openBook = () => {
    setIsOpen(true);
  };

  const closeBook = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setCurrentPage(0);
      setSelectedCategory('all');
    }, 800);
  };

  // --- CLOSED STATE ---
  if (!isOpen) {
    return (
      <div 
        style={{
          minHeight: '100vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom right, #78350f, #292524, #171717)',
          overflow: 'hidden'
        }}
      >
        <div 
          onClick={openBook}
          style={{
            cursor: 'pointer',
            perspective: '1000px',
            transform: 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{ position: 'relative', width: '300px', height: '400px' }}>
             {/* Shadow */}
            <div style={{
              position: 'absolute', inset: 0, backgroundColor: 'black', opacity: 0.5, filter: 'blur(20px)', transform: 'translateY(20px)'
            }}></div>
            
            {/* Book Cover */}
            <div style={{
              position: 'relative', width: '100%', height: '100%',
              background: 'linear-gradient(135deg, #8b4513 0%, #654321 50%, #3e2723 100%)',
              boxShadow: '-8px 0 20px rgba(0,0,0,0.5)',
              borderRadius: '0 8px 8px 0',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '20px', textAlign: 'center', color: '#d4af37',
              border: '1px solid #3e2723'
            }}>
              {/* Ornate Border */}
              <div style={{
                position: 'absolute', top: '20px', left: '20px', right: '20px', bottom: '20px',
                border: '4px double #d4af37', borderRadius: '4px'
              }}></div>

              <div style={{ fontSize: '3rem', marginBottom: '1rem', zIndex: 10 }}>🐱</div>
              <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 'bold', lineHeight: 1.2, zIndex: 10, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                The Book<br/>of<br/>Neumann
              </h1>
              <p style={{ marginTop: '2rem', fontStyle: 'italic', color: '#c9a961', zIndex: 10 }}>Click to Open</p>
              
              {/* Spine */}
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: '20px',
                background: 'linear-gradient(90deg, #3e2723 0%, #654321 50%, transparent 100%)',
                borderRadius: '4px 0 0 4px'
              }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- OPEN STATE ---
  return (
    <div 
      style={{
        minHeight: '100vh',
        width: '100vw', // Force full viewport width
        background: 'linear-gradient(to bottom right, #e7e5e4, #fffbeb, #fef9c3)',
        boxSizing: 'border-box',
        overflowX: 'hidden', // Prevent horizontal scrolling
        opacity: isClosing ? 0 : 1,
        transform: isClosing ? 'scale(0.95)' : 'scale(1)',
        transition: 'all 0.8s ease',
        padding: '20px'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        
        {/* Top Bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <button
            onClick={closeBook}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 20px',
              backgroundColor: '#92400e', color: '#fffbeb',
              border: '2px solid #78350f', borderRadius: '8px',
              cursor: 'pointer', fontFamily: 'Georgia, serif',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            <X size={20} /> Close Book
          </button>
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ 
            fontFamily: 'Garamond, Georgia, serif', 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', // Responsive font size
            color: '#78350f', 
            fontWeight: 'bold',
            margin: '0 0 10px 0'
          }}>
            The Book of Neumann
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <div style={{ height: '1px', width: '60px', backgroundColor: '#d97706' }}></div>
            <p style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', color: '#b45309', margin: 0 }}>Est. 2024</p>
            <div style={{ height: '1px', width: '60px', backgroundColor: '#d97706' }}></div>
          </div>
        </div>

        {/* Main Content Layout - Flex Wrap for Responsiveness */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', // Allow wrapping on small screens
          gap: '2rem',
          alignItems: 'flex-start'
        }}>
          
          {/* Sidebar / Chapters */}
          <div style={{ 
            flex: '1 1 250px', // Grow 1, Shrink 1, Basis 250px
            minWidth: '250px' 
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              borderRadius: '8px',
              border: '2px solid #92400e',
              padding: '1rem'
            }}>
              <h3 style={{ 
                fontFamily: 'Garamond, serif', fontSize: '1.5rem', fontWeight: 'bold', 
                color: '#78350f', textAlign: 'center', 
                borderBottom: '2px solid #b45309', marginBottom: '1rem', paddingBottom: '0.5rem' 
              }}>
                Chapters
              </h3>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '12px',
                    borderRadius: '4px', marginBottom: '8px',
                    display: 'flex', alignItems: 'center', gap: '10px',
                    cursor: 'pointer',
                    fontFamily: 'Georgia, serif',
                    backgroundColor: selectedCategory === cat.id ? '#92400e' : '#fef3c7',
                    color: selectedCategory === cat.id ? '#fffbeb' : '#78350f',
                    border: selectedCategory === cat.id ? '1px solid #78350f' : '1px solid #fbbf24',
                    transition: 'background 0.2s'
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{cat.emoji}</span>
                  <span style={{ fontWeight: 500 }}>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Book Pages Area */}
          <div style={{ 
            flex: '999 1 400px', // Take up remaining space, but wrap if < 400px available
            position: 'relative' 
          }}>
            <div style={{
              background: 'linear-gradient(to bottom, #fef9e7 0%, #faecc5 100%)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              borderRadius: '8px', 
              padding: 'clamp(1.5rem, 4vw, 3rem)', // Responsive padding
              border: '4px solid #78350f', 
              minHeight: '500px'
            }}>
              
              {/* Photo Grid */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '1.5rem',
                opacity: isFlipping ? 0 : 1,
                transition: 'opacity 0.3s ease'
              }}>
                {currentPhotos.map((photo, idx) => (
                  <div
                    key={photo.id}
                    style={{
                      transform: `rotate(${(idx % 2 === 0 ? -1 : 1) * 1}deg)`,
                      background: '#fffef7',
                      padding: '15px',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      border: '1px solid #fde68a',
                      transition: 'transform 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05) rotate(0deg)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = `rotate(${(idx % 2 === 0 ? -1 : 1) * 1}deg)`}
                  >
                    <div style={{ 
                      aspectRatio: '1/1', 
                      background: 'linear-gradient(to bottom right, #e7e5e4, #fef3c7, #fef9c3)', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', 
                      fontSize: '3rem', 
                      border: '2px solid #fcd34d' 
                    }}>
                      {photo.emoji}
                    </div>
                    <p style={{ textAlign: 'center', marginTop: '10px', fontFamily: 'cursive', color: '#1f2937' }}>
                      {photo.desc}
                    </p>
                  </div>
                ))}
              </div>

              {currentPhotos.length === 0 && (
                 <div style={{ textAlign: 'center', padding: '60px 0' }}>
                   <p style={{ fontSize: '3rem' }}>📷</p>
                   <p style={{ fontSize: '1.5rem', fontFamily: 'Georgia, serif', color: '#92400e' }}>This chapter awaits...</p>
                 </div>
              )}

              {/* Page Number */}
              <div style={{ 
                textAlign: 'center', marginTop: '3rem', 
                color: '#78350f', fontFamily: 'serif', fontStyle: 'italic', 
                borderTop: '1px solid #fcd34d', paddingTop: '1rem' 
              }}>
                Page {currentPage + 1} of {totalPages || 1}
              </div>
            </div>

            {/* Navigation Buttons (Absolute to the pages container) */}
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              style={{
                position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%)',
                width: '50px', height: '50px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: currentPage === 0 ? '#a8a29e' : '#92400e',
                color: '#fff', border: '2px solid #fff', boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                cursor: currentPage === 0 ? 'not-allowed' : 'pointer', zIndex: 20
              }}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={nextPage}
              disabled={currentPage >= totalPages - 1}
              style={{
                position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)',
                width: '50px', height: '50px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: currentPage >= totalPages - 1 ? '#a8a29e' : '#92400e',
                color: '#fff', border: '2px solid #fff', boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                cursor: currentPage >= totalPages - 1 ? 'not-allowed' : 'pointer', zIndex: 20
              }}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
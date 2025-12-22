import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import './App.css';
import playing1 from './images/playing1.jpg';
import playing2 from './images/playing2.jpg';
import eating1 from './images/eating1.jpg';
import nature1 from './images/nature1.jpg';
import sleeping1 from './images/sleeping1.jpg';
import sleeping2 from './images/sleeping2.jpg';
import { BlobServiceClient } from '@azure/storage-blob';
import { Upload } from 'lucide-react';


export default function NeumannPhotobook() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFlipping, setIsFlipping] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const categories = [
    { id: 'all', name: 'All Adventures'},
    { id: 'sleepy', name: 'Sleepy Neumann'},
    { id: 'playing', name: 'Playing'},
    { id: 'eating', name: 'Eating'},
    { id: 'nature', name: 'Nature'}
  ];

  const defaultPhotos = [
    { id: 1, category: 'sleepy', desc: 'Flashed', image: sleeping1},
    { id: 2, category: 'playing', desc: 'Ready to pounce', image: playing1},
    { id: 3, category: 'eating', desc: 'Chunker', image: eating1},
    { id: 4, category: 'nature', desc: 'Window watching', image: nature1},
    { id: 5, category: 'sleepy', desc: 'The slightest movement will disturb', image: sleeping2},
    { id: 6, category: 'playing', desc: 'Pounce attack!', image: playing2},
  ];

  const [photos,setPhotos] = useState(defaultPhotos);

  useEffect(() => {
    const fetchAzurePhotos = async () => {
      try {
        const accountName = import.meta.env.VITE_AZURE_STORAGE_ACCOUNT_NAME;
        const containerName = import.meta.env.VITE_AZURE_CONTAINER_NAME;
        const sasToken = import.meta.env.VITE_AZURE_STORAGE_SAS_TOKEN;

        const blobServiceClient = new BlobServiceClient(
          `https://${accountName}.blob.core.windows.net${sasToken}`
        );

        const containerClient = blobServiceClient.getContainerClient(containerName);
        const azurePhotos = [];

        for await (const blob of containerClient.listBlobsFlat()) {
          const imageUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blob.name}`;

          azurePhotos.push({
            id: blob.name,
            category: 'all',
            desc: 'Uploaded Memory',
            image: imageUrl
          });
        }
        setPhotos([...defaultPhotos, ...azurePhotos]);
      } catch (error) {
        console.error("Error fetching azure photos:", error);
      }
    };
    fetchAzurePhotos();
  }, []);


  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(p => p.category === selectedCategory);

  const photosPerPage = 16;
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

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];

    if (!file) return; 

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    setIsUploading(true);

    try {
      const timestamp = Date.now();
      const uniqueFileName = `neumann_${timestamp}_${file.name}`;

      const accountName = import.meta.env.VITE_AZURE_STORAGE_ACCOUNT_NAME;
      const sasToken = import.meta.env.VITE_AZURE_STORAGE_SAS_TOKEN;
      const containerName = import.meta.env.VITE_AZURE_CONTAINER_NAME;

      const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net${sasToken}`);

      const containerClient = blobServiceClient.getContainerClient(containerName);

      const blobClient = containerClient.getBlockBlobClient(uniqueFileName);
      await blobClient.uploadData(file, {blobHTTPHeaders: {blobContentType: file.type}});

      const imageUrl = blobClient.url.split('?')[0];

      const newPhoto = {
        id: timestamp,
        category: 'all',
        desc: 'Uploaded photo',
        image: imageUrl
      };
      setPhotos([...photos, newPhoto]);
      alert ('Photo uploaded successfully!');
    } catch (error) {
      console.error('Upload error: ', error);
      alert('Failed to upload photo, check console.');
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };


  // CLOSED STATE - Book Cover
  if (!isOpen) {
    return (
      <div className="cover-container">
        <div className="book-cover-wrapper" onClick={openBook}>
          <div style={{ position: 'relative' }}>
            <div className="book-shadow"></div>
            <div className="book-cover">
              <div className="book-ornate-border"></div>
              <div className="book-cover-icon"></div>
              <h1 className="book-cover-title">
                The Book<br/>of<br/>Neumann
              </h1>
              <div style={{ width: '80px', height: '2px', background: '#d4af37', margin: '1.5rem 0', opacity: 0.6 }}></div>
              <p className="book-cover-subtitle">
                A Collection of<br/>Feline Memories
              </p>
              <div style={{ fontSize: '1.5rem', marginTop: '1rem', opacity: 0.6 }}>❧</div>
              <p className="book-cover-hint">Click to open</p>
              <div className="book-spine"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // OPEN STATE - Book Pages
  return (
    <div className={`open-book-container ${isClosing ? 'closing' : ''}`}>
      <div className="content-wrapper">
        
        <div className="top-bar">
          <button className="close-button" onClick={closeBook}>
            <X size={20} />
            Close Book
          </button>
        </div>

        <div className="page-header">
          <h1 className="page-title">The Book of Neumann</h1>
          <div className="page-subtitle">
            <div className="subtitle-line"></div>
            <p className="subtitle-text">Est. 2024</p>
            <div className="subtitle-line"></div>
          </div>
        </div>

        <div className="main-layout">
          
          <div className="sidebar">
            <div className="chapters-box">
              <h3 className="chapters-title">Chapters</h3>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`category-button ${selectedCategory === cat.id ? 'active' : ''}`}
                >
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
            <div className = "chapters-box" style= {{marginTop: '1rem'}}>
              <h3 className="chapters-title">Add Photos</h3>
              <input
                  type="file"
                  id="file-upload"
                  accept="image/*"
                  onChange={handleFileSelect}
                  style={{display: 'none'}}
                />
                <label
                  htmlFor="file-upload"
                  className={`category-button ${isUploading ? 'disabled' : ''}`}
                  style={{
                    cursor: isUploading ? 'not-allowed' : 'pointer',
                    opacity: isUploading ? 0.6 : 1,
                    justifyContent: 'center'
                  }}
                  >
                    {isUploading ? (
                      <>
                      <span className="category-emoji">⏳</span>
                      <span>Uploading...</span>
                      </>
                    ): (
                      <>
                        <span className="category-emoji">📸</span>
                        <span>Upload Photo</span>
                      </>
                    )}
                  </label>
          </div>
          </div>

          <div className="book-pages-area">
            <div className="pages-container">
              <div className="binding-line"></div>
              
              <div className={`photo-grid ${isFlipping ? 'flipping' : ''}`}>
                {currentPhotos.map((photo, idx) => (
                  <div
                    key={photo.id}
                    className="photo-card"
                    style={{
                      transform: `rotate(${(idx % 2 === 0 ? -1 : 1) * 1}deg)`
                    }}
                  >
                    <div className="photo-placeholder">
                       <img src={photo.image} alt={photo.desc} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <p className="photo-description">{photo.desc}</p>
                  </div>
                ))}
              </div>

              {currentPhotos.length === 0 && (
                <div className="empty-state">
                  <div className="empty-icon">📷</div>
                  <p className="empty-title">This chapter awaits...</p>
                  <p className="empty-subtitle">Upload some memories!</p>
                </div>
              )}

              <div className="page-number">
                Page {currentPage + 1} of {totalPages || 1}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="nav-button prev"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              onClick={nextPage}
              disabled={currentPage >= totalPages - 1}
              className="nav-button next"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// Unsplash API Configuration
const UNSPLASH_ACCESS_KEY = 'zaA5tir9keLrzGUrO4zP4F3QuZFrlwrR3zjfdWK696s'; // Get from https://unsplash.com/developers
const UNSPLASH_API_URL = `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}&count=12&query=nature`;

// DOM Elements
const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-image');
const captionText = document.getElementById('caption');
const downloadBtn = document.getElementById('download-btn');
const closeBtn = document.querySelector('.close-btn');

// Fetch photos from Unsplash
async function fetchPhotos(query = 'nature') {
    try {
        gallery.innerHTML = '<div class="loading">Loading photos...</div>';
        
        const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}&count=12&query=${query}`);
        const photos = await response.json();
        
        displayPhotos(photos);
    } catch (error) {
        gallery.innerHTML = '<div class="error">Failed to load photos. Please try again later.</div>';
        console.error('Error fetching photos:', error);
    }
}

// Display photos in gallery
function displayPhotos(photos) {
    gallery.innerHTML = '';
    
    photos.forEach(photo => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'photo-container';
        
        const img = document.createElement('img');
        img.src = photo.urls.regular;
        img.alt = photo.alt_description || 'Nature photo';
        img.dataset.full = photo.urls.full;
        img.dataset.author = photo.user.name;
        img.dataset.download = photo.links.download;
        
        img.addEventListener('click', () => openModal(photo));
        
        imgContainer.appendChild(img);
        gallery.appendChild(imgContainer);
    });
}

// Open modal with clicked image
function openModal(photo) {
    modal.style.display = 'block';
    modalImg.src = photo.urls.regular;
    captionText.textContent = `Photo by ${photo.user.name}`;
    downloadBtn.href = photo.links.download + '?force=true'; // Force download
}

// Close modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close when clicking outside image
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Search functionality
searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim() || 'nature';
    fetchPhotos(query);
});

searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim() || 'nature';
        fetchPhotos(query);
    }
});

// Initialize gallery
fetchPhotos();
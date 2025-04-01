// Matrix Code Rain Animation
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

// Set canvas size to window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Matrix characters
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%';
const charArray = chars.split('');
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

// Initialize drops
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

// Drawing the characters
function draw() {
    // Semi-transparent black background to create fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Purple and light blue text
    ctx.font = fontSize + 'px monospace';

    // Loop over drops
    for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Alternate between purple and light blue
        if (i % 2 === 0) {
            ctx.fillStyle = '#b967ff'; // Purple
        } else {
            ctx.fillStyle = '#01cdfe'; // Light blue
        }
        
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top with random delay if it reaches bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Animation loop
setInterval(draw, 33);

// Add vaporwave landscape
const landscapeCanvas = document.createElement('canvas');
const landscapeCtx = landscapeCanvas.getContext('2d');
landscapeCanvas.style.position = 'fixed';
landscapeCanvas.style.top = '0';
landscapeCanvas.style.left = '0';
landscapeCanvas.style.width = '100%';
landscapeCanvas.style.height = '100%';
landscapeCanvas.style.zIndex = '-1';
landscapeCanvas.style.opacity = '0.1';
document.body.appendChild(landscapeCanvas);

function resizeLandscape() {
    landscapeCanvas.width = window.innerWidth;
    landscapeCanvas.height = window.innerHeight;
}
resizeLandscape();
window.addEventListener('resize', resizeLandscape);

function drawLandscape() {
    landscapeCtx.clearRect(0, 0, landscapeCanvas.width, landscapeCanvas.height);
    
    // Draw mountains
    landscapeCtx.fillStyle = '#b967ff';
    landscapeCtx.beginPath();
    landscapeCtx.moveTo(0, landscapeCanvas.height);
    landscapeCtx.lineTo(landscapeCanvas.width * 0.2, landscapeCanvas.height * 0.6);
    landscapeCtx.lineTo(landscapeCanvas.width * 0.4, landscapeCanvas.height);
    landscapeCtx.fill();
    
    // Draw more mountains
    landscapeCtx.fillStyle = '#01cdfe';
    landscapeCtx.beginPath();
    landscapeCtx.moveTo(landscapeCanvas.width * 0.3, landscapeCanvas.height);
    landscapeCtx.lineTo(landscapeCanvas.width * 0.5, landscapeCanvas.height * 0.5);
    landscapeCtx.lineTo(landscapeCanvas.width * 0.7, landscapeCanvas.height);
    landscapeCtx.fill();
    
    // Draw grid
    landscapeCtx.strokeStyle = 'rgba(1, 205, 254, 0.1)';
    landscapeCtx.lineWidth = 1;
    for (let i = 0; i < landscapeCanvas.width; i += 40) {
        landscapeCtx.beginPath();
        landscapeCtx.moveTo(i, 0);
        landscapeCtx.lineTo(i, landscapeCanvas.height);
        landscapeCtx.stroke();
    }
}

drawLandscape();

// Notification system
function showNotification() {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <h2>Coming Soon!</h2>
            <p>Sign up to be notified when the game launches:</p>
            <form id="email-form">
                <input type="email" placeholder="Enter your email" required>
                <button type="submit" class="neon-button">Notify Me</button>
            </form>
            <button class="close-button neon-button">Close</button>
        </div>
    `;
    document.body.appendChild(notification);

    // Handle form submission
    const form = notification.querySelector('#email-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input').value;
        // Here you would typically send this to your backend
        alert('Thanks for signing up! We\'ll notify you when the game launches.');
        notification.remove();
    });

    // Handle close button
    const closeButton = notification.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        notification.remove();
    });
}

// Add click handlers to all buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', showNotification);
});

// Music player functionality
let audioPlayer = null;
let playlist = [];
let currentTrackIndex = 0;

function initializeMusicPlayer() {
    // Get all MP3 files from the music directory
    fetch('music/')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            playlist = Array.from(doc.querySelectorAll('a'))
                .filter(a => a.href.endsWith('.mp3'))
                .map(a => a.href);
            
            if (playlist.length > 0) {
                // Shuffle the playlist
                for (let i = playlist.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
                }
                
                // Create and configure audio player
                audioPlayer = new Audio();
                audioPlayer.addEventListener('ended', playNextTrack);
                
                // Start playing
                playNextTrack();
            }
        })
        .catch(error => console.error('Error loading music:', error));
}

function playNextTrack() {
    if (!audioPlayer || playlist.length === 0) return;
    
    audioPlayer.src = playlist[currentTrackIndex];
    audioPlayer.play().catch(error => console.error('Error playing track:', error));
    
    // Move to next track, loop back to start if at end
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
}

// Initialize music player when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeMusicPlayer();
});

// Music toggle functionality
document.getElementById('toggleMusic').addEventListener('click', () => {
    if (audioPlayer) {
        if (audioPlayer.paused) {
            audioPlayer.play();
            document.querySelector('.music-icon').textContent = '🎵';
        } else {
            audioPlayer.pause();
            document.querySelector('.music-icon').textContent = '⏸️';
        }
    }
}); 
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

    // Green text
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    // Loop over drops
    for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
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

// Music handling
const sunoTracks = [
    'https://suno.com/song/c4148f17-1955-4c01-8fd6-39c18a2b209f?sh=GqZUbQNZM0mtj6e3',
    'https://suno.com/song/eea3b209-c4f9-4189-af91-4cf204213139?sh=dTLUSaK3zAWG9HtE'
];

// Create a hidden iframe for the first track
const iframe = document.createElement('iframe');
iframe.style.display = 'none';
document.body.appendChild(iframe);

// Function to load the next track
function loadNextTrack() {
    const currentUrl = iframe.src;
    const currentIndex = sunoTracks.indexOf(currentUrl);
    const nextIndex = (currentIndex + 1) % sunoTracks.length;
    iframe.src = sunoTracks[nextIndex];
}

// Start playing when the page loads
window.addEventListener('load', () => {
    iframe.src = sunoTracks[0];
}); 
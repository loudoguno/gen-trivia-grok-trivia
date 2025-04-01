// Matrix Code Rain
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const chars = '0101♾️';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff00'; // Neon green
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 33);

// Generate Placeholder Image
window.onload = function() {
    const placeholderCanvas = document.createElement('canvas');
    placeholderCanvas.width = 600;
    placeholderCanvas.height = 300;
    const pCtx = placeholderCanvas.getContext('2d');

    // Background
    pCtx.fillStyle = '#1a0033';
    pCtx.fillRect(0, 0, 600, 300);

    // Text
    pCtx.fillStyle = '#ff00ff';
    pCtx.font = '48px VT323';
    pCtx.textAlign = 'center';
    pCtx.textBaseline = 'middle';
    pCtx.fillText('♾️ play infinite trivia! ♾️', 300, 150);
    pCtx.strokeStyle = '#00ffff';
    pCtx.lineWidth = 2;
    pCtx.strokeText('♾️ play infinite trivia! ♾️', 300, 150);

    // Border
    pCtx.strokeStyle = '#00ffff';
    pCtx.lineWidth = 5;
    pCtx.strokeRect(5, 5, 590, 290);

    // Set the image source
    const placeholderImage = document.getElementById('placeholder-image');
    placeholderImage.src = placeholderCanvas.toDataURL();
};

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});
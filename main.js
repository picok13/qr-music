const music = document.getElementById("music");
const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");

const progressBar = document.getElementById("progressBar");
const progressCircle = document.getElementById("progressCircle");
const progressWrapper = document.getElementById("progressWrapper");

const progressStartX = 37; // شروع نوار
const progressWidth = 173; // طول نوار

let isDragging = false; // برای drag

// Play/Pause
playBtn.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
    } else {
        music.pause();
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
    }
});

// Update progress while playing
music.addEventListener("timeupdate", () => {
    if (!isDragging) {
        const percent = music.currentTime / music.duration;
        progressBar.setAttribute("width", percent * progressWidth);
        progressCircle.setAttribute("cx", progressStartX + percent * progressWidth);
    }
});

// تابع بروزرسانی نوار
function updateProgress(clientX) {
    const rect = progressWrapper.getBoundingClientRect();
    let clickX = clientX - rect.left - progressStartX;
    if (clickX < 0) clickX = 0;
    if (clickX > progressWidth) clickX = progressWidth;
    const percent = clickX / progressWidth;
    music.currentTime = percent * music.duration;
    progressBar.setAttribute("width", percent * progressWidth);
    progressCircle.setAttribute("cx", progressStartX + percent * progressWidth);
}

// دسکتاپ
progressWrapper.addEventListener("mousedown", (e) => {
    isDragging = true;
    updateProgress(e.clientX);
});
document.addEventListener("mousemove", (e) => {
    if (isDragging) updateProgress(e.clientX);
});
document.addEventListener("mouseup", () => {
    isDragging = false;
});

// موبایل (touch)
progressWrapper.addEventListener("touchstart", (e) => {
    isDragging = true;
    updateProgress(e.touches[0].clientX);
    e.preventDefault(); // جلوگیری از اسکرول صفحه
});
document.addEventListener("touchmove", (e) => {
    if (isDragging) updateProgress(e.touches[0].clientX);
});
document.addEventListener("touchend", () => {
    isDragging = false;
});

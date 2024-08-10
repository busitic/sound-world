// script.js

const tracks = [
    {
        title: "Forever Young",
        artist: "Alphaville",
        element: document.getElementById('audio-player'),
        duration: "3:47"
    },
    {
        title: "Ashes",
        artist: "Madi diaz",
        element: document.getElementById('audio-player1'),
        duration: "4:00",
        
    },
    // {
    //     title: "Final Track",
    //     artist: "Final Artist",
    //     element: document.getElementById('audio3'),
    //     duration: "2:45"
    // }
];

let currentTrackIndex = 0;
let isPlaying = false;

const playPauseBtn = document.getElementById("play-pause");
const seekSlider = document.getElementById("seek-slider");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");
const pulseCircle = document.getElementById("pulse-circle");
const volumeSlider = document.getElementById("volume-slider");

function loadTrack(index) {
    const track = tracks[index];

    // Update UI with the current track's information
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    duration.textContent = track.duration;

    // Reset the player for the new track
    playPauseBtn.textContent = "▶️";
    seekSlider.value = 0;
    currentTime.textContent = "0:00";
    isPlaying = false;

    // Pause all tracks
    tracks.forEach(t => t.element.pause());

    // Load and prepare the selected track
    track.element.currentTime = 0;
    pulseCircle.classList.add("paused");
}

function playPauseTrack() {
    const track = tracks[currentTrackIndex];
    if (isPlaying) {
        track.element.pause();
        playPauseBtn.textContent = "▶️";
        pulseCircle.classList.add("paused");
    } else {
        track.element.play();
        playPauseBtn.textContent = "⏸️";
        pulseCircle.classList.remove("paused");
    }
    isPlaying = !isPlaying;
}

function updateSeekBar() {
    const track = tracks[currentTrackIndex];
    seekSlider.value = (track.element.currentTime / track.element.duration) * 100;
    currentTime.textContent = formatTime(track.element.currentTime);
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}


function seekTrack() {
    const seekTo = audio.duration * (seekSlider.value / 100);
    audio.currentTime = seekTo;
}

function changeVolume() {
    const track = tracks[currentTrackIndex];
    track.element.volume = volumeSlider.value / 100;
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    playPauseTrack(); // Automatically start playing the next track
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    playPauseTrack(); // Automatically start playing the previous track
}

// Event Listeners
playPauseBtn.addEventListener("click", playPauseTrack);
tracks.forEach(track => track.element.addEventListener('timeupdate', updateSeekBar));
seekSlider.addEventListener("input", seekTrack);
volumeSlider.addEventListener("input", changeVolume);

document.getElementById('next').addEventListener('click', nextTrack);
document.getElementById('prev').addEventListener('click', prevTrack);

// Initial load
loadTrack(currentTrackIndex);

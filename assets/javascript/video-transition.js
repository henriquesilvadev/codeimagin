document.addEventListener('DOMContentLoaded', () => {
    const localVideo = document.querySelector('.hero-video');
    const videoWrapper = document.querySelector('.hero-video-wrapper');
    let player;

    if (!localVideo || !videoWrapper) return;

    // Ensure loop is disabled so 'ended' event fires
    localVideo.loop = false;

    // Create wrapper for YouTube player
    const ytWrapper = document.createElement('div');
    ytWrapper.id = 'youtube-wrapper';
    ytWrapper.className = 'hidden';

    const playerDiv = document.createElement('div');
    playerDiv.id = 'youtube-player';
    ytWrapper.appendChild(playerDiv);

    videoWrapper.appendChild(ytWrapper);

    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // This function creates an <iframe> (and YouTube player)
    // after the API code downloads.
    window.onYouTubeIframeAPIReady = function () {
        player = new YT.Player('youtube-player', {
            height: '100%',
            width: '100%',
            videoId: '7c5VfoiU9C4',
            playerVars: {
                'playsinline': 1,
                'controls': 1,
                'rel': 0,
                'autoplay': 0
            },
            events: {
                'onReady': onPlayerReady
            }
        });
    };

    function onPlayerReady(event) {
        // Player is ready
    }

    localVideo.addEventListener('ended', () => {
        console.log('Intro video ended. Starting transition...');
        // Fade out local video
        localVideo.classList.add('fade-out');

        // Wait for fade out to finish (approx match CSS transition)
        setTimeout(() => {
            // Do NOT set display: none, to preserve container height
            // localVideo.style.display = 'none'; 

            ytWrapper.classList.remove('hidden');
            ytWrapper.classList.add('fade-in');

            if (player && typeof player.playVideo === 'function') {
                console.log('Playing YouTube video...');
                player.playVideo();
            } else {
                console.error('YouTube player not ready yet.');
            }
        }, 800);
    });
});

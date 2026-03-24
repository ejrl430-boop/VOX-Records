document.addEventListener('DOMContentLoaded', () => {
    console.log('VOX Records initialized');
    
    const video = document.getElementById('bgVideo');
    const locationContainer = document.getElementById('locationContainer');
    const locationButton = document.getElementById('locationButton');
    const titleList = document.getElementById('titleList');
    const videoPopupOverlay = document.getElementById('videoPopupOverlay');
    const videoPopupTitle = document.getElementById('videoPopupTitle');
    const videoPopupClose = document.getElementById('videoPopupClose');
    const popupVideo = document.getElementById('popupVideo');
    const videoOverlay = document.querySelector('.video-overlay');

    // Sample Artist Data
    const artists = [
        { id: 1, title: 'SOUL VOX' },
        { id: 2, title: 'NEO VELVET' },
        { id: 3, title: 'URBAN ECHO' },
        { id: 4, title: 'LIMITLESS' },
        { id: 5, title: 'VOX GALAXY' }
    ];

    // Initialize Background Video
    if (video) {
        video.muted = true;
        video.play().catch(err => console.log('Autoplay blocked'));
    }

    // Initialize Title List
    titleList.innerHTML = artists.map(artist => `
        <div class="title-item" data-title="${artist.title}">
            ${artist.title}
        </div>
    `).join('');

    // Toggle Title List
    locationButton.addEventListener('click', (e) => {
        e.stopPropagation();
        titleList.classList.toggle('active');
        videoOverlay.classList.toggle('dimmed');
    });

    // Show Location Icon after short delay
    setTimeout(() => {
        locationContainer.style.display = 'flex';
        locationContainer.classList.add('visible');
    }, 1000);

    // Open Video Popup
    titleList.querySelectorAll('.title-item').forEach(item => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-title');
            videoPopupTitle.textContent = title;
            videoPopupOverlay.classList.add('active');
            
            // Sync popup video with F.mp4
            popupVideo.currentTime = 0;
            popupVideo.play();
            
            // Mute background video when popup is open
            if (video) video.muted = true;
        });
    });

    // Close Video Popup
    const closePopup = () => {
        videoPopupOverlay.classList.remove('active');
        popupVideo.pause();
    };

    videoPopupClose.addEventListener('click', closePopup);
    videoPopupOverlay.addEventListener('click', (e) => {
        if (e.target === videoPopupOverlay) closePopup();
    });

    // ESC to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePopup();
            titleList.classList.remove('active');
            videoOverlay.classList.remove('dimmed');
        }
    });

    // Close title list on outside click
    document.addEventListener('click', (e) => {
        if (!locationContainer.contains(e.target)) {
            titleList.classList.remove('active');
            videoOverlay.classList.remove('dimmed');
        }
    });

    // Smooth Scrolling for main menu
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Inline Audition Form Toggle ---
    const btnShowApply = document.getElementById('btn-show-apply');
    const formSection = document.getElementById('audition-form-section');
    const appForm = document.getElementById('applicationForm');

    if (btnShowApply && formSection) {
        btnShowApply.addEventListener('click', () => {
            // Reveal the form section
            formSection.style.display = 'flex';
            
            // Smooth scroll to the form section
            setTimeout(() => {
                formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        });
    }

    if (appForm) {
        appForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('지원서가 성공적으로 제출되었습니다.');
            appForm.reset();
            formSection.style.display = 'none';
            
            // Scroll back up to the audition section
            document.getElementById('audition').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // Handle close buttons for the inline form
    const btnCloseApplies = document.querySelectorAll('.btn-close-apply');
    btnCloseApplies.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            formSection.style.display = 'none';
            document.getElementById('audition').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menuToggle');
    const header = document.getElementById('header');
    
    if (menuToggle && header) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            header.classList.toggle('nav-active');
        });

        // Close menu when clicking a link
        const navLinks = header.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                header.classList.remove('nav-active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!header.contains(e.target) && header.classList.contains('nav-active')) {
                header.classList.remove('nav-active');
            }
        });
    }
});

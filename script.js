// ===== SAMPLE ADVERTISEMENTS =====
const advertisements = [
    {
        title: 'Summer Sale',
        image: 'https://via.placeholder.com/300x400?text=Summer+Sale'
    },
    {
        title: 'New Product Launch',
        image: 'https://via.placeholder.com/300x400?text=New+Product'
    },
    {
        title: 'Exclusive Offer',
        image: 'https://via.placeholder.com/300x400?text=Exclusive+Offer'
    },
    {
        title: 'Black Friday Deals',
        image: 'https://via.placeholder.com/300x400?text=Black+Friday'
    },
    {
        title: 'Limited Time Only',
        image: 'https://via.placeholder.com/300x400?text=Limited+Time'
    }
];

// ===== START SCREEN LOGIC =====
if (document.getElementById('startBtn')) {
    const startBtn = document.getElementById('startBtn');
    const demoBtn = document.getElementById('demoBtn');
    const websiteUrlInput = document.getElementById('websiteUrl');

    startBtn.addEventListener('click', () => {
        const url = websiteUrlInput.value.trim();
        if (url) {
            launchShowcase(url);
        } else {
            alert('Please enter a valid URL');
        }
    });

    demoBtn.addEventListener('click', () => {
        launchShowcase('https://example.com');
    });

    websiteUrlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            startBtn.click();
        }
    });

    function launchShowcase(url) {
        // Store URL in session storage
        sessionStorage.setItem('showcaseUrl', url);
        // Navigate to showcase page
        window.location.href = 'showcase.html';
    }
}

// ===== SHOWCASE SCREEN LOGIC =====
if (document.getElementById('demoIframe')) {
    const demoIframe = document.getElementById('demoIframe');
    const urlDisplay = document.getElementById('urlDisplay');
    const changeUrlBtn = document.getElementById('changeUrlBtn');
    const urlInput = document.getElementById('urlInput');
    const confirmUrlBtn = document.getElementById('confirmUrlBtn');
    const backBtn = document.getElementById('backBtn');
    const adImage = document.getElementById('adImage');
    const currentAdIndexEl = document.getElementById('currentAdIndex');
    const totalAdsEl = document.getElementById('totalAds');
    const prevAdBtn = document.getElementById('prevAdBtn');
    const nextAdBtn = document.getElementById('nextAdBtn');
    const timerDisplay = document.getElementById('timerDisplay');
    const divider = document.getElementById('divider');

    let currentAdIndex = 0;
    let autoRotateTimer = null;
    let autoRotateInterval = 5000; // 5 seconds
    let isDraggingDivider = false;

    // Get URL from session storage or use default
    const showcaseUrl = sessionStorage.getItem('showcaseUrl') || 'https://example.com';
    loadWebsite(showcaseUrl);

    function loadWebsite(url) {
        try {
            new URL(url); // Validate URL
            demoIframe.src = url;
            urlDisplay.textContent = url;
            urlInput.value = url;
        } catch (e) {
            alert('Invalid URL: ' + e.message);
            window.location.href = 'index.html';
        }
    }

    // Change URL functionality
    changeUrlBtn.addEventListener('click', () => {
        urlInput.classList.remove('hidden');
        confirmUrlBtn.classList.remove('hidden');
        changeUrlBtn.classList.add('hidden');
        urlInput.focus();
    });

    confirmUrlBtn.addEventListener('click', () => {
        const newUrl = urlInput.value.trim();
        if (newUrl) {
            loadWebsite(newUrl);
            urlInput.classList.add('hidden');
            confirmUrlBtn.classList.add('hidden');
            changeUrlBtn.classList.remove('hidden');
        }
    });

    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            confirmUrlBtn.click();
        }
    });

    // Back button
    backBtn.addEventListener('click', () => {
        sessionStorage.removeItem('showcaseUrl');
        window.location.href = 'index.html';
    });

    // ===== ADVERTISEMENT ROTATION =====
    function updateAdDisplay() {
        const ad = advertisements[currentAdIndex];
        adImage.src = ad.image;
        adImage.alt = ad.title;
        currentAdIndexEl.textContent = currentAdIndex + 1;
        totalAdsEl.textContent = advertisements.length;
    }

    function startAutoRotate() {
        clearInterval(autoRotateTimer);
        updateAdDisplay();

        let remaining = autoRotateInterval / 1000;
        timerDisplay.textContent = remaining + 's';

        const countdownInterval = setInterval(() => {
            remaining--;
            timerDisplay.textContent = remaining + 's';
            if (remaining <= 0) {
                clearInterval(countdownInterval);
            }
        }, 1000);

        autoRotateTimer = setTimeout(() => {
            currentAdIndex = (currentAdIndex + 1) % advertisements.length;
            startAutoRotate();
        }, autoRotateInterval);
    }

    prevAdBtn.addEventListener('click', () => {
        currentAdIndex = (currentAdIndex - 1 + advertisements.length) % advertisements.length;
        startAutoRotate();
    });

    nextAdBtn.addEventListener('click', () => {
        currentAdIndex = (currentAdIndex + 1) % advertisements.length;
        startAutoRotate();
    });

    // Start the ad rotation
    startAutoRotate();

    // ===== RESIZABLE DIVIDER =====
    let startX = 0;
    let startLeftWidth = 0;

    divider.addEventListener('mousedown', (e) => {
        isDraggingDivider = true;
        startX = e.clientX;
        startLeftWidth = document.querySelector('.left-panel').offsetWidth;
        divider.classList.add('dragging');
        document.body.style.cursor = 'col-resize';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDraggingDivider) return;

        const contentWrapper = document.querySelector('.content-wrapper');
        const wrapperWidth = contentWrapper.offsetWidth;
        const minLeftWidth = 300;
        const minRightWidth = 300;

        const diff = e.clientX - startX;
        let newLeftWidth = startLeftWidth + diff;

        // Enforce minimum widths
        if (newLeftWidth < minLeftWidth) newLeftWidth = minLeftWidth;
        if (wrapperWidth - newLeftWidth < minRightWidth) {
            newLeftWidth = wrapperWidth - minRightWidth;
        }

        const leftPanel = document.querySelector('.left-panel');
        const rightPanel = document.querySelector('.right-panel');

        leftPanel.style.flex = `0 0 ${newLeftWidth}px`;
        rightPanel.style.flex = `0 0 ${wrapperWidth - newLeftWidth - 4}px`;
    });

    document.addEventListener('mouseup', () => {
        if (isDraggingDivider) {
            isDraggingDivider = false;
            divider.classList.remove('dragging');
            document.body.style.cursor = 'auto';
        }
    });
}

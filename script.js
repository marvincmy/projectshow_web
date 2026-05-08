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
        sessionStorage.setItem('showcaseUrl', url);
        window.location.href = 'showcase.html';
    }
}

// ===== SHOWCASE SCREEN LOGIC =====
if (document.getElementById('demoIframe')) {
    const demoIframe = document.getElementById('demoIframe');
    const setupBtn = document.getElementById('setupBtn');
    const divider = document.getElementById('divider');

    let isDraggingDivider = false;

    // Load URL from session storage
    const showcaseUrl = sessionStorage.getItem('showcaseUrl') || 'https://example.com';
    try {
        new URL(showcaseUrl);
        demoIframe.src = showcaseUrl;
    } catch (e) {
        alert('Invalid URL: ' + e.message);
        window.location.href = 'index.html';
    }

    // (Setup) button — navigate back to start screen
    setupBtn.addEventListener('click', () => {
        sessionStorage.removeItem('showcaseUrl');
        window.location.href = 'index.html';
    });

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

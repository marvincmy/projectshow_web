// ===== START SCREEN LOGIC =====
if (document.getElementById('startBtn')) {
    const startBtn = document.getElementById('startBtn');
    const demoBtn = document.getElementById('demoBtn');
    const websiteUrlInput = document.getElementById('websiteUrl');
    const qrUrlInput = document.getElementById('qrUrl');
    const progNameEngInput = document.getElementById('progNameEng');
    const progNameChiInput = document.getElementById('progNameChi');
    const courseCodeInput = document.getElementById('courseCode');
    const sloganEngInput = document.getElementById('sloganEng');
    const sloganChiInput = document.getElementById('sloganChi');

    // Restore previously saved values
    websiteUrlInput.value = sessionStorage.getItem('showcaseUrl') || 'https://example.com';
    qrUrlInput.value = sessionStorage.getItem('qrUrl') || '';
    if (sessionStorage.getItem('progNameEng')) progNameEngInput.value = sessionStorage.getItem('progNameEng');
    if (sessionStorage.getItem('progNameChi')) progNameChiInput.value = sessionStorage.getItem('progNameChi');
    if (sessionStorage.getItem('courseCode')) courseCodeInput.value = sessionStorage.getItem('courseCode');
    if (sessionStorage.getItem('sloganEng')) sloganEngInput.value = sessionStorage.getItem('sloganEng');
    if (sessionStorage.getItem('sloganChi')) sloganChiInput.value = sessionStorage.getItem('sloganChi');

    startBtn.addEventListener('click', () => {
        const url = websiteUrlInput.value.trim();
        if (url) {
            launchShowcase(url);
        } else {
            alert('Please enter a valid project URL');
        }
    });

    demoBtn.addEventListener('click', () => {
        launchShowcase('https://example.com');
    });

    websiteUrlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') startBtn.click();
    });

    qrUrlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') startBtn.click();
    });

    function launchShowcase(url) {
        sessionStorage.setItem('showcaseUrl', url);
        const qrUrl = qrUrlInput.value.trim();
        sessionStorage.setItem('qrUrl', qrUrl || url);
        sessionStorage.setItem('progNameEng', progNameEngInput.value.trim() || 'HD in Applied AI');
        sessionStorage.setItem('progNameChi', progNameChiInput.value.trim() || '應用人工智能高級文憑');
        sessionStorage.setItem('courseCode', courseCodeInput.value.trim() || 'IT114127');
        sessionStorage.setItem('sloganEng', sloganEngInput.value.trim() || 'Interested in this project?');
        sessionStorage.setItem('sloganChi', sloganChiInput.value.trim() || '對呢個作品有興趣？');
        window.location.href = 'showcase.html';
    }
}

// ===== SHOWCASE SCREEN LOGIC =====
if (document.getElementById('demoIframe')) {
    const demoIframe = document.getElementById('demoIframe');
    const setupBtn = document.getElementById('setupBtn');
    const divider = document.getElementById('divider');
    const qrImage = document.getElementById('qrImage');
    const progNameEngDisplay = document.getElementById('progNameEngDisplay');
    const progNameChiDisplay = document.getElementById('progNameChiDisplay');
    const courseCodeDisplay = document.getElementById('courseCodeDisplay');
    const sloganEngDisplay = document.getElementById('sloganEngDisplay');
    const sloganChiDisplay = document.getElementById('sloganChiDisplay');

    let isDraggingDivider = false;

    // Load project URL
    const showcaseUrl = sessionStorage.getItem('showcaseUrl') || 'https://example.com';
    try {
        new URL(showcaseUrl);
        demoIframe.src = showcaseUrl;
    } catch (e) {
        alert('Invalid URL: ' + e.message);
        window.location.href = 'index.html';
    }

    // Programme names
    progNameEngDisplay.textContent = sessionStorage.getItem('progNameEng') || 'HD in Applied AI';
    progNameChiDisplay.textContent = sessionStorage.getItem('progNameChi') || '應用人工智能高級文憑';
    courseCodeDisplay.textContent = sessionStorage.getItem('courseCode') || 'IT114127';
    sloganEngDisplay.textContent = sessionStorage.getItem('sloganEng') || 'Interested in this project?';
    sloganChiDisplay.textContent = sessionStorage.getItem('sloganChi') || '對呢個作品有興趣？';

    // Generate QR code from stored URL
    const qrUrl = sessionStorage.getItem('qrUrl') || showcaseUrl;
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=6&data=${encodeURIComponent(qrUrl)}`;
    qrImage.alt = 'QR Code for ' + qrUrl;

    // Gear button — go back to setup screen
    setupBtn.addEventListener('click', () => {
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
        demoIframe.style.pointerEvents = 'none';
        e.preventDefault();
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

        document.querySelector('.left-panel').style.flex = `0 0 ${newLeftWidth}px`;
        document.querySelector('.right-panel').style.flex = `0 0 ${wrapperWidth - newLeftWidth - 4}px`;
    });

    document.addEventListener('mouseup', () => {
        if (isDraggingDivider) {
            isDraggingDivider = false;
            divider.classList.remove('dragging');
            document.body.style.cursor = 'auto';
            demoIframe.style.pointerEvents = 'auto';
        }
    });
}

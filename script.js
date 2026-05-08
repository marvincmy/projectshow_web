// ===== START SCREEN LOGIC =====
if (document.getElementById('startBtn')) {
    const startBtn        = document.getElementById('startBtn');
    const demoBtn         = document.getElementById('demoBtn');
    const websiteUrlInput = document.getElementById('websiteUrl');
    const qrUrlInput      = document.getElementById('qrUrl');
    const sloganEngInput  = document.getElementById('sloganEng');
    const sloganChiInput  = document.getElementById('sloganChi');
    const progNameEngInput= document.getElementById('progNameEng');
    const progNameChiInput= document.getElementById('progNameChi');
    const courseCodeInput = document.getElementById('courseCode');
    const progDescEngInput= document.getElementById('progDescEng');
    const progDescChiInput= document.getElementById('progDescChi');
    const majorEngInput   = document.getElementById('majorSubjectsEng');
    const majorChiInput   = document.getElementById('majorSubjectsChi');
    const progQrInput     = document.getElementById('progQrUrl');

    // Restore saved values
    const restore = (el, key, fallback = '') => {
        const v = sessionStorage.getItem(key);
        if (v !== null) el.value = v;
        else if (fallback) el.value = fallback;
    };
    restore(websiteUrlInput, 'showcaseUrl',   'https://example.com');
    restore(qrUrlInput,      'qrUrl');
    restore(sloganEngInput,  'sloganEng',     'Interested in this project?');
    restore(sloganChiInput,  'sloganChi',     '對呢個作品有興趣？');
    restore(progNameEngInput,'progNameEng',   'HD in Applied AI');
    restore(progNameChiInput,'progNameChi',   '應用人工智能高級文憑');
    restore(courseCodeInput, 'courseCode',    'IT114127');
    restore(progDescEngInput,'progDescEng');
    restore(progDescChiInput,'progDescChi');
    restore(majorEngInput,   'majorSubjectsEng');
    restore(majorChiInput,   'majorSubjectsChi');
    restore(progQrInput,     'progQrUrl');

    function saveAndLaunch(url) {
        sessionStorage.setItem('showcaseUrl',      url);
        sessionStorage.setItem('qrUrl',            qrUrlInput.value.trim() || url);
        sessionStorage.setItem('sloganEng',        sloganEngInput.value.trim()   || 'Interested in this project?');
        sessionStorage.setItem('sloganChi',        sloganChiInput.value.trim()   || '對呢個作品有興趣？');
        sessionStorage.setItem('progNameEng',      progNameEngInput.value.trim() || 'HD in Applied AI');
        sessionStorage.setItem('progNameChi',      progNameChiInput.value.trim() || '應用人工智能高級文憑');
        sessionStorage.setItem('courseCode',       courseCodeInput.value.trim()  || 'IT114127');
        sessionStorage.setItem('progDescEng',      progDescEngInput.value.trim());
        sessionStorage.setItem('progDescChi',      progDescChiInput.value.trim());
        sessionStorage.setItem('majorSubjectsEng', majorEngInput.value.trim());
        sessionStorage.setItem('majorSubjectsChi', majorChiInput.value.trim());
        sessionStorage.setItem('progQrUrl',        progQrInput.value.trim());
        window.location.href = 'showcase.html';
    }

    startBtn.addEventListener('click', () => {
        const url = websiteUrlInput.value.trim();
        if (url) saveAndLaunch(url);
        else alert('Please enter a valid project URL');
    });

    demoBtn.addEventListener('click', () => saveAndLaunch('https://example.com'));

    [websiteUrlInput, qrUrlInput].forEach(el =>
        el.addEventListener('keypress', e => { if (e.key === 'Enter') startBtn.click(); })
    );
}

// ===== SHOWCASE SCREEN LOGIC =====
if (document.getElementById('demoIframe')) {
    const demoIframe           = document.getElementById('demoIframe');
    const setupBtn             = document.getElementById('setupBtn');
    const pauseBtn             = document.getElementById('pauseBtn');
    const divider              = document.getElementById('divider');
    const qrImage              = document.getElementById('qrImage');
    const progQrImage          = document.getElementById('progQrImage');
    const progQrImage2         = document.getElementById('progQrImage2');
    const progNameEngDisplay   = document.getElementById('progNameEngDisplay');
    const progNameChiDisplay   = document.getElementById('progNameChiDisplay');
    const courseCodeDisplay    = document.getElementById('courseCodeDisplay');
    const sloganEngDisplay     = document.getElementById('sloganEngDisplay');
    const sloganChiDisplay     = document.getElementById('sloganChiDisplay');
    const progDescEngDisplay   = document.getElementById('progDescEngDisplay');
    const progDescChiDisplay   = document.getElementById('progDescChiDisplay');
    const majorEngDisplay      = document.getElementById('majorSubjectsEngDisplay');
    const majorChiDisplay      = document.getElementById('majorSubjectsChiDisplay');

    const get = (key, fallback = '') => sessionStorage.getItem(key) || fallback;

    // Load iframe
    const showcaseUrl = get('showcaseUrl', 'https://example.com');
    try { new URL(showcaseUrl); demoIframe.src = showcaseUrl; }
    catch (e) { alert('Invalid URL'); window.location.href = 'index.html'; }

    // Populate slide 1
    progNameEngDisplay.textContent = get('progNameEng', 'HD in Applied AI');
    progNameChiDisplay.textContent = get('progNameChi', '應用人工智能高級文憑');
    if (courseCodeDisplay) courseCodeDisplay.textContent = get('courseCode', 'IT114127');
    sloganEngDisplay.textContent   = get('sloganEng', 'Interested in this project?');
    sloganChiDisplay.textContent   = get('sloganChi', '對呢個作品有興趣？');
    const qrUrl = get('qrUrl', showcaseUrl);
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=175x175&margin=6&data=${encodeURIComponent(qrUrl)}`;

    // Populate slides 2 & 3 (Eng + Chi programme details)
    if (progDescEngDisplay)  progDescEngDisplay.textContent  = get('progDescEng');
    if (progDescChiDisplay)  progDescChiDisplay.textContent  = get('progDescChi');
    if (majorEngDisplay)     majorEngDisplay.textContent     = get('majorSubjectsEng');
    if (majorChiDisplay)     majorChiDisplay.textContent     = get('majorSubjectsChi');
    const progQrUrl = get('progQrUrl');
    const progQrSrc = progQrUrl
        ? `https://api.qrserver.com/v1/create-qr-code/?size=175x175&margin=6&data=${encodeURIComponent(progQrUrl)}`
        : '';
    if (progQrSrc && progQrImage)  progQrImage.src  = progQrSrc;
    if (progQrSrc && progQrImage2) progQrImage2.src = progQrSrc;

    // ===== SLIDE ROTATION =====
    const slides = document.querySelectorAll('.slide');
    const dots   = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let isPaused = false;
    let slideTimer = null;

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function startTimer(delay = 10000) {
        clearInterval(slideTimer);
        if (!isPaused) {
            slideTimer = setInterval(() => goToSlide((currentSlide + 1) % slides.length), delay);
        }
    }

    startTimer();

    // Dot click — hold for 20s before next auto-advance
    dots.forEach(dot =>
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.dataset.slide));
            startTimer(20000);
        })
    );

    // Pause / Play
    pauseBtn.addEventListener('click', () => {
        isPaused = !isPaused;
        pauseBtn.textContent = isPaused ? '▶' : '⏸';
        isPaused ? clearInterval(slideTimer) : startTimer();
    });

    // Setup (gear) button
    setupBtn.addEventListener('click', () => { window.location.href = 'index.html'; });

    // ===== RESIZABLE DIVIDER =====
    let isDraggingDivider = false;
    let startX = 0, startLeftWidth = 0;

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
        const wrapper     = document.querySelector('.content-wrapper');
        const totalWidth  = wrapper.offsetWidth;
        let newLeft = Math.min(Math.max(startLeftWidth + (e.clientX - startX), 300), totalWidth - 304);
        document.querySelector('.left-panel').style.flex  = `0 0 ${newLeft}px`;
        document.querySelector('.right-panel').style.flex = `0 0 ${totalWidth - newLeft - 4}px`;
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

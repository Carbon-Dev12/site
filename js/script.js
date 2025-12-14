window.addEventListener('load', () => {
    // ========================
    // DOM ELEMENTS
    // ========================
    const views = {
        'home-page': document.getElementById('home-page-view'),
        'games': document.getElementById('games-view'),
        'game': document.getElementById('game-view'),
        'settings': document.getElementById('settings-view'),
        'favorites': document.getElementById('favorites-view'),
        'recent': document.getElementById('recent-view')
    };

    const navButtons = document.querySelectorAll('.nav-button');
    const gameIframe = document.getElementById('game-iframe');
    const gameLoader = document.getElementById('game-loader');
    const particlesToggle = document.getElementById('particles-toggle');
    const particleDensity = document.getElementById('particle-density');
    const particleDensityValue = document.getElementById('particle-density-value');
    const gameVolumeToggle = document.getElementById('game-volume-toggle');
    const performanceToggle = document.getElementById('performance-toggle');
    const showcaseSpeed = document.getElementById('showcase-speed');
    const showcaseImg = document.getElementById('showcase-img');
    const showcaseTitle = document.getElementById('showcase-title');
    const searchInput = document.getElementById('game-search');
    const gradientWord = document.getElementById('gradient-word');
    const gameBoxes = document.querySelectorAll('.game-box[data-url]');
    const themeOptions = document.querySelectorAll('.theme-option');
    const body = document.body;

    // Additional settings elements
    const panicToggle = document.getElementById('panic-toggle');
    const panicOptions = document.getElementById('panic-options');
    const panicKeyInput = document.getElementById('panic-key-input');
    const panicUrl = document.getElementById('panic-url');
    const savePanicBtn = document.getElementById('save-panic-btn');
    const panicStatus = document.getElementById('panic-status');
    const siteTitleInput = document.getElementById('site-title-input');
    const siteLogoInput = document.getElementById('site-logo-input');
    const currentLogo = document.getElementById('current-logo');

    // Import/Export/Reset
    const exportSettingsBtn = document.getElementById('export-settings-btn');
    const importSettingsInput = document.getElementById('import-settings-input');
    const importStatus = document.getElementById('import-status');
    const resetAllDataBtn = document.getElementById('reset-all-data-btn');

    const homeAboutBlankBtn = document.getElementById('home-about-blank-btn');
    const openAboutBlankBtn = document.getElementById('open-about-blank-btn');

    let hasAboutBlankRun = false; // Prevents double-triggering

    // ========================
    // FIXED ABOUT:BLANK CLOAKER (NOW WITH PROPER LOGIC)
    // ========================
    const openInAboutBlank = (sourceUrl) => {
        if (hasAboutBlankRun) {
            return;
        }
        hasAboutBlankRun = true;

        const title = document.title;
        const faviconLink = document.querySelector("link[rel*='icon']");
        const faviconHref = faviconLink ? faviconLink.href : '';

        const cloakedWindow = window.open('', '_blank');

        if (!cloakedWindow) {
            hasAboutBlankRun = false;
            alert('Popups are blocked! Please allow popups for this site to use about:blank.');
            return;
        }

        cloakedWindow.location.href = 'about:blank';

        cloakedWindow.document.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>${title}</title>
                ${faviconHref ? `<link rel="icon" href="${faviconHref}" type="image/x-icon">` : ''}
                <style>
                    body, html { margin:0; padding:0; height:100%; overflow:hidden; }
                </style>
            </head>
            <body>
                <iframe 
                    src="${sourceUrl}"
                    frameborder="0"
                    allowfullscreen
                    style="position:absolute; top:0; left:0; width:100%; height:100%; border:none;">
                </iframe>
            </body>
            </html>
        `);
        cloakedWindow.document.close();

        setTimeout(() => {
            window.location.replace('https://www.deltamath.com/');
        }, 10);
    };

    if (homeAboutBlankBtn) {
        homeAboutBlankBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openInAboutBlank(window.location.href);
        });
    }

    if (openAboutBlankBtn) {
        openAboutBlankBtn.addEventListener('click', (e) => {
            e.preventDefault();

            let urlToCloak = window.location.href;

            if (views['game'] && !views['game'].classList.contains('hidden-view')) {
                if (gameIframe.src && gameIframe.src !== '' && gameIframe.src !== 'about:blank') {
                    urlToCloak = gameIframe.src;
                }
            }

            openInAboutBlank(urlToCloak);
        });
    }

    // ========================
    // TYPEWRITER EFFECT
    // ========================
    const words = ['freedom.', 'beauty.', 'peace.', 'amazement.'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            gradientWord.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            gradientWord.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = 120;
        if (isDeleting) typeSpeed /= 2;
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }
        setTimeout(type, typeSpeed);
    };
    type();

    // ========================
    // SHOWCASE CAROUSEL
    // ========================
    let currentShowcaseIndex = 0;
    let showcaseInterval; // ← THIS WAS THE MISSING LINE! NOW ADDED

    const updateShowcase = () => {
        // Skip over any placeholder games
        let box;
        let attempts = 0;
        do {
            box = gameBoxes[currentShowcaseIndex];
            currentShowcaseIndex = (currentShowcaseIndex + 1) % gameBoxes.length;
            attempts++;
        } while (box && box.dataset.img === 'placeholder' && attempts < gameBoxes.length);

        if (box && box.dataset.img && box.dataset.img !== 'placeholder') {
            showcaseImg.src = box.dataset.img;
            showcaseImg.alt = box.dataset.title || 'Game';
            showcaseTitle.textContent = box.dataset.title || 'Untitled Game';
            document.getElementById('game-showcase').onclick = () => box.click();
        }
    };

    const startShowcase = () => {
        clearInterval(showcaseInterval);
        updateShowcase();
        showcaseInterval = setInterval(updateShowcase, parseInt(showcaseSpeed.value));
    };

    // ========================
    // PARTICLES CANVAS
    // ========================
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 1.5 + 0.5;
            this.velocity = {
                x: (Math.random() - 0.5) * 0.2,
                y: (Math.random() - 0.5) * 0.2
            };
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fill();
        }
        update() {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            if (this.x < 0 || this.x > canvas.width) this.velocity.x = -this.velocity.x;
            if (this.y < 0 || this.y > canvas.height) this.velocity.y = -this.velocity.y;
        }
    }

    const initParticles = (count) => {
        particles = [];
        for (let i = 0; i < count; i++) particles.push(new Particle());
    };

    const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(139, 92, 246, ${1 - dist / 100})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });
        animationFrameId = requestAnimationFrame(animateParticles);
    };

    const toggleParticles = (enabled, count) => {
        if (enabled) {
            canvas.style.display = 'block';
            initParticles(count);
            animateParticles();
        } else {
            canvas.style.display = 'none';
            cancelAnimationFrame(animationFrameId);
            particles = [];
        }
    };

    // ========================
    // THEME HANDLING
    // ========================
    const applyTheme = (theme) => {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('selectedTheme', theme);
        themeOptions.forEach(opt => opt.classList.toggle('active', opt.dataset.theme === theme));
    };

    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            applyTheme(option.dataset.theme);
        });
    });

    // ========================
    // CLOAKING HANDLING
    // ========================
    const applyCloaking = () => {
        const title = localStorage.getItem('cloakTitle') || document.title;
        document.title = title;
        siteTitleInput.value = title;

        const favicon = localStorage.getItem('cloakFavicon');
        if (favicon) {
            let link = document.querySelector("link[rel~='icon']");
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.head.appendChild(link);
            }
            link.href = favicon;
            currentLogo.textContent = 'Custom';
        } else {
            currentLogo.textContent = 'Default';
        }
    };

    siteTitleInput.addEventListener('input', () => {
        const newTitle = siteTitleInput.value.trim() || 'Study Snap';
        document.title = newTitle;
        localStorage.setItem('cloakTitle', newTitle);
    });

    siteLogoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const dataUrl = ev.target.result;
                let link = document.querySelector("link[rel~='icon']");
                if (!link) {
                    link = document.createElement('link');
                    link.rel = 'icon';
                    document.head.appendChild(link);
                }
                link.href = dataUrl;
                localStorage.setItem('cloakFavicon', dataUrl);
                currentLogo.textContent = 'Custom';
            };
            reader.readAsDataURL(file);
        }
    });

    // ========================
    // PANIC KEY HANDLING
    // ========================
    panicToggle.addEventListener('change', () => {
        panicOptions.classList.toggle('hidden', !panicToggle.checked);
        localStorage.setItem('panicEnabled', panicToggle.checked);
    });

    document.addEventListener('keydown', (e) => {
        if (localStorage.getItem('panicEnabled') === 'true') {
            const key = localStorage.getItem('panicKey');
            if (key && e.key.toUpperCase() === key) {
                const url = localStorage.getItem('panicUrl') || 'https://docs.google.com';
                window.location.href = url;
            }
        }
    });

    panicKeyInput.addEventListener('keydown', (e) => {
        if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
            panicKeyInput.value = e.key.toUpperCase();
            e.preventDefault();
        }
    });

    savePanicBtn.addEventListener('click', () => {
        const key = panicKeyInput.value.toUpperCase();
        if (key.match(/^[A-Z]$/)) {
            localStorage.setItem('panicKey', key);
            localStorage.setItem('panicUrl', panicUrl.value);
            panicStatus.classList.remove('hidden');
            setTimeout(() => panicStatus.classList.add('hidden'), 3000);
        }
    });

    // ========================
    // OTHER SETTINGS SAVE/LOAD
    // ========================
    particlesToggle.addEventListener('change', () => {
        const enabled = particlesToggle.checked;
        const count = parseInt(particleDensity.value);
        toggleParticles(enabled, count);
        localStorage.setItem('particlesEnabled', enabled);
    });

    particleDensity.addEventListener('input', (e) => {
        particleDensityValue.textContent = e.target.value;
        localStorage.setItem('particleCount', e.target.value);
        if (particlesToggle.checked) {
            toggleParticles(true, parseInt(e.target.value));
        }
    });

    performanceToggle.addEventListener('change', () => {
        localStorage.setItem('performanceMode', performanceToggle.checked);
    });

    showcaseSpeed.addEventListener('change', () => {
        localStorage.setItem('showcaseSpeed', showcaseSpeed.value);
        if (views['home-page'].classList.contains('hidden-view') === false) {
            startShowcase();
        }
    });

    gameVolumeToggle.addEventListener('change', () => {
        localStorage.setItem('muteGameAudio', gameVolumeToggle.checked);
        if (gameIframe.contentWindow) {
            gameIframe.contentWindow.postMessage({type: 'mute', value: gameVolumeToggle.checked}, '*');
        }
    });

    // ========================
    // LOAD ALL SAVED SETTINGS
    // ========================
    const loadSettings = () => {
        const savedTheme = localStorage.getItem('selectedTheme') || 'dark';
        applyTheme(savedTheme);

        const particlesEnabled = localStorage.getItem('particlesEnabled') !== 'false';
        const particleCount = parseInt(localStorage.getItem('particleCount')) || 50;
        particlesToggle.checked = particlesEnabled;
        particleDensity.value = particleCount;
        particleDensityValue.textContent = particleCount;
        toggleParticles(particlesEnabled, particleCount);

        performanceToggle.checked = localStorage.getItem('performanceMode') === 'true';

        const savedSpeed = localStorage.getItem('showcaseSpeed') || '2000';
        showcaseSpeed.value = savedSpeed;

        gameVolumeToggle.checked = localStorage.getItem('muteGameAudio') === 'true';

        panicToggle.checked = localStorage.getItem('panicEnabled') === 'true';
        panicOptions.classList.toggle('hidden', !panicToggle.checked);
        panicKeyInput.value = localStorage.getItem('panicKey') || '';
        panicUrl.value = localStorage.getItem('panicUrl') || 'https://docs.google.com';

        applyCloaking();
    };

    loadSettings();

    // ========================
    // VIEW SWITCHING
    // ========================
    window.showView = (name) => {
        Object.values(views).forEach(v => v.classList.add('hidden-view'));
        views[name]?.classList.remove('hidden-view');

        navButtons.forEach(btn => {
            btn.classList.remove('bg-purple-600', 'text-white');
            btn.classList.add('text-gray-300', 'hover:bg-gray-700', 'hover:text-white');
            if (btn.dataset.view === name) {
                btn.classList.add('bg-purple-600', 'text-white');
                btn.classList.remove('text-gray-300', 'hover:bg-gray-700', 'hover:text-white');
            }
        });

        if (name === 'home-page') startShowcase();
        else clearInterval(showcaseInterval);
    };

    navButtons.forEach(btn => btn.addEventListener('click', () => showView(btn.dataset.view)));

    // ========================
    // GAME LOADING
    // ========================
    gameBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const url = box.dataset.url;
            if (url) {
                gameIframe.src = url;
                gameLoader.classList.add('active');
                showView('game');
                setTimeout(() => gameLoader.classList.remove('active'), 5000);

                if (gameVolumeToggle.checked) {
                    setTimeout(() => {
                        gameIframe.contentWindow.postMessage({type: 'mute', value: true}, '*');
                    }, 2000);
                }
            }
        });
    });

    document.getElementById('fullscreen-btn-game')?.addEventListener('click', () => {
        if (gameIframe.requestFullscreen) gameIframe.requestFullscreen();
    });

    document.getElementById('newtab-btn-game')?.addEventListener('click', () => {
        if (gameIframe.src) window.open(gameIframe.src, '_blank');
    });

    // ========================
    // SEARCH FUNCTIONALITY
    // ========================
    function setupSearch(searchInputId, containerSelector) {
        const searchInput = document.getElementById(searchInputId);
        if (!searchInput) return;

        const gameBoxes = document.querySelectorAll(`${containerSelector} .game-box`);

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();

            gameBoxes.forEach(box => {
                const title = box.querySelector('.game-title').textContent.toLowerCase();
                const matches = title.includes(query);

                if (matches) {
                    box.style.display = '';
                    box.style.opacity = '1';
                    box.style.transform = 'translateY(0)';
                } else {
                    box.style.opacity = '0';
                    box.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        if (box.style.opacity === '0') {
                            box.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    }

    setupSearch('game-search', '#game-box-wrapper');
    setupSearch('favorites-search', '#favorites-wrapper');
    setupSearch('recent-search', '#recent-wrapper');

    // ========================
    // TAB SWITCHING IN SETTINGS
    // ========================
    document.querySelectorAll('#settings-view .tab-button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('#settings-view .tab-button').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('#settings-view .tab-panel').forEach(p => p.classList.remove('active'));
            button.classList.add('active');
            const panel = document.getElementById(button.dataset.tab + '-tab');
            if (panel) panel.classList.add('active');
        });
    });

    // ========================
    // IMPORT / EXPORT / RESET
    // ========================
    if (exportSettingsBtn) {
        exportSettingsBtn.addEventListener('click', () => {
            const data = {
                exportDate: new Date().toISOString(),
                version: "1.0",
                localStorage: { ...localStorage }
            };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `studythemes-backup-${new Date().toISOString().slice(0,10)}.json`;
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    if (importSettingsInput) {
        importSettingsInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                try {
                    const data = JSON.parse(ev.target.result);
                    if (!data.localStorage) throw new Error("Invalid backup");

                    localStorage.clear();
                    Object.entries(data.localStorage).forEach(([k, v]) => localStorage.setItem(k, v));

                    importStatus.textContent = "✅ Imported successfully! Reloading...";
                    importStatus.classList.remove('hidden');
                    importStatus.className = "text-sm mt-3 text-center text-green-400 block";
                    setTimeout(() => window.location.reload(), 1500);
                } catch (err) {
                    importStatus.textContent = "❌ Invalid backup file";
                    importStatus.classList.remove('hidden');
                    importStatus.className = "text-sm mt-3 text-center text-red-400 block";
                }
            };
            reader.readAsText(file);
        });
    }

    if (resetAllDataBtn) {
        resetAllDataBtn.addEventListener('click', () => {
            if (confirm("This will delete ALL saved data. Continue?")) {
                localStorage.clear();
                setTimeout(() => window.location.reload(), 1000);
            }
        });
    }

    // ========================
    // CONSENT BANNER
    // ========================
    const consentBanner = document.getElementById('consent-banner');
    const acceptAdsBtn = document.getElementById('accept-ads-btn');
    const rejectAdsBtn = document.getElementById('reject-ads-btn');

    function hideConsentBanner() {
        if (consentBanner) consentBanner.style.display = 'none';
    }

    function loadGoogleAds() {
        if (document.querySelector('script[src*="adsbygoogle.js"]')) return;
        const script = document.createElement('script');
        script.async = true;
        script.crossOrigin = "anonymous";
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7164184929971692";
        document.head.appendChild(script);
    }

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('consent', 'default', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
    });

    const adsConsent = localStorage.getItem('ads_consent');

    if (adsConsent === 'granted') {
        gtag('consent', 'update', { 'ad_storage': 'granted', 'analytics_storage': 'granted', 'ad_user_data': 'granted', 'ad_personalization': 'granted' });
        loadGoogleAds();
        hideConsentBanner();
    } else if (adsConsent === 'denied') {
        hideConsentBanner();
    } else {
        if (consentBanner) consentBanner.style.display = 'flex';
    }

    if (acceptAdsBtn) {
        acceptAdsBtn.addEventListener('click', () => {
            localStorage.setItem('ads_consent', 'granted');
            gtag('consent', 'update', { 'ad_storage': 'granted', 'analytics_storage': 'granted', 'ad_user_data': 'granted', 'ad_personalization': 'granted' });
            loadGoogleAds();
            hideConsentBanner();
        });
    }

    if (rejectAdsBtn) {
        rejectAdsBtn.addEventListener('click', () => {
            localStorage.setItem('ads_consent', 'denied');
            hideConsentBanner();
        });
    }

    // ========================
    // INITIALIZE
    // ========================
    showView('home-page');
    startShowcase();
// ========================
// FAVORITES & RECENTLY PLAYED SYSTEM (FULLY FIXED)
// ========================

const FAVORITES_KEY = 'favoriteGames';
const RECENT_KEY = 'recentGames';
const MAX_RECENT = 20;

const getFavorites = () => JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
const saveFavorites = (favs) => localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));

const toggleFavorite = (gameBox) => {
    const url = gameBox.dataset.url;
    if (!url || url.includes('placeholder')) return;

    const title = gameBox.dataset.title || gameBox.querySelector('.game-title')?.textContent || 'Untitled';
    const img = gameBox.dataset.img || gameBox.querySelector('img')?.src || '';

    let favorites = getFavorites();
    const index = favorites.findIndex(f => f.url === url);

    const heartIcon = gameBox.querySelector('.favorite-btn i');

    if (index > -1) {
        // Remove from favorites
        favorites.splice(index, 1);
        heartIcon?.classList.replace('fas', 'far');
    } else {
        // Add to favorites
        favorites.push({ url, title, img });
        heartIcon?.classList.replace('far', 'fas');
    }

    saveFavorites(favorites);
    renderFavorites();  // Update favorites tab
};

// Create a reusable game box element
const createGameBox = (game) => {
    const box = document.createElement('div');
    box.className = 'game-box';
    box.dataset.url = game.url;
    box.dataset.title = game.title;
    box.dataset.img = game.img;

    box.innerHTML = `
        <img src="${game.img}" alt="${game.title}" loading="lazy">
        <div class="game-title">${game.title}</div>
        <div class="favorite-btn"><i class="far fa-heart"></i></div>
    `;

    // Click to play
    box.addEventListener('click', (e) => {
        if (e.target.closest('.favorite-btn')) return; // Don't play if clicking heart

        if (!game.url || game.url.includes('placeholder')) return;

        gameIframe.src = game.url;
        gameLoader.classList.add('active');
        showView('game');
        setTimeout(() => gameLoader.classList.remove('active'), 5000);

        addToRecent(game);

        if (gameVolumeToggle.checked) {
            setTimeout(() => {
                if (gameIframe.contentWindow) {
                    gameIframe.contentWindow.postMessage({type: 'mute', value: true}, '*');
                }
            }, 2000);
        }
    });

    // Heart click to toggle favorite
    box.querySelector('.favorite-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(box);
    });

    return box;
};

// Add game to recent
const addToRecent = (game) => {
    let recent = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    recent = recent.filter(r => r.url !== game.url); // Remove if already exists
    recent.unshift(game); // Add to front
    if (recent.length > MAX_RECENT) recent.pop();
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
    renderRecent();
};

// Render Favorites Tab
const renderFavorites = () => {
    const container = document.getElementById('favorites-wrapper');
    if (!container) return;

    const favorites = getFavorites();

    // Clear previous content
    container.innerHTML = '';

    if (favorites.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-400 text-xl col-span-full py-10">No favorite games yet. Click the ♡ on a game to add it!</p>';
        return;
    }

    // Create a row wrapper for layout consistency
    const row = document.createElement('div');
    row.className = 'five-box-row';

    favorites.forEach(game => {
        const box = createGameBox(game);
        // Set heart as filled since it's in favorites
        box.querySelector('.favorite-btn i').classList.replace('far', 'fas');
        row.appendChild(box);
    });

    container.appendChild(row);
};

// Render Recent Tab
const renderRecent = () => {
    const container = document.getElementById('recent-wrapper');
    if (!container) return;

    const recent = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');

    container.innerHTML = '';

    if (recent.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-400 text-xl col-span-full py-10">No recently played games.</p>';
        return;
    }

    const row = document.createElement('div');
    row.className = 'five-box-row';

    recent.forEach(game => {
        const box = createGameBox(game);
        // Check if it's also favorited
        const isFav = getFavorites().some(f => f.url === game.url);
        const heart = box.querySelector('.favorite-btn i');
        heart.classList.toggle('fas', isFav);
        heart.classList.toggle('far', !isFav);
        row.appendChild(box);
    });

    container.appendChild(row);
};

// Update heart icons in main games list
const updateMainGameHearts = () => {
    document.querySelectorAll('#game-box-wrapper .game-box[data-url]').forEach(box => {
        const url = box.dataset.url;
        if (!url || url.includes('placeholder')) return;

        const isFav = getFavorites().some(f => f.url === url);
        const heart = box.querySelector('.favorite-btn i');
        if (heart) {
            heart.classList.toggle('fas', isFav);
            heart.classList.toggle('far', !isFav);
        }
    });
};

// Attach favorite click handlers to main games
const attachFavoriteListeners = () => {
    document.querySelectorAll('#game-box-wrapper .game-box[data-url]').forEach(box => {
        const heartBtn = box.querySelector('.favorite-btn');
        if (heartBtn && !heartBtn.dataset.listenerAttached) {
            heartBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFavorite(box);
            });
            heartBtn.dataset.listenerAttached = 'true';
        }
    });
};

// Track recent plays from main list
document.querySelectorAll('#game-box-wrapper .game-box[data-url]').forEach(box => {
    box.addEventListener('click', function(e) {
        if (e.target.closest('.favorite-btn')) return;

        const game = {
            url: box.dataset.url,
            title: box.dataset.title || box.querySelector('.game-title')?.textContent,
            img: box.dataset.img || box.querySelector('img')?.src
        };
        addToRecent(game);
    });
});

// Initial render & setup
renderFavorites();
renderRecent();
attachFavoriteListeners();
updateMainGameHearts();

// Re-attach listeners after search/filtering changes visibility
const observer = new MutationObserver(() => {
    attachFavoriteListeners();
    updateMainGameHearts();
});
observer.observe(document.getElementById('game-box-wrapper'), { childList: true, subtree: true });

// Refresh when switching tabs
const originalShowView = window.showView;
window.showView = (name) => {
    originalShowView(name);
    if (name === 'favorites') renderFavorites();
    if (name === 'recent') renderRecent();
    if (name === 'games') {
        attachFavoriteListeners();
        updateMainGameHearts();
    }
};
});

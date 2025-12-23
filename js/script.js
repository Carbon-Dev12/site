// theres alot of "//" cuz i aint tryna read all of this
window.addEventListener('load', () => {
    // ==================== DOM ELEMENTS ====================
    const views = {
        'home-page': document.getElementById('home-page-view'),
        'games': document.getElementById('games-view'),
        'game': document.getElementById('game-view'),
        'settings': document.getElementById('settings-view'),
        'favorites': document.getElementById('favorites-view'),
        'recent': document.getElementById('recent-view'),
        'extras': document.getElementById('extras-view')
    };

    const navButtons = document.querySelectorAll('.nav-button');
    const gameIframe = document.getElementById('game-iframe');
    const gameLoader = document.getElementById('game-loader');
    const searchInput = document.getElementById('game-search');
    const showcaseImg = document.getElementById('showcase-img');
    const showcaseTitle = document.getElementById('showcase-title');
    const showcaseSpeed = document.getElementById('showcase-speed');
    const gradientWord = document.getElementById('gradient-word');
    const particleCanvas = document.getElementById('particle-canvas');
    const ctx = particleCanvas.getContext('2d');

    // Settings controls
    const particlesToggle = document.getElementById('particles-toggle');
    const particleDensity = document.getElementById('particle-density');
    const particleDensityValue = document.getElementById('particle-density-value');
    const gameVolumeToggle = document.getElementById('game-volume-toggle');
    const performanceToggle = document.getElementById('performance-toggle');
    const panicToggle = document.getElementById('panic-toggle');
    const panicOptions = document.getElementById('panic-options');
    const panicKeyInput = document.getElementById('panic-key-input');
    const panicUrl = document.getElementById('panic-url');
    const savePanicBtn = document.getElementById('save-panic-btn');
    const panicStatus = document.getElementById('panic-status');
    const siteTitleInput = document.getElementById('site-title-input');
    const siteLogoInput = document.getElementById('site-logo-input');
    const currentLogo = document.getElementById('current-logo');
    const fpsToggle = document.getElementById('fps-counter-toggle');
    const fpsValue = document.getElementById('fps-value');

    const body = document.body;

    // ==================== CONSTANTS & STATE ====================
    const FAVORITES_KEY = 'favoriteGames';
    const RECENT_KEY = 'recentGames';
    const MAX_RECENT = 20;

    let originalGameBoxes = [];
    let particles = [];
    let animationFrameId = null;
    let showcaseInterval = null;
    let currentShowcaseIndex = 0;
    let hasAboutBlankRun = false;

    // ==================== INITIAL SETUP ====================
    // Cache original game boxes for search filtering
    document.querySelectorAll('#game-box-wrapper .game-box').forEach(box => {
        originalGameBoxes.push(box.cloneNode(true));
    });

    // Canvas setup for particles
    const resizeCanvas = () => {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // ==================== UTILITY FUNCTIONS ====================
    const getFavorites = () => JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
    const saveFavorites = (favs) => localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
    const getRecent = () => JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    const saveRecent = (rec) => localStorage.setItem(RECENT_KEY, JSON.stringify(rec));

    const showView = (name) => {
        // Hide all views
        Object.values(views).forEach(v => v?.classList.add('hidden-view'));
        views[name]?.classList.remove('hidden-view');

        // Update navigation highlighting
        navButtons.forEach(btn => {
            btn.classList.remove('bg-purple-600', 'text-white');
            btn.classList.add('text-gray-300');
            if (btn.dataset.view === name) {
                btn.classList.add('bg-purple-600', 'text-white');
                btn.classList.remove('text-gray-300');
            }
        });

        // Sidebar active state
        document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`.sidebar-btn[data-view="${name}"]`)?.classList.add('active');

        // View-specific logic
        if (name === 'home-page') startShowcase();
        else clearInterval(showcaseInterval);

        if (name === 'favorites') renderFavorites();
        if (name === 'recent') renderRecent();
        if (name === 'games') {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
        }
        if (name === 'extras') {
            setTimeout(bindExtraCards, 100);
        }

        // Re-bind game boxes after view change
        setTimeout(bindAllGameBoxes, 100);
    };

    window.showView = showView; // Make global for external calls

    // ==================== GAME BOX HANDLING ====================
    const createGameBox = (game, isFavorite = false) => {
        const box = document.createElement('div');
        box.className = 'game-box';
        box.dataset.url = game.url;
        box.dataset.title = game.title;
        box.dataset.img = game.img;

        box.innerHTML = `
            <img src="${game.img}" alt="${game.title}" loading="lazy">
            <div class="game-title">${game.title}</div>
            <div class="favorite-btn"><i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i></div>
        `;

        return box;
    };

    const bindAllGameBoxes = () => {
        document.querySelectorAll('.game-box[data-url]:not([data-bound])').forEach(box => {
            box.dataset.bound = 'true';

            const game = {
                url: box.dataset.url,
                title: box.dataset.title || 'Content',
                img: box.dataset.img || ''
            };

            // Favorite button
            const favBtn = box.querySelector('.favorite-btn');
            if (favBtn) {
                favBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleFavorite(game, box);
                });
            }

            // Main click - load game
            box.addEventListener('click', (e) => {
                if (e.target.closest('.favorite-btn')) return;

                gameIframe.src = game.url;
                gameLoader.classList.add('active');
                gameLoader.querySelector('.main-message').textContent = `Loading ${game.title}...`;

                showView('game');
                addToRecent(game);

                gameIframe.onload = () => gameLoader.classList.remove('active');

                if (gameVolumeToggle.checked) {
                    setTimeout(() => {
                        try {
                            gameIframe.contentWindow?.postMessage({type: 'mute', value: true}, '*');
                        } catch (err) {}
                    }, 1500);
                }
            });
        });
    };

    // Initial binding
    bindAllGameBoxes();

    const bindExtraCards = () => {
        document.querySelectorAll('.extra-card[data-url]:not([data-bound])').forEach(card => {
            card.dataset.bound = 'true';
            
            const content = {
                url: card.dataset.url,
                title: card.dataset.title || 'Content'
            };

            card.addEventListener('click', () => {
                gameIframe.src = content.url;
                gameLoader.classList.add('active');
                gameLoader.querySelector('.main-message').textContent = `Loading ${content.title}...`;
                
                showView('game');
                
                gameIframe.onload = () => gameLoader.classList.remove('active');
            });
        });
    };

    bindExtraCards();

    const clearSearchBtn = document.getElementById('clear-search-btn');

searchInput.addEventListener('input', () => {
    if (searchInput.value.trim()) {
        clearSearchBtn.classList.remove('hidden');
    } else {
        clearSearchBtn.classList.add('hidden');
    }
});

clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchBtn.classList.add('hidden');
    searchInput.focus();
    searchInput.dispatchEvent(new Event('input'));
});

    // ==================== SEARCH FUNCTIONALITY ====================
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const wrapper = document.getElementById('game-box-wrapper');
        wrapper.innerHTML = '';

        const matchingGames = originalGameBoxes.filter(box => {
            const title = (box.dataset.title || '').toLowerCase();
            return query === '' || title.includes(query);
        });

        if (matchingGames.length === 0) {
            wrapper.innerHTML = '<p class="text-center text-gray-400 text-xl py-20">No games found matching your search.</p>';
            return;
        }

        // Group into rows of 5
        for (let i = 0; i < matchingGames.length; i += 5) {
            const row = document.createElement('div');
            row.className = 'five-box-row';
            matchingGames.slice(i, i + 5).forEach(clone => row.appendChild(clone.cloneNode(true)));
            wrapper.appendChild(row);
        }

        bindAllGameBoxes(); // Re-bind after DOM update
        updateHeartsInMainView();
    });

    // ==================== FAVORITES & RECENT ====================
    const toggleFavorite = (game, boxElement = null) => {
        let favorites = getFavorites();
        const index = favorites.findIndex(f => f.url === game.url);

        const heartIcons = boxElement
            ? [boxElement.querySelector('.favorite-btn i')]
            : document.querySelectorAll(`.game-box[data-url="${game.url}"] .favorite-btn i`);

        if (index > -1) {
            favorites.splice(index, 1);
            heartIcons.forEach(icon => icon?.classList.replace('fas', 'far'));
        } else {
            favorites.push(game);
            heartIcons.forEach(icon => icon?.classList.replace('far', 'fas'));
        }

        saveFavorites(favorites);
        renderFavorites();
        renderRecent();
        updateHeartsInMainView();
    };

    const addToRecent = (game) => {
        let recent = getRecent();
        recent = recent.filter(r => r.url !== game.url);
        recent.unshift(game);
        if (recent.length > MAX_RECENT) recent.pop();
        saveRecent(recent);
        renderRecent();
    };

    const updateHeartsInMainView = () => {
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

    const renderFavorites = () => {
        const wrapper = document.getElementById('favorites-wrapper');
        if (!wrapper) return;
        
        let grid = wrapper.querySelector('.game-grid');
        if (!grid) {
            grid = document.createElement('div');
            grid.className = 'game-grid';
            wrapper.innerHTML = '';
            wrapper.appendChild(grid);
        }
        
        grid.innerHTML = '';
        const favorites = getFavorites();
        
        if (favorites.length === 0) {
            const emptyMsg = document.createElement('p');
            emptyMsg.className = 'text-center text-gray-400 text-xl py-10';
            emptyMsg.textContent = 'No favorite games yet. Click the heart on a game to add it!';
            grid.appendChild(emptyMsg);
            return;
        }

        favorites.forEach(game => {
            const box = createGameBox(game, true);
            grid.appendChild(box);
        });
        
        bindAllGameBoxes();
    };

    const renderRecent = () => {
        const wrapper = document.getElementById('recent-wrapper');
        if (!wrapper) return;
        
        let grid = wrapper.querySelector('.game-grid');
        if (!grid) {
            grid = document.createElement('div');
            grid.className = 'game-grid';
            wrapper.innerHTML = '';
            wrapper.appendChild(grid);
        }
        
        grid.innerHTML = '';
        const recent = getRecent();
        const favorites = getFavorites();
        
        if (recent.length === 0) {
            const emptyMsg = document.createElement('p');
            emptyMsg.className = 'text-center text-gray-400 text-xl py-10';
            emptyMsg.textContent = 'No recently played games.';
            grid.appendChild(emptyMsg);
            return;
        }

        recent.forEach(game => {
            const isFav = favorites.some(f => f.url === game.url);
            const box = createGameBox(game, isFav);
            grid.appendChild(box);
        });
        
        bindAllGameBoxes();
    };

    // ==================== SHOWCASE ====================
    const updateShowcase = () => {
        const gameBoxes = document.querySelectorAll('.game-box[data-url]');
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

    // ==================== TYPING EFFECT ====================
    const words = ['Freedom.', 'Beauty.', 'Peace.', 'Wonder.', 'Abundance.', 'Creativity.', 'Success.', 'Purpose.', 'Properity.'];
    let wordIndex = 0, charIndex = 0, isDeleting = false;

    const type = () => {
        const currentWord = words[wordIndex];
        gradientWord.textContent = isDeleting
            ? currentWord.substring(0, charIndex - 1)
            : currentWord.substring(0, charIndex + 1);

        charIndex += isDeleting ? -1 : 1;

        let typeSpeed = 120;
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        } else if (isDeleting) {
            typeSpeed /= 2;
        }

        setTimeout(type, typeSpeed);
    };
    type();

    // ==================== PARTICLES ====================
    class Particle {
        constructor() {
            this.x = Math.random() * particleCanvas.width;
            this.y = Math.random() * particleCanvas.height;
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
            if (this.x < 0 || this.x > particleCanvas.width) this.velocity.x = -this.velocity.x;
            if (this.y < 0 || this.y > particleCanvas.height) this.velocity.y = -this.velocity.y;
        }
    }

    const initParticles = (count) => {
        particles = [];
        for (let i = 0; i < count; i++) particles.push(new Particle());
    };

    const animateParticles = () => {
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
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

    const toggleParticles = (enabled, count = 50) => {
        if (enabled) {
            particleCanvas.style.display = 'block';
            initParticles(count);
            animateParticles();
        } else {
            particleCanvas.style.display = 'none';
            cancelAnimationFrame(animationFrameId);
            particles = [];
        }
    };

    // ==================== SETTINGS & PERSISTENCE ====================
    const applyTheme = (theme) => {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('selectedTheme', theme);
        document.querySelectorAll('.theme-option').forEach(opt =>
            opt.classList.toggle('active', opt.dataset.theme === theme)
        );
    };

    const applyCloaking = () => {
        const title = localStorage.getItem('cloakTitle') || document.title;
        document.title = title;
        siteTitleInput.value = title;

        const favicon = localStorage.getItem('cloakFavicon');
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        if (favicon) {
            link.href = favicon;
            currentLogo.textContent = 'Custom';
        } else {
            currentLogo.textContent = 'Default';
        }
    };

    const loadSettings = () => {
        applyTheme(localStorage.getItem('selectedTheme') || 'dark');

        const particlesEnabled = localStorage.getItem('particlesEnabled') !== 'false';
        const particleCount = parseInt(localStorage.getItem('particleCount')) || 50;
        particlesToggle.checked = particlesEnabled;
        particleDensity.value = particleCount;
        particleDensityValue.textContent = particleCount;
        toggleParticles(particlesEnabled, particleCount);

        performanceToggle.checked = localStorage.getItem('performanceMode') === 'true';
        showcaseSpeed.value = localStorage.getItem('showcaseSpeed') || '2000';
        gameVolumeToggle.checked = localStorage.getItem('muteGameAudio') === 'true';

        panicToggle.checked = localStorage.getItem('panicEnabled') === 'true';
        panicOptions.classList.toggle('hidden', !panicToggle.checked);
        panicKeyInput.value = localStorage.getItem('panicKey') || '';
        panicUrl.value = localStorage.getItem('panicUrl') || 'https://docs.google.com';

        applyCloaking();
    };
    loadSettings();

    // Settings event listeners
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', () => applyTheme(option.dataset.theme));
    });

    siteTitleInput.addEventListener('input', () => {
        const newTitle = siteTitleInput.value.trim() || 'Study Snap';
        document.title = newTitle;
        localStorage.setItem('cloakTitle', newTitle);
    });

    siteLogoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const dataUrl = ev.target.result;
            let link = document.querySelector("link[rel~='icon']") || document.createElement('link');
            link.rel = 'icon';
            link.href = dataUrl;
            document.head.appendChild(link);
            localStorage.setItem('cloakFavicon', dataUrl);
            currentLogo.textContent = 'Custom';
        };
        reader.readAsDataURL(file);
    });

    particlesToggle.addEventListener('change', () => {
        const enabled = particlesToggle.checked;
        toggleParticles(enabled, parseInt(particleDensity.value));
        localStorage.setItem('particlesEnabled', enabled);
    });

    particleDensity.addEventListener('input', (e) => {
        particleDensityValue.textContent = e.target.value;
        localStorage.setItem('particleCount', e.target.value);
        if (particlesToggle.checked) toggleParticles(true, parseInt(e.target.value));
    });

    performanceToggle.addEventListener('change', () => {
        const enabled = performanceToggle.checked;
        localStorage.setItem('performanceMode', enabled);
        if (enabled) {
            toggleParticles(false);
            body.classList.add('perf-mode');
        } else {
            body.classList.remove('perf-mode');
            const particlesOn = localStorage.getItem('particlesEnabled') !== 'false';
            const count = parseInt(localStorage.getItem('particleCount')) || 50;
            if (particlesOn) toggleParticles(true, count);
        }
    });

    showcaseSpeed.addEventListener('change', () => {
        localStorage.setItem('showcaseSpeed', showcaseSpeed.value);
        if (!views['home-page'].classList.contains('hidden-view')) startShowcase();
    });

    gameVolumeToggle.addEventListener('change', () => {
        localStorage.setItem('muteGameAudio', gameVolumeToggle.checked);
    });

    panicToggle.addEventListener('change', () => {
        panicOptions.classList.toggle('hidden', !panicToggle.checked);
        localStorage.setItem('panicEnabled', panicToggle.checked);
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

    document.addEventListener('keydown', (e) => {
        if (localStorage.getItem('panicEnabled') === 'true') {
            const key = localStorage.getItem('panicKey');
            if (key && e.key.toUpperCase() === key) {
                window.location.href = localStorage.getItem('panicUrl') || 'https://docs.google.com';
            }
        }
    });

    // Theme Dropdown Handler
    const themeSelect = document.getElementById('theme-select');

    if (themeSelect) {
        // Set current saved theme on load
        const savedTheme = localStorage.getItem('selectedTheme') || 'dark';
        themeSelect.value = savedTheme;

        // Change theme when selected
        themeSelect.addEventListener('change', () => {
        const selectedTheme = themeSelect.value;
        applyTheme(selectedTheme);
    });
}

    // ==================== MISC FEATURES ====================
    // About:blank cloaking
    const openInAboutBlank = (sourceUrl) => {
        if (hasAboutBlankRun) return;
        hasAboutBlankRun = true;

        const title = document.title;
        const faviconLink = document.querySelector("link[rel*='icon']");
        const faviconHref = faviconLink ? faviconLink.href : '';

        const cloakedWindow = window.open('', '_blank');
        if (!cloakedWindow) {
            hasAboutBlankRun = false;
            alert('Popups are blocked! Please allow popups for this site.');
            return;
        }

        cloakedWindow.location.href = 'about:blank';
        cloakedWindow.document.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>${title}</title>
                ${faviconHref ? `<link rel="icon" href="${faviconHref}">` : ''}
                <style>body, html { margin:0; padding:0; height:100%; overflow:hidden; }</style>
            </head>
            <body>
                <iframe src="${sourceUrl}" frameborder="0" allowfullscreen
                    style="position:absolute; top:0; left:0; width:100%; height:100%; border:none;">
                </iframe>
            </body>
            </html>
        `);
        cloakedWindow.document.close();

        setTimeout(() => window.location.replace('https://clever.com/'), 10);
    };

    document.getElementById('home-about-blank-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        openInAboutBlank(window.location.href);
    });

    // Fullscreen & new tab buttons
    document.getElementById('fullscreen-btn-game')?.addEventListener('click', () => {
        gameIframe.requestFullscreen?.();
    });

    document.getElementById('newtab-btn-game')?.addEventListener('click', () => {
        if (gameIframe.src) window.open(gameIframe.src, '_blank');
    });

    // Export / Import / Reset
    document.getElementById('export-settings-btn')?.addEventListener('click', () => {
        const data = { localStorage: { ...localStorage } };
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `studythemes-backup-${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    });

    document.getElementById('import-settings-input')?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const data = JSON.parse(ev.target.result);
                if (!data.localStorage) throw new Error();
                localStorage.clear();
                Object.entries(data.localStorage).forEach(([k, v]) => localStorage.setItem(k, v));
                alert('Imported successfully! Reloading...');
                setTimeout(() => location.reload(), 1000);
            } catch {
                alert('Invalid backup file');
            }
        };
        reader.readAsText(file);
    });

    document.getElementById('reset-all-data-btn')?.addEventListener('click', () => {
        if (confirm('This will delete ALL saved data. Continue?')) {
            localStorage.clear();
            setTimeout(() => location.reload(), 500);
        }
    });

    // FPS Counter
    if (fpsToggle && fpsValue) {
        let frames = 0;
        let lastTime = performance.now();
        let rafId = null;

        const updateFPS = (timestamp) => {
            frames++;
            if (timestamp - lastTime >= 1000) {
                const fps = Math.round(frames * 1000 / (timestamp - lastTime));
                fpsValue.textContent = fps;
                fpsValue.style.color = fps >= 55 ? '#4ade80' : (fps >= 30 ? '#fbbf24' : '#ef4444');
                frames = 0;
                lastTime = timestamp;
            }
            rafId = requestAnimationFrame(updateFPS);
        };

        const toggleFPS = (enabled) => {
            document.getElementById('fps-counter').style.display = enabled ? 'block' : 'none';
            if (enabled && !rafId) rafId = requestAnimationFrame(updateFPS);
            else if (!enabled && rafId) cancelAnimationFrame(rafId);
            localStorage.setItem('fpsCounterEnabled', enabled);
        };

        const enabled = localStorage.getItem('fpsCounterEnabled') !== 'false';
        fpsToggle.checked = enabled;
        toggleFPS(enabled);

        fpsToggle.addEventListener('change', () => toggleFPS(fpsToggle.checked));
    }

    // Tab switching in settings
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(button.dataset.tab + '-tab').classList.add('active');
        });
    });

    // Navigation
    navButtons.forEach(btn => btn.addEventListener('click', () => showView(btn.dataset.view)));

    // Initial render
    showView('home-page');
    startShowcase();
    renderFavorites();
    renderRecent();
    updateHeartsInMainView();
});
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mainContent = document.getElementById('main-content');

    menuToggle.addEventListener('click', () => {
        sidebar.classList.remove('-translate-x-full');
        sidebar.classList.add('translate-x-0');
        mainContent.classList.add('lg:ml-0');
    });

    menuClose.addEventListener('click', () => {
        sidebar.classList.remove('translate-x-0');
        sidebar.classList.add('-translate-x-full');
    });

    document.addEventListener('click', (e) => {
        if (window.innerWidth < 1024) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('translate-x-0');
                sidebar.classList.add('-translate-x-full');
            }
        }
    });

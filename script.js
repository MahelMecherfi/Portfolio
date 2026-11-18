/**
 * MAHEL MECHERFI — PORTFOLIO INTERACTIONS SCRIPT
 * Implements:
 * 1. Yaros.me Scroll-driven text reveal
 * 2. Readymag Photo stack gallery modal with click-to-advance & video support
 * 3. LiveMeFive 3D perspective mouse tilt on project media
 * 4. Custom interactive cursor & magnetic followers
 * 5. Karl.works & Kuba Fidler view toggling (Expo vs Archive)
 * 6. Ambient gradient mouse parallax
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. PROJECT MEDIA REGISTRY (Readymag Stack Gallery)
       ========================================================================== */
    const projectsData = {
        wall: {
            title: "Mur Interactif Musée Pouilly-Fumé",
            code: "EXP_01",
            description: "Mur de 12 m² combinant scénographie viticole, simulation physique et diffusion audiovisuelle synchronisée.",
            tech: "Unity • C# • OSC • MadMapper • système de particules",
            challenge: "Synchroniser les interactions tactiles, les bulles virtuelles, les visuels projetés et le son dans une expérience temps réel stable.",
            items: [
                { type: 'image', src: 'content/interactive_wall.png', caption: 'Rendu 3D du mur interactif (2 × 6 m) et simulations de bulles en C#' },
                { type: 'image', src: 'content/interactivewall1.png', caption: 'Installation scénographique et gestion dynamique des 4 saisons viticoles' },
                { type: 'image', src: 'content/interactivewall2.png', caption: 'Interactions tactiles et synchronisation temps réel en OSC avec MadMapper' },
                { type: 'image', src: 'content/pouilly-fumé.png', caption: 'Scénographie et identité au Musée de Pouilly-Fumé' }
            ]
        },
        dreamlog: {
            title: "DreamLog — Journal Onirique Augmenté & IA",
            code: "EXP_02",
            description: "Application de journal intime transformant les récits écrits en visualisations métaphoriques et analyses oniriques.",
            tech: "IA générative • HTML/CSS/JavaScript • design UI/UX • storytelling",
            challenge: "Structurer le contenu sémantique des rêves puis adapter une génération visuelle cohérente aux émotions et motifs récurrents.",
            items: [
                { type: 'image', src: 'content/Dreamlog.png', caption: 'Interface d\'accueil de DreamLog : exploration narrative et génération IA' },
                { type: 'video', src: 'content/videodreamlog.mp4', caption: 'Démonstration vidéo du pipeline de génération d\'images d\'après le récit' },
                { type: 'image', src: 'content/dreamlog1.png', caption: 'Analyse émotionnelle et sémantique du texte de rêve' },
                { type: 'image', src: 'content/dreamlog2.png', caption: 'Visualisation générée par IA et signature visuelle du récit' },
                { type: 'image', src: 'content/dreamlog3.png', caption: 'Cartographie des motifs récurrents et métaphores oniriques' },
                { type: 'image', src: 'content/dreamlog4.png', caption: 'Tableau de bord introspectif et historique chronologique' },
                { type: 'image', src: 'content/dreamlog5.png', caption: 'Storytelling immersif généré par IA multimodale' },
                { type: 'image', src: 'content/dreamlog6.png', caption: 'Design System, typographies et composants UI' }
            ]
        },
        brightsign: {
            title: "Borne Tactile BrightSign — Musée de Pouilly",
            code: "EXP_03",
            description: "Application muséale bilingue donnant accès à neuf interviews de vignerons depuis une borne tactile autonome.",
            tech: "HTML5 • CSS • JavaScript • Figma • BrightSign LS425",
            challenge: "Garantir une navigation fluide, un affichage plein écran fiable et une lecture vidéo adaptée au public du musée.",
            items: [
                { type: 'image', src: 'content/brightsign.png', caption: 'Borne tactile interactive installée au cœur du parcours muséal' },
                { type: 'image', src: 'content/application_vignerons.png', caption: 'Écran de sélection des 9 vignerons interviewés (Interface Web embarquée)' },
                { type: 'image', src: 'content/brightsign2.png', caption: 'Lecteur d\'interview vidéo plein écran avec sous-titrage FR/EN' },
                { type: 'image', src: 'content/brightsign3.png', caption: 'Détails de navigation fluide et ergonomie adaptée aux visiteurs' }
            ]
        },
        unity: {
            title: "Monde Interactif Immersif — Survie HCI Unity",
            code: "EXP_04",
            description: "Expérience de survie en 3D où la gestion du feu et du cycle jour/nuit conditionne l'engagement du joueur.",
            tech: "Unity 3D • C# • animation • gestion d'environnement • audio",
            challenge: "Créer une boucle de jeu lisible avec des cycles dynamiques, des ennemis nocturnes et une atmosphère cohérente.",
            items: [
                { type: 'image', src: 'content/unity_hbb1.png', caption: 'Environnement insulaire sous Unity : atmosphère crépusculaire et feu de camp' },
                { type: 'image', src: 'content/unity_hbb2.png', caption: 'Cycle nocturne dynamique : créatures hostiles et gestion de survie' }
            ]
        },
        kickstarter: {
            title: "Paste Scraper — Produit Eco-Design & Kickstarter",
            code: "EXP_05",
            description: "Outil éco-conçu destiné à récupérer intégralement le contenu des tubes et contenants semi-rigides.",
            tech: "Conception produit • prototypage • matériaux durables • identité visuelle",
            challenge: "Réduire le gaspillage tout en proposant un produit ergonomique, robuste, accessible et compatible avec plusieurs formats.",
            items: [
                { type: 'image', src: 'content/kickstarter1.png', caption: 'Prototype fonctionnel de l\'outil d\'extraction anti-gaspillage' },
                { type: 'image', src: 'content/kickstarter2.png', caption: 'Conception circulaire, ergonomie d\'usage et packaging Kickstarter' }
            ]
        }
    };

    /* ==========================================================================
       2. CUSTOM CURSOR & MAGNETIC FOLLOWER (LiveMeFive & 27-b)
       ========================================================================== */
    /* ==========================================================================
       2. LIQUID MELTING CANVAS & VISCOUS FUSION SIMULATION
       ========================================================================== */
    const meltingCanvas = document.getElementById('melting-canvas');
    const moltenSpotlight = document.getElementById('molten-spotlight');

    let ctx = null;
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;
    const particles = [];
    const warmPalette = [
        'rgba(234, 88, 12, 0.75)',   // Warm Coral
        'rgba(245, 158, 11, 0.75)',  // Molten Amber
        'rgba(249, 115, 22, 0.75)',  // Warm Peach
        'rgba(251, 146, 60, 0.65)'   // Apricot Glow
    ];

    if (meltingCanvas) {
        ctx = meltingCanvas.getContext('2d');
        function resizeCanvas() {
            canvasWidth = meltingCanvas.width = window.innerWidth;
            canvasHeight = meltingCanvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas, { passive: true });
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let prevMouseX = mouseX;
    let prevMouseY = mouseY;
    let spotX = mouseX;
    let spotY = mouseY;

    window.addEventListener('mousemove', (e) => {
        const dx = e.clientX - prevMouseX;
        const dy = e.clientY - prevMouseY;
        const speed = Math.hypot(dx, dy);

        mouseX = e.clientX;
        mouseY = e.clientY;

        // Spawn melting viscous droplets when the mouse moves
        if (speed > 1.5 && particles.length < 90) {
            const count = Math.min(Math.floor(speed / 4) + 1, 3);
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: mouseX + (Math.random() - 0.5) * 16,
                    y: mouseY + (Math.random() - 0.5) * 16,
                    radius: Math.random() * 22 + 20,
                    vx: (Math.random() - 0.5) * 1.5 + (dx * 0.08),
                    vy: (Math.random() - 0.5) * 1.5 + (dy * 0.08),
                    color: warmPalette[Math.floor(Math.random() * warmPalette.length)],
                    life: 1.0,
                    decay: Math.random() * 0.016 + 0.018
                });
            }
        }

        prevMouseX = mouseX;
        prevMouseY = mouseY;
    }, { passive: true });

    function renderMeltingEngine() {
        // 1. Update fluid melting canvas
        if (ctx) {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.96;
                p.vy *= 0.96;
                p.life -= p.decay;
                p.radius *= 0.985;

                if (p.life <= 0 || p.radius <= 3) {
                    particles.splice(i, 1);
                    continue;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life * 0.65;
                ctx.fill();
            }
            ctx.globalAlpha = 1.0;
        }

        // 2. Update soft molten spotlight halo
        spotX += (mouseX - spotX) * 0.1;
        spotY += (mouseY - spotY) * 0.1;

        if (moltenSpotlight) {
            moltenSpotlight.style.left = `${spotX}px`;
            moltenSpotlight.style.top = `${spotY}px`;
        }

        requestAnimationFrame(renderMeltingEngine);
    }
    requestAnimationFrame(renderMeltingEngine);

    /* ==========================================================================
       UNIVERSAL TEXT ILLUMINATION ENGINE (Illumine tout le texte au survol)
       ========================================================================== */
    function makeInteractiveWords(selector) {
        const containers = document.querySelectorAll(selector);
        containers.forEach(container => {
            const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
            const textNodes = [];
            let node;
            while (node = walker.nextNode()) {
                if (node.nodeValue.trim().length > 0) {
                    textNodes.push(node);
                }
            }

            textNodes.forEach(textNode => {
                const words = textNode.nodeValue.split(/(\s+)/);
                const fragment = document.createDocumentFragment();
                words.forEach(word => {
                    if (word.trim().length > 0) {
                        const span = document.createElement('span');
                        span.className = 'word-glow';
                        span.textContent = word;
                        fragment.appendChild(span);
                    } else if (word.length > 0) {
                        fragment.appendChild(document.createTextNode(word));
                    }
                });
                textNode.parentNode.replaceChild(fragment, textNode);
            });
        });
    }

    // Apply to all paragraphs and text content across the site
    makeInteractiveWords('.hero-subtext, .project-text, .project-role, .footer-desc');

    const mediaViewports = document.querySelectorAll('.project-media-container, .project-media-viewport');

    /* ==========================================================================
       3. LIVEMEFIVE PHOTO MOUSE INTERACTIONS: INFINITE HOVER LOOP & 3D PARALLAX
       ========================================================================== */
    mediaViewports.forEach(viewport => {
        const tiltWrapper = viewport.querySelector('.media-tilt-wrapper');
        const projectImage = viewport.querySelector('.project-image');
        const mediaBadge = viewport.querySelector('.media-badge');
        if (!tiltWrapper) return;

        const projectId = viewport.getAttribute('data-project') || viewport.getAttribute('data-project-id');
        const project = projectsData[projectId];
        const imageList = project ? project.items.filter(item => item.type === 'image') : [];

        // Preload all project images for instant zero-latency cycling
        imageList.forEach(item => {
            const preload = new Image();
            preload.src = item.src;
        });

        let hoverLoopTimer = null;
        let hoverPhotoIdx = 0;
        const cycleSpeed = 700; // 700ms par image au survol

        // Inject dynamic specular glare overlay if missing
        let glareOverlay = viewport.querySelector('.media-glare-overlay');
        if (!glareOverlay) {
            glareOverlay = document.createElement('div');
            glareOverlay.className = 'media-glare-overlay';
            glareOverlay.setAttribute('aria-hidden', 'true');
            tiltWrapper.appendChild(glareOverlay);
        }

        // INFINITE HOVER LOOP: toutes les autres photos défilent sans s'arrêter en boucle au survol
        viewport.addEventListener('mouseenter', () => {
            if (!project || imageList.length <= 1) return;
            clearInterval(hoverLoopTimer);

            hoverLoopTimer = setInterval(() => {
                hoverPhotoIdx = (hoverPhotoIdx + 1) % imageList.length;
                if (projectImage) {
                    projectImage.src = imageList[hoverPhotoIdx].src;
                }
                if (mediaBadge) {
                    mediaBadge.innerHTML = `<span>PHOTO ${hoverPhotoIdx + 1} / ${imageList.length} ↻</span>`;
                }
            }, cycleSpeed);
        });

        viewport.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches) return;

            const rect = viewport.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const normX = (x - centerX) / centerX;
            const normY = (y - centerY) / centerY;

            // 1. 3D perspective tilt on container
            const rotateX = -normY * 7;
            const rotateY = normX * 7;
            tiltWrapper.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            // 2. Optical parallax panning on inner photo (depth illusion)
            if (projectImage) {
                const panX = -normX * 16;
                const panY = -normY * 16;
                projectImage.style.transform = `scale(1.05) translate(${panX}px, ${panY}px)`;
            }

            // 3. Specular glass glare following cursor
            if (glareOverlay) {
                glareOverlay.style.background = `radial-gradient(circle 380px at ${x}px ${y}px, rgba(255, 255, 255, 0.42), transparent 75%)`;
            }

            // 4. Magnetic follower badge tracking mouse inside photo
            if (mediaBadge) {
                mediaBadge.style.left = `${x}px`;
                mediaBadge.style.top = `${y}px`;
            }
        });

        viewport.addEventListener('mouseleave', () => {
            clearInterval(hoverLoopTimer);
            hoverPhotoIdx = 0;

            // Return to cover photo
            if (projectImage && imageList[0]) {
                projectImage.src = imageList[0].src;
                projectImage.style.transform = `scale(1.05) translate(0px, 0px)`;
            }
            if (mediaBadge) {
                mediaBadge.innerHTML = `<span>Défiler la galerie [ ${imageList.length} ] ↗</span>`;
            }
            tiltWrapper.style.transform = `perspective(1100px) rotateX(0deg) rotateY(0deg)`;
        });
    });



    /* ==========================================================================
       4. YAROS.ME SCROLL-DRIVEN TEXT REVEAL
       ========================================================================== */
    const revealWords = document.querySelectorAll('.reveal-word');

    function updateScrollReveal() {
        const triggerBottom = window.innerHeight * 0.82;
        const triggerTop = window.innerHeight * 0.15;

        revealWords.forEach(word => {
            const rect = word.getBoundingClientRect();
            if (rect.top <= triggerBottom && rect.bottom >= triggerTop) {
                word.classList.add('is-revealed');
            } else if (rect.top > triggerBottom) {
                word.classList.remove('is-revealed');
            }
        });
    }

    window.addEventListener('scroll', updateScrollReveal, { passive: true });
    updateScrollReveal(); // Initial check on load

    /* ==========================================================================
       5. CHARLIE OSBORNE AMBIENT GRADIENT PARALLAX
       ========================================================================== */
    const ambientOrbs = document.querySelectorAll('.ambient-orb');
    window.addEventListener('mousemove', (e) => {
        const normX = (e.clientX / window.innerWidth - 0.5) * 35;
        const normY = (e.clientY / window.innerHeight - 0.5) * 35;

        ambientOrbs.forEach((orb, i) => {
            const factor = (i + 1) * 0.7;
            orb.style.transform = `translate(${normX * factor}px, ${normY * factor}px)`;
        });
    }, { passive: true });

    /* ==========================================================================
       6. READYMAG GALLERY MODAL (Les photos qui défilent au clic !)
       ========================================================================== */
    const galleryModal = document.getElementById('gallery-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalPrevBtn = document.getElementById('modal-prev-btn');
    const modalNextBtn = document.getElementById('modal-next-btn');
    const modalStage = document.getElementById('modal-stage');

    const modalTitle = document.getElementById('modal-project-title');
    const modalIdx = document.getElementById('modal-project-idx');
    const modalCounter = document.getElementById('modal-media-counter');
    const modalActiveImg = document.getElementById('modal-active-img');
    const modalActiveVideo = document.getElementById('modal-active-video');
    const modalThumbnails = document.getElementById('modal-thumbnails');
    const modalProjectDescription = document.getElementById('modal-project-description');
    const modalProjectTech = document.getElementById('modal-project-tech');
    const modalProjectChallenge = document.getElementById('modal-project-challenge');

    let currentProjectId = null;
    let currentMediaIndex = 0;

    function openGallery(projectId, startIndex = 0) {
        const project = projectsData[projectId];
        if (!project || !project.items.length) return;

        currentProjectId = projectId;
        currentMediaIndex = startIndex;

        modalTitle.textContent = project.title;
        modalIdx.textContent = `[ ${project.code} ]`;
        modalProjectDescription.textContent = project.description;
        modalProjectTech.textContent = project.tech;
        modalProjectChallenge.textContent = project.challenge;

        renderThumbnails(project);
        showMedia(currentMediaIndex);

        galleryModal.classList.add('is-open');
        galleryModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeGallery() {
        galleryModal.classList.remove('is-open');
        galleryModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        if (modalActiveVideo) {
            modalActiveVideo.pause();
            modalActiveVideo.src = '';
        }
    }

    function showMedia(index) {
        const project = projectsData[currentProjectId];
        if (!project) return;

        // Wrap around seamlessly
        if (index >= project.items.length) {
            currentMediaIndex = 0;
        } else if (index < 0) {
            currentMediaIndex = project.items.length - 1;
        } else {
            currentMediaIndex = index;
        }

        const media = project.items[currentMediaIndex];
        modalCounter.textContent = `${String(currentMediaIndex + 1).padStart(2, '0')} / ${String(project.items.length).padStart(2, '0')}`;

        if (media.type === 'video') {
            modalActiveImg.style.display = 'none';
            modalActiveVideo.style.display = 'block';
            modalActiveVideo.src = media.src;
            modalActiveVideo.play().catch(() => {});
        } else {
            if (modalActiveVideo) {
                modalActiveVideo.pause();
                modalActiveVideo.style.display = 'none';
            }
            modalActiveImg.style.display = 'block';
            modalActiveImg.src = media.src;
            modalActiveImg.alt = media.caption || project.title;
        }

        // Update hint text for touch screens vs mouse
        const modalHint = document.querySelector('.modal-hint');
        if (modalHint) {
            if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
                modalHint.textContent = 'GLISSER OU TOUCHER POUR DÉFILER →';
            } else {
                modalHint.textContent = 'CLIQUEZ POUR DÉFILER →';
            }
        }

        // Update active thumbnail
        const thumbs = modalThumbnails.querySelectorAll('.modal-thumb');
        thumbs.forEach((thumb, i) => {
            if (i === currentMediaIndex) {
                thumb.classList.add('is-active');
                thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                thumb.classList.remove('is-active');
            }
        });
    }

    function nextMedia() {
        showMedia(currentMediaIndex + 1);
    }

    function prevMedia() {
        showMedia(currentMediaIndex - 1);
    }

    function renderThumbnails(project) {
        modalThumbnails.innerHTML = '';
        project.items.forEach((item, i) => {
            const thumb = document.createElement('img');
            // If it's a video, use the project's first image or a thumbnail
            thumb.src = item.type === 'video' ? project.items[0].src : item.src;
            thumb.alt = `Vignette ${i + 1}`;
            thumb.className = `modal-thumb ${i === currentMediaIndex ? 'is-active' : ''}`;
            thumb.addEventListener('click', (e) => {
                e.stopPropagation();
                showMedia(i);
            });
            modalThumbnails.appendChild(thumb);
        });
    }

    // Attach open gallery listeners to all triggers
    const galleryTriggers = document.querySelectorAll('.open-gallery-btn, .project-media-container, .project-media-viewport');
    galleryTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            // Avoid conflict if clicking a direct link inside
            if (e.target.tagName.toLowerCase() === 'a' && !e.target.classList.contains('table-view-btn')) {
                return;
            }

            const projectId = trigger.getAttribute('data-project') || trigger.getAttribute('data-project-id');
            if (projectId && projectsData[projectId]) {
                openGallery(projectId, 0);
            }
        });
    });

    // Toute la carte ouvre les détails techniques et la galerie du projet.
    document.querySelectorAll('.project-entry').forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', 'Voir les détails techniques et la galerie du projet');

        card.addEventListener('click', (e) => {
            if (e.target.closest('a, button')) return;
            const projectId = card.getAttribute('data-project-id');
            if (projectId && projectsData[projectId]) openGallery(projectId, 0);
        });

        card.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter' && e.key !== ' ') return;
            e.preventDefault();
            const projectId = card.getAttribute('data-project-id');
            if (projectId && projectsData[projectId]) openGallery(projectId, 0);
        });
    });

    // Readymag feature: Clicking inside the stage advances to next photo!
    if (modalStage) {
        modalStage.addEventListener('click', (e) => {
            // If user clicked video controls, don't advance
            if (e.target === modalActiveVideo && e.offsetY > modalActiveVideo.clientHeight - 50) {
                return;
            }
            nextMedia();
        });

        // Touch swipe gesture support for smartphones
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        modalStage.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }
        }, { passive: true });

        modalStage.addEventListener('touchend', (e) => {
            if (e.changedTouches.length === 1) {
                touchEndX = e.changedTouches[0].clientX;
                touchEndY = e.changedTouches[0].clientY;
                handleSwipeGesture();
            }
        }, { passive: true });

        function handleSwipeGesture() {
            const diffX = touchEndX - touchStartX;
            const diffY = touchEndY - touchStartY;
            // Horizontal swipe must dominate vertical motion
            if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
                if (diffX < 0) {
                    nextMedia(); // Swiped left -> Next photo
                } else {
                    prevMedia(); // Swiped right -> Previous photo
                }
            }
        }
    }

    if (modalNextBtn) modalNextBtn.addEventListener('click', nextMedia);
    if (modalPrevBtn) modalPrevBtn.addEventListener('click', prevMedia);
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeGallery);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeGallery);

    // Keyboard controls
    window.addEventListener('keydown', (e) => {
        if (!galleryModal.classList.contains('is-open')) return;

        if (e.key === 'Escape') {
            closeGallery();
        } else if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            nextMedia();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevMedia();
        }
    });

    /* ==========================================================================
       7. MOBILE NAVIGATION DRAWER CONTROLLER
       ========================================================================== */
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav');

    function toggleMobileMenu(forceState) {
        if (!mobileMenuToggle || !navMenu) return;
        const isOpen = forceState !== undefined ? forceState : !navMenu.classList.contains('is-open');

        if (isOpen) {
            navMenu.classList.add('is-open');
            mobileMenuToggle.classList.add('is-active');
            mobileMenuToggle.setAttribute('aria-expanded', 'true');
            mobileMenuToggle.setAttribute('aria-label', 'Fermer le menu');
            document.body.style.overflow = 'hidden';
        } else {
            navMenu.classList.remove('is-open');
            mobileMenuToggle.classList.remove('is-active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mobileMenuToggle.setAttribute('aria-label', 'Ouvrir le menu');
            document.body.style.overflow = '';
        }
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    // Close mobile menu when tapping any nav link
    if (navMenu) {
        navMenu.querySelectorAll('.nav-link, .mobile-cv-btn, .nav-mobile-socials a').forEach(link => {
            link.addEventListener('click', () => {
                toggleMobileMenu(false);
            });
        });
    }

    // Close drawer when resizing to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('is-open')) {
            toggleMobileMenu(false);
        }
    }, { passive: true });



    /* ==========================================================================
       9. SMOOTH ANCHOR SCROLLING
       ========================================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log("⚡ Mahel Mecherfi Portfolio loaded with all 10 aesthetic inspirations active.");
});

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Custom Cursor ---
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  
  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;
  
  // Track mouse coordinates
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Instantly update dot location
    if (cursorDot) {
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }
  });

  // Spring/inertia interpolation for the cursor ring
  const updateRing = () => {
    // Distance between mouse and ring
    const dx = mouseX - ringX;
    const dy = mouseY - ringY;
    
    // Move ring partially towards mouse (spring effect)
    ringX += dx * 0.15;
    ringY += dy * 0.15;
    
    if (cursorRing) {
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    }
    
    requestAnimationFrame(updateRing);
  };
  updateRing();

  // Handle hover scaling for links and buttons
  const hoverElements = document.querySelectorAll('a, button, .proj-card, .btn-primary, .btn-secondary, .btn-link, .carousel-btn, .project-card, .timeline-card, .value-card');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursorRing) cursorRing.classList.add('cursor-hover');
      if (cursorDot) cursorDot.classList.add('cursor-hover');
    });
    
    el.addEventListener('mouseleave', () => {
      if (cursorRing) cursorRing.classList.remove('cursor-hover');
      if (cursorDot) cursorDot.classList.remove('cursor-hover');
    });
  });

  // --- 2. Navigation Glow Tracking ---
  const navWrapper = document.querySelector('.nav-wrapper');
  if (navWrapper) {
    navWrapper.addEventListener('mousemove', (e) => {
      const rect = navWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      navWrapper.style.setProperty('--glow-x', `${x}px`);
      navWrapper.style.setProperty('--glow-y', `${y}px`);
    });
  }

  // --- 3. Hero Section Roles Cycling ---
  const roles = [
    "Student",
    "Frontend Developer",
    "UI/UX Designer",
    "Full-Stack Engineer"
  ];
  let currentRoleIndex = 0;
  const roleElement = document.getElementById('hero-role-text');
  const dotPills = document.querySelectorAll('.dot-pill');
  
  if (roleElement) {
    setInterval(() => {
      // Transition out
      roleElement.classList.remove('role-in');
      roleElement.classList.add('role-out');
      
      setTimeout(() => {
        // Cycle index
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        
        // Update text
        roleElement.textContent = roles[currentRoleIndex];
        
        // Transition in
        roleElement.classList.remove('role-out');
        roleElement.classList.add('role-in');
        
        // Update active dot indicators
        dotPills.forEach((dot, index) => {
          if (index === currentRoleIndex) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }, 350); // Matches the CSS transition duration
    }, 3000);
  }

  // --- 4. Button Canvas Ripple/Spotlight Effect ---
  // Create dynamic glowing effects inside button canvas tags on hover
  const canvasButtons = document.querySelectorAll('.btn-canvas-interactive');
  canvasButtons.forEach(btn => {
    const canvas = btn.querySelector('canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let w = canvas.width = btn.offsetWidth;
    let h = canvas.height = btn.offsetHeight;
    
    // Resize handler
    const resizeObserver = new ResizeObserver(() => {
      w = canvas.width = btn.offsetWidth;
      h = canvas.height = btn.offsetHeight;
    });
    resizeObserver.observe(btn);
    
    let btnHovering = false;
    let hoverX = w / 2;
    let hoverY = h / 2;
    
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      hoverX = e.clientX - rect.left;
      hoverY = e.clientY - rect.top;
      btnHovering = true;
    });
    
    btn.addEventListener('mouseenter', () => btnHovering = true);
    btn.addEventListener('mouseleave', () => btnHovering = false);
    
    // Canvas animation loop
    function render() {
      ctx.clearRect(0, 0, w, h);
      
      if (btnHovering) {
        // Create accent radial spotlight glow in button - soft lavender
        const grad = ctx.createRadialGradient(hoverX, hoverY, 0, hoverX, hoverY, w * 0.7);
        grad.addColorStop(0, 'rgba(43, 102, 255, 0.05)');
        grad.addColorStop(0.5, 'rgba(43, 102, 255, 0.015)');
        grad.addColorStop(1, 'transparent');
        
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
        
        // Dynamic border highlighting on canvas boundary
        ctx.strokeStyle = 'rgba(43, 102, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.strokeRect(0, 0, w, h);
      }
      
      requestAnimationFrame(render);
    }
    render();
  });

  // --- 5. Mobile Navigation Toggle ---
  const mobileToggle = document.getElementById('mobile-nav-btn');
  const mobileMenu = document.getElementById('mobile-dropdown');
  
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    
    // Close mobile menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('.nav-link-item');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  // --- 6. Active Nav Link on Scroll ---
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link-item');
  
  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 150; // Offset for navbar height
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      // Normalize mobile drop links which have the same href
      if (href === `#${currentSectionId}` || (currentSectionId === 'hero' && href === '#')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });

  // --- 7. Projects Carousel Interaction ---
  const track = document.querySelector('.carousel-track');
  const initialItems = Array.from(document.querySelectorAll('.carousel-item'));
  const btnPrev = document.querySelector('.btn-prev');
  const btnNext = document.querySelector('.btn-next');
  const dotsContainer = document.querySelector('.carousel-dots');
  
  if (track && initialItems.length > 0) {
    // Clone first and last items for infinite circular scroll
    const firstClone = initialItems[0].cloneNode(true);
    const lastClone = initialItems[initialItems.length - 1].cloneNode(true);
    
    // Add clones to DOM
    track.appendChild(firstClone);
    track.insertBefore(lastClone, initialItems[0]);
    
    // Update items list to include clones
    const items = Array.from(track.querySelectorAll('.carousel-item'));
    
    // Start index at 1 (which represents the first original item)
    let currentIndex = 1; 
    let isTransitioning = false;
    
    // Clear and build dot indicators dynamically
    dotsContainer.innerHTML = '';
    initialItems.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        if (isTransitioning) return;
        moveToSlide(idx + 1);
      });
      dotsContainer.appendChild(dot);
    });
    
    const dots = Array.from(dotsContainer.querySelectorAll('.carousel-dot'));
    
    const updateCarousel = (enableTransition = true) => {
      if (enableTransition) {
        track.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      } else {
        track.style.transition = 'none';
      }
      
      const wrapperWidth = track.parentElement.offsetWidth;
      const activeItem = items[currentIndex];
      const itemWidth = activeItem.offsetWidth;
      
      // Calculate center pan offset
      const activeCenter = activeItem.offsetLeft + (itemWidth / 2);
      const panOffset = (wrapperWidth / 2) - activeCenter;
      
      // Move track
      track.style.transform = `translate3d(${panOffset}px, 0, 0)`;
      
      // Determine mapped index for dots (Item0 maps to 0, Item1 to 1, Item2 to 2)
      // Items list structure: [CloneLast, Item0, Item1, Item2, CloneFirst]
      let dotIndex = currentIndex - 1;
      if (currentIndex === 0) dotIndex = initialItems.length - 1;
      if (currentIndex === items.length - 1) dotIndex = 0;
      
      // Toggle active states on original items and clones
      items.forEach((item, index) => {
        let representsIndex = index - 1;
        if (index === 0) representsIndex = initialItems.length - 1;
        if (index === items.length - 1) representsIndex = 0;
        
        if (representsIndex === dotIndex) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
      
      // Toggle active dots
      dots.forEach((dot, index) => {
        if (index === dotIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };
    
    const moveToSlide = (index) => {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex = index;
      updateCarousel(true);
      startAutoplay();
    };
    
    // Listen for transition end to reset position silently
    track.addEventListener('transitionend', () => {
      isTransitioning = false;
      
      // Snap from CloneFirst (index 4) back to Item0 (index 1)
      if (currentIndex === items.length - 1) {
        currentIndex = 1;
        updateCarousel(false);
      }
      // Snap from CloneLast (index 0) forward to Item2 (index 3)
      if (currentIndex === 0) {
        currentIndex = items.length - 2;
        updateCarousel(false);
      }
    });
    
    let autoplayTimer = null;
    
    const startAutoplay = () => {
      stopAutoplay();
      autoplayTimer = setInterval(() => {
        moveToSlide(currentIndex + 1);
      }, 5000);
    };
    
    const stopAutoplay = () => {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
      }
    };
    
    btnPrev.addEventListener('click', () => {
      if (isTransitioning) return;
      moveToSlide(currentIndex - 1);
    });
    
    btnNext.addEventListener('click', () => {
      if (isTransitioning) return;
      moveToSlide(currentIndex + 1);
    });
    
    window.addEventListener('resize', () => {
      updateCarousel(false);
    });
    
    setTimeout(() => {
      updateCarousel(false);
      startAutoplay();
    }, 100);
  }

  // --- 8. Active Background Scroll Trigger (Fades in at Projects, stays on other sections, fades out at Hero) ---
  const projectsSection = document.getElementById('projects');
  
  if (projectsSection) {
    const handleScrollBg = () => {
      const scrollPosition = window.scrollY;
      // Start fading in slightly before the Projects section hits the viewport center
      const projectsTop = projectsSection.offsetTop - (window.innerHeight * 0.45);
      
      if (scrollPosition >= projectsTop) {
        document.body.classList.add('active-bg-visible');
      } else {
        document.body.classList.remove('active-bg-visible');
      }
    };
    
    window.addEventListener('scroll', handleScrollBg);
    // Execute once on load to set initial state
    handleScrollBg();
  }

  // --- 9. Bottom Scroll Progress Bar & Parallax Variable Tracker ---
  const scrollProgressBar = document.getElementById('scroll-progress');
  
  const handleScrollProgress = () => {
    const scrollTop = window.scrollY;
    
    // Track scroll height and set custom CSS variable on document element for hardware accelerated parallax transitions
    document.documentElement.style.setProperty('--scroll-y', scrollTop);
    
    if (scrollProgressBar) {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) : 0;
      
      // Update progress bar scaleX for GPU accelerated translation
      scrollProgressBar.style.transform = `scaleX(${progress})`;
    }
  };
  
  // Use passive listener for scroll and resize to avoid main thread blocking
  window.addEventListener('scroll', handleScrollProgress, { passive: true });
  window.addEventListener('resize', handleScrollProgress, { passive: true });
  
  // Initial call
  handleScrollProgress();

  // --- 10. Project Modal Detail Popup Logic ---
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-project-title');
  const modalDesc = document.getElementById('modal-project-desc');
  const modalLanguages = document.getElementById('modal-project-languages');
  const modalGithub = document.getElementById('modal-project-github');
  const modalDemo = document.getElementById('modal-project-demo');
  const modalClose = modal?.querySelector('.modal-close');
  
  if (modal && modalClose) {
    // Project item click listeners (using event delegation on carousel track)
    const track = document.querySelector('.carousel-track');
    if (track) {
      track.addEventListener('click', (e) => {
        // Find closest project card container
        const card = e.target.closest('.project-card');
        if (!card) return;
        
        // Prevent modal if user clicked the GitHub link directly on the card
        if (e.target.closest('.project-link-icon')) {
          return;
        }
        
        // Extract project details from HTML dataset attributes
        const itemContainer = card.closest('.carousel-item');
        if (!itemContainer) return;
        
        const title = itemContainer.getAttribute('data-title');
        const desc = itemContainer.getAttribute('data-desc');
        const languagesStr = itemContainer.getAttribute('data-languages');
        const github = itemContainer.getAttribute('data-github');
        const demo = itemContainer.getAttribute('data-demo');
        const glowColor = itemContainer.getAttribute('data-glow') || '#00e5ff';
        
        // Populate modal data
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        
        // Populate tech tags
        modalLanguages.innerHTML = '';
        if (languagesStr) {
          languagesStr.split(',').forEach(tag => {
            const span = document.createElement('span');
            span.classList.add('project-tag');
            span.textContent = tag.trim();
            modalLanguages.appendChild(span);
          });
        }
        
        // Glow bar accent styling matching the specific card color
        const modalGlowBar = modal.querySelector('.modal-glow-bar');
        if (modalGlowBar) {
          modalGlowBar.style.background = glowColor;
          modalGlowBar.style.boxShadow = `0 0 12px ${glowColor}`;
        }
        
        // Configure repository link
        if (github) {
          modalGithub.href = github;
          modalGithub.style.display = 'inline-flex';
        } else {
          modalGithub.style.display = 'none';
        }
        
        // Configure live demo link (if available)
        if (demo) {
          modalDemo.href = demo;
          modalDemo.style.display = 'inline-flex';
        } else {
          modalDemo.style.display = 'none';
        }
        
        // Open modal
        modal.classList.add('open');
        document.body.style.overflow = 'hidden'; // Lock scrolling
      });
    }
    
    // Close modal listener
    modalClose.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = ''; // Unlock scrolling
    });
    
    // Close modal when clicking outside container
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
    
    // Close modal on Escape press
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // --- 11. Modern Directional Scroll Reveal (In-Out) Observer ---
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (revealElements.length > 0) {
    // Desktop layout allows full entering/exiting, mobile locks elements after entrance to optimize GPU rendering
    const isMobile = window.innerWidth < 768;
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          entry.target.classList.remove('exit-to-top', 'exit-to-bottom');
        } else {
          // If not mobile, dynamic toggle in-out scroll directions
          if (!isMobile) {
            entry.target.classList.remove('in-view');
            const rect = entry.boundingClientRect;
            const isAbove = rect.top < 0;
            if (isAbove) {
              entry.target.classList.add('exit-to-top');
              entry.target.classList.remove('exit-to-bottom');
            } else {
              entry.target.classList.add('exit-to-bottom');
              entry.target.classList.remove('exit-to-top');
            }
          }
        }
      });
    }, {
      root: null,
      rootMargin: isMobile ? '0px 0px -5% 0px' : '0px 0px -10% 0px', // Trigger with slight margin offset
      threshold: isMobile ? 0.01 : 0.05
    });
    
    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  }

  // --- 12. Stitch MCP Loader Animation ---
  const loaderScreen = document.getElementById('loader-screen');
  const skipBtn = document.getElementById('loader-skip');
  const terminalLog = document.getElementById('loader-terminal-log');
  
  if (loaderScreen && terminalLog) {
    const logs = [
      { text: "> mcp_server_client init --target stitch", type: "info" },
      { text: "Connecting: https://stitch.googleapis.com/mcp ...", type: "info" },
      { text: "Headers: { X-Goog-Api-Key: 'AQ.Ab8RN6LHBnQy...4kCEiHH' }", type: "info" },
      { text: "Sending authorization handshake query...", type: "info" },
      { text: "[Stitch] Handshake OK. Protocol Version: 2024-11-05", type: "success" },
      { text: "[Stitch] Status: 200 (AUTHORIZED)", type: "success" },
      { text: "[Stitch] Capabilities: { tools: true, resources: true }", type: "success" },
      { text: "[Stitch] Querying tool registry catalog...", type: "info" },
      { text: "[Stitch] Loaded tool: web_search (Web Search)", type: "success" },
      { text: "[Stitch] Loaded tool: read_url_content (HTTP Reader)", type: "success" },
      { text: "[Stitch] Loaded tool: run_command (Terminal Executor)", type: "success" },
      { text: "[Stitch] Loaded tool: ask_question (User Prompter)", type: "success" },
      { text: "Connection stable. Booting portfolio elements...", type: "info" },
      { text: "Loading custom design assets (Space Grotesk)... Done", type: "success" },
      { text: "Initializing interactive mesh overlays... Done", type: "success" },
      { text: "Stitch MCP Active. Handing over to user...", type: "success" }
    ];
    
    let logIndex = 0;
    
    function addLogLine() {
      if (logIndex < logs.length) {
        const item = logs[logIndex];
        const row = document.createElement('div');
        row.className = `terminal-row ${item.type}`;
        row.textContent = item.text;
        terminalLog.appendChild(row);
        terminalLog.scrollTop = terminalLog.scrollHeight;
        
        logIndex++;
        
        // Organic organic delay speed based on log type
        const delay = item.type === 'success' ? 80 : 150 + Math.random() * 120;
        setTimeout(addLogLine, delay);
      } else {
        // Handshake completed, exit screen
        setTimeout(dismissLoader, 600);
      }
    }
    
    function dismissLoader() {
      if (loaderScreen.classList.contains('fade-out')) return;
      loaderScreen.classList.add('fade-out');
      document.body.classList.remove('loading');
      
      // Trigger scroll reveals after exit
      setTimeout(() => {
        const heroSection = document.getElementById('hero');
        if (heroSection) heroSection.classList.add('in-view');
      }, 300);
    }
    
    // Start logging sequence
    setTimeout(addLogLine, 400);
    
    // Skip Button Handler
    if (skipBtn) {
      skipBtn.addEventListener('click', dismissLoader);
    }
  }
});

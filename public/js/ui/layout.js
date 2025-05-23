// src/ui/layout.js
// Purpose: Handles general layout adjustments (drag bars) and the initial loading screen.

// DOM Elements specific to layout
const loadingScreen = document.getElementById('loading-screen');
const mainContent = document.getElementById('main-content');
const dragBar = document.getElementById('drag-bar');
const projectsDragBar = document.getElementById('projects-drag-bar');
const footerDragHandle = document.getElementById('footer-drag-handle');
const mainPanel = document.getElementById('main-panel');
const projectsPanel = document.getElementById('projects-panel');
const rightPanel = document.getElementById('right-panel');
const container = document.querySelector('.container');
const footer = document.querySelector('footer');
const chatContainer = document.getElementById('chat-container');

/**
 * Initializes the drag bar functionality for resizing panels.
 */
export function initDragBar() {
    if (!dragBar || !mainPanel || !projectsPanel || !rightPanel || !container) {
        console.warn("Drag bar elements not found, skipping initialization.");
        return;
    }
    
    // Initialize the footer drag handle if it exists
    if (footerDragHandle && footer && chatContainer) {
        initFooterDragHandle();
    } else {
        console.warn("Footer drag elements not found, skipping initialization.");
    }

    // Initialize the projects drag bar if it exists
    if (projectsDragBar) {
        initProjectsDragBar();
    } else {
        console.warn("Projects drag bar not found, skipping initialization.");
    }

    let dragging = false;
    let startX, startRightPanelWidth; // For desktop horizontal drag
    let startY, startMainPanelHeight; // For mobile vertical drag (if needed)
    let isMobile = window.innerWidth <= 768;

    function checkMobileView() {
        isMobile = window.innerWidth <= 768;
        // Adjust cursor based on orientation (assuming horizontal for desktop, vertical for mobile)
        dragBar.style.cursor = isMobile ? 'ns-resize' : 'ew-resize';
        if (projectsDragBar) {
            projectsDragBar.style.cursor = isMobile ? 'ns-resize' : 'ew-resize';
        }
        // Reset styles if switching views to avoid conflicts
        // mainPanel.style.height = '';
        // rightPanel.style.width = '';
    }

    checkMobileView(); // Initial check
    window.addEventListener('resize', checkMobileView); // Update on resize

    dragBar.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Prevent text selection during drag
        dragging = true;
        startX = e.clientX;
        startY = e.clientY; // Capture vertical start too
        startRightPanelWidth = rightPanel.offsetWidth;
        startMainPanelHeight = mainPanel.offsetHeight; // Capture start height
        document.body.style.userSelect = 'none'; // Prevent selection globally
        document.body.style.cursor = isMobile ? 'ns-resize' : 'ew-resize'; // Set cursor globally
    });

    document.addEventListener('mousemove', (e) => {
        if (!dragging) return;

        if (isMobile) {
            // Vertical resizing for mobile view (adjust main panel height)
            const deltaY = e.clientY - startY;
            let newMainPanelHeight = startMainPanelHeight + deltaY;
            // Define reasonable min/max heights (adjust as needed)
            const minHeight = 150;
            const maxHeight = container.offsetHeight - (projectsPanel.offsetHeight + 50); // Leave some space

            newMainPanelHeight = Math.max(minHeight, Math.min(newMainPanelHeight, maxHeight));
            mainPanel.style.height = `${newMainPanelHeight}px`;

        } else {
            // Horizontal resizing for desktop view (adjust right panel width)
            const deltaX = e.clientX - startX;
            let newRightPanelWidth = startRightPanelWidth - deltaX;
            // Define reasonable min/max widths (adjust as needed)
            const minWidth = 300;
            // Ensure projects panel + main panel min width don't exceed container
            const maxWidth = container.offsetWidth - (projectsPanel.offsetWidth + 400); // Min main panel width

            newRightPanelWidth = Math.max(minWidth, Math.min(newRightPanelWidth, maxWidth));
            rightPanel.style.width = `${newRightPanelWidth}px`;
            // Let flexbox handle the main panel width adjustment:
            // mainPanel.style.width = `calc(100% - ${projectsPanel.offsetWidth}px - ${newRightPanelWidth}px - ${dragBar.offsetWidth}px)`;
        }
    });

    document.addEventListener('mouseup', () => {
        if (dragging) {
            dragging = false;
            document.body.style.userSelect = ''; // Restore selection
            document.body.style.cursor = ''; // Restore cursor
        }
    });

    console.log("Drag bar initialized.");
}

/**
 * Initializes the footer drag handle for resizing the message input area.
 */
function initFooterDragHandle() {
    let dragging = false;
    let startY, startFooterHeight;
    
    // Store the initial footer height in a CSS variable
    const initialFooterHeight = footer.offsetHeight;
    document.documentElement.style.setProperty('--footer-height', `${initialFooterHeight}px`);
    
    footerDragHandle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        dragging = true;
        startY = e.clientY;
        startFooterHeight = footer.offsetHeight;
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'ns-resize';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!dragging) return;

        // Calculate the new footer height based on mouse movement
        // Moving up decreases footer height, moving down increases it
        const deltaY = startY - e.clientY;
        let newFooterHeight = startFooterHeight + deltaY;

        // Set reasonable min/max constraints
        const minHeight = 220; // Increased minimum footer height
        const maxHeight = Math.min(window.innerHeight * 0.8, 1000); // Max 80% of viewport height or 1000px

        newFooterHeight = Math.max(minHeight, Math.min(newFooterHeight, maxHeight));

        // Use requestAnimationFrame for smoother visual updates
        requestAnimationFrame(() => {
            // Update the footer height
            footer.style.height = `${newFooterHeight}px`;
            
            // Explicitly adjust chat container to maintain balance
            if (chatContainer) {
                // Allow the chat container to shrink as footer grows
                const mainPanelHeight = mainPanel.offsetHeight;
                const headerHeight = document.getElementById('chat-header')?.offsetHeight || 0;
                const footerHandleHeight = footerDragHandle?.offsetHeight || 0;
                const availableHeight = mainPanelHeight - headerHeight - footerHandleHeight - newFooterHeight;
                chatContainer.style.height = `${Math.max(100, availableHeight)}px`;
            }

            // Update CSS variable to store the value
            document.documentElement.style.setProperty('--footer-height', `${newFooterHeight}px`);
        });
    });
    
    document.addEventListener('mouseup', () => {
        if (dragging) {
            dragging = false;
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
        }
    });
    
    console.log("Footer drag handle initialized.");
}

/**
 * Initializes the projects panel drag bar for resizing the projects panel width.
 */
function initProjectsDragBar() {
    let dragging = false;
    let startX, startProjectsPanelWidth;
    
    // Store the initial projects panel width in a CSS variable
    const initialProjectsPanelWidth = projectsPanel.offsetWidth;
    document.documentElement.style.setProperty('--projects-panel-width', `${initialProjectsPanelWidth}px`);
    
    projectsDragBar.addEventListener('mousedown', (e) => {
        e.preventDefault();
        dragging = true;
        startX = e.clientX;
        startProjectsPanelWidth = projectsPanel.offsetWidth;
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'ew-resize';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!dragging) return;

        // Calculate the new projects panel width based on mouse movement
        const deltaX = e.clientX - startX;
        let newProjectsPanelWidth = startProjectsPanelWidth + deltaX;
        
        // Set reasonable min/max constraints
        const minWidth = 200; // Minimum projects panel width
        const maxWidth = Math.min(window.innerWidth * 0.4, 500); // Max 40% of viewport width or 500px
        
        newProjectsPanelWidth = Math.max(minWidth, Math.min(newProjectsPanelWidth, maxWidth));
        
        // Use requestAnimationFrame for smoother visual updates
        requestAnimationFrame(() => {
            // Update the projects panel width
            projectsPanel.style.width = `${newProjectsPanelWidth}px`;
            
            // Update CSS variable to store the value
            document.documentElement.style.setProperty('--projects-panel-width', `${newProjectsPanelWidth}px`);
        });
    });
    
    document.addEventListener('mouseup', () => {
        if (dragging) {
            dragging = false;
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
        }
    });
    
    console.log("Projects panel drag bar initialized.");
}

/**
 * Hides the loading screen and reveals the main application content.
 */
export function hideLoading() {
    if (loadingScreen && mainContent) {
        loadingScreen.style.opacity = '0';
        mainContent.classList.add('loaded'); // Add class for potential content animation

        // Remove loading screen from DOM after transition
        loadingScreen.addEventListener('transitionend', () => {
            loadingScreen.style.display = 'none';
        }, { once: true }); // Ensure listener runs only once

        console.log("Loading screen hidden.");
    } else {
        console.warn("Loading screen or main content element not found.");
        // Fallback: Ensure main content is visible even if loading screen isn't found
        if(mainContent) mainContent.style.opacity = '1';
    }
}
// Yandex.Metrika Goal Tracking
// This file is not processed by 11ty - it's copied as-is to the public directory

(function() {
    'use strict';
    
    // Wait for page to be fully loaded
    function waitForPageLoad() {
        if (document.readyState === 'complete') {
            initTracking();
        } else {
            window.addEventListener('load', initTracking);
        }
    }
    
    // Initialize tracking
    function initTracking() {
        // Wait for Yandex.Metrika to be available
        function waitForYM() {
            if (typeof ym !== 'undefined') {
                setupTracking();
            } else {
                setTimeout(waitForYM, 100);
            }
        }
        
        waitForYM();
    }
    
    // Setup all tracking
    function setupTracking() {
        console.log('Setting up Yandex.Metrika tracking...');
        
        // Track scroll 75% (one time only)
        setupScrollTracking();
        
        // Track contact link clicks
        setupLinkTracking();
        
        // Track form submissions
        setupFormTracking();
        
        console.log('Yandex.Metrika tracking initialized successfully');
    }
    
    // Scroll tracking
    function setupScrollTracking() {
        var fired = false;
        
        function checkScroll() {
            var st = window.pageYOffset || document.documentElement.scrollTop;
            var dh = Math.max(
                document.body.scrollHeight, document.documentElement.scrollHeight,
                document.body.offsetHeight, document.documentElement.offsetHeight,
                document.body.clientHeight, document.documentElement.clientHeight
            );
            var wh = window.innerHeight || document.documentElement.clientHeight;
            
            if (!fired && (st + wh) / dh >= 0.75) {
                fired = true;
                console.log('75% scroll reached - sending goal');
                sendGoal('scroll_75');
                window.removeEventListener('scroll', onScroll);
            }
        }
        
        function onScroll() {
            if (onScroll._t) return;
            onScroll._t = setTimeout(function() { 
                onScroll._t = null; 
                checkScroll(); 
            }, 200);
        }
        
        window.addEventListener('scroll', onScroll);
        checkScroll();
    }
    
    // Link tracking
    function setupLinkTracking() {
        // Phone links
        var phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                console.log('Phone link clicked - sending goal');
                sendGoal('click_phone');
            });
        });
        
        // Telegram links
        var tgLinks = document.querySelectorAll('a[href*="t.me"], a[href*="telegram"]');
        tgLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                console.log('Telegram link clicked - sending goal');
                sendGoal('click_tg');
            });
        });
        
        // WhatsApp links
        var waLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
        waLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                console.log('WhatsApp link clicked - sending goal');
                sendGoal('click_whatsapp');
            });
        });
    }
    
    // Form tracking - REMOVED automatic goal firing
    // Goals will now be fired only after successful Supabase submission
    function setupFormTracking() {
        // Form tracking is now handled in the main form submission logic
        // after successful database insertion
        console.log('Form tracking setup - goals will fire only on successful submission');
    }
    
    // Send goal to Yandex.Metrika
    function sendGoal(goalName) {
        try {
            console.log('Sending goal to Yandex.Metrika:', {
                counterId: 104622942,
                goalName: goalName,
                timestamp: new Date().toISOString()
            });
            
            ym(104622942, 'reachGoal', goalName);
            console.log('Goal "' + goalName + '" sent successfully');
            
            // Also try to send via dataLayer for debugging
            if (typeof dataLayer !== 'undefined') {
                dataLayer.push({
                    'event': 'yandex_metrika_goal',
                    'goal_name': goalName,
                    'counter_id': 104622942
                });
                console.log('Goal also sent via dataLayer');
            }
            
        } catch (e) {
            console.error('Error sending goal "' + goalName + '":', e);
        }
    }
    
    // Start the tracking
    waitForPageLoad();
    
})();

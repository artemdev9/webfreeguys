// Vercel Analytics - Browser Compatible Version
// Based on @vercel/analytics v1.5.0

// Initialize the analytics queue
var initQueue = () => {
  if (window.va) return;
  window.va = function a(...params) {
    (window.vaq = window.vaq || []).push(params);
  };
};

// Browser detection
function isBrowser() {
  return typeof window !== "undefined";
}

// Environment detection - browser compatible
function detectEnvironment() {
  // In browser, assume production unless localhost
  if (typeof window !== "undefined" && window.location) {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return "development";
    }
  }
  return "production";
}

// Set mode
function setMode(mode = "auto") {
  if (mode === "auto") {
    window.vam = detectEnvironment();
    return;
  }
  window.vam = mode;
}

// Get mode
function getMode() {
  return window.vam || "production";
}

// Inject analytics script
function inject() {
  if (!isBrowser()) return;
  initQueue();
  setMode();
  
  // Only inject the Vercel script in production (when deployed to Vercel)
  const mode = getMode();
  if (mode === "production") {
    const script = document.createElement("script");
    script.src = "/_vercel/insights/script.js";
    script.defer = true;
    document.head.appendChild(script);
  } else {
    // In development, just initialize the queue for testing
    console.log("Vercel Analytics: Development mode - script will be injected in production");
  }
}

// Track events
function track(event, properties) {
  if (!isBrowser()) return;
  initQueue();
  window.va("event", { name: event, properties });
}

// Page view tracking
function pageview(route, path) {
  if (!isBrowser()) return;
  initQueue();
  window.va("pageview", { route, path });
}

// Compute route
function computeRoute() {
  if (!isBrowser()) return "/";
  return window.location.pathname + window.location.search;
}

// Auto-inject when script loads
if (isBrowser()) {
  inject();
}
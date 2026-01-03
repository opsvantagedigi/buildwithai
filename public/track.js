// public/track.js

(function () {
  // --- CONFIG -------------------------------------------------------------

  // The publisher will inject this into the HTML of each published site.
  // Example: <script>window.__SITE_ID__ = "abc123"</script>
  const siteId = window.__SITE_ID__;
  if (!siteId) {
    console.warn("track.js: Missing window.__SITE_ID__");
    return;
  }

  const TRACK_ENDPOINT = "/api/track";

  // --- SESSION ------------------------------------------------------------

  // Generate or load a persistent session ID
  let sessionId = localStorage.getItem("bw_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("bw_session_id", sessionId);
  }

  // Send session start once per session
  if (!sessionStorage.getItem("bw_session_started")) {
    sessionStorage.setItem("bw_session_started", "1");
    sendEvent({
      type: "session_start",
      sessionId,
    });
  }

  // Send session end on unload
  window.addEventListener("beforeunload", () => {
    sendEvent({
      type: "session_end",
      sessionId,
    });
  });

  // --- CORE SEND FUNCTION -------------------------------------------------

  function sendEvent(payload) {
    const body = JSON.stringify({
      siteId,
      sessionId,
      path: location.pathname,
      referrer: document.referrer || null,
      ...payload,
    });

    // Prefer sendBeacon for reliability
    if (navigator.sendBeacon) {
      navigator.sendBeacon(TRACK_ENDPOINT, body);
    } else {
      fetch(TRACK_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      });
    }
  }

  // --- PAGEVIEW -----------------------------------------------------------

  function trackPageview() {
    sendEvent({ type: "pageview" });
  }

  // Track initial load
  trackPageview();

  // Track navigation for SPA-like behavior
  let lastPath = location.pathname;
  setInterval(() => {
    if (location.pathname !== lastPath) {
      lastPath = location.pathname;
      trackPageview();
    }
  }, 500);

  // --- HEATMAP EVENTS -----------------------------------------------------

  // Click tracking
  window.addEventListener("click", (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    sendEvent({
      type: "heatmap_click",
      x,
      y,
    });
  });

  // Mouse movement (throttled)
  let lastMove = 0;
  window.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastMove < 200) return;
    lastMove = now;

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    sendEvent({
      type: "heatmap_move",
      x,
      y,
    });
  });

  // --- FUNNEL + CONVERSION API -------------------------------------------

  // Global API for builder‑defined events
  window.BWAnalytics = {
    conversion(goal, value) {
      sendEvent({
        type: "conversion",
        goal,
        value,
      });
    },

    funnelStep(funnelId, stepId) {
      sendEvent({
        type: "funnel_step",
        funnelId,
        stepId,
      });
    },
  };
})();

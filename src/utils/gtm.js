/**
 * Google Tag Manager utility functions
 */

/**
 * Load Google Analytics script
 * Should only be called after user consent is granted
 */
export const loadGoogleAnalytics = () => {
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-4BLR5M35JS';
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  
  gtag('js', new Date());
  gtag('config', 'G-4BLR5M35JS');
};

/**
 * Update consent status for ad storage
 */
export const grantAdStorageConsent = () => {
  if (!window.gtag) return;
  
  window.gtag('consent', 'update', {
    'ad_storage': 'granted',
    'ad_user_data': 'granted',
    'ad_personalization': 'granted',
    'analytics_storage': 'granted',
  });
};

/**
 * Deny all consent
 */
export const denyConsent = () => {
  if (!window.gtag) return;
  
  window.gtag('consent', 'update', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
  });
};

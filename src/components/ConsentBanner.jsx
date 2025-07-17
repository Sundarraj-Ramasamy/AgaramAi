import React, { useEffect, useState } from "react";
import { Banner, ConsentButton, CancelButton } from "../styles/ConsentBanner.styles";

const ConsentBanner = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  // Define consent update function
  const consentGrantedAdStorage = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    gtag('consent', 'update', {
      'ad_storage': 'granted'
    });
  };

  // Google tag manager script
  useEffect(() => {
    const script2 = document.createElement("script");
    script2.async = true;
    script2.src = "https://www.googletagmanager.com/gtag/js?id=G-4BLR5M35JS";
    document.head.appendChild(script2);

    const script3 = document.createElement("script");
    script3.text = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){ window.dataLayer.push(arguments); }

      gtag('js', new Date());
      gtag('config', 'TAG_ID');
    `;
    document.head.appendChild(script3);

    // Set default consent
    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    gtag('consent', 'default', {
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'analytics_storage': 'denied'
    });
  }, []);

  useEffect(() => {
    // Read the cookie value to determine the initial state
    const consentCookie = getCookie("consent-banner-visible");
    if (consentCookie === null) {
      setIsBannerVisible(true);
    }
  }, []);

  const handleConsent = () => {
    // Invoke Google consent functions
    consentGrantedAdStorage();
    // Hide the consent banner and store the value in a cookie
    setIsBannerVisible(false);
    setCookie("consent-banner-visible", "false", 365);
  };

  const handleCancel = () => {
    // Hide the consent banner without giving consent
    setIsBannerVisible(false);
  };

  return (
    isBannerVisible && (
      <Banner>
        We use cookies and other tracking technologies to improve your browsing
        experience on our website. By interacting with this banner, you consent
        to our use of these technologies.
        <ConsentButton onClick={handleConsent}>Accept</ConsentButton>
        <CancelButton onClick={handleCancel}>Cancel</CancelButton>
      </Banner>
    )
  );
};

// Helper functions to set and get cookies
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export default ConsentBanner;

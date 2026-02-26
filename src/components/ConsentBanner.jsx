import React, { useEffect, useState } from "react";
import { Banner, ConsentButton, CancelButton } from "../styles/ConsentBanner.styles";
import { setCookie, getCookie } from "../utils/cookies";
import { loadGoogleAnalytics, grantAdStorageConsent, denyConsent } from "../utils/gtm";

const ConsentBanner = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  // Initialize Google Tag Manager
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    
    // Set default consent to denied
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    
    gtag('consent', 'default', {
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'analytics_storage': 'denied'
    });
  }, []);

  // Check if user has already made a consent choice
  useEffect(() => {
    const consentCookie = getCookie("consent-banner-visible");
    if (consentCookie === null) {
      setIsBannerVisible(true);
    }
  }, []);

  const handleConsent = () => {
    // Grant consent and load analytics
    grantAdStorageConsent();
    loadGoogleAnalytics();
    
    // Hide the banner and store the choice
    setIsBannerVisible(false);
    setCookie("consent-banner-visible", "granted", 365);
  };

  const handleCancel = () => {
    // Deny consent
    denyConsent();
    
    // Hide banner and store the choice
    setIsBannerVisible(false);
    setCookie("consent-banner-visible", "denied", 365);
  };

  return (
    isBannerVisible && (
      <Banner role="banner" aria-label="Cookie consent banner">
        <p>We use cookies and other tracking technologies to improve your browsing experience on our website. By interacting with this banner, you consent to our use of these technologies.</p>
        <ConsentButton onClick={handleConsent}>Accept</ConsentButton>
        <CancelButton onClick={handleCancel}>Cancel</CancelButton>
      </Banner>
    )
  );
};

export default ConsentBanner;

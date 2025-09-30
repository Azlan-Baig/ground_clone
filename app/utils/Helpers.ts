export const processData = (obj: any) => {
  const dataObj: any = {};
  for (const key in obj) {
    dataObj[key] = obj[key];
  }
  const result = {
    _type: obj._type,
    data: dataObj,
  };
  return result;
};

declare global {
  interface Window {
    dataLayer: any[];
  }
}


export const trackFileDownload = (event: string, fileName: string, fileExtension: string, fileUrl: string, fileLanguage: string) => {
  if (window && typeof window !== 'undefined' && window?.dataLayer) {
    window.dataLayer.push({
      event: event,
      custom_event_name: 'file_download',
      file_name: fileName,
      file_extension: fileExtension,
      file_url: fileUrl,
      file_language: fileLanguage,
    });
  } else {
    console.error('GTM not initialized or dataLayer not available.');
  }
};


export const trackVideoOpenEvent = (event: string, status: string, title: string, eventName: string, url: string, language: string) => {
  window.dataLayer.push({
    event: event,
    video_status: status,
    video_title: title,
    custom_event_name: eventName,
    video_url: url,
    video_language: language
  });
};

export const trackVideoEndEvent = (event: string, status: string, title: string, eventName: string,  url: string, language: string) => {
  window.dataLayer.push({
    event: event,
    video_status: status,
    video_title: title,
    custom_event_name: eventName,
    video_url: url,
    video_language: language
  });
};

export const trackVideoEvent = (event: string, status: string, duration: number, eventName: string,  title: string, url: string, currentTime: string, language: string) => {
  window.dataLayer.push({
    event: event,
    video_status: status,
    video_duration: duration.toString(),
    custom_event_name: eventName,
    video_title: title,
    video_url: url,
    video_currentTime: currentTime,
    video_language: language
  });
};


export const trackVideoEventByPercentage = (event: string, status: string, percent: string, eventName: string, duration: number, title: string, url: string, currentTime: string, language: string) => {
  window.dataLayer.push({
    event: event,
    video_status: status,
    video_percent: percent,
    custom_event_name: eventName,
    video_duration: duration.toString(),
    video_title: title,
    video_url: url,
    video_currentTime: currentTime,
    video_language: language
  });
};

export const trackSocialClick = (socialName: string) => {
  if (typeof window !== "undefined" && window?.dataLayer) {
    window.dataLayer.push({
      event: "eventTracker",
      custom_event_name: "social_link_clicks",
      social_tag_name: socialName,
    });
  } else {
    console.error("GTM not initialized or dataLayer not available.");
  }
};

export const trackNavigationClick = (navName: string) => {
  if (typeof window !== "undefined" && window?.dataLayer) {
    window.dataLayer.push({
      event: "eventTracker",
      custom_event_name: "navigation_main",
      navigation_cta_name: navName,
    });
  } else {
    console.error("GTM not initialized or dataLayer not available.");
  }
};

export const trackPageView = (
  pageTitle: string,
  pageUrl: string,
  pageType: string,
  locale: string
) => {
  if (typeof window !== "undefined" && window?.dataLayer) {
    window.dataLayer.push({
      page_title: pageTitle,
      page_url: pageUrl,
      page_type: pageType,
      locale: locale,
    });
  } else {
    console.error("GTM not initialized or dataLayer not available.");
  }
};

export const formatCustomDate = (dateStr: string, locale: string = "en") => {
  const date = new Date(dateStr);

  const formatter = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const parts = formatter.formatToParts(date);

  const day = parts.find((p) => p.type === "day")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  const year = parts.find((p) => p.type === "year")?.value;

  return `${day} ${month}, ${year}`;
};

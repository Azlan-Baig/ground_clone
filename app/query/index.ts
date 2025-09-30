export const enQuery = `*[_type == "page"] {
  sections[] {
     _type == "header" => {
        _type,
        "logo": logo.asset->url,
        "logoLqip": logo.asset->metadata.lqip,
        menu[]{
          'title':title['en'],
          'key': sectionType,
          customUrlEnable,
          'href' :  select(customUrlEnable == true => href.en, null),
          "icon": select(customUrlEnable == true => icon.asset-> url, null),
          "iconLqip" : icon.asset->metadata.lqip,
        }, 
        languages[] {
          title,
          code
        },
      cta{
        "title": title['en'],
        customUrlEnable,
        'href' :  select(customUrlEnable == true => href.en, null),
        "slug": page->slug.current,
      },
          socialLinks[] {
          name,
          "icon": icon.asset->url,
          "iconLqip" : icon.asset->metadata.lqip,          
          "url": url,
          "isAnchorBlank": isAnchorBlank
        },
        "copyRightText": copyRightText['en']
     },
      _type == "bannerSection" => {
         _type,
        "title": title['en'],
        "subtitle": subtitle['en'],
        "desktopSrc": desktopSrc.asset->url,
        "desktopSrcLqip": desktopSrc.asset->metadata.lqip,
        "mobileSrc": mobileSrc.asset->url,
        "mobileSrcLqip": mobileSrc.asset->metadata.lqip,
        "video": backgroundVideoDesktop['en'].asset->url,
        "backgroundVideoMobile": backgroundVideoMobile['en'].asset->url,
      },
      _type == "aboutSection" => {
        _type,
        "title": title['en'],
        "description": description['en'],
      },
      _type == "leadershipMessageSection" => {
          _type,
          "title": title['en'],
          author[]{
            "title": title['en'],
            "name": name['en'],
            "designation": designation['en'],
            "content":content['en'],
            "image": image.asset->url,
            "imageLqip": image.asset->metadata.lqip,
            "imageMobile": imageMobile.asset->url,
            "imageMobileLqip": imageMobile.asset->metadata.lqip,
          }
        },
      _type == "journeySection" => {
        _type,
        "title": title['en'],
        "subtitle": subtitle['en'],
        "image": image.asset->url,
        "mobileImage": mobileImage.asset->url,
        "stats": stats[]{
          "title": title['en'],
          "subtitle": subtitle['en'],
        },
        "content":content['en'],
      },
      _type == "investmentTimeline" => {
        _type,
        "title": title['en'],
        "titleHighlight": titleHighlight['en'],
        "image": image.asset->url,
        highlights[]{
          ...,
          "title": title['en'],
          "description": description['en'],
        },
        "stats": stats[]{
          "title": title['en'],
          date,
        }
      },
      _type == "teamSection" => {
        _type,
        "title": title['en'],
        "closeButtonText": closeButtonText['en'],
        teams[]{
          "title":title['en'],
          disableTeamPopup,
          teamMembers[]{
            "name": name['en'],
            "designation":designation['en'],
            "content":content['en'],
            "image": image.asset->url,
            "imageLqip": image.asset->metadata.lqip,
          }
        }
      },
     _type == "subscribeSection" => {
         _type,
        "title": title['en'],
        "backgroundVideo": backgroundVideo['en'].asset->url,
        "mobilePosterImage": mobilePosterImage.asset->url,
        "mobilePosterImageLqip": mobilePosterImage.asset->metadata.lqip,
        "desktopPosterImage": desktopPosterImage.asset->url,
        "desktopPosterImageLqip": desktopPosterImage.asset->metadata.lqip,
        cta{
          "title": title['en'],
           "video": video['en'].asset->url,
           "closeButton" : closeButton['en'],
        },
      },
      _type == "faqSection" => {
         _type,
        "title": title['en'],
        faqs[]{
          ...,
          "title": title['en'],
          "description": description['en'],
        },
      },
      _type == "resourceSection" => {
        _type,
        "title": title['en'],
        items[]{
            ...,
            "title": title['en'],
            date,
            "file": file['en'].asset->url,
            "fileName": file['en'].asset->originalFilename,
        }
      },
     _type == "financialAdvisors"=> {
        _type,
        "heading" : heading['en'],
        "title": title['en'],
        advisors[] {
          "title": title['en'],
          isSlider,
          items[] {
            "image": image.asset->url,
            "imageLqip": image.asset->metadata.lqip,
            "emailLabel": emailLabel['en'],
            email,
            "websiteLabel": websiteLabel['en'],
            website
          }
        },
      },
      _type == "footer" => {
         _type,
         "logo" : logo.asset->url,
         "logoLqip": logo.asset->metadata.lqip,
         "description" : description['en'],
        "items": items[] {
          "image": logo.asset->url,
          "emailLabel" : emailLabel['en'],
          "email": email,
          "websiteLabel": websiteLabel['en'],
          "website": websiteUrl,
        },
        socialLinks[] {
          name,
          "icon": icon.asset->url,
          "iconLqip": icon.asset->metadata.lqip,
          "url": url,
          "isAnchorBlank": isAnchorBlank
        },
        "copyRightText": copyRightText['en']
    },
_type == "companyOverviewSection" => {
         _type,
         "heading" : heading['en'],
         "title" : title['en'],
         "description" : description['en'],
         "image": image.asset->url,
         "imageLqip": image.asset->metadata.lqip,
         "imageMobile": imageMobile.asset->url,
         "imageMobileLqip": imageMobile.asset->metadata.lqip,
    },
  _type == "aboutTheIpo" => {
         _type,
         "heading" : heading['en'],
         "title" : title['en'],
         "description" : description['en'],
         "bottomText" : bottomText['en'],
         "image": image.asset->url,
         "imageLqip": image.asset->metadata.lqip,
         "imageMobile": imageMobile.asset->url,
         "imageMobileLqip": imageMobile.asset->metadata.lqip,
         items[]{
          "title": title['en'],
             isCounterEnable,          
          "value": value['en'],
          "preFix": preFix['en'],
          "postFix": postFix['en'],
         },
        },        
  _type == "investmentSection" => {
         _type,
         "heading": heading['en'],
         "highlights": highlights[]{
          ...,
          "title": title['en'],
          "description": description['en'],
        },
    },        
  _type == "awardsSection" => {
         _type,
         "heading" : heading['en'],
         "cards": cards[]{
          ...,
          "image": image.asset->url,
          "description": description['en'],
        },
    },
   _type == "pioneerSection" => {
      _type,
      "heading": heading['en'],
      "title": title['en'],
      "description": description['en'],
      "image": image.asset->url,
      "imageLqip": image.asset->metadata.lqip,
      "imageMobile": imageMobile.asset->url,
      "imageMobileLqip": imageMobile.asset->metadata.lqip,
      "items": items[]{
        ...,
        "title": title['en'],
        "description": description['en'],
      }
    },
      _type == "keyFiguresSection" => {
          _type,
          "heading": heading['en'],
          "title": title['en'],
          "items": items[]{
            "image": image.asset->url,
            "imageLqip": image.asset->metadata.lqip,
            "title": title['en'],
            "isPreTextSmall" : isPreTextSmall,
            "isPreTextRiyal" : preText['isRiyalEn'],
             "preText": preText['en'],
             isCounterEnable,
            "text" : text['en'],
            "isPostTextSmall": isPostTextSmall,
            "isPostTextRiyal" : postText['isRiyalEn'],            
             "postText": postText['en'],
      },
  },    
      _type == "sectorExpertiseSection" => {
          _type,
          "heading": heading['en'],
          "title": title['en'],
          "description": description['en'],
          "items": items[]{
            "image": image.asset->url,
            "imageLqip": image.asset->metadata.lqip,
            "title" : title['en'],
            "subTitle": subTitle['en'],
            "representText": representText['en'],
            "coreText": coreText['en'],
             "preText": preText['en'],
            "text" : text['en'],
             "postText": postText['en'],
      },
  }, 
  _type == "timelineSection" => {
           _type,
          "title": title['en'],
          'stats': stats[]{
            "countText": countText['en'],
            "title": title['en'],
            date, 
            endDate,
            "subText": subText['en'],            
              },
            },
},
}[0]`;

export const arQuery = `*[_type == "page"] {
  sections[] {
     _type == "header" => {
        _type,
        "logo": logo.asset->url,
        "logoLqip": logo.asset->metadata.lqip,        
        menu[]{
          'title':title['ar'],
          'key': sectionType,
          customUrlEnable,
          'href' :  select(customUrlEnable == true => href.ar, null),
          "icon": select(customUrlEnable == true => icon.asset-> url, null),
          "iconLqip" : icon.asset->metadata.lqip,          
        }, 
        languages[] {
          title,
          code
        },
      cta{
        "title": title['ar'],
        customUrlEnable,
        'href' :  select(customUrlEnable == true => href.ar, null),
        "slug": page->slug.current,
      },
          socialLinks[] {
          name,
          "icon": icon.asset->url,
       "iconLqip" : icon.asset->metadata.lqip,              
          "url": url,
          "isAnchorBlank": isAnchorBlank
        },
        "copyRightText": copyRightText['ar']
     },
      _type == "bannerSection" => {
         _type,
        "title": title['ar'],
        "subtitle": subtitle['ar'],
        "desktopSrc": desktopSrc.asset->url,
        "desktopSrcLqip": desktopSrc.asset->metadata.lqip,        
        "mobileSrc": mobileSrc.asset->url,
        "mobileSrcLqip": mobileSrc.asset->metadata.lqip,              
        "video": backgroundVideoDesktop['ar'].asset->url,
        "backgroundVideoMobile": backgroundVideoMobile['ar'].asset->url,
      },
      _type == "aboutSection" => {
        _type,
        "title": title['ar'],
        "description": description['ar'],
      },
      _type == "leadershipMessageSection" => {
          _type,
          "title": title['ar'],
          author[]{
            "title": title['ar'],
            "name": name['ar'],
            "designation": designation['ar'],
            "content":content['ar'],
            "image": image.asset->url,
            "imageLqip": image.asset->metadata.lqip,            
            "imageMobile": imageMobile.asset->url,
            "imageMobileLqip": imageMobile.asset->metadata.lqip,            
          }
        },
      _type == "journeySection" => {
        _type,
        "title": title['ar'],
        "subtitle": subtitle['ar'],
        "image": image.asset->url,
        "mobileImage": mobileImage.asset->url,
        "stats": stats[]{
          "title": title['ar'],
          "subtitle": subtitle['ar'],
        },
        "content":content['ar'],
      },
      _type == "investmentTimeline" => {
        _type,
        "title": title['ar'],
        "titleHighlight": titleHighlight['ar'],
        "image": image.asset->url,
        highlights[]{
          ...,
          "title": title['ar'],
          "description": description['ar'],
        },
        "stats": stats[]{
          "title": title['ar'],
          date,
        }
      },
      _type == "teamSection" => {
        _type,
        "title": title['ar'],
        "closeButtonText": closeButtonText['ar'],
        teams[]{
          "title":title['ar'],
          disableTeamPopup,
          teamMembers[]{
            "name": name['ar'],
            "designation":designation['ar'],
            "content":content['ar'],
            "image": image.asset->url,
            "imageLqip": image.asset->metadata.lqip,            
          }
        }
      },
     _type == "subscribeSection" => {
         _type,
        "title": title['ar'],
        "backgroundVideo": backgroundVideo['ar'].asset->url,
        "mobilePosterImage": mobilePosterImage.asset->url,
        "mobilePosterImageLqip": mobilePosterImage.asset->metadata.lqip,        
        "desktopPosterImage": desktopPosterImage.asset->url,
        "desktopPosterImageLqip": desktopPosterImage.asset->metadata.lqip,        
        cta{
          "title": title['ar'],
           "video": video['ar'].asset->url,
           "closeButton" : closeButton['ar'],
        },
      },
      _type == "faqSection" => {
         _type,
        "title": title['ar'],
        faqs[]{
          ...,
          "title": title['ar'],
          "description": description['ar'],
        },
      },
      _type == "resourceSection" => {
        _type,
        "title": title['ar'],
        items[]{
            ...,
            "title": title['ar'],
            date,
            "file": file['ar'].asset->url,
            "fileName": file['ar'].asset->originalFilename,
        }
      },
     _type == "financialAdvisors"=> {
        _type,
        "heading" : heading['ar'],
        "title": title['ar'],
        advisors[] {
          "title": title['ar'],
          isSlider,
          items[] {
            "image": image.asset->url,
            "imageLqip": image.asset->metadata.lqip,            
            "emailLabel": emailLabel['ar'],
            email,
            "websiteLabel": websiteLabel['ar'],
            website
          }
        },
      },
      _type == "footer" => {
         _type,
         "logo" : logo.asset->url,
         "logoLqip": logo.asset->metadata.lqip,         
         "description" : description['ar'],         
        "items": items[] {
          "image": logo.asset->url,
           "emailLabel": emailLabel['ar'],
          "email": email,
          "websiteLabel": websiteLabel['en'],
          "website": websiteUrl,
        },
        socialLinks[] {
        name,
          "icon": icon.asset->url,
          "iconLqip": icon.asset->metadata.lqip,          
          "url": url,
          "isAnchorBlank": isAnchorBlank,
        },
        "copyRightText": copyRightText['ar'],
    },
              _type == "companyOverviewSection" => {
         _type,
         "heading" : heading['ar'],
         "title" : title['ar'],
         "description" : description['ar'],
         "image": image.asset->url,
         "imageLqip": image.asset->metadata.lqip,         
         "imageMobile": imageMobile.asset->url,
         "imageMobileLqip": imageMobile.asset->metadata.lqip,         
    },
      _type == "aboutTheIpo" =>  {
         _type,
         "heading" : heading['ar'],
         "title" : title['ar'],
         "description" : description['ar'],
         "bottomText" : bottomText['ar'],
         "image": image.asset->url,
         "imageLqip": image.asset->metadata.lqip,         
         "imageMobile": imageMobile.asset->url,
         "imageMobileLqip": imageMobile.asset->metadata.lqip,         
         items[]{
          "title": title['ar'],
             isCounterEnable,          
          "value": value['ar'],
          "preFix": preFix['ar'],
          "postFix": postFix['ar'],
         },
        }, 
  _type == "investmentSection" => {
         _type,
         "heading": heading['ar'],
         "highlights": highlights[]{
          ...,
          "title": title['ar'],
          "description": description['ar'],
        },
    },
      _type == "awardsSection" => {
         _type,
         "heading" : heading['ar'],
         "cards": cards[]{
          ...,
          "image": image.asset->url,
          "description": description['ar'],
        },
    },
         _type == "pioneerSection" => {
      _type,
      "heading": heading['ar'],
      "title": title['ar'],
      "description": description['ar'],
      "image": image.asset->url,
      "imageLqip": image.asset->metadata.lqip,      
      "imageMobile": imageMobile.asset->url,
      "imageMobileLqip": imageMobile.asset->metadata.lqip,      
      "items": items[]{
        ...,
        "title": title['ar'],
        "description": description['ar'],
      }
    },    
      _type == "keyFiguresSection" => {
          _type,
          "heading": heading['ar'],
          "title": title['ar'],
          "items": items[]{
            "image": image.asset->url,
            "imageLqip": image.asset->metadata.lqip,            
            "title": title['ar'],
            "isPreTextSmall": isPreTextSmall,
            "preText": preText['ar'],
            "isPreTextRiyal" : preText['isRiyalAr'],            
             isCounterEnable,
            "text" : text['ar'],
            "isPostTextSmall": isPostTextSmall,
            "postText": postText['ar'],
            "isPostTextRiyal" : postText['isRiyalAr'],                   
      },
  }, 
      _type == "sectorExpertiseSection" => {
          _type,
          "heading": heading['ar'],
          "title": title['ar'],
          "description": description['ar'],
          "items": items[]{
            "image": image.asset->url,
            "imageLqip": image.asset->metadata.lqip,            
            "title" : title['ar'],
            "subTitle": subTitle['ar'],
            "representText": representText['ar'],
            "coreText": coreText['ar'],
             "preText": preText['ar'],
            "text" : text['ar'],
             "postText": postText['ar'],
      },

  },
  _type == "timelineSection" => {
           _type,
          "title": title['ar'],
          'stats': stats[]{
            "countText": countText['ar'],
            "title": title['ar'],
            date, 
            endDate,
            "subText": subText['ar'],            
              },
            },                        
},

}[0]`;

export const disclaimerEnQuery = `*[_type == "disclaimerPage"]{
isDisclaimerEnabled,
  allCountries[]{
    "label": label['en'],
    "value": value,
  },
  restrictedCountries[]{
    "label": label['en'],
    "value": value,
  },

  disclaimerPage1{
    "title": disclaimerTitle['en'],
     "content": content['en'],
     "selectCountryLabel": selectCountryLabel['en'],
     cta{
        "title": title['en'],
        "href": href['en'],
     }
  },
 disclaimerPage2{
      "title": title['en'],
      "scrollDownTitle" : scrollDownTitle['en'],
     "content": content['en'],
     agreeCta{
        "title": title['en'],
        "href": href['en'],
     },
    cancelCta{
        "title": title['en'],
        "href": href['en'],
     }
  },
  disclaimerPage3{
      "title": title['en'],
     "content": content['en'],
     cta{
        "title": title['en'],
        "href": href['en'],
     },
  },
 }[0]`;

export const disclaimerArQuery = `*[_type == "disclaimerPage"]{
 isDisclaimerEnabled,
  allCountries[]{
    "label": label['ar'],
    "value": value,
  },
  restrictedCountries[]{
    "label": label['ar'],
    "value": value,
  },

  disclaimerPage1{
    "title": disclaimerTitle['ar'],
     "content": content['ar'],
     "selectCountryLabel": selectCountryLabel['ar'],
     cta{
        "title": title['ar'],
        "href": href['ar'],
     }
  },
 disclaimerPage2{
      "title": title['ar'],
      "scrollDownTitle" : scrollDownTitle['ar'],
     "content": content['ar'],
     agreeCta{
        "title": title['ar'],
        "href": href['ar'],
     },
    cancelCta{
        "title": title['ar'],
        "href": href['ar'],
     }
  },
  disclaimerPage3{
      "title": title['ar'],
     "content": content['ar'],
     cta{
        "title": title['ar'],
        "href": href['ar'],
     },
  },
 }[0]`;

export const metaQueryEn = `*[_type == "page"] {
  "metaData": {
     'ogTitle':ogTitle['en'],
     'ogImage': ogImage.asset->url,
     'metaTitle':metaTitle['en'],
     'metaDescription':metaDescription['en'] 
   },
}[0]`;

export const metaQueryAr = `*[_type == "page"] {
  "metaData": {
     'ogTitle':ogTitle['ar'],
     'ogImage': ogImage.asset->url,
     'metaTitle':metaTitle['ar'],
     'metaDescription':metaDescription['ar'] 
   },
}[0]`;

export const cookieQueryEn = `*[_type == "cookieBanner"] {
  cookieBanner{
   "description1": description1['en'],
   "allowButtonText": allowButtonText['en'],
   "DeclineButtonText": DeclineButtonText['en'],
 },
}[0]`;
export const cookieQueryAr = `*[_type == "cookieBanner"] {
  cookieBanner{
   "description1": description1['ar'],
   "allowButtonText": allowButtonText['ar'],
   "DeclineButtonText": DeclineButtonText['ar'],
 },
}[0]`;

export const gtmQuery = `*[_type == "page"] {
   gtmID,
}[0]`;

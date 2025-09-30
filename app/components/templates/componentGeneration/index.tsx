"use client";
import { processData, trackPageView } from "@/app/utils/Helpers";
import Banner from "@/components/Banner/index";
import Footer from "@/components/Footer/index";
import Header from "@/components/Header/index";
import GetInTouch from "@/components/GetInTouch/index";
import IpoTimeline from "@/components/IpoTimeline/index";
import InvestmentHighlight from "@/components/InvestmentHighlight/index";
import LeadershipMessage from "@/components/LeadershipMessage/index";
import LeadershipTeam from "@/components/LeadershipTeam/index";
import Subscribe from "@/components/Subscribe/index";
import SubscriptionFaq from "@/components/SubscriptionFaq/index";
import UsefulResource from "@/components/UsefulResource/index";
import IpoSec from "@/components/IpoSec";
import MessageFromLeadership from "@/components/MessageFromLeadership/index";
import TabsWithSlider from "../../TabsWithSlider";
import CreatingDestination from "../../CreatingDestination";
import SectorExpertise from "../../SectorExpertise";
import AboutMasar from "../../AboutMasar";
import TransactionInvestmentWrapper from "../../TransactionInvestmentWrapper";
import InitialPublicOffering from "../../InitialPublicOffering";
import InvestmentHighlightsFaqs from "../../InvestmentHighlightsFaqs";
import UsefulResources from "../../UsefulResources";
import leaderImg from "../../../public/images/leader-img.jpg";
import { PortableText, PortableTextBlock } from "next-sanity";
import footerLogo from "@/public/svg/footer-logo.svg";
import linkedin from "@/public/svg/linkedin.svg";
import snbLogo from "@/public/svg/snb-logo.svg";
import fgsLogo from "@/public/svg/ground-fgs-logo.svg";
import emailIcon from "@/public/svg/ground-email-icon.svg";
import globeIcon from "@/public/svg/ground-globe-icon.svg";
import efgLogo from "@/public/svg/ground-efg-logo.svg";
import x from "@/public/svg/x.svg";
import AboutTpo from "@/components/AboutTpo/index";
import Overview from "@/components/Overview/index";
import SectorPioneer from "@/components/SectorPioneer/index";
import TransactionTimeline from "@/components/TransactionTimeline/index";
import IpoOverview from "@/components/IpoOverview/index";
import Faqs from "@/components/Faqs/index";
import CookieConsent from "@/components/CookieConsent/index";
import type { FooterItem } from "@/components/Footer/types";
import { useEffect } from "react";
interface ICta {
  file: string;
  title: string;
  fileName: string;
  date: string;
}
interface IItem {
  cta: ICta;
}
interface IResourceData {
  _type: string;
  title: string;
  items: IItem[];
}
interface IHighlights {
  description: PortableTextBlock[];
  title: string;
  _key: string;
}
interface IStats {
  title: string;
  date: string; // ISO string e.g. "2025-09-01"
}

interface IInvestmentData {
  _type: string;
  title: string;
  timelineSection: {
    title: string;
    stats: IStats[];
  };
}
const headerData = {
  logo: "/svg/logo.svg",
  nav: [
    { href: "/", label: "Overview" },
    { href: "/", label: "Key Figures" },
    { href: "/", label: "The IPO" },
    { href: "/", label: "Leadership" },
    { href: "/", label: "FAQs" },
    { href: "/", label: "Resources" },
    { href: "/", label: "Newsroom", icon: "/svg/ground-newsroom-icon.svg" },
    { href: "/", label: "Contact" },
  ],
  cta: {
    title: "AlDyar AlArabiya Home",
    href: "#",
    target: "_blank",
  },
  socials: [
    { href: "/", icon: "/svg/facebook.svg" },
    { href: "/", icon: "/svg/youtube.svg" },
    { href: "/", icon: "/svg/linkedin.svg" },
    { href: "/", icon: "/svg/instagram.svg" },
    { href: "/", icon: "/svg/x.svg" },
  ],
  copyright: "© 2025 Copyright Reserved. Powered by FGS Global",
  menuBg: "/images/menu-pattern.svg",
};

const bannerData = {
  videoSrc: "/video/ground-banner-video.mp4",
  bgPattern: "/images/ground-banner-pattern.png",
  title: "A leading integrated facilities management company in Saudi Arabia",
  subtitle:
    "An industry pioneer delivering output-based services to the Kingdom’s most prominent companies and projects ",
};
export const footerData = [
  { type: "logo", logo: "/svg/logo.svg" },

  {
    type: "heading",
    headings: [
      "Have any questions?",
      "Get in touch with someone from our team",
    ],
  },

  {
    type: "contact",
    email: "efg_projectground@efg.com",
    website: "https://www.efghldg.com",
    logo: efgLogo.src,
    icon1: emailIcon.src,
    icon2: globeIcon.src,
  },

  {
    type: "contact",
    email: "ProjectGround-ME@fgsglobal.com",
    website: "https://www.fgsglobal.com",
    logo: fgsLogo.src,
    icon1: emailIcon.src,
    icon2: globeIcon.src,
  },

  { type: "social", icon: "/svg/facebook.svg", url: "https://facebook.com/" },
  { type: "social", icon: "/svg/youtube.svg", url: "https://youtube.com/" },
  // ⛔ removed the stray comma here
  {
    type: "social",
    icon: linkedin.src,
    url: "https://linkedin.com/company/fgsglobal",
  },
  { type: "social", icon: "/svg/instagram.svg", url: "https://instagram.com/" },
  { type: "social", icon: x.src, url: "https://x.com/fgsglobal" },

  { type: "text", text: "© 2025 Copyright Reserved. Powered by FGS Global" },
] satisfies FooterItem[];

const subscribeData = {
  title: "How to Subscribe",
  backgroundImage: "/images/overview.jpg", // desktop background
  mobileBackgroundImage: "/images/subscribe-mobile.jpg", // mobile background
  backgroundVideo: "/video/ground-how-to-sub-video.mp4",
  cta: {
    title: "Watch Video",
    href: "#",
    video: "https://www.w3schools.com/html/mov_bbb.mp4", // dummy video
  },
  _type: "subscribe-section",
};

export const leadershipMessages = [
  {
    title: "Message From Our Leadership",
    _type: "leadership-message",
    author: [
      {
        designation: "Chairman of the Board of the Directors",
        name: "Muammar Alatawi ",
        title: "Chairman’s message",
        content: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Praesent et efficitur eros, sed efficitur odio. Morbi at volutpat arcu. Phasellus nec velit finibus nibh volutpat pulvinar. Pellentesque pulvinar nunc quis tempus vulputate. Cras semper ligula non neque lobortis, eu pharetra odio ultricies. Aliquam vulputate vestibulum lectus, vitae ultricies felis ultricies a. Integer sagittis, metus posuere pharetra efficitur, ante lacus porta massa, nec vestibulum leo urna ac ex. Phasellus laoreet, arcu ut feugiat accumsan, justo libero ultrices mi, eu efficitur tellus elit ac augue. Mauris et diam ex. Praesent et efficitur eros, sed efficitur odio. Morbi at volutpat arcu. Phasellus nec velit finibus nibh volutpat pulvinar. Pellentesque pulvinar nunc quis tempus vulputate. Cras semper ligula non neque lobortis, eu pharetra odio ultricies. Aliquam vulputate vestibulum lectus, vitae ultricies felis ultricies  ultricies. Aliquam vulputate vestibulum lectus, vitae ultricies felis ultricies",
              },
            ],
          },
        ],
        image: "/images/leader-img.png",
        cta: [],
      },
      {
        designation: "Chief Technology Officer",
        name: "Michael Lee",
        title: "Chairman’s message 2",
        content: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Technology is at the heart of what we do. We are building scalable solutions for tomorrow.",
              },
            ],
          },
        ],
        image: "/images/leader-img.png",
        cta: [],
      },
    ],
  },
];
export const getInTouchDummyData = [
  {
    _type: "get-in-touch",
    title: "Lead Manager, Sole Financial Advisor, Bookrunner, and Underwriter",
    boxTitle: "Advisors & Receiving Banks",
    advisors: [
      // 0) Header / Hero advisor (used at the top in your component)
      {
        key: "lead-advisor",
        title: "EFG Hermes",
        description: [
          {
            _key: "desc-0",
            _type: "block",
            style: "normal",
            children: [
              {
                text: "Our lead advisor coordinates engagement and ensures a single point of contact for all matters.",
              },
            ],
          },
        ],
        isSlider: true,
        items: [
          {
            image: "/images/efg-logo.svg",
            title: "NorthBridge Capital Partners",
            mailToIcon: "/images/mailto.svg",
            mailTo: "mailto: xxxsm@efghldg.com",
            mailToLabel: "xxxsm@efghldg.com",
            websiteIcon: "/images/website.svg",
            website: "www.efghldg.com",
            websiteLabel: "www.efghldg.com",
            email: "hello@northbridge.example.com",
            emailLabel: "Email NorthBridge",
          },
        ],
      },

      // 1) Advisors in a slider (paired per slide)
      {
        key: "strategic-advisors",
        title: "Strategic Advisors",
        description: [
          {
            _key: "desc-1",
            _type: "block",
            style: "normal",
            children: [
              {
                text: "Independent advisors providing guidance on corporate strategy, governance, and market entry.",
              },
            ],
          },
        ],
        isSlider: true,
        items: [
          {
            image: "/images/anb-logo.svg",
            title: "Alpha Advisory Group",
            mailToIcon: "/images/mailto.svg",
            mailTo: "mailto: xxxsm@arabnationalbank.com",
            mailToLabel: "xxxsm@arabnationalbank.com",
            websiteIcon: "/images/website.svg",
            website: "www.arabnationalbank.com",
            websiteLabel: "www.arabnationalbank.com",
            email: "contact@alpha-advisory.example.com",
            emailLabel: "Email Alpha",
          },
          {
            image: "/images/alinma-logo.svg",
            title: "Aurora Insights",
            mailToIcon: "/images/mailto.svg",
            mailTo: "mailto: xxxsm@arabnationalbank.com",
            mailToLabel: "xxxsm@arabnationalbank.com",
            websiteIcon: "/images/website.svg",
            website: "www.arabnationalbank.com",
            websiteLabel: "www.arabnationalbank.com",
            email: "info@aurora-insights.example.com",
            emailLabel: "Email Aurora",
          },
          {
            image: "/images/snk-logo.svg",
            title: "Keystone Consult",
            mailToIcon: "/images/mailto.svg",
            mailTo: "mailto: xxxsm@alinmabank.com",
            mailToLabel: "xxxsm@alinmabank.com",
            websiteIcon: "/images/website.svg",
            website: "www.alinmabank.com",
            websiteLabel: "www.alinmabank.com",
            email: "team@keystone.example.com",
            emailLabel: "Email Keystone",
          },
          {
            image: "/images/anb-logo.svg",
            title: "Evergreen Partners",
            mailToIcon: "/images/mailto.svg",
            mailTo: "mailto: xxxsm@snbcapital.com",
            mailToLabel: "xxxsm@snbcapital.com",
            websiteIcon: "/images/website.svg",
            website: "www.snbcapital.com",
            websiteLabel: "www.snbcapital.com",
            email: "hello@evergreen.example.com",
            emailLabel: "Email Evergreen",
          },
        ],
      },
    ],
  },
];
// export const teamDummyData = {
//   _type: "teams-section",
//   title: "Our Leadership",
//   teams: [
//     {
//       secondaryTitle: "Management",
//       subtitle: "Meet our executive management team",
//       title: "Leadership Team",
//       teamMembers: [
//         {
//           title: "John Doe",
//           shortName: "John D.",
//           designation: "Chief Executive Officer",
//           image: "/images/leader-img.jpg", // keep an image in public/images/
//           content: [
//             {
//               _type: "block",
//               children: [
//                 {
//                   _type: "span",
//                   text: "John has over 20 years of experience leading global companies in the technology sector.",
//                 },
//               ],
//             },
//           ] as PortableTextBlock[],
//         },
//         {
//           title: "Jane Smith",
//           shortName: "Jane S.",
//           designation: "Chief Technology Officer",
//           image: "/images/leader-img.jpg",
//           content: [
//             {
//               _type: "block",
//               children: [
//                 {
//                   _type: "span",
//                   text: "Jane oversees all technical aspects and drives innovation across the organization.",
//                 },
//                 {
//                   _type: "span",
//                   text: "Jane oversees all technical aspects and drives innovation across the organization.",
//                 },
//                 {
//                   _type: "span",
//                   text: "Jane oversees all technical aspects and drives innovation across the organization.",
//                 },
//               ],
//             },
//           ] as PortableTextBlock[],
//         },
//         {
//           title: "John Doe",
//           shortName: "John D.",
//           designation: "Chief Executive Officer",
//           image: "/images/leader-img.jpg", // keep an image in public/images/
//           content: [
//             {
//               _type: "block",
//               children: [
//                 {
//                   _type: "span",
//                   text: "John has over 20 years of experience leading global companies in the technology sector.",
//                 },
//               ],
//             },
//           ] as PortableTextBlock[],
//         },
//         {
//           title: "Jane Smith",
//           shortName: "Jane S.",
//           designation: "Chief Technology Officer",
//           image: "/images/leader-img.jpg",
//           content: [
//             {
//               _type: "block",
//               children: [
//                 {
//                   _type: "span",
//                   text: "Jane oversees all technical aspects and drives innovation across the organization.",
//                 },
//                 {
//                   _type: "span",
//                   text: "Jane oversees all technical aspects and drives innovation across the organization.",
//                 },
//                 {
//                   _type: "span",
//                   text: "Jane oversees all technical aspects and drives innovation across the organization.",
//                 },
//               ],
//             },
//           ] as PortableTextBlock[],
//         },
//         {
//           title: "John Doe",
//           shortName: "John D.",
//           designation: "Chief Executive Officer",
//           image: "/images/leader-img.jpg", // keep an image in public/images/
//           content: [
//             {
//               _type: "block",
//               children: [
//                 {
//                   _type: "span",
//                   text: "John has over 20 years of experience leading global companies in the technology sector.",
//                 },
//               ],
//             },
//           ] as PortableTextBlock[],
//         },
//         {
//           title: "Jane Smith",
//           shortName: "Jane S.",
//           designation: "Chief Technology Officer",
//           image: "/images/leader-img.jpg",
//           content: [
//             {
//               _type: "block",
//               children: [
//                 {
//                   _type: "span",
//                   text: "Jane oversees all technical aspects and drives innovation across the organization.",
//                 },
//                 {
//                   _type: "span",
//                   text: "Jane oversees all technical aspects and drives innovation across the organization.",
//                 },
//                 {
//                   _type: "span",
//                   text: "Jane oversees all technical aspects and drives innovation across the organization.",
//                 },
//               ],
//             },
//           ] as PortableTextBlock[],
//         },
//       ],
//     },
//     {
//       secondaryTitle: "Advisory",
//       subtitle: "Our advisors bring deep industry expertise",
//       title: "Advisory Board",
//       teamMembers: [
//         {
//           title: "Michael Johnson",
//           shortName: "Mike J.",
//           designation: "Board Advisor",
//           image: "/images/leader-img.jpg",
//           content: [
//             {
//               _type: "block",
//               children: [
//                 {
//                   _type: "span",
//                   text: "Mike has advised startups and Fortune 500 companies, specializing in growth strategy.",
//                 },
//               ],
//             },
//           ] as PortableTextBlock[],
//         },
//         {
//           title: "Emily Davis",
//           shortName: "Emily D.",
//           designation: "Board Advisor",
//           image: "/images/leader-img.jpg",
//           content: [
//             {
//               _type: "block",
//               children: [
//                 {
//                   _type: "span",
//                   text: "Emily brings 15 years of financial expertise to the advisory board.",
//                 },
//               ],
//             },
//           ] as PortableTextBlock[],
//         },
//       ],
//     },

//   ],
// };

export const teamDummyData = {
  _type: "teams-section",
  title: "Our Leadership",
  teams: [
    {
      secondaryTitle: "Management",
      subtitle: "Meet our executive management team",
      title: "Leadership Team",
      teamMembers: [
        {
          title: "Osama Otaibi",
          designation: "Director Finance",
          image: "/images/leadership-team.jpg", // keep an image in public/images/
          content: [
            {
              _type: "block",
              children: [
                {
                  _type: "span",
                  text: "John has over 20 years of experience leading global companies in the technology sector.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis tortor eget risus sagittis, at auctor ante blandit. Etiam ut accumsan arcu. Vestibulum ante eros, efficitur eu lorem vel, hendrerit convallis nunc. Curabitur dictum semper ultricies. Nulla blandit vulputate massa ut vulputate. In hac habitasse platea dictumst. Ut bibendum mi et mauris sodales hendrerit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis tortor eget risus sagittis, at auctor ante blandit. Etiam ut accumsan arcu. Vestibulum ante eros, efficitur eu lorem vel, hendrerit convallis nunc. John has over 20 years of experience leading global companies in the technology sector.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis tortor eget risus sagittis, at auctor ante blandit. Etiam ut accumsan arcu. Vestibulum ante eros, efficitur eu lorem vel, hendrerit convallis nunc. Curabitur dictum semper ultricies. Nulla blandit vulputate massa ut vulputate. In hac habitasse platea dictumst. Ut bibendum mi et mauris sodales hendrerit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis tortor eget risus sagittis, at auctor ante blandit. Etiam ut accumsan arcu. Vestibulum ante eros, efficitur eu lorem vel, hendrerit convallis nunc. John has over 20 years of experience leading global companies in the technology sector.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis tortor eget risus sagittis, at auctor ante blandit. Etiam ut accumsan arcu. Vestibulum ante eros, efficitur eu lorem vel, hendrerit convallis nunc. Curabitur dictum semper ultricies. Nulla blandit vulputate massa ut vulputate. In hac habitasse platea dictumst. Ut bibendum mi et mauris sodales hendrerit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis tortor eget risus sagittis, at auctor ante blandit. Etiam ut accumsan arcu. Vestibulum ante eros, efficitur eu lorem vel, hendrerit convallis nunc. John has over 20 years of experience leading global companies in the technology sector.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis tortor eget risus sagittis, at auctor ante blandit. Etiam ut accumsan arcu. Vestibulum ante eros, efficitur eu lorem vel, hendrerit convallis nunc. Curabitur dictum semper ultricies. Nulla blandit vulputate massa ut vulputate. In hac habitasse platea dictumst. Ut bibendum mi et mauris sodales hendrerit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis tortor eget risus sagittis, at auctor ante blandit. Etiam ut accumsan arcu. Vestibulum ante eros, efficitur eu lorem vel, hendrerit convallis nunc. John has over 20 years of experience leading global companies in the technology sector.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis tortor eget risus sagittis, at auctor ante blandit. Etiam ut accumsan arcu. Vestibulum ante eros, efficitur eu lorem vel, hendrerit convallis nunc. Curabitur dictum semper ultricies. Nulla blandit vulputate massa ut vulputate. In hac habitasse platea dictumst. Ut bibendum mi et mauris sodales hendrerit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis tortor eget risus sagittis, at auctor ante blandit. Etiam ut accumsan arcu. Vestibulum ante eros, efficitur eu lorem vel, hendrerit convallis nunc. John has over 20 years of experience leading global companies in the technology sector.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis tortor eget risus sagittis, at auctor ante blandit. Etiam ut accumsan arcu. Vestibulum ante eros, efficitur eu lorem vel, hendrerit convallis nunc. Curabitur dictum semper ultricies. Nulla blandit vulputate massa ut vulputate. In hac habitasse platea dictumst. Ut bibendum mi et mauris sodales hendrerit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis tortor eget risus sagittis, at auctor ante blandit. Etiam ut accumsan arcu. Vestibulum ante eros, efficitur eu lorem vel, hendrerit convallis nunc. John has over 20 years of experience leading global companies in the technology sector.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis tortor eget risus sagittis, at auctor ante blandit. Etiam ut accumsan arcu. Vestibulum ante eros, efficitur eu lorem vel, hendrerit convallis nunc. Curabitur dictum semper ultricies. Nulla blandit vulputate massa ut vulputate. In hac habitasse platea dictumst. Ut bibendum mi et mauris sodales hendrerit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis tortor eget risus sagittis, at auctor ante blandit. Etiam ut accumsan arcu. Vestibulum ante eros, efficitur eu lorem vel, hendrerit convallis nunc. John has over 20 years of experience leading global companies in the technology sector.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis tortor eget risus sagittis, at auctor ante blandit. Etiam ut accumsan arcu. Vestibulum ante eros, efficitur eu lorem vel, hendrerit convallis nunc. Curabitur dictum semper ultricies. Nulla blandit vulputate massa ut vulputate. In hac habitasse platea dictumst. Ut bibendum mi et mauris sodales hendrerit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis tortor eget risus sagittis, at auctor ante blandit. Etiam ut accumsan arcu. Vestibulum ante eros, efficitur eu lorem vel, hendrerit convallis nunc.",
                },
              ],
            },
          ] as PortableTextBlock[],
        },
        {
          title: "Jane Smith",
          designation: "Chief Technology Officer",
          image: "/images/leadership-team.jpg",
          content: [
            {
              _type: "block",
              children: [
                {
                  _type: "span",
                  text: "Jane oversees all technical aspects and drives innovation across the organization.",
                },
                {
                  _type: "span",
                  text: "Jane oversees all technical aspects and drives innovation across the organization.",
                },
                {
                  _type: "span",
                  text: "Jane oversees all technical aspects and drives innovation across the organization.",
                },
              ],
            },
          ] as PortableTextBlock[],
        },
        {
          title: "John Doe",
          designation: "Chief Executive Officer",
          image: "/images/leadership-team.jpg", // keep an image in public/images/
          content: [
            {
              _type: "block",
              children: [
                {
                  _type: "span",
                  text: "John has over 20 years of experience leading global companies in the technology sector.",
                },
              ],
            },
          ] as PortableTextBlock[],
        },
        {
          title: "Jane Smith",
          designation: "Chief Technology Officer",
          image: "/images/leadership-team.jpg",
          content: [
            {
              _type: "block",
              children: [
                {
                  _type: "span",
                  text: "Jane oversees all technical aspects and drives innovation across the organization.",
                },
                {
                  _type: "span",
                  text: "Jane oversees all technical aspects and drives innovation across the organization.",
                },
                {
                  _type: "span",
                  text: "Jane oversees all technical aspects and drives innovation across the organization.",
                },
              ],
            },
          ] as PortableTextBlock[],
        },
        {
          title: "John Doe",
          designation: "Chief Executive Officer",
          image: "/images/leadership-team.jpg", // keep an image in public/images/
          content: [
            {
              _type: "block",
              children: [
                {
                  _type: "span",
                  text: "John has over 20 years of experience leading global companies in the technology sector.",
                },
              ],
            },
          ] as PortableTextBlock[],
        },
        {
          title: "Jane Smith",
          designation: "Chief Technology Officer",
          image: "/images/leadership-team.jpg",
          content: [
            {
              _type: "block",
              children: [
                {
                  _type: "span",
                  text: "Jane oversees all technical aspects and drives innovation across the organization.",
                },
                {
                  _type: "span",
                  text: "Jane oversees all technical aspects and drives innovation across the organization.",
                },
                {
                  _type: "span",
                  text: "Jane oversees all technical aspects and drives innovation across the organization.",
                },
              ],
            },
          ] as PortableTextBlock[],
        },
      ],
    },
    {
      secondaryTitle: "Advisory",
      subtitle: "Our advisors bring deep industry expertise",
      title: "Advisory Board",
      teamMembers: [
        {
          title: "Michael Johnson",
          designation: "Board Advisor",
          image: "/images/leadership-team.jpg",
          content: [
            {
              _type: "block",
              children: [
                {
                  _type: "span",
                  text: "Mike has advised startups and Fortune 500 companies, specializing in growth strategy.",
                },
              ],
            },
          ] as PortableTextBlock[],
        },
        {
          title: "Emily Davis",
          designation: "Board Advisor",
          image: "/images/leadership-team.jpg",
          content: [
            {
              _type: "block",
              children: [
                {
                  _type: "span",
                  text: "Emily brings 15 years of financial expertise to the advisory board.",
                },
              ],
            },
          ] as PortableTextBlock[],
        },
      ],
    },
  ],
};

export const faqDummyData = {
  _type: "faqs-section",
  title: "Frequently Asked Questions",
  faqs: [
    {
      _key: "faq1",
      title: "What is the transaction structure?",
      description: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: `On xx xx 2025G, the Capital Market Authority (the “CMA”) approved the Company’s application for the registration and offer of 16,800,000 Shares(the "Offer Shares", and each an "Offer Share"), representing 30% of the Company’s total issued share capital upon completion of the Offering.`,
            },
          ],
        },
      ] as PortableTextBlock[],
    },
    {
      _key: "faq2",
      title: "How can I subscribe to the IPO?",
      description: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "You can reach out to our support team via email at support@example.com or through our contact form.",
            },
          ],
        },
      ] as PortableTextBlock[],
    },
    {
      _key: "faq3",
      title: "Who can participate in the Offering?",
      description: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Yes, we specialize in tailoring solutions based on your unique business needs.",
            },
          ],
        },
      ] as PortableTextBlock[],
    },
    {
      _key: "faq3",
      title: "When will the Final Offer price be announced?",
      description: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Yes, we specialize in tailoring solutions based on your unique business needs.",
            },
          ],
        },
      ] as PortableTextBlock[],
    },
  ],
};
export const ExpertiesDummyData = {
  _type: "faqs-section",
  title: "Frequently Asked Questions",
  faqs: [
    {
      _key: "faq1",
      title: "Giga Projects",
      percentage: "20%",
      description: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: `Providing a diverse range of FM services tailored to airports and related infrastructure`,
              listText1: `Represents 22% of FY2024. Revenue – SAR 176.5 mn`,
              listText2: `Core Area: Western Region`,
            },
          ],
        },
      ],
    },
    {
      _key: "faq2",
      title: "Aviation",
      percentage: "44%",
      description: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "You can reach out to our support team via email at support@example.com or through our contact form.",
            },
          ],
        },
      ] as PortableTextBlock[],
    },
    {
      _key: "faq3",
      tittitle: "Assorted Commercial",
      percentage: "84%",
      description: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Yes, we specialize in tailoring solutions based on your unique business needs.",
            },
          ],
        },
      ] as PortableTextBlock[],
    },
    {
      _key: "faq3",
      title: "Oil and Gas",
      percentage: "72%",
      description: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Yes, we specialize in tailoring solutions based on your unique business needs.",
            },
          ],
        },
      ] as PortableTextBlock[],
    },
  ],
};
export const investmentHighlightsDummyData = {
  _type: "faqs-section",
  title: "Investment Highlights",
  faqs: [
    {
      _key: "highlight1",
      title:
        "Large addressable market underpinned by a favorable economy and strong industry fundamentals",
      description: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "The total FM market in Saudi Arabia is valued at SAR 109 billion, with the output-based FM segment – EFSIM’s core focus – sized at SAR 28 billion in 2024. Output-based FM is expected to expand at 12% CAGR through 2029, driven by growing preference for performance-led and integrated service models.",
            },
          ],
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Saudi Arabia’s FM spend per capita remains significantly lower than other GCC markets, indicating substantial headroom for growth as the market matures.",
            },
          ],
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Sector expansion is driven by Vision 2030 reforms: increased infrastructure investment, higher service standards, and localization mandates favoring institutional FM partners with scale and delivery capability.",
            },
          ],
        },
      ] as PortableTextBlock[],
    },
    {
      _key: "highlight2",
      title:
        "Proven track record of delivering high-quality IFM solutions across multiple high-potential sectors, strengthening market positioning and business resilience",
      description: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "The total FM market in Saudi Arabia is valued at SAR 109 billion, with the output-based FM segment – EFSIM’s core focus – sized at SAR 28 billion in 2024. Output-based FM is expected to expand at 12% CAGR through 2029, driven by growing preference for performance-led and integrated service models.",
            },
          ],
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Saudi Arabia’s FM spend per capita remains significantly lower than other GCC markets, indicating substantial headroom for growth as the market matures.",
            },
          ],
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Sector expansion is driven by Vision 2030 reforms: increased infrastructure investment, higher service standards, and localization mandates favoring institutional FM partners with scale and delivery capability.",
            },
          ],
        },
      ] as PortableTextBlock[], // collapsed initially
    },
    {
      _key: "highlight3",
      title:
        "Nationwide presence with a high-profile client base powered by an extensive and well-developed service infrastructure",
      description: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "The total FM market in Saudi Arabia is valued at SAR 109 billion, with the output-based FM segment – EFSIM’s core focus – sized at SAR 28 billion in 2024. Output-based FM is expected to expand at 12% CAGR through 2029, driven by growing preference for performance-led and integrated service models.",
            },
          ],
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Saudi Arabia’s FM spend per capita remains significantly lower than other GCC markets, indicating substantial headroom for growth as the market matures.",
            },
          ],
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Sector expansion is driven by Vision 2030 reforms: increased infrastructure investment, higher service standards, and localization mandates favoring institutional FM partners with scale and delivery capability.",
            },
          ],
        },
      ] as PortableTextBlock[],
    },
    {
      _key: "highlight4",
      title:
        "Strong client loyalty and a growing backlog enabling long-term revenue visibility",
      description: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "The total FM market in Saudi Arabia is valued at SAR 109 billion, with the output-based FM segment – EFSIM’s core focus – sized at SAR 28 billion in 2024. Output-based FM is expected to expand at 12% CAGR through 2029, driven by growing preference for performance-led and integrated service models.",
            },
          ],
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Saudi Arabia’s FM spend per capita remains significantly lower than other GCC markets, indicating substantial headroom for growth as the market matures.",
            },
          ],
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Sector expansion is driven by Vision 2030 reforms: increased infrastructure investment, higher service standards, and localization mandates favoring institutional FM partners with scale and delivery capability.",
            },
          ],
        },
      ] as PortableTextBlock[],
    },
    {
      _key: "highlight5",
      title:
        "Strong financial performance driven by a growing top line, healthy margins, and attractive returns to shareholders",
      description: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "The total FM market in Saudi Arabia is valued at SAR 109 billion, with the output-based FM segment – EFSIM’s core focus – sized at SAR 28 billion in 2024. Output-based FM is expected to expand at 12% CAGR through 2029, driven by growing preference for performance-led and integrated service models.",
            },
          ],
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Saudi Arabia’s FM spend per capita remains significantly lower than other GCC markets, indicating substantial headroom for growth as the market matures.",
            },
          ],
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Sector expansion is driven by Vision 2030 reforms: increased infrastructure investment, higher service standards, and localization mandates favoring institutional FM partners with scale and delivery capability.",
            },
          ],
        },
      ] as PortableTextBlock[],
    },
    {
      _key: "highlight6",
      title:
        "Veteran leadership team with a clear vision and commitment to innovation",
      description: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "The total FM market in Saudi Arabia is valued at SAR 109 billion, with the output-based FM segment – EFSIM’s core focus – sized at SAR 28 billion in 2024. Output-based FM is expected to expand at 12% CAGR through 2029, driven by growing preference for performance-led and integrated service models.",
            },
          ],
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Saudi Arabia’s FM spend per capita remains significantly lower than other GCC markets, indicating substantial headroom for growth as the market matures.",
            },
          ],
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Sector expansion is driven by Vision 2030 reforms: increased infrastructure investment, higher service standards, and localization mandates favoring institutional FM partners with scale and delivery capability.",
            },
          ],
        },
      ] as PortableTextBlock[],
    },
  ],
};

export const usefulResourcesDummy: IResourceData = {
  _type: "useful-resources",
  title: "IPO Resources",
  items: [
    {
      cta: {
        title:
          "Consectetur adipiscing eiusmod tempor incididunt magna aliqua adipiscing.",
        file: "/files/company-profile.pdf", // place in public/files/
        fileName: "company-profile.pdf",
        date: "12 Feb, 2024",
      },
    },
    {
      cta: {
        title:
          "Consectetur adipiscing eiusmod tempor incididunt magna aliqua adipiscing.",
        file: "/files/annual-report-2024.pdf",
        fileName: "annual-report-2024.pdf",
        date: "16 Feb, 2024",
      },
    },
    {
      cta: {
        title:
          "Consectetur adipiscing eiusmod tempor incididunt magna aliqua adipiscing.",
        file: "/files/brand-guidelines.pdf",
        fileName: "brand-guidelines.pdf",
        date: "18 Feb, 2024",
      },
    },
    {
      cta: {
        title:
          "Consectetur adipiscing eiusmod tempor incididunt magna aliqua adipiscing.",
        file: "/files/ai-whitepaper.pdf",
        fileName: "ai-whitepaper.pdf",
        date: "20 Feb, 2024",
      },
    },
    {
      cta: {
        title:
          "Consectetur adipiscing eiusmod tempor incididunt magna aliqua adipiscing.",
        file: "/files/ai-whitepaper.pdf",
        fileName: "ai-whitepaper.pdf",
        date: "22 Feb, 2024",
      },
    },
    {
      cta: {
        title:
          "Consectetur adipiscing eiusmod tempor incididunt magna aliqua adipiscing.",
        file: "/files/ai-whitepaper.pdf",
        fileName: "ai-whitepaper.pdf",
        date: "24 Feb, 2024",
      },
    },
  ],
};

const dummyData = {
  _type: "get-in-touch",
  title: "Get in Touch With Our Advisors",
  advisors: [
    {
      key: "finance",
      title: "Finance Advisors",
      items: [
        {
          email: "finance1@example.com",
          emailLabel: "Email Finance 1",
          image: "/images/advisor1.jpg",
          website: "https://advisor1.com",
          websiteLabel: "Visit Website",
        },
        {
          email: "finance2@example.com",
          emailLabel: "Email Finance 2",
          image: "/images/advisor2.jpg",
          website: "https://advisor2.com",
          websiteLabel: "Visit Website",
        },
        {
          email: "finance3@example.com",
          emailLabel: "Email Finance 3",
          image: "/images/advisor3.jpg",
          website: "https://advisor3.com",
          websiteLabel: "Visit Website",
        },
      ],
    },
    {
      key: "legal",
      title: "Legal Advisors",
      items: [
        {
          email: "legal1@example.com",
          emailLabel: "Email Legal 1",
          image: "/images/advisor4.jpg",
          website: "https://advisor4.com",
          websiteLabel: "Visit Website",
        },
        {
          email: "legal2@example.com",
          emailLabel: "Email Legal 2",
          image: "/images/advisor5.jpg",
          website: "https://advisor5.com",
          websiteLabel: "Visit Website",
        },
      ],
    },
    {
      key: "tech",
      title: "Technology Advisors",
      items: [
        {
          email: "tech1@example.com",
          emailLabel: "Email Tech 1",
          image: "/images/advisor6.jpg",
          website: "https://advisor6.com",
          websiteLabel: "Visit Website",
        },
        {
          email: "tech2@example.com",
          emailLabel: "Email Tech 2",
          image: "/images/advisor7.jpg",
          website: "https://advisor7.com",
          websiteLabel: "Visit Website",
        },
        {
          email: "tech3@example.com",
          emailLabel: "Email Tech 3",
          image: "/images/advisor8.jpg",
          website: "https://advisor8.com",
          websiteLabel: "Visit Website",
        },
        {
          email: "tech4@example.com",
          emailLabel: "Email Tech 4",
          image: "/images/advisor9.jpg",
          website: "https://advisor9.com",
          websiteLabel: "Visit Website",
        },
      ],
    },
  ],
};
const aboutData = {
  title: "ABOUT THE IPO",
  text: "Aldyar Alarabiya Real Estate Development Company (“Aldyar Alarabiya” or the “Company”), one of the leading real estate developers in the Kingdom of Saudi Arabia, announced its intention to proceed with an initial public offering (the “IPO” or the “Offering”) and list its ordinary shares (“Shares”) on the Main Market of the Saudi Exchange (“Tadawul”). This IPO offers investors a unique opportunity to participate in one of Saudi Arabia's leading real estate developers, positioned to capitalize on Vision 2030's housing and quality of life objectives.",
};
const timelineData = {
  _type: "investment",
  title: "Company Growth Timeline",
  image: "/images/sample.jpg",
  highlights: [
    {
      _key: "h1",
      title: "Series A Funding",
      description: [
        {
          _type: "block",
          children: [{ _type: "span", text: "Raised $5M in Series A." }],
        },
      ],
    },
    {
      _key: "h2",
      title: "Series B Funding",
      description: [
        {
          _type: "block",
          children: [{ _type: "span", text: "Raised $15M in Series B." }],
        },
      ],
    },
  ],
  stats: [
    {
      title: "Founded",
      subtitle: "",
      date: "2018-06-01",
      isFeatured: false,
    },
    {
      title: "Seed Round",
      subtitle: "Raised $1M",
      date: "2019-03-15",
      isFeatured: false,
    },
    {
      title: "Series A",
      subtitle: "Raised $5M",
      date: "2020-08-20",
      isFeatured: true,
    },
    {
      title: "Series B",
      subtitle: "Raised $15M",
      date: "2022-11-05",
      isFeatured: false,
    },
    {
      title: "IPO",
      subtitle: "Listed on NASDAQ",
      date: "2024-02-10",
      isFeatured: true,
    },
  ],
};

export default function ComponentGeneration({
  data,
  locale,
  pageTitle,
}: {
  data: any;
  locale: string;
  pageTitle: string;
}) {
   useEffect(() => {
    trackPageView(pageTitle, window.location.href, 'Home Page', locale);
  }, [])
  const section = (name: string, data: any) => {
    switch (name) {
      case "header":
        return (
          <Header
            bannerId="bannerSection"
            key={data?._type}
            data={data}
            menuBg={"/images/menu-pattern.svg"}
          />
        );
      case "bannerSection":
        return (
          <Banner
            key={data?._type}
            data={data}
            bgImage={"/images/ground-banner-pattern.png"}
          />
        );
      case "companyOverviewSection":
        return <Overview key={data?._type} data={data} />;
      case "pioneerSection":
        return <SectorPioneer key={data?._type} data={data} />;
      case "leadershipMessageSection":
        return <MessageFromLeadership key={data?._type} data={data} />;
      case "aboutTheIpo":
        return <IpoOverview data={data} key={data?._type} />;

      case "investmentSection":
        return <InvestmentHighlightsFaqs key={data?._type} data={data} />;
      case "faqSection":
        return <Faqs key={data?._type} data={data} />;
      case "timelineSection":
        return <IpoTimeline key={data?._type} data={data} />;
      case "footer":
        return (
          <Footer
            data={data}
            key={data?._type}
            emailIcon={emailIcon.src}
            globalIcon={globeIcon.src}
          />
        );
      case "subscribeSection":
        return <Subscribe data={data} key={data?._type} />;
      case "keyFiguresSection":
        return <TransactionTimeline data={data} key={data?._type} />;
      case "resourceSection":
        return <UsefulResources data={data} key={data?._type} />;
      case "sectorExpertiseSection":
        return <SectorExpertise data={data} key={data?._type} />;

      case "financialAdvisors":
        return (
          <GetInTouch
            data={data}
            key={data?._type}
            emailIcon={emailIcon.src}
            globalIcon={globeIcon.src}
          />
        );
      case "teamSection":
        return <TabsWithSlider data={data} key={data?._type} />;
      case "getInTouchSectionp":
        return <Footer data={data} key={data?._type} />;

      // default:
      //   return <></>;
    }
  };

  const paragraphs = [
    "EFSIM Facilities Management Company (“the Company”, or “EFSIM”), a Saudi-based provider of comprehensive facilities management solutions announces its intention to proceed with an initial public offering (the “IPO” or “Offering”) and the listing of its shares (the “Shares”) on the Saudi Exchange’s Main Market.",
    "The Company’s IPO comprises an offering of 16,800,000 Shares (the “Offer Shares”), representing 30% of the Company’s total issued share capital by way of sale of 5,800,000 existing ordinary shares (the “Sale Shares”) by the Company’s current shareholders in proportion with their existing shareholding and the issuance of 11,000,000 new ordinary shares (the “New Shares”). This IPO offers a unique opportunity for individual and institutional investors to invest in the leading integrated facilities management provider in Saudi Arabia.",
  ];

  const transactionTimelineDummyData: IInvestmentData = {
    _type: "transaction-timeline",
    title: "Transaction Timeline",
    timelineSection: {
      title: "Key Milestones",
      stats: [
        { title: "Intention to Float Announced", date: "2025-06-12" },
        { title: "CMA Approval Received", date: "2025-07-01" },
        { title: "Price Range Published", date: "2025-07-10" },
        { title: "Bookbuilding Opens", date: "2025-07-14" },
        { title: "Bookbuilding Closes", date: "2025-07-18" },
        { title: "Final Price Announcement", date: "2025-07-20" },
        { title: "Retail Subscription Window", date: "2025-07-22" },
        { title: "Allotment & Refunds", date: "2025-07-28" },
        { title: "Listing & First Day of Trading", date: "2025-07-30" },
      ],
    },
  };
  const stats = [
    { value: "12,000,000", labelTop: "", labelBottom: "Offer Shares" },
    { value: "30%", labelBottom: "of the Company’s issued share capital" },
    {
      value: "100%",
      labelBottom:
        "Offer Shares to be allocated to participating parties, including public funds and QFIs",
    },
    {
      value: "20%",
      labelBottom:
        "Offer Shares to be clawed back and allocated to individual investors",
    },
  ];
  return (
    <>
      {data?.sections && data?.sections?.length > 0
        ? data &&
          data?.sections &&
          data?.sections?.length > 0 &&
          data?.sections?.map(
            (item: any) =>
              item?._type &&
              section(processData(item)?._type, processData(item)?.data)
          )
        : data &&
          data &&
          data?.length > 0 &&
          data?.map(
            (item: any) =>
              item?._type &&
              section(processData(item)?._type, processData(item)?.data)
          )}
      {/* <SectorExpertise data={ExpertiesDummyData} /> */}
    </>
  );
}

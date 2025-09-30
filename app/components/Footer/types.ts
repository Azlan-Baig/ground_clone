// components/Footer/types.ts
export type FooterItem =
  | { type: "logo";    logo: string }
  | { type: "heading"; headings: string[] }
  | { type: "contact"; logo: string; email: string; website: string; icon1?: string; icon2?: string }
  | { type: "social";  icon: string; url: string }
  | { type: "text";    text: string };

// Type guards so .filter() narrows correctly
export const isLogo    = (i: FooterItem): i is Extract<FooterItem, { type: "logo" }> => i.type === "logo";
export const isHeading = (i: FooterItem): i is Extract<FooterItem, { type: "heading" }> => i.type === "heading";
export const isContact = (i: FooterItem): i is Extract<FooterItem, { type: "contact" }> => i.type === "contact";
export const isSocial  = (i: FooterItem): i is Extract<FooterItem, { type: "social" }> => i.type === "social";
export const isText    = (i: FooterItem): i is Extract<FooterItem, { type: "text" }> => i.type === "text";

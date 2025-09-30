import "@/app/styles/index.scss";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import AlertBanner from "../alert-banner";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import LenisProvider from "@/components/LenisProvider";
import { sanityFetch } from "@/sanity/lib/fetch";
import { gtmQuery } from "@/app/query";
const AvenirArabic = localFont({
  src: [
    {
      path: "../../../public/fonts/AvenirArabic-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/AvenirArabic-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/AvenirArabic-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../../public/fonts/AvenirArabic-Book.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/AvenirArabic-Heavy.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--AvenirArabic",
});
const SarArabic = localFont({
  src: [
    {
      path: "../../../public/fonts/sarRegular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--SarArabic",
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // 👈 fix: params is a Promise
}) {
  const { locale } = await params;
  const currentLang = locale === "ar" ? "ar" : "en";
  const gtmID = await sanityFetch<any>({ query: gtmQuery });
  const draft = await draftMode();
  return (
    <html
      dir={locale === "ar" ? "rtl" : "ltr"}
      lang={currentLang}
      className={`
      ${AvenirArabic.variable}
      ${SarArabic.variable}
    `}
    >
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/dcs3aql.css" />
        {
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmID?.gtmID}');`,
            }}
          ></script>
        }
      </head>

      <body className={`${poppins.variable} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id='${gtmID?.gtmID}'`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {draft.isEnabled && <AlertBanner />}
        <LenisProvider>
          <main>{children}</main>
        </LenisProvider>
        {draft.isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}

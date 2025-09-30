import { sanityFetch } from "@/sanity/lib/fetch";
import ComponentGeneration from "../../components/templates/componentGeneration/index";
import {
  metaQueryEn,
  metaQueryAr,
  enQuery,
  arQuery,
  disclaimerArQuery,
  disclaimerEnQuery,
  cookieQueryAr,
  cookieQueryEn,
} from "../../query/index";
import { Metadata } from "next";
import DisclaimerModel from "@/app/components/Disclaimer";
import { hasCookie } from "cookies-next";
import { cookies } from "next/headers";
import CookieConsent from "@/components/CookieConsent/index";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await params;
  const resolvedlocale = locale.locale || "en";
  const metadata = await sanityFetch<any>({
    query: resolvedlocale === "ar" ? metaQueryAr : metaQueryEn,
  });

  return {
    title: metadata?.metaData?.metaTitle || "",
    description: metadata?.metaData?.metaDescription || "",
    openGraph: {
      title: metadata?.metaData?.ogTitle || "",
      images: [metadata?.metaData?.ogImage || ""],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = locale || "en";
  const isRtl = resolvedLocale === "ar";
  const data = await sanityFetch({ query: isRtl ? arQuery : enQuery });
  const disclaimerData = await sanityFetch({
    query: isRtl ? disclaimerArQuery : disclaimerEnQuery,
  });
  const exists = await hasCookie("accept_cookie", { cookies });
  const cookieData = await sanityFetch<any>({
    query: locale === "ar" ? cookieQueryAr : cookieQueryEn,
  });
  const meta = await sanityFetch<any>({ query: isRtl ? metaQueryAr : metaQueryEn });
  return (
    <>
      <DisclaimerModel data={disclaimerData} locale={locale} />
      {!exists && <CookieConsent data={cookieData} />}
      <ComponentGeneration data={data} pageTitle={meta?.metaData?.metaTitle || ""} locale={resolvedLocale} />
    </>
  );
}

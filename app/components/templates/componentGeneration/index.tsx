"use client";
import { processData, trackPageView } from "@/app/utils/Helpers";
import Banner from "@/components/Banner/index";
import Footer from "@/components/Footer/index";
import Header from "@/components/Header/index";
import GetInTouch from "@/components/GetInTouch/index";
import IpoTimeline from "@/components/IpoTimeline/index";
import Subscribe from "@/components/Subscribe/index";
import MessageFromLeadership from "@/components/MessageFromLeadership/index";
import TabsWithSlider from "../../TabsWithSlider";
import SectorExpertise from "../../SectorExpertise";
import InvestmentHighlightsFaqs from "../../InvestmentHighlightsFaqs";
import UsefulResources from "../../UsefulResources";
import emailIcon from "@/public/svg/ground-email-icon.svg";
import globeIcon from "@/public/svg/ground-globe-icon.svg";
import Overview from "@/components/Overview/index";
import SectorPioneer from "@/components/SectorPioneer/index";
import TransactionTimeline from "@/components/TransactionTimeline/index";
import IpoOverview from "@/components/IpoOverview/index";
import Faqs from "@/components/Faqs/index";
import { useEffect } from "react";

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
    </>
  );
}

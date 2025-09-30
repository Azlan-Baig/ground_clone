import { PortableTextBlock } from "next-sanity";
import InvestmentSection from "../InvestmentHighlight";
import TransactionTimeline from "../TransactionTimeline";
import ResponsiveImage from "@/components/ResponsiveImage";
import IpoFact from "@/components/IpoFact";

interface IpoFactItem {
  title: string;
  value: string; // always string from API
}

interface IpoFactData {
  image?: string;
  items?: IpoFactItem[];
  heading?: string; // new
  title?: string;   // new
}

interface IpoFactProps {
  data: IpoFactData;
}


interface IStats {
  title: string;
  date: string;
}

interface IInvestmentData {
  _type: string;
  title: string;
  heading: string;
  image?: string;
  items?: IpoFactItem[];

  timelineSection: {
    title: string;
    stats: IStats[];
  };

  bottomImage?: string;
  bottomTitle?: { text: string }[];
}

const TransactionInvestmentWrapper = ({ data }: { data: IInvestmentData }) => {
  return (
    <section className="sec-padding about-the-ipo-wrapper">
      <div className="about-ipo-bg">
        <ResponsiveImage
          desktopSrc={"/images/about-ipo-bg.jpg"}
          tabletSrc={"/images/about-ipo-bg.jpg"}
          mobileSrc={"/images/about-ipo-bg.jpg"}
          alt={"ipo-facts"}
          imageProps={{ priority: true }}
          className="about-ipo-bg-img"
        />
      </div>
      <div className="container--left">
        {data?.items && data.items.length > 0 && (
          <IpoFact
            data={{
              image: data.image,
              items: data.items,
              heading: data.heading, // ✅ no error now
              title: data.title, // ✅ no error now
            }}
          />
        )}
        {/* {data?.timelineSection?.stats?.length > 0 && (
          <TransactionTimeline data={data} />
        )} */}

        {/* {data?.highlights?.length > 0 && (
          <InvestmentSection data={data} />
        )} */}
      </div>
    </section>
  );
};

export default TransactionInvestmentWrapper;

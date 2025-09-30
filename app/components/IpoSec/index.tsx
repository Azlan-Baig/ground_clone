import AboutIpo from "@/components/AboutIpo/index";
import IpoTimeline from "@/components/IpoTimeline/index";
import { PortableTextBlock } from "next-sanity";

interface IpoSecProps {
  data:{
    description:PortableTextBlock[];
    secondaryText:PortableTextBlock[];
    stats:any[];
    subtitle:string;
    timelineTitle:string;
    timelines:any[];
    title:string;
    _type:string;
  }
}

const IpoSec = ({data }: IpoSecProps) => {
  return (
   <>
    <div className="wrapper"  id={data?._type} >
      <AboutIpo data={data} />
      <IpoTimeline data={data} />
    </div>
   </>
  );
};

export default IpoSec;

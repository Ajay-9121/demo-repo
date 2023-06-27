// import * as React from "react";
// // import gallerybg from "../../images/faq-bg.png"

// import { useState, useEffect } from "react";
// import AccordionItem from "./accordian";

// import { StaticData } from "../../site-global/staticData";

// export default function Faq(props: any) {
//   const [current, setCurrent] = useState(" ");
//   const [isShow, setIsShow] = useState(false);
//   const [faqId, setFaqId] = useState(null);
//   const [faqClass, setFaqClass] = useState("");
//   const [activeIndex, setActiveIndex] = useState("0");
//   let preExpandedarr = [];

//   if (props.faqs.length > 0) {
//     props.faqs.map((e: any, i: Number) => {
//       if (i == 0) {
//         preExpandedarr = [e];
//       }
//     });
//   }
//   const isShowContent = (e: any) => {
//     setFaqId(e.currentTarget.id);

//     if (isShow) {
//       setIsShow((current) => !current);
//       setFaqClass("hide");
//     } else {
//       setIsShow(true);
//       setFaqClass("opened");
//     }
//   };
//   function setclass(e: any) {
//     setCurrent(e.target.id);
//   }
//   const renderedQuestionsAnswers = props.faqs.map(
//     (item: any, index: Number) => {
//       const showDescription = index === activeIndex ? "current" : "hidden";
//       const background = index === activeIndex ? "active" : "";
//       const fontWeightBold =
//         index === activeIndex ? " font-weight-bold  py-0 mt-2" : "";
//       const ariaExpanded = index === activeIndex ? "true" : "false";

//       return (
//         <AccordionItem
//           showDescription={showDescription}
//           fontWeightBold={fontWeightBold}
//           ariaExpanded={ariaExpanded}
//           background={background}
//           item={item}
//           index={index}
//           onClick={() => {
//             setActiveIndex(index);
//           }}
//         />
//       );
//     }
//   );

//   return (
//     <>
//       <div className=" faq-main-sec">
//         <h1 className="faq-heading">FAQ Section</h1>
//         <div className=" faq-card ">
//           <div className="faq-sec-inner">
//             {/* <h2 className="">{props.c_fAQsHeading?props.c_fAQsHeading:StaticData.FAQheading}</h2> */}
//             {isShow} 
//             <div className="faq-tabs">{renderedQuestionsAnswers}</div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import { Link } from "@yext/pages/components";
import * as React from "react";
import { useEffect, useState } from "react";


type Faq = {
  prop: any;
  c_fAQsCta:any;
};


const Faq =(faqData: Faq) => {
  
  const [faq_Data, setFaq_Data] = useState([]);
  const [faqClass, setFaqClass] = useState("");
  const [leftFaqLen, setLeftFaqLen] = useState(0);
  const [rightFaqLen, setRightFaqLen] = useState(0);
  const [selected, setselected] = useState(null);

  const isShowContent = (e: any, index: any) => {
    setselected(index);
    let parent = e.target.parentNode;
    let parent2 = e.target.parentNode.parentNode;

    if (
      parent.classList.contains("opened") ||
      parent2.classList.contains("opened")
    ) {
      setFaqClass("");
    } else {
      var acc = document.getElementsByClassName("faq-block");
      for (let s = 0; s < -1; s++) {
        acc[s].classList.remove("opened");
      }

      setFaqClass("opened");
    }
  };

  useEffect(() => {
    setFaq_Data(faqData.prop);
    let left = Math.round(faqData.prop.length / 2);
    let right = faqData.prop.length - left;
    setLeftFaqLen(left);
    setRightFaqLen(right);
  });
// console.log(faqData.c_fAQsCta,"hellollo")
  return (
    <>
      <div className="faq-sec bg-light">
        <div className="container mx-auto">

          <div className="faq-blocks">
            <div className="left-faq">
              {faq_Data.map((i: any, index: any) => {
                  return (
                    <div
                      id={index}
                      className={
                        selected == index
                          ? `faq-block ${faqClass}`
                          : "faq-block"
                      }
                      key={index}
                    >
                      <h4
                        className="faq-title"
                        onClick={(e) => isShowContent(e, index)}
                      >
                        {i.question} <span className="faq-icon"></span>
                      </h4>

                      <>
                        <div className="faq-content">
                          <p>{i.answer}</p>
                        </div>
                      </>
                    </div>
                   );
                  
                   })}
                 </div>
                 {faqData.c_fAQsCta && faqData.c_fAQsCta &&<div className="mt-12 px-96 mx-16"><Link href={faqData.c_fAQsCta} eventName={faqData.c_fAQsCta} className="bg-[#FF0000] p-2 text-white">{faqData.c_fAQsCta}</Link></div>}
                 
          </div>
        </div>
      </div>
    </>
  );
};
export default Faq;
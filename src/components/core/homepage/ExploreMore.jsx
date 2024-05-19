import React, { useState } from "react";
import HighlightedText from "./HighlightedText";
import { HomePageExplore } from "../../../data/homepage-explore";
import Cards from "./Cards";

const ExploreMore = () => {
  const tabs = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
  ];

  const [currentTab, setCurrentTab] = useState(HomePageExplore[0].tag);
  const [cardData, setCardData] = useState(HomePageExplore[0].courses);
  const [selectedCard, setSelectedCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  function changeTab(value) {
    setCurrentTab(value);
    const result = HomePageExplore.filter((data) => value === data.tag);
    setCardData(result[0].courses);
    setSelectedCard(result[0].courses[0].heading);
  }

  return (
    <div className="lg:mt-28">

      <div>
        <div className="text-4xl font-semibold lg:text-center my-10">
          Unlock the
          <HighlightedText text={"Power of Code"} />
          <p className="lg:text-center text-richblack-300 text-lg font-semibold mt-1">
            Learn to Build Anything You Can Imagine
          </p>
        </div>
      </div>

      {/* tabs */}
      <div className="hidden lg:flex gap-5 -mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
        {tabs.map((ele, index) => {
          return (
            <div
              className={` text-[16px] flex flex-row items-center gap-2 ${
                currentTab === ele
                  ? "bg-richblack-900 text-richblack-5 font-medium"
                  : "text-richblack-200"
              } px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
              key={index}
              onClick={() => changeTab(ele)}
            >
              {ele}
            </div>
          );
        })}
      </div>
      {/* <div className="hidden lg:block lg:h-[200px]"></div> */}

      {/* cards */}
      <div className="flex justify-center">
        <Cards
          cardData={cardData}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
      </div>

    </div>
  );
};

export default ExploreMore;

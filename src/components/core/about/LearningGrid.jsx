import React from 'react'
import HighlightedText from '../homepage/HighlightedText';
import Button from '../homepage/Button';

const LearningGrid = () => {
    
  const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];

  return (
    <div className='mx-auto'>
      
        <div className="grid place-items-center grid-cols-1 lg:grid-cols-4 mx-auto w-full lg:w-fit mb-10 p-3">
            {
                LearningGridArray.map( (grid, index) => (
                    <div 
                        key={index}
                        className={` ${index == 0 && "lg:col-span-2 lg:h-[294px] bg-transparent"} 
                            ${grid.order%2 === 1 ? "bg-richblack-700" : "bg-richblack-800"}
                            ${grid.order === 3 && "lg:col-start-2"}
                        `}
                    >
                        {
                            grid.order < 0 ? (
                                <div className="flex flex-col pb-5 gap-5">
                                    <div className='text-4xl font-semibold'>
                                        <h2 className='text-richblack-5'>{grid.heading}</h2>
                                        <HighlightedText text={grid.highlightText} />
                                    </div>
                                    <p className='text-richblack-300 lg:w-[85%] font-medium'>{grid.description}</p>
                                    <Button active={true} linkto={grid.BtnLink}>
                                        {grid.BtnText}
                                    </Button>
                                </div>
                            ) : 
                            (<div className='flex flex-col h-[294px] gap-8 p-7'>
                                <h2 className='text-richblack-5 text-lg'>{grid.heading}</h2>
                                <p className="text-richblack-300 font-medium">{grid.description}</p>
                            </div>)
                        }
                        
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default LearningGrid

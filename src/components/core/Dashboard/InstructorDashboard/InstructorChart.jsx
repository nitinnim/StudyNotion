import React, { useState } from 'react'
import {Chart, registerables} from 'chart.js'
import { Pie } from 'react-chartjs-2'
Chart.register(...registerables)

const InstructorChart = ({courses}) => {
    
    const [currChart, setCurrChart] = useState("students")

    const getRandomColor = (num) => {
        const colors=[];

        for(let i = 0; i < num; i++){
            const color = `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`
            colors.push(color);
        }
        return colors;
    }

    // create data for chart displaying student info
    const chartDataForStudents = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course)=> course.totalStudentsEnrolled),
                backgroundColor: getRandomColor(courses.length)
            }
        ]
    }

     // create data for chart displaying total income info
     const chartDataForIncome = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalAmountGenerated),
                backgroundColor: getRandomColor(courses.length)
            }
        ],
    }
   
    // create options
    const options = {}

  return (
    <div className="text-white rounded-md p-6 md:w-[75%] bg-richblack-800">
      <p className="text-xl font-semibold">Visualise</p>
      <div className='flex my-3 gap-x-4 items-center'>
        <button 
            onClick={() => setCurrChart("students")}
            className={` ${currChart==="students" ? 'text-[#FFD60A] bg-richblack-700 py-1 px-2': 'text-[#9E8006]'} font-semibold`}
        >
            Student
        </button>
        <button  
            onClick={() => setCurrChart("income")}
            className={` ${currChart==="income" ? 'text-[#FFD60A] bg-richblack-700 py-1 px-2': 'text-[#9E8006]'} font-semibold`}
        >
            Income
        </button>
      </div>
      <div className="h-[450px] flex justify-center items-center">
        <Pie
            data={currChart==="students" ? chartDataForStudents : chartDataForIncome}
            options={options}
        />
      </div>
    </div>
  )
}

export default InstructorChart

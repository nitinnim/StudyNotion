import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { useSelector } from 'react-redux'

const ChipInput = (
    {name,
    label,
    register,
    errors,
    getValues,
    setValue,}
) => {
    const {editCourse, course} = useSelector((state) => state.course)
    const [chips, setChips] = useState([])

    useEffect(() => {
        if (editCourse) {
            // console.log(course)
            setChips(course?.tag)
        }
        {register(name,{required:true, validate: (value) => value.length > 0})}
        // eslint-disable-next-line react-hooks/exhaustive-deps

        // The eslint directive eslint-disable-next-line react-hooks/exhaustive-deps is added to suppress the dependency warning because setValue does not depend on any values from the outer scope. It only depends on the chips array within the same component.
    },[])

    useEffect(() => {
        setValue(name, chips)
        // eslint-disable-next-line react-hooks/exhaustive-deps

    },[chips])

    // insertion of chip
    const handleKeyDown = (e) => {
        if(e.key === 'Enter' || e.key === ','){
            e.preventDefault();
            const chipValue = e.target.value.trim();
            if(chipValue && !chips.includes(chipValue)){
                const newChip = ([...chips, chipValue])
                setChips(newChip);
                e.target.value = ""
            }
        }
    }

    // deletion of chip
    const handleDeleteChip = (ind) => {
        const updatedChips = [...chips];
        updatedChips.splice(ind, 1);
        setChips(updatedChips);
    }

  return (
    <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor={name}>{label} <sup className="text-pink-200">*</sup></label>

        <div className="flex w-full flex-wrap gap-y-2">
            {
                chips.length > 0 && (
                    chips.map((chip, ind) => (
                        <div key={ind} className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5">
                            {chip}
                            <button
                                type="button"
                                className="ml-2 focus:outline-none"
                                onClick={() => handleDeleteChip(ind)}
                                >
                                <MdClose className="text-sm" />
                            </button>
                        </div>
                    ))
                )
            }
            <input 
                type="text"
                name={name}
                id={name}
                className="form-style w-full"
                placeholder='Enter Tags for the course'
                onKeyDown={handleKeyDown}
            />
        </div>
        
        {
          errors[name] && (<span className="ml-2 text-xs tracking-wide text-pink-200">
            {label} are required
          </span>)
        }
      </div>
  )
}

export default ChipInput

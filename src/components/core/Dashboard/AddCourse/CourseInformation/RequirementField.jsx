import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { useSelector } from "react-redux";

const RequirementField = ({
  name,
  label,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const { editCourse, course } = useSelector((state) => state.course)
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  useEffect(() => {
    if(editCourse) {
      setRequirementList(course?.instructions)
    }
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
  }, []);

  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList]);

  function handleAddRequirement(e) {
    e.preventDefault();
    if (requirement.length > 0 && !requirementList.includes(requirement)) {
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  }

  function handleRemoveRequirement(ind) {
    const updatedList = [...requirementList];
    updatedList.splice(ind, 1);
    setRequirementList(updatedList);
  }

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          name={name}
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="form-style w-full"
          placeholder="Enter Requirements for the course"
        />

        <button
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>

      {requirementList.length > 0 && (
        <ul>
          {requirementList.map((requirement, ind) => (
            <li key={ind} className="flex gap-3 items-center text-richblack-5">
              <span>{requirement}</span>
              <TiDelete
                onClick={() => handleRemoveRequirement(ind)}
                className="ml-2 cursor-pointer text-xs text-pure-greys-300"
              />
            </li>
          ))}
        </ul>
      )}

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          Course Requirement is required
        </span>
      )}
    </div>
  );
};

export default RequirementField;

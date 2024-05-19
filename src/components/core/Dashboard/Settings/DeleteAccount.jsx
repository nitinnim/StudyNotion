import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProfile } from "../../../../services/operations/SettingsApi";

const DeleteAccount = () => {

  const {token} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12">
      <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
        <FiTrash2 className="text-3xl text-pink-200" />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-richblack-5">
          Delete Account
        </h2>
        <div className="w-3/5 text-pink-25">
          <p>Would you like to delete account?</p>
          <p>
            This account may contain Paid Courses. Deleting your account is
            permanent and will remove all the contain associated with it.
          </p>
        </div>
        <button
          type="button"
          className="w-fit p-4 px-6 mt-2 bg-[#D43D63] border-[2px] cursor-pointer border-white italic text-white"
          onClick={handleDeleteAccount}
        >
          I want to delete my account
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;

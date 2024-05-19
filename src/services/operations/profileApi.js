import { toast } from "react-hot-toast"

import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { profileEndpoints } from "../apis"
import { logout } from "./authAPI"
const { GET_USER_DETAILS_API, GET_INSTRUCTOR_DASHBOARD_DETAILS_API, GET_USER_ENROLLED_COURSES_API } = profileEndpoints

export async function getUserEnrolledCourses (token) {
    // console.log(token)
    const toastId = toast.loading("Loading...")
    let result = []
    try {
      // console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
      const response = await apiConnector(
        "GET",
        GET_USER_ENROLLED_COURSES_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )
      // console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
      // console.log(
      //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
      //   response
      // )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data
    } catch (error) {
      console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error.response.data)
      toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
}

export async function getInstructorData(token){
  const toastId = toast.loading("Loading...")
  let result = [];
  try{
    const res = await apiConnector(
      "GET",
      GET_INSTRUCTOR_DASHBOARD_DETAILS_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if(!res.data.success){
      throw new Error(res.data.message)
    }
    result = res.data.data;
  }
  catch(err){
    console.log("GET_INSTRUCTOR_DASHBOARD_DETAILS_API API ERROR............", err.response.data)
    toast.error("Could Not Get Instructor Details")
  }
  toast.dismiss(toastId);
  return result;
}
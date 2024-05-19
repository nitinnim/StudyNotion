import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";

import OpenRoute from "./components/core/auth/OpenRoute";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import Dashboard from "./Pages/Dashboard";
import About from "./Pages/About";
import ContactUs from "./Pages/ContactUs";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Error from "./Pages/Error";
import PrivateRoute from "./components/core/auth/PrivateRoute";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Settings from "./components/core/Dashboard/Settings";
import Cart from "./components/core/Dashboard/Cart";
import AddCourse from "./components/core/Dashboard/AddCourse";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./Pages/Catalog";
import CourseDetails from "./Pages/CourseDetails";
import ViewCourse from "./Pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  const {user} = useSelector((state) => state.profile)
  return (
    <div className="bg-richblack-900 w-screen min-h-screen relative flex flex-col font-inter">
      <Navbar/>

      <div>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="catalog/:catalogName" element={<Catalog/>} />
          <Route path="courses/:courseId" element={<CourseDetails/>} />

          <Route
            path="login" 
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />

          <Route
            path="signup" 
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
          />

          <Route
            path="about" 
            element={
              <OpenRoute>
                <About />
              </OpenRoute>
            }
          />

          <Route
            path="contact" 
            element={
              <OpenRoute>
                <ContactUs />
              </OpenRoute>
            }
          />

          <Route
            path="forgot-password" 
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
          />

          <Route
            path="update-password/:id" 
            element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
            }
          />

          <Route
            path="verify-email" 
            element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            }
          />

          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            {/* profile route */}
            <Route path="dashboard/my-profile" element={<MyProfile />}/>

            {/* setting */}
            <Route path="dashboard/settings" element={<Settings />}/>

            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                  {/* enrolled courses */}
                  <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />}/>

                    {/* enrolled courses */}
                    <Route path="dashboard/cart" element={<Cart />}/>
                </>
              )
            }

            {
              user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                  {/* add course */}
                  <Route path="dashboard/add-course" element={<AddCourse />}/>

                  {/* my course */}
                  <Route path="dashboard/my-courses" element={<MyCourses />}/>
                
                  {/* {edit course} */}
                  <Route path='dashboard/edit-course/:courseId' element={<EditCourse />} />

                  {/* Dashboard */}
                  <Route path="dashboard/instructor" element={<Instructor />}/>
                </>
              )
            }

          </Route>

          <Route
            element={
              <PrivateRoute>
                <ViewCourse />
              </PrivateRoute>
            }
          >
            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route
                    path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                    element={<VideoDetails />}
                  />
                </>
              )
            }
          </Route>


          <Route
            path="*"
            element={
              <Error />
            }
          />

        </Routes>
      </div>
    
      {/* <Footer></Footer> */}
    </div>
  );
}

export default App;

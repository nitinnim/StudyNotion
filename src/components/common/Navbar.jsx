import React, { useEffect, useState } from "react";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links.js";
import { Link, matchPath } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileDropDown from "../core/auth/ProfileDropDown.jsx";
import { IoIosArrowDown } from "react-icons/io";
import { apiConnector } from "../../services/apiconnector.js";
import { categories } from "../../services/apis";
import { AiOutlineMenu } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { TiHome } from "react-icons/ti";
import {setSidebar} from '../../slices/viewCourseSlice.js'
import SideBar from "../core/Dashboard/SideBar.jsx";
import { ACCOUNT_TYPE } from "../../utils/constants.js";
import { BsCart } from "react-icons/bs";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile); // profile yaa user (confusion)
  const { token } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [sidebar, setSidebar] = useState(false);
  const {sidebar} = useSelector((state) => state.viewCourse);

  function matchRoutes(route) {
    return matchPath({ path: route }, location.pathname);
  }

  const fetchSubLinks = async () => {
    try {
      setLoading(true);
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      // console.log("Result in navbar - ", result?.data?.data)
      setSubLinks(result?.data?.data);
    } catch (err) {
      console.log("Error in fethcing Categories -> " + err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  const handleSidebar = () => {
    console.log("inside function sidebar")
    dispatch(setSidebar(!sidebar));
  };

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : "bg-richblack-900"
      } transition-all duration-200 fixed w-full z-50`}
    >
      <div className="flex relative flex-row-reverse lg:flex-row items-center justify-between w-11/12 max-w-maxContent mx-auto">
        <Link to="/">
          <img src={Logo} width={160} height={42} loading="lazy" alt="Logo" />
        </Link>

        {/* navigation link */}
        <nav className="text-richblack-25 hidden lg:block">
          <ul className="flex gap-x-7">
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoutes("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <span className='rounded-full text-black p-0 bg-white'>
                        <IoIosArrowDown size={12} />
                      </span>
                      
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks && subLinks.length ? (
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.courses?.length > 0
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(/[^a-zA-Z0-9]/)
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={link?.path}>
                      <p
                        className={`${
                          matchRoutes(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* login/signup/dashboard */}
        <div className="gap-x-4 hidden lg:flex items-center">

          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative text-white">
              <BsCart size={25}/>
              <p className="absolute top-3 z-10 -right-2">
                {totalItems > 0 && <span className="text-xs font-semibold bg-[#424854] text-[#E7C009] rounded-full w-5 h-5 flex items-center justify-center">{totalItems}</span>}
              </p>
            </Link>
          )}

          {token === null && (
            <Link to="/login">
              <button className="border-richblack-700 border px-[12px] py-[8px] text-richblack-100 bg-richblack-800 rounded-md">
                Log in
              </button>
            </Link>
          )}

          {token === null && (
            <Link to="/signup">
              <button className="border-richblack-700 border px-[12px] py-[8px] text-richblack-100 bg-richblack-800 rounded-md">
                Sign up
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropDown />}
        </div>

        {/* menu button */}
        <button className="mr-4 lg:hidden" onClick={() => handleSidebar()}>
          {sidebar ? (
            <MdClose fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
          )}
        </button>

        {/* phone devices menubar */}
        {!token && sidebar && (
          <div className="bg-richblack-800 block md:hidden z-50 min-w-[252px] absolute min-h-[calc(100vh-3.5rem)] top-11 -left-4">
            <div className="py-4">
              {/* login/signup/dashboard */}
              <div className="gap-y-4 flex flex-col items-center">
                {user && user?.accountType !== "Instructor" && (
                  <Link to="/dashboard/cart" onClick={handleSidebar} className="relative text-white">
                    <BsCart />
                    {totalItems > 0 && <span>{totalItems}</span>}
                  </Link>
                )}

                {token === null && (
                  <Link to="/login" onClick={handleSidebar}>
                    <button className="border-richblack-700 border px-[12px] py-[8px] text-richblack-100 bg-richblack-800 rounded-md">
                      Log in
                    </button>
                  </Link>
                )}

                {token === null && (
                  <Link to="/signup" onClick={handleSidebar}>
                    <button className="border-richblack-700 border px-[12px] py-[8px] text-richblack-100 bg-richblack-800 rounded-md">
                      Sign up
                    </button>
                  </Link>
                )}
              </div>
            </div>

            <hr className="text-richblack-5" />

            {/* navigation link */}
            <nav className="text-richblack-25 mt-4 flex items-center justify-center mx-auto">
              <ul className="flex flex-col w-fit gap-y-7 justify-center items-center">
                {NavbarLinks.map((link, index) => {
                  return (
                    <li key={index}>
                      {link.title === "Catalog" ? (
                        <div
                          className={`group relative flex cursor-pointer items-center gap-1 ${
                            matchRoutes("/catalog/:catalogName")
                              ? "text-yellow-25"
                              : "text-richblack-25"
                          }`}
                        >
                          <p>{link.title}</p>
                          <span className='rounded-full text-black p-0 bg-white'>
                            <IoIosArrowDown />
                          </span>

                          <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                            <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                            {loading ? (
                              <p className="text-center">Loading...</p>
                            ) : subLinks && subLinks.length ? (
                              <>
                                {subLinks
                                  ?.filter(
                                    (subLink) => subLink?.courses?.length > 0
                                  )
                                  ?.map((subLink, i) => (
                                    <Link
                                      to={`/catalog/${subLink.name
                                        .split(/[^a-zA-Z0-9]/)
                                        .join("-")
                                        .toLowerCase()}`}
                                      className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                      key={i}
                                    >
                                      <p>{subLink.name}</p>
                                    </Link>
                                  ))}
                              </>
                            ) : (
                              <p className="text-center">No Courses Found</p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <Link
                          to={link?.path}
                          className={` ${
                            matchRoutes(link?.path)
                              ? "text-yellow-25"
                              : "text-richblack-25"
                          } flex gap-x-2 items-center`}
                          onClick={handleSidebar}
                        >
                          <span>{link.icon}</span>
                          {link.title}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </nav>

          </div>
        )}

        {token && sidebar && (
          <div className="bg-richblack-800 text-richblack-25 block md:hidden z-50 min-w-[252px] absolute min-h-[calc(100vh-3.5rem)] top-11 -left-4">
            <SideBar />
          </div>
        )}

        {sidebar && (<div className="top-14 z-10 absolute w-[100vw] h-[100vh]" onClick={handleSidebar}></div>)}
        
      </div>
    </div>
  );
};

export default Navbar;

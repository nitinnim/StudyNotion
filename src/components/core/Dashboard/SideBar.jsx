import React, { useEffect, useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import SideBarLink from "./SideBarLink";
import { useDispatch, useSelector } from "react-redux";
import { VscSignOut } from "react-icons/vsc";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../../services/operations/authAPI";
import ConfirmationModal from "../../common/ConfirmationModal";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { NavbarLinks } from "../../../data/navbar-links.js";
import { apiConnector } from "../../../services/apiconnector.js";
import { categories } from "../../../services/apis";
import { IoIosArrowDown } from "react-icons/io";
import { setSidebar } from "../../../slices/viewCourseSlice.js";
import { BsCart } from "react-icons/bs";

const SideBar = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { totalItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [confirmationModal, setConfirmationModal] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subLinks, setSubLinks] = useState([]);
  const { sidebar } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    fetchSubLinks();
  }, []);

  if (authLoading || profileLoading) {
    return (
      <div className="flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  const handleDropDown = () => {
    setDropdown((prev) => !prev);
  };

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

  const handleSidebars = () => {
    dispatch(setSidebar(!sidebar));
  };

  return (
    <>
      {/* for smaller devices */}
      {sidebar && (
        <div className="lg:hidden z-50 flex gap-y-4 flex-col min-w-[222px] bg-richblack-800 min-h-[calc(100vh-3.5rem)] fixed py-10 border-r-richblack-700">
          {/* user info */}
          <div
            className="flex flex-col mx-auto gap-y-3"
            onClick={handleSidebars}
          >
            {/* image */}
            <Link to="/dashboard/my-profile" className="flex gap-x-3">
              <img
                src={user?.image}
                className="rounded-full w-12 h-12"
                alt=""
              />

              <div>
                <p className="text-richblack-5 font-semibold">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-richblack-300 text-sm">{user.email}</p>
              </div>
            </Link>

            <div className="flex w-full mx-auto justify-center my-2">
              {/* cart */}
              <div className="flex w-fit relative mx-auto flex-col gap-y-4">
                {user && user?.accountType !== "Instructor" && (
                  <Link
                    to="/dashboard/cart"
                    onClick={handleSidebars}
                    className="flex w-fit justify-center relative text-center items-center gap-x-3 px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                  >
                    <BsCart size={20} />
                    Cart
                    <p className="absolute -top-2 right-11  z-10">
                      {totalItems > 0 && (
                        <span className="text-xs font-semibold bg-[#424854] text-[#E7C009] rounded-full w-4 h-4 flex items-center justify-center">
                          {totalItems}
                        </span>
                      )}
                    </p>
                  </Link>
                )}

                {/* logout */}
                <div
                  onClick={() => {
                    dispatch(logout(navigate));
                  }}
                  className="flex w-full items-center gap-x-3 px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                >
                  <VscSignOut size={20} className="text-lg" />
                  Logout
                </div>
              </div>
            </div>
          </div>

          {/* dashboard dropdown */}
          <div className="py-5 border-b border-t">
            <div
              onClick={() => handleDropDown()}
              className="w-full flex justify-center items-center gap-x-2"
            >
              <h3 className="font-semibold text-xl">Dashboard</h3>
              <span className="bg-transparent rounded-full border">
                <MdOutlineKeyboardArrowDown />
              </span>
            </div>
            {dropdown === true && (
              <div className="">
                <div className="flex mt-3 flex-col">
                  {sidebarLinks.map((link) => {
                    if (link.type && link.type !== user.accountType)
                      return null;
                    return (
                      <SideBarLink
                        link={link}
                        key={link.id}
                        iconName={link.icon}
                        onclick={handleSidebars}
                      />
                    );
                  })}
                </div>

                <div className="w-10/12 mx-auto h-[1px] bg-richblack-600 my-6"></div>

                <div className="flex relative flex-col">
                  {/* setting and logout */}
                  <div className="flex flex-col">
                    <SideBarLink
                      link={{ path: "/dashboard/settings", name: "settings" }}
                      iconName={"VscSettingsGear"}
                      onclick={handleSidebars}
                    />

                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Are You Sure?",
                          text2: "You will be logged out of your account",
                          btn1text: "Logout",
                          btn2text: "Cancel",
                          btn1Handler: () => dispatch(logout(navigate)),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                      className={`relative text-sm px-8 font-medium py-2 text-richblack-400`}
                    >
                      <div className="flex items-center gap-x-2">
                        <VscSignOut />
                        <p>Logout</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

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
                        <span className="rounded-full text-black p-0 bg-white">
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
                                    onClick={handleSidebars}
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
                        onClick={handleSidebars}
                      >
                        <span>{link.icon}</span>
                        {link.title}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}

      {/* for larger devices */}
      <div className="lg:flex hidden gap-y-4 flex-col z-10 min-w-[222px] bg-richblack-800 min-h-[calc(100vh-3.5rem)] fixed py-10 border-r-richblack-700">
        <div className="flex mt-3 flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && link.type !== user.accountType) return null;
            return (
              <SideBarLink link={link} key={link.id} iconName={link.icon} />
            );
          })}
        </div>

        <div className="w-10/12 mx-auto h-[1px] bg-richblack-600 my-6"></div>

        <div className="flex relative flex-col">
          {/* setting and logout */}
          <div className="flex flex-col">
            <SideBarLink
              link={{ path: "/dashboard/settings", name: "settings" }}
              iconName={"VscSettingsGear"}
            />

            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are You Sure?",
                  text2: "You will be logged out of your account",
                  btn1text: "Logout",
                  btn2text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className={`relative text-sm px-8 font-medium py-2 text-richblack-400`}
            >
              <div className="flex items-center gap-x-2">
                <VscSignOut />
                <p>Logout</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* confirmation modal */}
      <div>
        {confirmationModal && (
          <ConfirmationModal modalData={confirmationModal} />
        )}
      </div>
    </>
  );
};

export default SideBar;

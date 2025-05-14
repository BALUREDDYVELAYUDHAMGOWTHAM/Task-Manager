import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data';

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      setShowLogoutPopup(true); // Show confirmation popup
      return;
    }

    navigate(route);
  };

  const confirmLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  const cancelLogout = () => {
    setShowLogoutPopup(false);
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(user?.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA);
    }
  }, [user]);

  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-20'>
      <div className='flex flex-col items-center justify-center mb-7 pt-5'>
        <div className='relative'>
          <img
            src={user?.profileImageUrl || ""}
            alt="Profile"
            className='w-20 h-20 bg-slate-400 rounded-full'
          />
        </div>

        {user?.role === "admin" && (
          <div className='text-[10px] font-medium text-white bg-blue-700 px-3 py-0.5 rounded mt-1'>
            Admin
          </div>
        )}

        <h5 className='text-gray-950 font-medium leading-6 mt-3'>
          {user?.name || ""}
        </h5>
        <p className='text-[12px] text-gray-500'>{user?.email || ""}</p>
      </div>

      {sideMenuData.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu === item.label
              ? "text-blue-700 bg-blue-100/50 border-r-4 border-blue-700"
              : ""
          } py-3 px-6 mb-3 cursor-pointer`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="text-[13px] px-4 py-2 bg-blue-600 text-white rounded hover:bg-indigo-700 cursor-pointer"
              >
                Yes, Logout
              </button>
              <button
                onClick={cancelLogout}
                className="text-[13px] px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideMenu;

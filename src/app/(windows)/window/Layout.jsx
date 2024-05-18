"use client";
import React, { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ChildContainer from "./ChildContainer";
import useGetWindow from "../_hooks/getWindowElement";
import { useRouter } from "next/navigation";

const Layout = () => {
  const router = useRouter();

  // State for dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  // getting single profile data
  const { data: singleProfile, isLoading, refetch } = useGetWindow();
  console.log("singleProfile::");
  console.log(singleProfile);
  // Filter data by windowNumber
  const filterByWindowNumber = (data, windowNumber) => {
    return singleProfile?.filter((item) => item?.windowNumber === windowNumber);
  };

  // Get data for windowNumber 1
  const windowNumber1 = filterByWindowNumber(singleProfile, 1);

  // Get data for windowNumber 2
  const windowNumber2 = filterByWindowNumber(singleProfile, 2);

  // Get data for windowNumber 3
  const windowNumber3 = filterByWindowNumber(singleProfile, 3);

  return (
    <div className="container">
      <div className="relative z-50">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="font-bold p-5"
        >
          Profile (logout)
        </button>
        {isDropdownOpen && (
          <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl">
          <div className="py-1">
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-sm bg-emerald-200 z-50 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
        
        )}
      </div>
      <PanelGroup direction="vertical">
        <Panel>
          <PanelGroup direction="horizontal" className="hori">
            <Panel defaultSize={20} minSize={20} maxSize={75}>
              <ChildContainer
                number={1}
                name="child1"
                index={0}
                windowElement={windowNumber1}
              />
            </Panel>
            <PanelResizeHandle />
            <Panel defaultSize={50} minSize={20} maxSize={75}>
              <ChildContainer
                number={2}
                name="child2"
                index={1}
                windowElement={windowNumber2}
              />
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={40} minSize={20} maxSize={75}>
          <ChildContainer
            number={3}
            name="child3"
            index={2}
            windowElement={windowNumber3}
          />
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default Layout;

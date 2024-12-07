import React from "react";
import SideBarItem from "./SideBarItem";
import TwitterIcon from "../../icons/TwitterIcon";
import YoutubeIcon from "../../icons/YoutubeIcon";
import BrainLogo from "../../icons/BrainLogo";

const SideBar = () => {
  return (
    <div className="h-screen w-72 border-r fixed bg-white left-0 top-0 pl-6">
      <div className="flex text-2xl pt-8">
        <div className="pr-2">
            <BrainLogo />
        </div>
        Brainly
        </div>
        <div className="pt-8">
        <SideBarItem text="Twitter" icon={<TwitterIcon />} />
        <SideBarItem text="Youtube" icon={<YoutubeIcon />} />
        </div>
    </div>
  );
};

export default SideBar;

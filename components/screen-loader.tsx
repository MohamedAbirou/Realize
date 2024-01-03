"use client";
import { HashLoader } from "react-spinners";

const ScreenLoader = () => {
  return (
    <div
      className="
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
      <HashLoader size={70} color="#a262ff" />
    </div>
  );
};

export default ScreenLoader;

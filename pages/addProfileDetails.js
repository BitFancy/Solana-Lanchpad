import React, { useContext } from "react";
import LayoutDashbord from "../Components/LayoutDashbord";
import { InputText } from "primereact/inputtext";
import { LayoutContext } from "../layout/context/layoutcontext";
import { Button } from "primereact/button";

export default function AddProfileDetails() {
    const { layoutConfig } = useContext(LayoutContext);

  return (
    <LayoutDashbord>
      <div className="cover-img-back"></div>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: "-95px", left: "35px" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="150"
            height="150"
            viewBox="0 0 200 200"
            fill="none"
          >
            <circle cx="100" cy="100" r="99.5" fill="#D9D9D9" stroke="black" />
          </svg>
        </div>
      </div>
      <div className={`${layoutConfig.colorScheme === 'light' ? 'buy-back-image' : 'dark'}`}>
      <div className="back-color p-5" style={{width:'70%',margin:'0 auto',marginTop:'60px'}} >
        <div className="font-bold text-2xl">Add profile details</div>
        <div className="mt-5">Enter name</div>

        <div>
          <InputText
            className="p-2 mt-3 input-back w-full text-white"
          />
        </div>
        <div className="mt-5">Enter Bio</div>

        <div>
          <InputText
            className="p-2 mt-3 input-back w-full text-white"
          />
        </div>
        <div className="mt-5">Enter Email ID</div>

        <div>
          <InputText
            className="p-2 mt-3 input-back w-full text-white"
          />
        </div>
        <div className="mt-5">Enter Location</div>

        <div>
          <InputText
            className="p-2 mt-3 input-back w-full text-white"
          />
        </div>
        <div className="mt-5">Enter Twitter link</div>

        <div>
          <InputText
            className="p-2 mt-3 input-back w-full text-white"
          />
        </div>
        <div className="mt-5">Enter Instagram link</div>

        <div>
          <InputText
            className="p-2 mt-3 input-back w-full text-white"
          />
        </div>
        <div className="mt-5">Enter Discord ID</div>

        <div>
          <InputText
            className="p-2 mt-3 input-back w-full text-white"
          />
        </div>
        <div className="mt-5">
            <Button label="Create profile" rounded></Button>
        </div>
      </div>
     
      </div>
  
    </LayoutDashbord>
  );
}


import React from "react";


function AuthButtons({ AuthImage, AuthName, providers_Name , onclick }) {

    return (
        <div
            onClick={onclick}
            id="button-primary"
            className="lg:w-[350px] p-[10px] h-[60px] w-full mt-[20px] flex 225:inline flex-row items-center justify-between select-none cursor-pointer rounded-[10px] px-5"
        >
            <div className="w-auto h-full flex flex-row items-center ">
                <div className=" w-[40px] h-[40px] ">
                    <img src={AuthImage} width={40} height={40} alt={providers_Name} />
                </div>

            </div>
            <div>
                <span className=" W-0 225:w-[200px] text-gray-200  225:flex h-full  flex-row  items-center justify-start ml-[13px]  350:ml-[20px] text-[20px] 350:text-[18px] font-normal 350:font-medium mr-[18px]">
                    {AuthName}
                </span>
            </div>
        </div>
    );
}

export default AuthButtons;
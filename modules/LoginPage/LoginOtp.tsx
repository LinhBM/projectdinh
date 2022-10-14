import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Svg from "./Svg";
import { useSelector } from "react-redux";

function Countdown(stateTime, setStateTime) {
  useEffect(() => {
    let index = stateTime;
    setInterval(() => {
      if (index > 0) {
        index = index - 1;
        setStateTime(index);
        console.log(index);
      }
    }, 1000);
  }, []);
}

function LoginOtp() {
//   const storeLogin = useSelector((state) => state.storeLogin);
  const [stateTime, setStateTime] = useState(5);
  Countdown(stateTime, setStateTime);
//   storeLogin.map((get) => console.log(get));

  return (
    <div className="absolute w-[480px] h-[660px] top-0 right-0 bottom-0 left-0 m-auto bg-[#000000] border border-solid border-[#141414] rounded-2xl flex flex-col items-center">
      <h2 className="relative font-inter not-italic font-bold text-xl leading-6 tracking-[-0.26px] text-[#ffffff] mt-5 w-full flex justify-center items-center h-10">
        Liên kết tài khoản
        {/* <button className="w-6 h-6 absolute left-5">
          <FontAwesomeIcon icon={faAngleLeft} className="text-[#ffffff]" />
        </button> */}
      </h2>
      <div className="w-[218px] h-[218px] relative mt-2 flex items-center">
        <div className="absolute right-0 flex justify-center">
          <Svg.LoginOtpContainer />
          <div className="absolute top-[3.58px]">
            <Svg.LoginOtpInner />
          </div>
        </div>
        <div className="absolute w-[176.19px] h-[88.09px] bg-[#141414] z-10">
          <div>
            <div className="absolute left-5 mt-2">
              <Svg.LoginOtpShield />
            </div>
            <div className="absolute right-4 mt-[18.26px]">
              <div className="mb-2">
                <Svg.LoginOtpBarL />
              </div>
              <div>
                <Svg.LoginOtpBarS />
              </div>
            </div>
          </div>
          <div className="flex gap-x-1 w-full justify-center absolute bottom-3">
            <div>
              <Svg.LoginOtpBox />
            </div>
            <div>
              <Svg.LoginOtpBox />
            </div>
            <div>
              <Svg.LoginOtpBox />
            </div>
            <div>
              <Svg.LoginOtpBox />
            </div>
            <div>
              <Svg.LoginOtpBox />
            </div>
            <div>
              <Svg.LoginOtpBox />
            </div>
          </div>
        </div>
      </div>
      <p className="mt-8 text-[#ffffff] text-center font-inter not-italic font-normal text-base leading-[21px] tracking-[-0.408px]">
        Vui lòng nhập mã OTP đã được gửi về số điện thoại <br /> 0395179999
      </p>
      <div className="mt-8 flex flex-row w-full px-16 justify-between">
        <input className="w-[52px] h-[52px] bg-[#141414] rounded-[5.2px]" />
        <input className="w-[52px] h-[52px] bg-[#141414] rounded-[5.2px]" />
        <input className="w-[52px] h-[52px] bg-[#141414] rounded-[5.2px]" />
        <input className="w-[52px] h-[52px] bg-[#141414] rounded-[5.2px]" />
        <input className="w-[52px] h-[52px] bg-[#141414] rounded-[5.2px]" />
        <input className="w-[52px] h-[52px] bg-[#141414] rounded-[5.2px]" />
      </div>
      <div className="mt-4 font-inter not-italic font-bold text-[14px] leading-5 tracking-[-0.5px] text-[#D8D8DA]">
        <a href="#" className="">
          Gửi lại OTP
        </a>
        <span>&nbsp; {stateTime}</span>
      </div>
      <button className="w-[369px] h-10 bg-[#272728] rounded-[10px] flex flex-row justify-center items-center mt-8">
        Xác nhận
      </button>
    </div>
  );
}

export default LoginOtp;

import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Svg from "./Svg";
import { useDispatch, useSelector } from "react-redux";
// import { captcha } from "../../features/Captcha";

function LoginLinkAccount() {
//   const storeCaptcha = useSelector((state) => state.storeCaptcha);
  const dispatch = useDispatch();

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 w-[480px] h-[660px] m-auto bg-[#000000] border-[1px] border-solid border-[#141414] rounded-2xl flex flex-col items-center z-50">
      <h2 className="font-inter not-italic font-bold text-xl leading-6 tracking-[-0.26px] text-[#ffffff] mt-5 relative w-full flex justify-center items-center">
        Liên kết tài khoản
        <button className="absolute left-[29px]">
          <Svg.AngleLeft />
        </button>
      </h2>
      <div className="mt-7 relative flex justify-center items-center">
        <Svg.LoginContainer />
        <div className="absolute mt-[7.46px]">
          <Svg.LoginInner />
          <div className="absolute w-[62.71px] h-[62.71px] rounded-[50%] bg-[#272728] top-[58.23px] left-2/4 -translate-x-2/4 overflow-hidden">
            <div className="absolute top-[17.92px] left-[50%] -translate-x-2/4">
              <Svg.LoginHeader />
              <div className="absolute top-[5.97px] left-2/4 -translate-x-2/4">
                <Svg.LoginHeaderInner />
              </div>
            </div>
            <div className="absolute top-[44.08px] left-2/4 -translate-x-2/4">
              <Svg.LoginBody />
            </div>
          </div>
        </div>
      </div>
      <p className="mt-7 font-inter not-italic font-normal text-[16px] leading-[21px] tracking-[-0.408px] text-[#ffffff] text-center">
        Quý khách vui lòng liên kết tài khoản để xem các <br /> nội dung tính
        phí và đăng ký dịch vụ Myclip.
      </p>
      <form className="w-[369px] mt-8" onSubmit={(e) => e.preventDefault()}>
        <input
          className="w-full h-10 py-2 px-4 bg-[#141414] rounded-[10px] font-inter not-italic font-normal text-xs leading-[21px] tracking-[-0.408px] text-[#8A8B93]"
          placeholder="Số điện thoại"
        />
        <div className="flex w-full gap-3 mt-8">
          <input
            className="w-[177px] px-4 py-[9.5px] h-10 rounded-[10px] bg-[#141414] placeholder-[#8A8B93] text-[#8A8B93] text-base font-normal outline-none"
            placeholder="Mã captcha"
          />
          <div className="bg-white w-[132px] h-10 rounded-[10px] flex justify-center items-center">
            <span className="tracking-[6px] text-[21px] font-badscript font-bold">
              {/* {storeCaptcha} */}
            </span>
          </div>
          <button
            className="flex-1 flex justify-center items-center"
            // onClick={() => dispatch(captcha())}
          >
            <Svg.Reset />
          </button>
        </div>
        <button className="mt-8 flex justify-center items-center py-3 px-5 w-[369px] h-10 bg-[#272728] rounded-[10px]">
          <span className="font-inter not-italic font-bold text-base leading-[21px] tracking-[-0.408px] text-[#47474D]">
            Lấy mã OTP
          </span>
        </button>
      </form>
      <span className="mt-8 font-inter not-italic font-bold text-[14px] leading-[-0.5px] text-[#00CDB4]">
        Nhắc tôi liên kết tài khoản lần sau
      </span>
    </div>
  );
}

export default LoginLinkAccount;

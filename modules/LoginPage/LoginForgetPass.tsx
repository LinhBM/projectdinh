import React from "react";

function LoginForgetPass() {
  return (
    <div className="absolute w-[343px] h-[255px] top-0 right-0 bottom-0 left-0 m-auto bg-[#141414] rounded-xl flex flex-col items-center">
      <h2 className="mt-[21px] font-inter not-italic font-bold text-xl leading-6 tracking-[-0.26px] text-[#ffffff]">
        Đăng ký - Quên mật khẩu
      </h2>
      <p className="relative font-sans w-[259px] h-[94px] mt-5 not-italic font-normal text-[13px] leading-[18px] text-center tracking-[-0.078px] text-[#ffffff] after:content-['MK_gửi_9062'] after:absolute after:bottom-0 after:left-0 after:right-0 after:text-[#00CDB4] after:text-xl after:font-bold">
        Tính năng này hiện tại dành cho thuê bao Viettel, để đăng ký/lấy mật
        khẩu bạn vui
        <br /> lòng soạn:
      </p>
      <div className="mt-8 gap-4 flex flex-row">
        <button className="py-3 px-4 w-[136px] h-10 bg-[#272728] rounded-[10px] flex justify-center items-center">
          <span className="font-inter not-italic font-bold text-[16px] leading-[21px] tracking-[-0.408px] text-[#ffffff]">
            Hủy
          </span>
        </button>
        <button className="py-3 px-4 w-[136px] h-10 bg-[#00B6A0] rounded-[10px] flex justify-center items-center">
          <span className="font-inter not-italic font-bold text-[16px] leading-[21px] tracking-[-0.408px] text-[#ffffff]">
            Soạn tin nhắn
          </span>
        </button>
      </div>
    </div>
  );
}

export default LoginForgetPass;

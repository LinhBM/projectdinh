import Header from '@layout/Header'
import { getUsers } from '@redux/loginReducer'
import { ROUTES } from '@utility/constant'
import { type } from 'os'
import { useState } from 'react'
import Svg from './Svg'



export const LoginPage = ({users}) => {
    const [statePhone, setStatePhone] = useState('')
    let phone = true;
    const [statePassword, setStatePassword] = useState('')
    let password = true;
    const [stateCaptcha, setStateCaptcha] = useState('')

    for(let i = 0;i < statePhone.length; i++){
        if(statePhone[i] < String.fromCharCode(48) || statePhone[i] > String.fromCharCode(57)){
            phone = false
        }
    }
    
    for(let i = 0;i < statePassword.length;i++){
        if(statePassword[i] === " "){
            password = false
        }
    }

    let btnLogin = '';

    if(phone && password){
        btnLogin = "bg-[#00B6A0] text-[#ffffff] w-full h-10 rounded-[10px] text-base font-bold tracking-[-0.408px]"
    }else {
        btnLogin = "bg-[#272728] text-[#47474D] w-full h-10 rounded-[10px] text-base font-bold tracking-[-0.408px]"
    }

    let closeInputPhone, showInputPassword = ""
    phone ? closeInputPhone = "hidden" : closeInputPhone = "absolute bottom-0 right-0 w-16 h-10 flex justify-center items-center"
    // password ? showInputPassword = "hidden" : showInputPassword = "absolute bottom-0 right-0 w-16 h-10 flex justify-center items-center"
    let arr = ''
    const captcha = () =>{
        const captcha = ['q','w','e','r','t','y','u','i','o','p','l','k','j','h','g','f','d','s','a','z','x','c','v','b','n','m','Q','W','E','R','T','Y','U','I','O','P','L','K','J','H','G','F','D','S','A','Z','X','C','V','B','N','M','0','1','2','3','4','5','6','7','8','9']
        let captchaResult = ''
        for(let i = 0;i < 6;i++){
            captchaResult += captcha[Math.floor(Math.random() * captcha.length)]
        }
        setStateCaptcha(captchaResult)
        // arr = captchaResult
        return captchaResult
    }

    console.log(typeof users)
    
    return (
        <div className="font-inter absolute w-[480px] h-[716px] bg-[#000000] border border-solid border-[#141414] rounded-2xl m-auto top-0 right-0 bottom-0 left-0 z-50">
          <div className="absolute top-[22px] right-[22px]">
            <Svg.Close />
          </div>
          <h2 className="h-10 not-italic font-bold text-xl leading-6 flex items-center text-center tracking-[-0.26px] text-[#ffffff] mt-12 mb-10 justify-center">
            Đăng nhập
          </h2>
          <div className="flex flex-col items-center w-[369px] h-[575px] absolute left-[55.5px]">
            <form
              className="w-full flex flex-col"
              onSubmit={(e) => e.preventDefault()}
            >
            <div className='mb-4 relative'>
              <input
                type="text"
                placeholder="Số điện thoại"
                className="w-full px-4 py-[9.5px] h-10 rounded-[10px] bg-[#141414] placeholder-[#8A8B93] text-[#8A8B93] text-base font-normal outline-none "
                onChange={(e) => setStatePhone((e.target.value))}
                value={statePhone}
              />
                <button className={closeInputPhone} onClick={()=>setStatePhone("")}>
                  <Svg.Close />
                </button>
            </div>
              <div className="relative mb-4">
                <input
                  type="password"
                  placeholder="********"
                  className="w-full px-4 py-[9.5px] h-10 rounded-[10px] bg-[#141414] placeholder-[#8A8B93] text-[#8A8B93] text-base font-normal pr-4 outline-none"
                  onChange={(e) => setStatePassword(e.target.value)}
                />
                {/* <button className={showInputPassword}>
                  <Svg.ShowPass />
                </button> */}
              </div>
              {/* {mail !== "" ? (
                <p className="text-[#FF3B30] font-normal text-xs leading-[18px] text-center mb-10">
                  {mail}
                </p>
              ) : (
                ""
              )} */}
              <div className="flex w-full gap-3 mb-10">
                <input
                  className="w-[177px] px-4 py-[9.5px] h-10 rounded-[10px] bg-[#141414] placeholder-[#8A8B93] text-[#8A8B93] text-base font-normal outline-none"
                  placeholder="Mã captcha"
                  onChange={(e) => setStateCaptcha(e.target.value)}
                />
                <div className="bg-white w-[132px] h-10 rounded-[10px] flex justify-center items-center">
                  <span className="tracking-[6px] text-[21px] font-badscript font-bold text-[#000000]">
                    {stateCaptcha}
                  </span>
                </div>
                <button
                  className="flex-1 flex justify-center items-center"
                  onClick={() => (captcha())}
                >
                  <Svg.Reset />
                </button>
              </div>
              <div className="mb-10">
                <button
                    type="submit"
                    className={btnLogin}
                >
                    Đăng nhập
                </button>
              </div>
            </form>
            <span className="text-[#B0B0B8] not-italic font-normal text-base tracking-[-0.408px] mb-10">
              Hoặc đăng nhập bằng
            </span>
            <div className="flex gap-6 mb-10">
              <a href="#">
                <Svg.Facebook />
              </a>
              <a href="#">
                <Svg.Google />
              </a>
            </div>
            <div className="flex gap-x-4 not-italic font-bold text-sm text-[#00CDB4] tracking-[-0.5px] leading-5 mb-10">
              <a href="#" className="">
                Đăng ký
              </a>
              <span className="">/</span>
              <a href="#" className="">
                Quên mật khẩu
              </a>
            </div>
            <p className="not-italic font-normal text-[11px] leading-[18px] text-center tracking-[0.066px]">
              <span className="text-[#8A8B93]">
                Bằng việc đăng nhập, bạn đã đồng ý với
              </span>
              <br />
              <span className="text-[#FFD130]">Điều khoản sử dụng của Myclip</span>
            </p>
          </div>
        </div>
      );
}

export const getStaticProps = async () => {
    const users = await getUsers();
    return {
      props: { users },
    };
  };

export default LoginPage

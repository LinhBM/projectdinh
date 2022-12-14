import { useState } from 'react'
import Svg from './Svg'
import Link from 'next/link'
import LoginOtp from './LoginOtp'
import LoginPolicy from './policy'
import {setModal} from '@redux/modalReducer'
import { AppState } from '@redux/store'
import { useSelector, useDispatch } from 'react-redux'
import useGeneralHook from '@common/hook/useGeneralHook'

export const Login = () => {
    const [statePhone, setStatePhone] = useState('')
    let phone = true;
    const [statePassword, setStatePassword] = useState('')
    let password = true;
    const [stateCaptcha, setStateCaptcha] = useState('')
    const [stateGetCapt, setStateGetCapt] = useState('')
    const dispatch = useDispatch();
    

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
    (phone && password && statePhone.length === 10 &&statePassword.length >= 6) ? btnLogin = "bg-[#00B6A0] text-[#ffffff] w-full h-10 rounded-[10px] text-base font-bold tracking-[-0.408px]" : btnLogin = "bg-[#272728] text-[#47474D] w-full h-10 rounded-[10px] text-base font-bold tracking-[-0.408px]"
        
    let closeInputPhone, showInputPassword = ""
    phone ? closeInputPhone = "hidden" : closeInputPhone = "absolute bottom-0 right-0 w-16 h-10 flex justify-center items-center"
    password ? showInputPassword = "hidden" : showInputPassword = "absolute bottom-0 right-0 w-16 h-10 flex justify-center items-center"
    

    const [stateTypePassword,setStateTypePassword] = useState('password')
    const tog = () => stateTypePassword === 'password' ? setStateTypePassword('text') : setStateTypePassword('password')

    let captchaResult = ''
    const captcha = () =>{
        const captcha = ['q','w','e','r','t','y','u','i','o','p','l','k','j','h','g','f','d','s','a','z','x','c','v','b','n','m','Q','W','E','R','T','Y','U','I','O','P','L','K','J','H','G','F','D','S','A','Z','X','C','V','B','N','M','0','1','2','3','4','5','6','7','8','9']
        
        for(let i = 0;i < 6;i++){
            captchaResult += captcha[Math.floor(Math.random() * captcha.length)]
        }
        setStateCaptcha(captchaResult)
        return captchaResult
    }
    

    const user = {username: '0123456789', pass: '123456'}
    let index = 0;
    let phoneLogin, passwordLogin = false

    let loginWarning = ""
    const [stateWarn, setStateWarn] = useState(false)
    
    const loginClick = () => {
      statePhone === user.username ? phoneLogin = true : phoneLogin = false
      statePassword === user.pass ? passwordLogin = true : passwordLogin = false
      phoneLogin && passwordLogin ? console.log('ok') : index++
      if(index > 5 && stateGetCapt.length === 0){
        console.log('loi 403')
        captcha()
      }
      index > 5 && stateGetCapt.length > 0 && stateGetCapt !== stateCaptcha ? console.log('loi 400') : ''
      !phoneLogin || !passwordLogin ? setStateWarn(true) : setStateWarn(false)
      
      
      console.log('trong',loginWarning)
    }
    
   
    
    

    const { appState } = useGeneralHook()
    console.log(appState.auth.userData?.user)

    return (
        <div className="font-inter absolute w-[480px] h-[716px] bg-[#000000] border border-solid border-[#141414] rounded-2xl m-auto top-0 right-0 bottom-0 left-0 z-50">
            <div className="absolute top-[22px] right-[22px]">
                <Svg.Close />
            </div>
            <h2 className="h-10 not-italic font-bold text-xl leading-6 flex items-center text-center tracking-[-0.26px] text-[#ffffff] mt-12 mb-10 justify-center">
            ????ng nh???p
            </h2>
            <div className="flex flex-col items-center w-[369px] h-[575px] absolute left-[55.5px]">
            <form
              className="w-full flex flex-col"
              onSubmit={(e) => e.preventDefault()}
            >
            <div className='mb-4 relative'>
              <input
                type="text"
                placeholder="S??? ??i???n tho???i"
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
                  type={stateTypePassword}
                  placeholder="********"
                  className="w-full px-4 py-[9.5px] h-10 rounded-[10px] bg-[#141414] placeholder-[#8A8B93] text-[#8A8B93] text-base font-normal  outline-none"
                  onChange={(e) => setStatePassword(e.target.value)}
                />
                <button className={showInputPassword} onClick={tog}>
                  <Svg.ShowPass />
                </button>
              </div>
              {stateWarn ? (
            <p className="text-[#FF3B30] font-normal text-xs leading-[18px] text-center mb-10">
              S??? ??i???n tho???i ho???c m???t kh???u ch??a ch??nh x??c.
            </p>
            ) : (
              ""
            )}
              <div className="flex w-full gap-3 mb-10">
                <input
                  className="w-[177px] px-4 py-[9.5px] h-10 rounded-[10px] bg-[#141414] placeholder-[#8A8B93] text-[#8A8B93] text-base font-normal outline-none"
                  placeholder="M?? captcha"
                  onChange={(e) => setStateGetCapt(e.target.value)}
                />
                <div className="bg-white w-[132px] h-10 rounded-[10px] flex justify-center items-center">
                  <span className="tracking-[6px] text-[21px] font-badscript font-bold text-[#000000]">
                    {stateCaptcha}
                  </span>
                </div>
                <button
                  className="flex-1 flex justify-center items-center"
                  onClick={captcha}
                >
                  <Svg.Reset />
                </button>
              </div>
              <div className="mb-10">
                <button type="submit" className={btnLogin} onClick={loginClick}>
                    ????ng nh???p
                </button>
              </div>
            </form>
            <span className="text-[#B0B0B8] not-italic font-normal text-base tracking-[-0.408px] mb-10">
              Ho???c ????ng nh???p b???ng
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
                ????ng k??
              </a>
              <span className="">/</span>
              <a href="#" className="">
                Qu??n m???t kh???u
              </a>
            </div>
            <p className="not-italic font-normal text-[11px] leading-[18px] text-center tracking-[0.066px]">
              <span className="text-[#8A8B93]">
                B???ng vi???c ????ng nh???p, b???n ???? ?????ng ?? v???i
              </span>
              <br />
              <span className="text-[#FFD130]">??i???u kho???n s??? d???ng c???a Myclip</span>
            </p>
            </div>
        </div>
    );
    
}

export default Login

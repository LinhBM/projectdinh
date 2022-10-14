import Header from '@layout/Header'
import { ROUTES } from '@utility/constant'
import Login from './Login'
import LoginForgetPass from './LoginForgetPass'
import LoginLinkAccount from './LoginLinkAccount'
import LoginOtp from './LoginOtp'
import Policy from './policy'

interface Props {}

let index = ''

const LoginPage = () => {
    return (
        <>
        {index !== "" ? <LoginLinkAccount /> : <Login />}
        </>
    )
}

export default LoginPage
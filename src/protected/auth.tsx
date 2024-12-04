import {useRouter} from "next/router"
import {useEffect, useState} from "react"
import secureLocalStorage from "react-secure-storage";

const Auth = (WrapperComponent: any) => {
    // eslint-disable-next-line react/display-name
    return (props: any) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const router = useRouter();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isAuth, setIsAuth] = useState(false)

        const handleAuth = () => {
            const isLogin = secureLocalStorage.getItem('is_login')
            if (isLogin) {
                setIsAuth(true)
            } else {
                router.push('/auth')
            }
        }

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            handleAuth()
        }, [])

        if (isAuth) return <WrapperComponent {...props} />
        else return null
    }
};

export default Auth;
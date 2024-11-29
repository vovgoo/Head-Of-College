import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { fetchLogin } from "../axios/axiosApi";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import IMAGES from "../consts/Images";
import ROUTES from "../consts/routes";

const LoginPage = () => {

    const { isVisible, elementRef } = useIntersectionObserver();
    const { login, isAuth } = useAuth();
    const [redirectToDashboard, setRedirectToDashboard] = useState(false);
    const [error, setError] = useState(null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSecondAnimation, setIsSecondAnimation] = useState(false);
    const [isThirdAnimation, setIsThirdAnimation] = useState(false);

    useEffect(() => {
        if(isAuth  && isAuth !== null) {
            setRedirectToDashboard(true)
        }
    }, [isAuth])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await fetchLogin({username, password})
            localStorage.setItem('token', data.token);
            login(data.token);
            setRedirectToDashboard(true);
        } catch {
            setError("Неверный логин или пароль. Проверьте данные.");
        }
    };

    if (redirectToDashboard) {
        return <Navigate to={"/admin" + ROUTES.DASHBOARD} replace />;
    }

    const handleFirstTransitionEnd = () => {
        if (isVisible) {
            setIsSecondAnimation(true);
        }
    };

    const handleSecondTransitionEnd = () => {
        if (isSecondAnimation) {
            setIsThirdAnimation(true);
        }
    };

    return (
        <div className="w-full h-dvh glass-black flex items-center justify-center max-md:pb-20 max-md:pt-32">
            <div
                ref={elementRef}
                onTransitionEnd={isSecondAnimation ? handleSecondTransitionEnd : handleFirstTransitionEnd}
                className={`transition-all overflow-hidden duration-500 max-2xl:w-4/6 max-lg:w-5/6 max-md:h-full max-sm:w-full max-sm:mx-5 ${isVisible ? 'w-3/6' : 'w-0'
                    } h-4/6 bg-white shadow-beautiful rounded-xl flex`}
            >
                <div className={`w-1/2 max-md:hidden rounded-xl bg-black relative overflow-hidden duration-500 transition-all h-full max-2xl:translate-y-0 ${isSecondAnimation ? '' : 'translate-y-full'}`}>
                    <h1 className={`text-5xl w-full ml-10 font-semibold mt-32 text-white absolute z-10 glow duration-400 transition-all max-2xl:translate-x-0 ${isThirdAnimation ? '' : '-translate-x-full'}`}>Добро <br /> пожаловать!</h1>
                    <h1 className={`text-xl w-full ml-10 mt-64 pr-20 text-white absolute z-10 glow duration-500 transition-all max-2xl:translate-x-0 ${isThirdAnimation ? '' : '-translate-x-full'}`}>Для продложения работы необходимо атворизоваться.</h1>
                    <img src={IMAGES.LOGIN_BACKGROUND} className="opacity-50 blur-sm absolute top-1/2 -translate-y-1/2" alt=""/>
                    <img src={IMAGES.LOGIN_PICTURE} className={`-scale-x-100 w-96 absolute -right-10 -bottom-14 bounce-animation duration-500 transition-all glowing-anim max-2xl:translate-y-0 ${isThirdAnimation ? '' : 'translate-y-full'}`} alt="" />
                </div>
                <form onSubmit={handleSubmit} className="w-1/2 max-md:w-full h-full flex flex-col items-center px-10 py-16 max-sm:py-10 justify-between">
                    <div className="w-full flex flex-col items-center">
                        <h1 className={`font-bold text-3xl mb-16 max-sm:mb-5 duration-200 transition-all max-sm:text-xl max-2xl:translate-y-0 ${isThirdAnimation ? '' : '-translate-y-96'}`}>Авторизация</h1>
                        <div className="flex flex-col gap-y-5 w-full">
                            <div className={`w-full duration-400 transition-all max-2xl:translate-x-0 ${isThirdAnimation ? '' : 'translate-x-custom-translate'}`}>
                                <h1 className="font-bold text-xl mb-3 max-sm:text-base">Логин</h1>
                                <input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="example@gmail.com" 
                                    type="text" 
                                    id="large-input" 
                                    className={`font-semibold h-12 max-sm:h-10 block w-full p-4 text-black border-2 border-gray-300 rounded-lg bg-gray-50 text-base outline-none hover:border-green-500 focus:border-green-500 transition-all duration-300`}>
                                </input>
                            </div>
                            <div className={`w-full duration-500 transition-all max-2xl:translate-x-0 ${isThirdAnimation ? '' : 'translate-x-custom-translate'}`}>
                                <h1 className="font-bold text-xl mb-3 max-sm:text-base">Пароль</h1>
                                <input 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="qwerty123"
                                    type="password"
                                    id="large-input"
                                    className={`font-semibold h-12 max-sm:h-10 block w-full p-4 text-black border-2 border-gray-300 rounded-lg bg-gray-50 text-base outline-none hover:border-green-500 focus:border-green-500 transition-all duration-300`}>
                                </input>
                            </div>
                        </div>
                    </div>
                    <div className="w-full overflow-hidden">
                        <div className={`w-full mt-2 flex items-center h-24 max-md:h-24 rounded-lg border-2 border-red-500 bg-red-300 overflow-hidden duration-300 transition-all mb-5 ${error !== null ? "opacity-100" : "-translate-y-10 opacity-0"}`}>
                            <div className="w-1/4 h-full flex items-center justify-center">
                                <img src={IMAGES.SECUIRY_IMAGE} className={`h-32 w-32 max-h-32 max-w-32 max-md:h-28 -rotate-12 duration-300 transition-all  ${error !== null ? "translate-x-0" : "-translate-x-52"}`} alt="" />
                            </div>
                            <div className="w-3/4 h-full flex flex-col justify-around px-5 py-1">
                                <h1 className={`font-bold tracking-widest text-xl w-full text-center transition-all duration-300 max-md:text-base ${error !== null ? "translate-y-0" : "translate-y-10 opacity-0"}`}>Ошибка</h1>
                                <h1 className={`font-semibold text-sm w-full text-center transition-all duration-300 max-md:text-xs ${error !== null ? "translate-y-0" : "translate-y-10 opacity-0"}`}>{error}</h1>
                            </div>
                        </div>
                        <button type="submit" className={`w-full flex items-center justify-center bg-black rounded text-white py-2 mb-5 duration-700 transition-all hover:bg-green-500 font-bold max-2xl:translate-y-0 ${isThirdAnimation ? '' : 'translate-y-96'}`}>Войти</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;

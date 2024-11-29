import React from "react";
import useIntersectionObserver from "../../hooks/useIntersectionObserver"
import LogoSection from "./Sections/LogoSection";
import NavigationLinks from "./Sections/NavigationLinks";
import AuthLink from "./Sections/AuthLink";

const Header = ({className}) => {
    const { isVisible, elementRef } = useIntersectionObserver();

    return (
        <div ref={elementRef} className={`z-10 pb-5 w-full bg-transparent ${className}`}>
            <div className={`flex w-full transition-all duration-1000 overflow-x-hidden  ${isVisible ? '' : 'opacity-0 -translate-y-full'}`}>
                <LogoSection/>
                <NavigationLinks/>
                <AuthLink/>
            </div>
        </div>
    );
}

export default Header;

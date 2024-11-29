import React from "react";
import WelcomeSection from "../components/HomePage/WelcomeSection";
import StudyTopicCard from "../components/HomePage/StudyTopicCard";
import StudyTopicsSection from "../components/HomePage/StudyTopicsSection";

const HomePage = () => {
    return (
        <div className="w-full glass-black pt-20 overflow-hidden">
            <WelcomeSection/>
            <StudyTopicCard/>
            <StudyTopicsSection/>
        </div>
    )
}

export default HomePage;

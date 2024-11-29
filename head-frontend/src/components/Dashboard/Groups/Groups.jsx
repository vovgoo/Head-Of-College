import React from "react";
import GroupStats from "./GroupStats";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";

const Groups = ({ data }) => {

    const { isVisible, elementRef } = useIntersectionObserver();

    return (
        <div ref={elementRef} className="w-full">
            <h1 className={`text-xl font-bold my-10 w-full text-center duration-300 transition-all ${isVisible ? "" : "translate-y-full opacity-0"}`}>Статистика по группам отделения "Информационные системы и технологии"</h1>
            <div className="flex flex-wrap w-full justify-between pb-10 gap-y-10 overflow-hidden">
                {data && data.groups && data.groups.map((group, index) => (
                    <GroupStats
                        key={index}
                        isVisible={isVisible}
                        name={group.name}
                        add1={group.specialty}
                        add2={group.totalStudents}
                        add3={group.averageScore}
                        add4={group.studentsWithBonuses}
                        add5={group.studentsWithPenalties}
                        add6={group.score1}
                        add7={group.score2}
                        add8={group.score3}
                        add9={group.score4}
                        add10={group.score5}
                        add11={group.score6}
                        add12={group.score7}
                        add13={group.score8}
                        add14={group.score9}
                        add15={group.score10}
                    />
                ))}
            </div>
        </div>
    );
}

export default Groups;

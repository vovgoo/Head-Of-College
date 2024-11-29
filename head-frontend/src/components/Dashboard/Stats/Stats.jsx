import React from "react";
import AllStats from "../Stats/AllStats"
import IMAGES from "../../../consts/Images";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";

const Stats = ({ data }) => {

    const { isVisible, elementRef } = useIntersectionObserver();

    return (
        <div ref={elementRef}>
            <h1 className={`text-xl font-bold my-10 w-full text-center duration-700 transition-all ${isVisible ? "transate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>Общая статистика</h1>
            <div className={`flex flex-wrap w-full justify-between gap-y-10 max-lg:grid max-lg:grid-cols-1`}>
                <AllStats isVisible={isVisible} name={"Общее количество учащихся"} img={IMAGES.STATS_1} count={data && data.dashboard && data.dashboard.total_students} />
                <AllStats isVisible={isVisible} name={"Количество учащихся за которыми закреплены темы дипломных работ в 2024 году"} img={IMAGES.STATS_2} count={data && data.dashboard && data.dashboard.students_with_theses} />
                <AllStats isVisible={isVisible} name={"Количество групп на отделение 'Информационные системы и технологии'"} img={IMAGES.STATS_3} count={data && data.dashboard && data.dashboard.total_groups} />
                <AllStats isVisible={isVisible} name={"Количество студентов имеющих дисциплинарное взыскание"} img={IMAGES.STATS_4} count={data && data.dashboard && data.dashboard.students_with_discipline} />
                <AllStats isVisible={isVisible} name={"Количество студентов получающих надбавку к стипендии"} img={IMAGES.STATS_5} count={data && data.dashboard && data.dashboard.students_with_bonus} />
                <AllStats isVisible={isVisible} name={"Количество учащихся, которые не получают стипендию"} img={IMAGES.STATS_6} count={data && data.dashboard && data.dashboard.students_without_scholarship} />
                <AllStats isVisible={isVisible} name={"Количество студентов, балл которых выше 9.0"} img={IMAGES.STATS_7} count={data && data.dashboard && data.dashboard.students_above_9} />
            </div>
        </div>
    );
}

export default Stats;

import React from 'react'
import IMAGES from '../../consts/Images';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import TableInfoRow from "./TableInfoRow"

const InitialBlock = ({ table, data }) => {

    const { isVisible, elementRef } = useIntersectionObserver();

    const fieldName = (value) => {
        switch (table) {
            case "надбавки":
                return `${value.students.surname} ${value.students.name} ${value.students.fathername}`;
            case "группы":
                return value.name;
            case "заметки":
                return value.name;
            case "взыскания":
                return `${value.students.surname} ${value.students.name} ${value.students.fathername}`;
            case "диапазон_стипендий":
                return `Диапазон ${value.lower} - ${value.upper}`;
            case "специальности":
                return value.name;
            case "студенты":
                return `${value.surname} ${value.name} ${value.fathername}`;
            case "темы_дипломных_работ":
                return value.description;
            case "пользователи":
                return `${value.surname} ${value.name} ${value.fathername}`;
            default: return null;
        }
    }

    return (
        <div ref={elementRef}>
            <div className={`w-full bg-black h-52 rounded-tr-xl rounded-tl-xl relative flex items-center justify-center overflow-hidden duration-700 transition-all ${isVisible ? "" : "-translate-y-full "}`}>
                <img src={IMAGES.ROW_INFO} className='w-full absolute blur-xl' alt="" />
                <div className='w-full h-full bg-black absolute opacity-30' />
                <h1 className="text-2xl font-bold tracking-wide text-center px-28 text text-white glow max-md:px-10 max-md:text-xl max-sm:text-lg">Сведения о "{fieldName(data?.fields?.[0])}" из таблицы {table.replace(/_/g, " ").replace(/^./, (char) => char.toUpperCase())}</h1>
            </div>
            <TableInfoRow data={data} title={"Общая информация"} />
        </div>
    )
}

export default InitialBlock;

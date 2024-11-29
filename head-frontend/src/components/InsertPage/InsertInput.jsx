import React from 'react';
import { UploadPhoto } from '../../consts/Icons';

const InsertInput = ({ title, type, value = "", onChange, className }) => {

    const inputType = type === "LocalDateTime" ? "datetime-local" : type || "text";

    let placeholder = "Введите значение";


    const handleChange = (e) => {
        let newValue = e.target.value;

        if (type === "Double" || type === "Integer" || type === "Long") {
            let regex;

            if (type === "Integer" || type === "Long") {
                regex = /^[+]?\d+$/;
            }

            if (type === "Double") {
                regex = /^\d{0,10}(\.\d{0,2}){0,1}$/;
            }

            if (!regex.test(newValue) && newValue !== "") {
                return;
            }
        }

        onChange(newValue);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
    
            reader.onloadend = async () => {
                const base64Result = reader.result;
    
                try {
                    const fileName = await generateFileName(file);
                    onChange({
                        name: fileName,
                        photo: base64Result,
                    });
                } catch (error) {
                    console.error('Ошибка при генерации имени файла:', error);
                }
            };
    
            reader.readAsDataURL(file);
        }
    };    

    function generateFileName(file) {
        if (!file || !file.name) return '';

        const originalName = file.name;
        const extension = originalName.substring(originalName.lastIndexOf('.'));
        const baseName = originalName.substring(0, originalName.lastIndexOf('.'));
        const currentDate = new Date().toISOString();
        const uniqueString = `${baseName}_${currentDate}`;

        return crypto.subtle.digest('SHA-256', new TextEncoder().encode(uniqueString)).then(hashBuffer => {
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            return `${hashHex}${extension}`;
        });
    }

    const handleRemoveImage = () => {
        onChange(null);
    };

    return (
        title.startsWith("Фото") ?
            (
                <div className="w-full flex flex-col gap-y-2 py-5">
                    <h1 className='text-lg font-semibold text-wide text-center'>{title}</h1>
                    {value ? (
                        <div className='w-full shadow-beautiful flex items-center justify-center flex-col rounded-xl hover:border-green-500 transition-all duration-300 bg-white px-10 border-2 border-gray-400'>
                            <h1 className='font-semibold text-black text-lg w-full text-center mt-5'>Ваша фотография</h1>
                            <div className='h-32 w-32 mt-5 rounded-full overflow-hidden shadow-beautiful'>
                                <img src={value.photo} className='h-full w-full object-cover' alt="" />
                            </div>
                            <div className="flex items-center my-5 w-full">
                                <button
                                    onClick={handleRemoveImage}
                                    className="my-5 p-2 w-full text-center font-bold text-lg rounded-lg cursor-pointer focus:outline-none border-4 border-gray-400 hover:border-green-500 focus:border-green-500 duration-300 transition-all border-dashed"
                                >
                                    Удалить фото
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className='w-full shadow-beautiful flex items-center justify-center flex-col rounded-xl hover:border-green-500 transition-all duration-300 bg-white px-10 border-2 border-gray-400'>
                            <UploadPhoto className={"mt-10 mb-10"} />
                            <h1 className='font-semibold text-black text-lg w-full text-center'>Выберите фото</h1>
                            <h1 className='font-semibold text-gray-600 text-base mt-3 text-center'>Расширение фотографии должно быть JPG или PNG</h1>
                            <div className="flex items-center my-5 w-full">
                                <label
                                    for="file-upload"
                                    className="my-5 p-2 w-full text-center font-bold text-lg rounded-lg cursor-pointer focus:outline-none border-4 border-gray-400 hover:border-green-500 focus:border-green-500 duration-300 transition-all border-dashed"
                                >
                                    Выберите файл
                                </label>
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="hidden"
                                    accept=".jpg, .png"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className={` ${className ? className : "w-45 max-sm:w-full"} flex flex-col gap-y-2 py-5`}>
                    <h1 className='text-lg font-semibold text-wide text-center'>{title}</h1>
                    <input
                        type={inputType}
                        value={value}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className='border-2 border-gray-400 text-black outline-none transition-all duration-300 hover:border-green-500 focus:border-green-500 bg-white rounded-xl shadow-beautiful font-semibold text-lg px-5 py-2'
                    />

                </div>
            )

    );
};

export default InsertInput;

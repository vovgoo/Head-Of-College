import React, { useEffect, useState } from 'react';

const Notification = ({ title, message, type, onClose }) => {

  const [timer, setTimer] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(null);
  }, [onClose, timer]);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 300);

    setTimeout(() => {
      setIsVisible(false);
    }, 2700);

    const newTimer = setTimeout(() => {
      onClose();
    }, 3000);

    setTimer(newTimer);

    return () => {
      clearTimeout(newTimer);
    };
  }, [onClose])

  return (
    <div className={`fixed top-10 right-10 ${type === "success" ? "bg-green-200" : "bg-red-200"}  overflow-hidden rounded-xl duration-500 transition-all ${isVisible ? "" : "translate-x-full opacity-0"}`}>
      <div className='flex mx-3'>
        <div className='w-24 flex items-center justify-center py-5'>
          <div className='bg-white flex p-2 items-center justify-center rounded-lg'>
            {type === "success" ? (
              <svg xmlns="http://www.w3.org/2000/svg" className='fill-green-500' width="30px" height="30px" viewBox="0 0 512 512" version="1.1">
                <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd">
                  <g id="add-copy" transform="translate(42.666667, 42.666667)">
                    <path d="M213.333333,3.55271368e-14 C95.51296,3.55271368e-14 3.55271368e-14,95.51296 3.55271368e-14,213.333333 C3.55271368e-14,331.153707 95.51296,426.666667 213.333333,426.666667 C331.153707,426.666667 426.666667,331.153707 426.666667,213.333333 C426.666667,95.51296 331.153707,3.55271368e-14 213.333333,3.55271368e-14 Z M213.333333,384 C119.227947,384 42.6666667,307.43872 42.6666667,213.333333 C42.6666667,119.227947 119.227947,42.6666667 213.333333,42.6666667 C307.43872,42.6666667 384,119.227947 384,213.333333 C384,307.43872 307.438933,384 213.333333,384 Z M293.669333,137.114453 L323.835947,167.281067 L192,299.66912 L112.916693,220.585813 L143.083307,190.4192 L192,239.335893 L293.669333,137.114453 Z" id="Shape">

                    </path>
                  </g>
                </g>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className='fill-red-500' width="30px" height="30px" viewBox="0 0 24 24">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.5-5.009c0-.867.659-1.491 1.491-1.491.85 0 1.509.624 1.509 1.491 0 .867-.659 1.509-1.509 1.509-.832 0-1.491-.642-1.491-1.509zM11.172 6a.5.5 0 0 0-.499.522l.306 7a.5.5 0 0 0 .5.478h1.043a.5.5 0 0 0 .5-.478l.305-7a.5.5 0 0 0-.5-.522h-1.655z" />
              </svg>
            )}
          </div>
        </div>
        <div className='flex flex-col px-3 w-full gap-y-1 justify-center'>
          <h1 className='font-bold select-none'>{title}</h1>
          <h1 className='select-none'>{message}</h1>
        </div>
        <div className='w-24 flex items-center justify-center py-5'>
          <div onClick={onClose} className='flex p-2 items-center justify-center rounded-lg'>
            <svg xmlns="http://www.w3.org/2000/svg" className='cursor-pointer stroke-gray-500 duration-300 transition-all hover:stroke-black' width="30px" height="30px" viewBox="0 0 24 24" fill="none">
              <g clipPath="url(#clip0_429_11083)">
                <path d="M7 7.00006L17 17.0001M7 17.0001L17 7.00006" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;

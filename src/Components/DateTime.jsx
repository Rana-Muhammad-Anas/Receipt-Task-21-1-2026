import React from 'react'
import { useState,useEffect } from 'react';

function DateTime() {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    return (
        <div className="bg-blue-100 text-blue-800 px-3 sm:px-4 py-2 rounded-lg w-full sm:w-auto print:bg-gray-100 print:text-black">
            <div className="font-bold text-sm sm:text-base">
                {now.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </div>
            <div className="text-xs sm:text-sm">
                {now.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                })}
            </div>
        </div>
    )
}

export default DateTime;

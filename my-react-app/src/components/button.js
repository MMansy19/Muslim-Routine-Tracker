import React, { useState } from 'react';
import CalendarDemo from "./calender.tsx";

export default function ButtonWithCalendar() {
    const [showCalendar, setShowCalendar] = useState(false);

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    }

    return (
        <>
        
        <div
          style={{
              display: "grid",
              justifyContent: "center",
              alignItems: "center",
            }}
            >
            <button className="" onClick={toggleCalendar}>
                <h1 className="bio__heading">اختر يومًا 
                &nbsp;
                <img className="contact__social contact__social-calendar" src="..\images\calendar-search-svgrepo-com.svg" alt="calendar"/>
                </h1>
            </button>
            {showCalendar && <CalendarDemo />}
        </div>
            </>
    );
}

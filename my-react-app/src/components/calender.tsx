import { useState } from "react";
import { format } from "date-fns";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function CalendarDemo() {
  const [selected, setSelected] = useState<Date>();

  let footer = <p dir="rtl">يرجى اختيار يوم.</p>;
  if (selected) {
    footer = <p dir="rtl">لقد اخترت {format(selected, "PP")}.</p>;
  }
  return (
    <>
      <div className="calendar">
        <DayPicker
          dir="ltr"
          mode="single"
          selected={selected}
          onSelect={setSelected}
          footer={footer}
        />
      </div>
    </>
  );
}

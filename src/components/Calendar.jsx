import React, { useState } from "react";
import dayjs from "dayjs";
import events from "../data/events.json";
import "./Calendar.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const startDay = currentDate.startOf("month");
  const endDay = currentDate.endOf("month");
  const daysInMonth = endDay.date();
  const firstWeekday = startDay.day(); // 0 = Sunday

  const weeks = [];
  let week = Array(firstWeekday).fill(null);

  for (let date = 1; date <= daysInMonth; date++) {
    week.push(startDay.date(date));
    if (week.length === 7 || date === daysInMonth) {
      while (week.length < 7) week.push(null);
      weeks.push(week);
      week = [];
    }
  }

  const getEvents = date => events.filter(ev => dayjs(ev.date).isSame(date, "day"));

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}>◀</button>
        <h2>{currentDate.format("MMMM YYYY")}</h2>
        <button onClick={() => setCurrentDate(currentDate.add(1, "month"))}>▶</button>
      </div>
      <div className="calendar-grid">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
          <div className="day-name" key={d}>{d}</div>
        ))}
        {weeks.flat().map((date, idx) => {
          if (!date)
            return <div className="calendar-cell empty" key={idx} />;
          const isToday = dayjs().isSame(date, "day");
          const dateEvents = getEvents(date);
          return (
            <div className={`calendar-cell ${isToday ? "today" : ""}`} key={date.toString()}>
              <div className="date-number">{date.date()}</div>
              {dateEvents.map((ev, i) => (
                <div key={i} className="event">
                  <strong>{ev.title}</strong>
                  <div>{ev.time} ({ev.duration})</div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;

import { useState, useEffect } from 'react';
import './displaymonth.styles.scss';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addDays,
  getDay,
  format,
} from 'date-fns';

export default function DisplayMonth({ date, preferences, changeTime }: any) {
  const [today, setToday] = useState<Date>(new Date());
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    const msUntilTomorrow = tomorrow.getTime() - now.getTime();

    const timer = setTimeout(() => {
      setToday(new Date());
    }, msUntilTomorrow);

    return () => clearTimeout(timer);
  }, [today]);

  const originalDaysHeader = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const daysHeader = [
    ...originalDaysHeader.slice(preferences.weekStartsOn),
    ...originalDaysHeader.slice(0, preferences.weekStartsOn),
  ];

  const startDay = startOfMonth(date);
  const endDay = endOfMonth(date);
  const daysInMonth = eachDayOfInterval({
    start: startDay,
    end: endDay,
  }).length;
  const daysToPrepend = (getDay(startDay) - preferences.weekStartsOn + 7) % 7;
  const totalDays = daysToPrepend + daysInMonth;
  let daysToAppend = 42 - totalDays;
  if (daysToAppend < 0) daysToAppend += 7;

  const displayDays = eachDayOfInterval({
    start: addDays(startDay, -daysToPrepend),
    end: addDays(endDay, daysToAppend),
  });

  const isNotThisMonth = (day: Date) => day < startDay || day > endDay;
  const isFirstDayOfMonth = (day: Date) => day.getDate() === 1;
  const isToday = (day: Date) =>
    format(day, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
  function getDayClass(day: Date): string {
    if (isNotThisMonth(day)) return 'cell-grid not-this-month';
    if (isToday(day)) return 'cell-grid today';
    return 'cell-grid';
  }
  return (
    <div className="month-container">
      <div className="month-days-of-the-week">
        {daysHeader.map((day, index) => (
          <div key={index} className="day">
            {day}
          </div>
        ))}
      </div>
      <div className="days-grid">
        {displayDays.map((day, index) => (
          <div
            key={index}
            className={getDayClass(day)}
            onDoubleClick={() => changeTime('Day', day)}
          >
            {isFirstDayOfMonth(day)
              ? <div className='first-day'>{format(day, 'MMM')}<div className='day'><span>{day.getDate()}</span></div></div>
              : <div className='day-not-first'><div className="day"><span>{day.getDate()}</span></div></div>}
          </div>
        ))}
        <div className="line-vertical first"></div>
        <div className="line-vertical second"></div>
        <div className="line-vertical third"></div>
        <div className="line-vertical fourth"></div>
        <div className="line-vertical fifth"></div>
        <div className="line-vertical sixth"></div>
        <div className="line-horizontal first"></div>
        <div className="line-horizontal second"></div>
        <div className="line-horizontal third"></div>
        <div className="line-horizontal fourth"></div>
        <div className="line-horizontal fifth"></div>
      </div>
    </div>
  );
}

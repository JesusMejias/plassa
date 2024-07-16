import { useState, useEffect } from 'react';
import './displayweek.styles.scss';
import { getDay, addDays, format } from 'date-fns';

export default function DisplayWeek({ date, preferences, changeTime }: any) {
  const [today, setToday] = useState(new Date());
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
  const originalDaysHeader = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekStartsOn = 1;
  const daysHeader = [
    ...originalDaysHeader.slice(weekStartsOn),
    ...originalDaysHeader.slice(0, weekStartsOn),
  ];
  const twentyFourHourFormat = false;
  const hours: number[] = [];

  // Calculate the current day of the week number
  const currentDayOfWeek = getDay(date);
  // Adjust for the week starting on a different day
  const adjustedCurrentDay = (currentDayOfWeek - weekStartsOn + 7) % 7;
  for (let i = 0; i < 24; i++) {
    hours.push(i);
  }
  function hourFormat(hour: number): string {
    let formattedHour = '';
    if (twentyFourHourFormat) {
      if (hour < 10) {
        formattedHour = `0${hour}:00`;
      } else {
        formattedHour = `${hour}:00`;
      }
    } else {
      if (hour === 0) {
        formattedHour = '12 AM';
      } else if (hour < 12) {
        formattedHour = `${hour} AM`;
      } else if (hour === 12) {
        formattedHour = `${hour} PM`;
      } else {
        formattedHour = `${hour - 12} PM`;
      }
    }
    return formattedHour;
  }
  const isToday = (day: Date) =>
    format(day, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
  return (
    <div className="week-container">
      <div className="week-header">
        <div className="week-header-day empty"></div>
        {daysHeader.map((day, index) => {
          const dayDate = addDays(date, index - adjustedCurrentDay);
          const dayNumber = format(dayDate, 'd');
          return (
            <div key={index} className="week-header-day" onDoubleClick={() => changeTime('Day', dayDate)}>
              {day}
              {isToday(dayDate) ? (
                <div className="today-day-number">
                  <span>{dayNumber}</span>
                </div>
              ) : (
                ` ${dayNumber}`
              )}
            </div>
          );
        })}
      </div>
      <div className="week-content">
        <div className="week-content-day hours-container">
          {hours.map((hour, index) => (
            <div key={index} className="hour">
              <span>{hourFormat(hour)}</span>
            </div>
          ))}
        </div>
        {daysHeader.map((day, index) => (
          <div key={index} className="week-content-day">
            {hours.map((hour, index) => (
              <div key={index} className="hourly-box"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

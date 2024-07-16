import { useEffect, useState } from 'react';
import './displayday.styles.scss';

export default function DisplayDay({ date, preferences }: any) {
  const [today, setToday] = useState<Date>(new Date());
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [topStyle, setTopStyle] = useState<string>('0%');
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setToday(now);
    }, 60000);
  
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const now = new Date();
    const selectedDate = new Date(date);
    const isToday = now.toDateString() === selectedDate.toDateString();

    setIsVisible(isToday);

    if (isToday) {
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const percentageOfDayPassed =
        ((currentHour * 60 + currentMinute) / (24 * 60)) * 100;
      setTopStyle(`${percentageOfDayPassed}%`);
    }

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
  }, [today, date]);
  const hours: number[] = [];
  for (let i = 0; i < 24; i++) {
    hours.push(i);
  }
  function hourFormat(hour: number): string {
    let formattedHour = '';
    if (preferences.use24) {
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
  return (
    <div className="day-container">
      <div className="hourly-box">
        {hours.map((hour, index) => (
          <div key={index} className="individual-hour">
            <span>{hourFormat(hour)}</span>
          </div>
        ))}
      </div>
      <div className="hourly-event-box">
        {isVisible && (
          <div className="exact-current-time" style={{ top: topStyle }}></div>
        )}
        {hours.map((hour, index) => (
          <div key={index} className="individual-event"></div>
        ))}
      </div>
    </div>
  );
}

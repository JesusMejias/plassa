import './displaymonth.styles.scss';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addDays,
  getDay,
} from 'date-fns';

export default function DisplayMonth({ date, preferences }: any) {
  const originalDaysHeader = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const weekStartsOn = 0;
  const daysHeader = [
    ...originalDaysHeader.slice(weekStartsOn),
    ...originalDaysHeader.slice(0, weekStartsOn),
  ];

  const startDay = startOfMonth(date);
  const endDay = endOfMonth(date);
  const daysInMonth = eachDayOfInterval({ start: startDay, end: endDay }).length;
  const daysToPrepend = (getDay(startDay) - weekStartsOn + 7) % 7;
  const totalDays = daysToPrepend + daysInMonth;
  let daysToAppend = 42 - totalDays;
  if (daysToAppend < 0) daysToAppend += 7;

  const displayDays = eachDayOfInterval({
    start: addDays(startDay, -daysToPrepend),
    end: addDays(endDay, daysToAppend),
  });
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
          <div key={index} className={`grid-box-${index + 1}`}>
            {day.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
}

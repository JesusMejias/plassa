import './displayyear.styles.scss';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addDays,
  getDay,
  format,
} from 'date-fns';

export default function DisplayYear({ date, preferences }: any) {
  const originalDaysHeader = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const weekStartsOn = 0;
  const daysHeader = [
    ...originalDaysHeader.slice(weekStartsOn),
    ...originalDaysHeader.slice(0, weekStartsOn),
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const generateDaysForMonth = (monthIndex : number) => {
    const firstDayOfMonth = startOfMonth(
      new Date(date.getFullYear(), monthIndex)
    );
    const lastDayOfMonth = endOfMonth(firstDayOfMonth);
    const daysToPrepend = (getDay(firstDayOfMonth) - weekStartsOn + 7) % 7;
    const daysToAppend =
      42 -
      daysToPrepend -
      eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth }).length;

    const startDay = addDays(firstDayOfMonth, -daysToPrepend);
    const endDay = addDays(lastDayOfMonth, daysToAppend);

    return eachDayOfInterval({ start: startDay, end: endDay });
  };
  return (
    <div className="year-container">
      {months.map((month, index) => (
        <div key={index} className={`month-individual individual-${index + 1}`}>
          <div className="month-title">{month}</div>
          <div className="day-initials-box">
            {daysHeader.map((day, index) => (
              <div key={index} className="day-initial">
                {day}
              </div>
            ))}
          </div>
          <div className="day-numbers">
            {generateDaysForMonth(index).map((day, dayIndex) => (
              <div key={dayIndex} className={`day-individual ${format(day, 'MMMM') !== months[index] ? 'not-this-month' : ''}`}>
                {day.getDate()}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="line-vertical first"></div>
      <div className="line-vertical"></div>
      <div className="line-vertical last"></div>
      <div className="line-horizontal"></div>
      <div className="line-horizontal"></div>
    </div>
  );
}

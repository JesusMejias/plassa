import './displayweek.styles.scss';

export default function DisplayWeek({ date, preferences }: any) {
  const daysHeader = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const twentyFourHourFormat = false;
  const hours = [];
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
  return (
    <div className="week-container">
      <div className="week-header">
        <div className="week-header-day empty"></div>
        {daysHeader.map((day, index) => (
          <div key={index} className="week-header-day">
            {day}
          </div>
        ))}
      </div>
      <div className="week-content">
        <div className="week-content-day hours-container">
          {hours.map((hour, index) => (
            <div key={index} className="hour">
              {hourFormat(hour)}
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

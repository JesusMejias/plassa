import './displayday.styles.scss';

export default function DisplayDay({ date }: any) {
  const twentyFourHourFormat = false;
  const hours: number[] = [];
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
    <div className="day-container">
      <div className="hourly-box">
        {hours.map((hour, index) => (
          <div key={index} className="individual-hour">
            {hourFormat(hour)}
          </div>
        ))}
      </div>
      <div className="hourly-event-box">
        {hours.map((hour, index) => (
          <div key={index} className="individual-event">
          </div>
        ))}
      </div>
    </div>
  );
}

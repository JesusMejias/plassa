import DisplayDay from './displayday';
import DisplayWeek from './displayweek';
import DisplayMonth from './displaymonth';
import DisplayYear from './displayyear';

export default function Display({ displayOption, date, preferences, changeTime }: any) {
  return (
    <>
      {displayOption === 'Day' && <DisplayDay date={date} />}
      {displayOption === 'Week' && <DisplayWeek date={date} preferences={preferences} changeTime={changeTime} />}
      {displayOption === 'Month' && <DisplayMonth date={date} preferences={preferences} changeTime={changeTime} />}
      {displayOption === 'Year' && <DisplayYear date={date} preferences={preferences} changeTime={changeTime} />}
    </>
  );
}

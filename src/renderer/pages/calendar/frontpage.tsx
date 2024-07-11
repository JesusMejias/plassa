import './frontpage.styles.scss';
import { useState, useEffect } from 'react';
import { format, add, sub } from 'date-fns';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import Display from './display';

export default function FrontPage({ preferences }: any) {
  const [displayOption, setDisplayOption] = useState('Day');
  const [isToday, setIsToday] = useState<Boolean>(true);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());
  const displayOptions = ['Day', 'Week', 'Month', 'Year'];

  useEffect(() => {
    if (isToday) {
      const timer = setInterval(() => setCurrentDate(new Date()), 1000);

      return function cleanup() {
        clearInterval(timer);
      };
    }
  }, [isToday]);

  function adjustTime(addTime: boolean) {
    type TimeAdjustment = {
      [key: string]: { days?: number; weeks?: number; months?: number; years?: number; };
    };
    const operation = addTime ? add : sub; // Choose the operation based on the add parameter
    const timeAdjustment: TimeAdjustment = { // Define the time adjustment based on displayOption
      'Day': { days: 1 },
      'Week': { weeks: 1 },
      'Month': { months: 1 },
      'Year': { years: 1 }
    };
  
    // Determine the base time to adjust from
    const baseTime = isToday ? currentDate : selectedTime;
  
    const newTime = operation(baseTime, timeAdjustment[displayOption]);
  
    // Update the selected time and isToday flag
    setSelectedTime(newTime);
    if (isToday) setIsToday(false);
  }

  return (
    <div className="front-page">
      <div className="display-options">
        {displayOptions.map((option, index) => (
          <button
            key={index}
            className={
              displayOption === option ? `selected ${option.toLowerCase()}` : ''
            }
            onClick={() => setDisplayOption(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="header">
        {displayOption === 'Day' && (
          <h1>
            <div>{format(isToday ? currentDate : selectedTime, 'iiii')}</div>
            <span>
              {preferences.format === 'US'
                ? format(isToday ? currentDate : selectedTime, 'MMMM do, Y')
                : format(isToday ? currentDate : selectedTime, 'd MMMM, Y')}
            </span>
          </h1>
        )}
        {(displayOption === 'Week' || displayOption === 'Month') && (
          <h1>
            <span>
              {format(isToday ? currentDate : selectedTime, 'MMMM Y')}
            </span>
          </h1>
        )}
        {displayOption === 'Year' && (
          <h1>
            <span>{format(isToday ? currentDate : selectedTime, 'Y')}</span>
          </h1>
        )}
      </div>
      <Display displayOption={displayOption} date={isToday ? currentDate : selectedTime} preferences={preferences} />
      <div className="next-before-options">
        <button onClick={() => adjustTime(false)}>
          <FontAwesomeIcon icon={faCaretLeft} />
        </button>
        <button
          className={isToday ? 'selected' : ''}
          onClick={() => {
            if (!isToday) {
              setCurrentDate(new Date());
              setIsToday(true);
            }
          }}
        >
          Today
        </button>
        <button onClick={() => adjustTime(true)}>
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
      </div>
    </div>
  );
}

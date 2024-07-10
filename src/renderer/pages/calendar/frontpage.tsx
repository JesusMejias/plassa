import './frontpage.styles.scss';
import { useState, useEffect } from 'react';
import { format, add as addTime, sub as substractTime, sub } from 'date-fns';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

export default function FrontPage(props: any) {
  const [displayOption, setDisplayOption] = useState<String>('Day');
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

  function substractDay() {
    if (isToday) {
      setSelectedTime(substractTime(currentDate, { days: 1 }));
      setIsToday(false);
    } else {
      setSelectedTime(substractTime(selectedTime, { days: 1 }));
    }
  }

  function addDay() {
    if (isToday) {
      setSelectedTime(addTime(currentDate, { days: 1 }));
      setIsToday(false);
    } else {
      setSelectedTime(addTime(selectedTime, { days: 1 }));
    }
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
              {props.preferences.format === 'US'
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
            <span>
              {format(isToday ? currentDate : selectedTime, 'Y')}
            </span>
          </h1>
        )}
      </div>
      <div className="next-before-options">
        <button onClick={substractDay}>
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
        <button onClick={addDay}>
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
      </div>
    </div>
  );
}

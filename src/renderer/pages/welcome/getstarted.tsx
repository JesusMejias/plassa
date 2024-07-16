import './getstarted.styles.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

export default function GetStarted({ store }: any) {
  const [page, setPage] = useState<number>(1);
  const [day, setDay] = useState<number>(0);
  const [dayDropdownOpen, setDayDropdownOpen] = useState<boolean>(false);
  const [usFormat, setUSFormat] = useState<boolean>(true);
  const [use24, setUse24] = useState<boolean>(false);
  const navigate = useNavigate();
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  function finish() {
    store.set('preferences', {
      weekStartsOn: day,
      usFormat,
      use24,
    });
    window.electron.makeWindowResizable();
    navigate('/calendar', { replace: true });
  }
  return (
    <div
      className="container-getstarted"
      onMouseDown={(e: any) =>
        !e.target?.closest('.dropdown-box') && setDayDropdownOpen(false)
      }
    >
      <h1>Plassa</h1>
      <h2>Let's set things up.</h2>
      <h3 className='desc'>You're only a few steps away from your dream calendar.</h3>
      {page === 1 && (
        <>
          <h3>When does your week start?</h3>
          <div className="dropdown-box">
            <div
              className="dropdown-button"
              onClick={() => setDayDropdownOpen(!dayDropdownOpen)}
            >
              {days[day]}{' '}
              {dayDropdownOpen ? (
                <FontAwesomeIcon icon={faCaretUp} />
              ) : (
                <FontAwesomeIcon icon={faCaretDown} />
              )}
            </div>
            {dayDropdownOpen && (
              <div className="dropdown-content">
                {days.map((d, index) => (
                  <span
                    className={day === index ? 'day selected' : 'day'}
                    key={index}
                    onClick={() => {
                      setDay(index);
                      setDayDropdownOpen(false);
                    }}
                  >
                    {d}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="btn-container">
            <button className="link" onClick={() => setPage(2)}>
              Next
            </button>
          </div>
        </>
      )}
      {page === 2 && (
        <>
          <h3>What <strong>date</strong> format do you prefer?</h3>
          <div>
            <span
              onClick={() => {
                setUSFormat(true);
              }}
              className={usFormat ? 'option selected' : 'option'}
            >
              Month | <strong>Day</strong> | Year
            </span>
          </div>
          <div>
            <span
              onClick={() => {
                setUSFormat(false);
              }}
              className={!usFormat ? 'option selected' : 'option'}
            >
              <strong>Day</strong> | Month | Year
            </span>
          </div>
          <div className="btn-container">
            <button className="link" onClick={() => setPage(1)}>
              Back
            </button>
            <button className="link" onClick={() => setPage(3)}>
              Next
            </button>
          </div>
        </>
      )}
      {page === 3 && (
        <>
          <h3>What <strong>time</strong> format do you prefer?</h3>
          <div>
            <span
              onClick={() => {
                setUse24(false);
              }}
              className={!use24 ? 'option selected' : 'option'}
            >
              AM | PM
            </span>
          </div>
          <div>
            <span
              onClick={() => {
                setUse24(true);
              }}
              className={use24 ? 'option selected' : 'option'}
            >
              24 Hours
            </span>
          </div>
          <div className="btn-container">
            <button className="link" onClick={() => setPage(2)}>
              Back
            </button>
            <button className="link" onClick={finish}>
              <strong>Finish</strong>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

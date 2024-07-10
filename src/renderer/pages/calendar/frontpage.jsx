import './frontpage.styles.scss';
import { useState, useEffect } from 'react';
import { format, add as addTime, sub as substractTime, sub } from 'date-fns';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

export default function FrontPage(props) {
    const [displayOption, setDisplayOption] = useState('Day');
    const [isToday, setIsToday] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const displayOptions = ['Day', 'Week', 'Month', 'Year'];

    useEffect(() => {
        if (isToday) {
            const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    
            return function cleanup() {
                clearInterval(timer);
            }
        }
    }, [isToday]);

    return (
        <div className='front-page'>
            <div className="display-options">
                {displayOptions.map((option, index) => (
                    <button key={index} className={displayOption === option ? `selected ${option.toLowerCase()}` : ''} onClick={() => setDisplayOption(option)}>{option}</button>
                ))}
            </div>
            <div className='header'>
                <h1>
                    <div>{format(isToday ? currentDate : selectedTime, 'iiii')}</div>
                    <span>{props.preferences.format === 'US' ? format(isToday ? currentDate : selectedTime, 'MMMM do, Y') : format(isToday ? currentDate : selectedTime, 'd MMMM, Y')}</span>
                </h1>
                <div className='settings-button' onClick={() => props.setCurrentPage('settings')} title="Settings"><span></span><span></span><span></span></div>
            </div>
            <div className='next-before-options'><button onClick={() => {
                if (isToday) {
                    setSelectedTime(substractTime(currentDate, { days: 1 }));
                    setIsToday(false);
                } else {
                    setSelectedTime(substractTime(selectedTime, { days: 1 }));
                }
            }}><FontAwesomeIcon icon={faCaretLeft} /></button><button className={isToday ? 'selected' : ''} onClick={() => {
                setCurrentDate(new Date());
                setIsToday(true);
            }}>Today</button><button onClick={() => {
                if (isToday) {
                    setSelectedTime(addTime(currentDate, { days: 1 }));
                    setIsToday(false);
                } else {
                    setSelectedTime(addTime(selectedTime, { days: 1 }));
                }
            }}><FontAwesomeIcon icon={faCaretRight} /></button></div>
        </div>
    );
}
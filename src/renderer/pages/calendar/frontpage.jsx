import './frontpage.styles.scss';
import { useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

export default function FrontPage(props) {
    const [displayOption, setDisplayOption] = useState('Day');
    const displayOptions = ['Day', 'Week', 'Month', 'Year'];
    return (
        <div className='front-page'>
            <div className="display-options">
                {displayOptions.map((option, index) => (
                    <button key={index} className={displayOption === option && `selected ${option.toLowerCase()}`} onClick={() => setDisplayOption(option)}>{option}</button>
                ))}
            </div>
            <div className='header'>
                <h1>
                    <div>{format(props.date, 'iiii')}</div>
                    <span>{props.preferences.format === 'US' ? format(props.date, 'MMMM do, Y') : format(props.date, 'd MMMM, Y')}</span>
                </h1>
                <div className='settings-button' onClick={() => props.setCurrentPage('settings')} title="Settings"><span></span><span></span><span></span></div>
            </div>
            <div className='next-before-options'><button><FontAwesomeIcon icon={faCaretLeft} /></button><button>Today</button><button><FontAwesomeIcon icon={faCaretRight} /></button></div>
        </div>
    );
}
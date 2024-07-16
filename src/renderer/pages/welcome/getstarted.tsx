import './getstarted.styles.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

export default function GetStarted({ store } : any) {
    const [page, setPage] = useState(1);
    const [day, setDay] = useState('Sunday');
    const [format, setFormat] = useState('');
    const [dayDropdownOpen, setDayDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    function finish() {
        store.set('preferences', {
            day,
            format
        });
        window.electron.makeWindowResizable();
        navigate("/calendar", { replace: true });
    }
    return (
        <div className='container-getstarted' onMouseDown={(e: any) => (!e.target?.closest('.dropdown-box')) && setDayDropdownOpen(false)}>
            <h1>Passa</h1>
            <h2>Let's set things up.</h2>
            {page === 1 ? 
            <>
            <h3>When does your week start?</h3>
            <div className='dropdown-box'>
                <div className='dropdown-button' onClick={() => setDayDropdownOpen(!dayDropdownOpen)}>{day} {dayDropdownOpen ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}</div>
                {dayDropdownOpen &&
                <div className="dropdown-content">
                    {days.map((d, index) => <span className={day === d ? 'day selected' : 'day'} key={index} onClick={() => {
                        setDay(d);
                        setDayDropdownOpen(false);
                    }}>{d}</span>)}
                </div>
                }
            </div>
            <div className='btn-container'><button className='link' onClick={() => setPage(2)}>Next</button></div>
            </>
            :
            <>
            <h3>What date format do you prefer?</h3>
            <div><span onClick={() => {
                setFormat('US');
            }} className={format === 'US' ? 'option selected' : 'option'}>Month | <strong>Day</strong> | Year</span></div>
            <div><span onClick={() => {
                setFormat('World');
            }} className={format === 'World' ? 'option selected' : 'option'}><strong>Day</strong> | Month | Year</span></div>
            <div className='btn-container'><button className='link' onClick={() => setPage(1)}>Back</button>{format !== '' ? <button className='link' onClick={() => finish()}><strong>Finish</strong></button> : null}</div>
            </>}
            
        </div>
    );
}
import './getstarted.styles.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GetStarted() {
    const [page, setPage] = useState(1);
    const [day, setDay] = useState('');
    const [format, setFormat] = useState('');
    const navigate = useNavigate();
    const finish = () => {
        window.electron.store.set('preferences', {
            day,
            format
        });
        navigate("/calendar/front-page", { replace: true });
    }
    return (
        <div className='container-getstarted'>
            <h1>Calendary</h1>
            <h2>Let's Set Things Up</h2>
            {page === 1 ? 
            <>
            <h3>When Does Your Week Start?</h3>
            <div><span onClick={() => setDay('Sunday')} className={day === 'Sunday' ? 'selected' : ''}>Sunday</span></div>
            <div><span onClick={() => setDay('Monday')} className={day === 'Monday' ? 'selected' : ''}>Monday</span></div>
            {day !== '' ? <div className='btn-container'><button className='link' onClick={() => setPage(2)}>Next</button></div> : null}
            </>
            :
            <>
            <h3>What Date Format Do You Prefer?</h3>
            <div><span onClick={() => {
                setFormat('US');
            }} className={format === 'US' ? 'selected' : ''}>Month | <strong>Day</strong> | Year</span></div>
            <div><span onClick={() => {
                setFormat('Elsewhere');
            }} className={format === 'Elsewhere' ? 'selected' : ''}><strong>Day</strong> | Month | Year</span></div>
            <div className='btn-container'><button className='link' onClick={() => setPage(1)}>Back</button>{format !== '' ? <button className='link' onClick={() => finish()}><strong>Finish</strong></button> : null}</div>
            </>}
            
        </div>
    );
}
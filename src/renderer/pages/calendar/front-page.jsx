import './front-page.styles.scss';
import { Link } from 'react-router-dom';

export default function FrontPage(props) {
    return (
        <div className='front-page'>
            <div className='header'>
                <h1>
                    <div>Today is</div>
                    <span>{props.tempDate}</span>
                </h1>
                <div className='settings-button' onClick={() => props.setCurrentPage('settings')} title="Settings"><span></span><span></span><span></span></div>
            </div>
        </div>
    );
}
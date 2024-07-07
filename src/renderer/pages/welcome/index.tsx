import './index.styles.scss';
import { Link } from 'react-router-dom';

export default function Welcome() {
    return(
        <div className='container-welcome'>
            <h2>Welcome to</h2>
            <h1>Calendary</h1>
            <div className='btn-container'><Link to='/getstarted' className='link'>Let's Get Started</Link></div>
        </div>
    );
}
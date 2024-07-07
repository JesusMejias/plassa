import './index.styles.scss';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
    const navigate = useNavigate();
    return(
        <div className='container-welcome'>
            <h2>Welcome to</h2>
            <h1>Calendary</h1>
            <div className='btn-container'><button className='link' onClick={() => navigate("/getstarted", { replace: true })}>Let's Get Started</button></div>
        </div>
    );
}
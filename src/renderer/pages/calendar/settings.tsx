import './settings.styles.scss';

export default function Settings({ preferences, store, setPreferences, setCurrentPage }) {
    const setDay = (day: string) => {
        store.set('preferences', {
            day,
            format: preferences.format
        });
        setPreferences({
            day,
            format: preferences.format
        });
    }
    const setFormat = (format: string) => {
        store.set('preferences', {
            day: preferences.day,
            format
        });
        setPreferences({
            day: preferences.day,
            format
        });
    }
    return (
        <div className='settings'>
            <div className='header'>
                <h1>
                    Settings
                </h1>
                <div className='settings-button' onClick={() => setCurrentPage('frontpage')} title="Exit Settings"><span></span><span></span><span></span></div>
            </div>
            <h2>Week Starts On</h2>
            <div><span className={`button ${preferences.day === 'Sunday' ? 'selected' : ''}`} onClick={() => setDay('Sunday')}>Sunday</span></div>
            <div><span className={`button ${preferences.day === 'Monday' ? 'selected' : ''}`} onClick={() => setDay('Monday')}>Monday</span></div>
            <h2>Preferred Date Format</h2>
            <div><span className={`button ${preferences.format === 'US' ? 'selected' : ''}`} onClick={() => setFormat('US')}>Month | <strong>Day</strong> | Year</span></div>
            <div><span className={`button ${preferences.format === 'World' ? 'selected' : ''}`} onClick={() => setFormat('World')}>Day | <strong>Month</strong> | Year</span></div>
        </div>
    );
}
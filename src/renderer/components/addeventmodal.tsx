import { useState } from 'react';
import './addeventmodal.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { DateField } from '@adobe/react-spectrum';
import { fromDate, getLocalTimeZone } from '@internationalized/date';
import { addHours } from 'date-fns';
import { Event } from '../types';
import uniqid from 'uniqid';

export default function AddEventModal({
  setShowAddEventModal,
  date,
  keepTime,
  updateEvents,
}: any) {
  const tempDate = new Date(date);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [allDay, setAllDay] = useState<boolean>(false);
  const [starts, setStarts] = useState(
    keepTime ? date : new Date(tempDate.setHours(9, 0, 0, 0))
  );
  const [ends, setEnds] = useState(
    keepTime ? addHours(date, 1) : new Date(tempDate.setHours(10, 0, 0, 0))
  );
  function generateRandomColor() {
    // Generate a random color component with high contrast and brightness
    const generateComponent = () => {
      const high = Math.floor(Math.random() * (255 - 200) + 200); // Bright component
      const low = Math.floor(Math.random() * 100); // Dark component
      return Math.random() > 0.5 ? high : low; // Randomly choose between bright and dark for contrast
    };
  
    let r = generateComponent();
    let g = generateComponent();
    let b = generateComponent();
  
    // Ensure the color is not too close to grey to maintain colorfulness
    // Check if the components are all high or all low and adjust one if necessary
    if ((r > 200 && g > 200 && b > 200) || (r < 100 && g < 100 && b < 100)) {
      const components = [r, g, b];
      const indexToAdjust = Math.floor(Math.random() * components.length);
      components[indexToAdjust] = components[indexToAdjust] > 200 ? Math.floor(Math.random() * 100) : Math.floor(Math.random() * (255 - 200) + 200);
      [r, g, b] = components;
    }
  
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
  function handleAddEvent() {
    const newEvent: Event = {
      id: uniqid(),
      title,
      description,
      allDay,
      starts,
      ends,
      color: generateRandomColor(),
    };
    updateEvents('add', newEvent);
    setShowAddEventModal(false);
  }
  return (
    <div
      className="add-event-modal"
      onMouseDown={(e: any) =>
        !e.target?.closest('.add-event-container') &&
        setShowAddEventModal(false)
      }
    >
      <div className="add-event-container">
        <h2>
          Add Event
          <div className="close" onClick={() => setShowAddEventModal(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </h2>
        <input
          className="title"
          type="text"
          autoFocus
          placeholder="New Event"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="description"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="cal-flex">
          <label>Starts</label>
          {allDay ? 
          <DateField
            granularity="day"
            defaultValue={fromDate(starts, getLocalTimeZone())}
            hideTimeZone
            onChange={(date) => setStarts(date.toDate())}
          /> : 
          <DateField
            granularity="minute"
            defaultValue={fromDate(starts, getLocalTimeZone())}
            hideTimeZone
            onChange={(date) => setStarts(date.toDate())}
          />}
        </div>
        <div className="cal-flex">
          <label>Ends</label>
          {allDay ? (
            <DateField
              granularity="day"
              defaultValue={fromDate(ends, getLocalTimeZone())}
              hideTimeZone
              onChange={(date) => setEnds(date.toDate())}
            />
          ) : (
            <DateField
              granularity="minute"
              defaultValue={fromDate(ends, getLocalTimeZone())}
              hideTimeZone
              onChange={(date) => setEnds(date.toDate())}
            />
          )}
        </div>
        <div className="all-day-event" onClick={() => {
          setStarts(new Date(starts.setHours(0, 0, 0, 0)));
          setEnds(new Date(ends.setHours(23, 59, 59, 59)));
          setAllDay(!allDay);
        }}>
          <label>All-Day</label>
          <FontAwesomeIcon icon={allDay ? faCheckSquare : faSquare} />
        </div>
        <div className="buttons-bottom">
          <button onClick={() => setShowAddEventModal(false)}>Cancel</button>
          <button className="action" onClick={() => handleAddEvent()}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

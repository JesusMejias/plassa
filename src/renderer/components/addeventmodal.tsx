import { useState } from 'react';
import './addeventmodal.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { DateField } from '@adobe/react-spectrum';
import { fromDate, getLocalTimeZone } from '@internationalized/date';
import { addHours } from 'date-fns';
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
  function handleAddEvent() {
    const newEvent = {
      id: uniqid(),
      title,
      description,
      allDay,
      starts,
      ends,
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

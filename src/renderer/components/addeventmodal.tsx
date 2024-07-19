import React, { useState } from 'react';
import './addeventmodal.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { DateField } from '@adobe/react-spectrum';
import {
  parseZonedDateTime,
  fromDate,
  getLocalTimeZone,
} from '@internationalized/date';
import { addHours, set } from 'date-fns';

export default function AddEventModal({
  setShowAddEventModal,
  date,
  keepTime,
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
          <DateField
            granularity="minute"
            defaultValue={fromDate(starts, getLocalTimeZone())}
            hideTimeZone
          />
        </div>
        <div className="cal-flex">
          <label>Ends</label>
          <DateField
            granularity="minute"
            defaultValue={fromDate(ends, getLocalTimeZone())}
            hideTimeZone
          />
        </div>
        <div className="all-day-event" onClick={() => setAllDay(!allDay)}>
          <label>All-Day</label><FontAwesomeIcon icon={allDay ? faSquareCheck : faSquare } />
        </div>
        <div className="buttons-bottom"><button onClick={() => setShowAddEventModal(false)}>Cancel</button><button className='action'>Add</button></div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import './addeventmodal.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function AddEventModal({ setShowAddEventModal }: any) {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [allDay, setAllDay] = useState<boolean>(false);
  return (
    <div
      className="add-event-modal"
      onMouseDown={(e: any) =>
        !e.target?.closest('.add-event-container') && setShowAddEventModal(false)
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
        <input
          className="description"
          type="text"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="choose-date-and-time">
          <div className="cal-flex">hi</div>
          <div className="cal-flex">hi</div>
        </div>
      </div>
    </div>
  );
}

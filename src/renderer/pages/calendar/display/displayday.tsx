import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from 'react';
import './displayday.styles.scss';
import AddEventModal from '../../../components/addeventmodal';
import { Event } from '../../../types';
import { isSameDay, isWithinInterval, startOfDay, endOfDay } from 'date-fns';

export default function DisplayDay({
  date,
  preferences,
  events,
  updateEvents,
}: any) {
  const [today, setToday] = useState<Date>(new Date());
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [topStyle, setTopStyle] = useState<string>('0%');
  const [showAddEventModal, setShowAddEventModal] = useState<boolean>(false);
  const [tempDate, setTempDate] = useState<Date | undefined>(undefined);
  const [keepTime, setKeepTime] = useState<boolean>(false);
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setToday(now);
    }, 60000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const now = new Date();
    const selectedDate = new Date(date);
    const isToday = isSameDay(now, selectedDate);

    setIsVisible(isToday);

    if (isToday) {
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const percentageOfDayPassed =
        ((currentHour * 60 + currentMinute) / (24 * 60)) * 100;
      setTopStyle(`${percentageOfDayPassed}%`);
    }

    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    const msUntilTomorrow = tomorrow.getTime() - now.getTime();

    const timer = setTimeout(() => {
      setToday(new Date());
    }, msUntilTomorrow);

    return () => clearTimeout(timer);
  }, [today, date]);
  const hours: number[] = [];
  for (let i = 0; i < 24; i++) {
    hours.push(i);
  }
  function hourFormat(hour: number): string {
    let formattedHour = '';
    if (preferences.use24) {
      if (hour < 10) {
        formattedHour = `0${hour}:00`;
      } else {
        formattedHour = `${hour}:00`;
      }
    } else {
      if (hour === 0) {
        formattedHour = '12 AM';
      } else if (hour < 12) {
        formattedHour = `${hour} AM`;
      } else if (hour === 12) {
        formattedHour = `${hour} PM`;
      } else {
        formattedHour = `${hour - 12} PM`;
      }
    }
    return formattedHour;
  }
  function handleAddEventClick(hour: number, minute: number) {
    const newDate = new Date(date);
    newDate.setHours(hour, minute, 0, 0);
    setTempDate(newDate);
    setKeepTime(true);
    setShowAddEventModal(true);
  }
  const filterEvents = (events: Event[]) => {
    return events.filter((event) => {
      if (event.allDay) return false;
      const eventStart = new Date(event.starts);
      const eventEnd = new Date(event.ends);
      const dayStart = startOfDay(date);
      const dayEnd = endOfDay(date);

      return (
        isWithinInterval(eventStart, { start: dayStart, end: dayEnd }) ||
        isWithinInterval(eventEnd, { start: dayStart, end: dayEnd }) ||
        (eventStart < dayStart && eventEnd > dayEnd)
      );
    });
  };

  const filterAllDayEvents = (events: Event[]) => {
    return events.filter((event) => {
      if (!event.allDay) return false;
      const eventStart = new Date(event.starts);
      const eventEnd = new Date(event.ends);
      const dayStart = startOfDay(date);
      const dayEnd = endOfDay(date);

      return (
        isWithinInterval(eventStart, { start: dayStart, end: dayEnd }) ||
        isWithinInterval(eventEnd, { start: dayStart, end: dayEnd }) ||
        (eventStart < dayStart && eventEnd > dayEnd)
      );
    });
  };

  const calculateEventStyles = (
    event: Event,
    columnIndex: number,
    columnCount: number
  ) => {
    const start = new Date(event.starts);
    const end = new Date(event.ends);
    const startMinutes = start.getHours() * 60 + start.getMinutes();
    const endMinutes = end.getHours() * 60 + end.getMinutes();
    const top = (startMinutes / (24 * 60)) * 100;
    const height = ((endMinutes - startMinutes) / (24 * 60)) * 100;
    const width = 100 / columnCount;
    const left = (columnIndex * width) % 100;

    return {
      top: `${top}%`,
      height: `${height}%`,
      width: `${width}%`,
      left: `${left}%`,
      backgroundColor: event.color,
    };
  };

  const calculateColumns = (events: Event[]) => {
    const eventPositions: { [id: string]: number } = {};
    const columns: Event[][] = [];
    const overlaps: { [id: string]: number } = {};

    events.forEach((event) => {
      let placed = false;

      for (let i = 0; i < columns.length; i++) {
        if (
          columns[i].every(
            (e) => e.ends <= event.starts || e.starts >= event.ends
          )
        ) {
          columns[i].push(event);
          eventPositions[event.id] = i;
          overlaps[event.id] = Math.max(
            overlaps[event.id] || 0,
            columns[i].length
          );
          placed = true;
          break;
        }
      }

      if (!placed) {
        columns.push([event]);
        eventPositions[event.id] = columns.length - 1;
        overlaps[event.id] = Math.max(overlaps[event.id] || 0, 1);
      }
    });

    return { columns, eventPositions, overlaps };
  };

  const renderAllDayEvents = (events: Event[]) => {
    const allDayEvents = filterAllDayEvents(events);

    return allDayEvents.map((event) => (
      <div
        key={event.id}
        className="event"
        style={{ backgroundColor: event.color }}
      >
        {event.title}
      </div>
    ));
  };

  const renderEvents = (events: Event[]) => {
    const filteredEvents = filterEvents(events);
    const { columns, eventPositions, overlaps } =
      calculateColumns(filteredEvents);

    const eventColumnsCount: { [key: string]: number } = {};
    filteredEvents.forEach((event) => {
      const overlappingEvents = filteredEvents.filter(
        (e) => e.starts < event.ends && e.ends > event.starts
      );
      eventColumnsCount[event.id] = overlappingEvents.length;
    });

    return filteredEvents.map((event) => {
      const columnIndex = eventPositions[event.id];
      const columnCount = eventColumnsCount[event.id];
      const styles = calculateEventStyles(event, columnIndex, columnCount);
      return (
        <div key={event.id} className="event" style={styles}>
          {event.title}
        </div>
      );
    });
  };

  return (
    <div className="day-container">
      {filterAllDayEvents(events).length > 0 && (
        <div className="all-day-events-container">
          <div className="inside">
            <div className="label">All-Day</div>
            <div className="all-day-display">{renderAllDayEvents(events)}</div>
          </div>
        </div>
      )}
      {showAddEventModal && (
        <AddEventModal
          setShowAddEventModal={setShowAddEventModal}
          date={tempDate}
          keepTime={keepTime}
          updateEvents={updateEvents}
        />
      )}
      <div className="hourly-box">
        {hours.map((hour, index) => (
          <div key={index} className="individual-hour">
            <span>{hourFormat(hour)}</span>
          </div>
        ))}
      </div>
      <div className="hourly-event-box">
        {renderEvents(events)}
        {isVisible && (
          <div className="exact-current-time" style={{ top: topStyle }}></div>
        )}
        {hours.map((hour, index) => (
          <div key={index} className="hour-section-event">
            <div
              className="quarterly-gap"
              onDoubleClick={() => handleAddEventClick(hour, 0)}
            ></div>
            <div
              className="quarterly-gap"
              onDoubleClick={() => handleAddEventClick(hour, 15)}
            ></div>
            <div
              className="quarterly-gap"
              onDoubleClick={() => handleAddEventClick(hour, 30)}
            ></div>
            <div
              className="quarterly-gap"
              onDoubleClick={() => handleAddEventClick(hour, 45)}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

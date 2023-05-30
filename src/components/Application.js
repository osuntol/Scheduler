import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import { useState } from "react";
import Appointment from "./Appointment";
import { useEffect } from "react";
import Axios from "axios";  

const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};



export default function Application(props) {
  const [days, setDays] = useState([]);
  const [value, onChange] = useState('Monday');

  const URL = 'http://localhost:8001/api/days'
  useEffect(()=>{
      Axios
      .get(URL)
      .then((response) => {
       setDays(response.data)
      })
  }, [])


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={value}
            setDay={onChange}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>
      <section className="schedule">
        {Object.values(appointments).map((appointment) => (<Appointment
          key={appointment.id}
          {...appointment}
        />))}
      </section>
    </main>
  );
}



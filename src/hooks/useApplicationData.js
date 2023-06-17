import { useEffect, useState } from "react"
import axios from "axios"

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, [])

  const setDay = day => setState(
    { ...state, day }
  )


  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointments,
          days: updateSpots(appointments, id)
        });
      });
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments,
          days: updateSpots(appointments, id)
        });
      });
  }

  function updateSpots(appointments, appointmentId) {
    // Grab current day object from state.days
    const currentDay = state.days.find(day => day.appointments.includes(appointmentId))
   

    //filter through to see if interview matches with null and the get the length of the spots array 
    const spots = currentDay.appointments.filter(id => appointments[id].interview === null).length

    //loop through the object days to see if appointments includes appointmentId and then update the spots with the length if not remains as days.
    return state.days.map(day => day.appointments.includes(appointmentId) ? { ...day, spots } : day)
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}

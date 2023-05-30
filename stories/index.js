//IMPORTING DEPENDENCIES
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import InterviewerListItem from "components/InterviewersListItem";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment/index.js";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import "index.scss";
import Button from "components/Button";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";
import { Fragment } from "react";


//BUTTON STORY 
storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ))
storiesOf("DayListItem", module) //Initiates Storybook and registers our DayListItem component
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  }) // Provides the default background color for our component
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />) // To define our stories, we call add() once for each of our test states to generate a story
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />)
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} /> // action() allows us to create a callback that appears in the actions panel when clicked
  ));

//DAYS ARRAY CONTAINING DAY AND SPOTS AVAILABLE
const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];


//DAYLIST STORY WITH DAYS VALUE ONCHANGE PASSED AS PROPS
storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Monday", () => (
    <DayList days={days} value={"Monday"} onChange={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} value={"Tuesday"} onChange={action("setDay")} />
  ))
  .add("Wednesday", () => (
    <DayList days={days} value={"Wednesday"} onChange={action("setDay")} />
  ));


  //INTERVIEWER OBJECT HARD CODED
const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};


//INTERVIEWERLISTITEM STORY WHEN SELECTED UNSELECTED AND CLICKABLE WITH PROPS PASSED 
storiesOf("InterviewerListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  ))
  .add("Selected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  ))
  .add("Clickable", () => (
    <InterviewerListItem
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={() => action("setInterviewer")(interviewer.id)}
    />
  ));



//INTERVIEWS ARRAY CONTAINING OBJECTS OF MENTORS INTERVIEWING WITH AVATAR
const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
    />
  ))
  .add("Selected", () => (
    <InterviewerList
      interviewers={interviewers}
      value={3}
    />
  ))
  .add("Clickable", () => (
    <InterviewerList
      interviewers={interviewers}
      onChange={action("setInterviewer")}
    />
  ));


// STORIES OF PARENT BRANCH APPOINTMENT 
storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  .add("Appointment", () => <Appointment />)
  // APPOINTMENT WITH TIME PROP PASSED 
  .add("Appointment with time", () => <Appointment time='12pm' />)
  //HEADER COMPONENT WITH TIME AS PROP PASSED
  .add("Header", () => <Header time='12pm'/>) 
   // EMPTY COMPONENT WITH ONADD ACTION PASSED AS PROP 
  .add("Empty", () => <Empty onAdd = {action("onAdd")}/>) 
  // SHOW COMPONENT WITH STUDENT, INTERVIEWER, ONEDIT AND ONDELETE PASSED AS PROPS
  .add("Show", () => <Show student="Lydia Miller-Jones" interviewer={interviewer.name} onEdit={action("onEdit")} onDelete={action("onDelete")}/>)
  // CONFRIM COMPONENT WITH MESSAGE, ON CONFIRM, ON CANCEL PROPS PASSED 
  .add("Confirm", () => <Confirm message="Delete the appointment?" onConfirm={action("onConfirm")} onCancel={action("onCancel")}/>)
  // STATUS COMPONENT WITH MESSAGE PROP
  .add("Status", () => <Status message="Deleting"/>)
  // ERROR COMPONENT WITH MESSAGE AND ONCLOSE FUNCTION PROPS
  .add("Error", () => <Error message ="Could not delete appointment" onClose={action('onClose')}/>)
  // EDIT FORM COMPONENT WITH PROPS PASSED 
  .add("Edit", () => <Form student="John Doe" interviewer={2} interviewers={interviewers} onSave={action('onSave')} onCancel={action('onCancel')}/> )
  // CREATE FORM WITH PROPS 
  .add("Create", () => <Form interviewers={interviewers} onSave={action('onSave')} onCancel={action('onCancel')}/> )
  // APOINTMENT EMPTY
  .add("Appointment Empty", () => (
    <Fragment>
      <Appointment id={1} time="4pm" />
      <Appointment key="last" time="5pm" />
    </Fragment>
  ))
  // APPOINTMENT BOOKED 
  .add("Appointment Booked", () => (
    <Fragment>
      <Appointment
        id={1}
        time="4pm"
        interview={{ student: "Lydia Miller-Jones", interviewer }}
      />
      <Appointment key="last" time="5pm" />
    </Fragment>
  ))
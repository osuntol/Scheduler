import React from "react";
import Button from "components/Button";
import { useState } from "react";
import InterviewerList from "components/InterviewerList";


export default function Form(props) {
  
  //using state hooks to set values 
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  
  //reset function the resets the values
  function reset(){
    setStudent("")
    setInterviewer(null)
  };

  //function to pass into cancel onClick to reset the value
  function cancel(){
    reset();
    props.onCancel();
  };


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          student={student}
          value= {interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={()=>{props.onSave(student, interviewer)}}>Save</Button>
        </section>
      </section>
    </main>
  )
}
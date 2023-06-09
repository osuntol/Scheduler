import React from "react";
import './styles.scss'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";


const CONFIRM = 'CONFIRM';
const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';
const EDIT = 'EDIT';

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY)

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)

    props.bookInterview(props.id, interview)
      .then(() => { transition(SHOW) })
      .catch(() => {
        transition(ERROR_SAVE, true)
      })
  }

  function deleteInterview() {
    transition(DELETING, true)

    props.cancelInterview(props.id)
      .then(() => { transition(EMPTY) })
      .catch(() => {
        transition(ERROR_DELETE, true)
      })
  }

  return (
    <article className="appointment"
    data-testid="appointment">

      <Header
        time={props.time}
      />

      {mode === EMPTY && (
        <Empty
          onAdd={() => transition(CREATE)}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === SAVING && (
        <Status
          message={'SAVING'}
        />
      )}
      {mode === DELETING && (
        <Status
          message={'DELETING'}
        />
      )}

      {mode === CONFIRM && (
        <Confirm
          message={'Are you sure you would like to delete?'}
          onConfirm={deleteInterview}
          onCancel={back}
        />
      )}

      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => transition(SHOW)}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message={ERROR_SAVE} onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message={ERROR_DELETE} onClose={back} />
      )}
    </article>
  )
}
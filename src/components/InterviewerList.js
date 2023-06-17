import React from "react";
import classNames from "classnames";
import "./InterviewerList.scss"
import InterviewerListItem from "./InterviewersListItem";
import propTypes from 'prop-types'

export default function InterviewerList(props) {

  const IntList = props.interviewers.map((inter) => {
    return (
      <InterviewerListItem
        id={inter.id}
        key={inter.id}
        name={inter.name}
        avatar={inter.avatar}
        selected={inter.id === props.value}
        setInterviewer={() => props.onChange(inter.id) }
        
      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {IntList}
      </ul>

    </section>
  )
}

InterviewerList.propTypes = {
  interviewers: propTypes.array.isRequired
}

import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props){
  const dayItems = props.days.map((day) => {
   <DayListItem key={day.id} name={day.name} spots={day.spots}/>
  })
  return (
    <ul>
      {dayItems}
    </ul>
  )
}
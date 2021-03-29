import React from "react"
import { DayMessage } from "./DayMessage"
import { Message } from "../../common/types"

export const DayMessages = ({ messages }: Props): JSX.Element => {
  return (
    <div className="MessagesWrapper">
      {messages.map((m) => (
        <DayMessage message={m} key={m.id} />
      ))}
    </div>
  )
}

interface Props {
  messages: Message[]
}

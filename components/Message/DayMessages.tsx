import React from "react"
import { DayMessage } from "./DayMessage"
import { Message } from "../../common/types"
import { Parallax } from "react-scroll-parallax"

export const DayMessages = ({ messages }: Props): JSX.Element => {
  return (
    <Parallax
      y={["-300%", "0%"]}
      styleInner={{ transition: "transform .2s linear" }}
      styleOuter={{ zIndex: 998, position: "relative", top: "50%", transform: "translate(0, -50%)" }}>
      <div className="MessagesWrapper">
        {messages.map((m) => (
          <DayMessage message={m} key={m.id} />
        ))}
      </div>
    </Parallax>
  )
}

interface Props {
  messages: Message[]
}

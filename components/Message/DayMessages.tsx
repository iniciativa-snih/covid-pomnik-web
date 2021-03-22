import React from "react"
import styled from "@emotion/styled"
import { Message } from "../../pages"
import { DayMessage } from "./DayMessage"

export const DayMessages = ({ messages }: Props) => {
  return (
    <MessagesWrapper>
      {messages.map((m) => (
        <DayMessage message={m} key={m.id} />
      ))}
    </MessagesWrapper>
  )
}

interface Props {
  messages: Message[]
}

const MessagesWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 998;
  position: relative;
`

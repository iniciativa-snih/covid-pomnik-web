import React from "react"
import styled from "@emotion/styled"
import { Message } from "../../pages"

export const DayMessage = ({ message }: Props) => {
  return <DayMessageWrapper>{message.message}</DayMessageWrapper>
}

interface Props {
  message: Message
}

const DayMessageWrapper = styled.div`
  font-size: 14px;
  width: 50vw;
  padding: 20px;
  border-radius: 3px;
`

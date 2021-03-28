import React from "react"
import styled from "@emotion/styled"
import { Message } from "../../common/types"

export const DayMessage = ({ message }: Props): JSX.Element => {
  return <DayMessageWrapper>{message.message}</DayMessageWrapper>
}

interface Props {
  message: Message
}

const DayMessageWrapper = styled.div`
  font-size: 16px;
  width: 50vw;
  padding: 20px;
  border-radius: 3px;
  background-color: #ececec;
`

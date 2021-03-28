import React from "react"
import styled from "@emotion/styled"

export const DeadPersonModalWindow = ({ children, onCloseModal }: Props): JSX.Element => {
  return (
    <ModalWrapper onClick={onCloseModal}>
      <ModalInner
        onClick={(event) => {
          event.persist()
          event.stopPropagation()
          event.preventDefault()
        }}>
        <Close title="zavřít" onClick={onCloseModal}>
          x
        </Close>
        {children}
      </ModalInner>
    </ModalWrapper>
  )
}

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.75);
  animation: fadeIn ease 0.5s;
`

const ModalInner = styled.div`
  position: absolute;
  background-color: #ececec;
  font-size: 16px;
  padding: 20px;
  border-radius: 3px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  right: 1px;
  top: -5px;
  padding: 10px;
  font-size: 20px;
`

interface Props {
  children: React.ReactNode
  onCloseModal: () => void
}

import React from "react"
import { PersonStatue } from "./ItemsDrawer/PersonStatue"
import styled from "@emotion/styled"
import { personSize } from "../common/config"

export const Person = ({ dateDeadsRefs, personPositionArea, personName }) => {
  return (
    <PersonWrapper
      ref={(el) => dateDeadsRefs.current.push(el)}
      style={{
        top: personPositionArea?.top,
        left: personPositionArea?.left,
        zIndex: personPositionArea?.zIndex
      }}>
      <PersonStatue personName={personName} />
    </PersonWrapper>
  )
}

const PersonWrapper = styled.div`
  position: absolute;
  width: ${personSize.width}px;
  height: ${personSize.height}px;
  animation: fadeIn ease 0.5s;
`

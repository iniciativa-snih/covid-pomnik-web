import React, { Dispatch, LegacyRef, SetStateAction, useState } from "react"
import { Persons } from "./Persons"
import VisibilitySensor from "react-visibility-sensor"
import { DeadWithStatuesAndStories } from "../../pages"
import styled from "@emotion/styled"
import { DayMessages } from "../Message/DayMessages"

export const Day = ({ day, deadByDateIndex, onChangeActive, dayRef }: Props) => {
  const [isVisible, setVisibility] = useState<boolean>(false)

  const onChangeVisibility = (isVisible: boolean) => {
    setVisibility(isVisible)
  }

  return (
    <VisibilitySensor
      scrollCheck={true}
      resizeCheck={true}
      onChange={onChangeVisibility}
      active={!isVisible}
      offset={{ top: -1000, bottom: -1000 }}
      partialVisibility>
      {() => (
        <PersonsWrapper ref={dayRef} data-date={day.date}>
          {isVisible && (
            <VisibilitySensor
              scrollCheck={true}
              resizeCheck={true}
              offset={{ top: 200, bottom: 200 }}
              partialVisibility
              onChange={(isActive) => isActive && onChangeActive(day)}>
              <Height>
                <DayMessages messages={day.messages} />
                <Persons day={day} deadByDateIndex={deadByDateIndex} />
              </Height>
            </VisibilitySensor>
          )}
        </PersonsWrapper>
      )}
    </VisibilitySensor>
  )
}

interface Props {
  day: DeadWithStatuesAndStories
  deadByDateIndex: number
  onChangeActive: Dispatch<SetStateAction<DeadWithStatuesAndStories>>
  activeDayUrl?: DeadWithStatuesAndStories
  dayRef: LegacyRef<HTMLDivElement>
}

const PersonsWrapper = styled.div`
  height: 100vh;
  position: relative;
`

const Height = styled.div`
  height: 100%;
`

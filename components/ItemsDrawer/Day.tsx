import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { Persons } from "./Persons"
import VisibilitySensor from "react-visibility-sensor"
import { DeadWithStatuesAndStories } from "../../pages"
import styled from "@emotion/styled"
import { DayMessages } from "../Message/DayMessages"

export const Day = ({ day, deadByDateIndex, onChangeActive, activeDayUrl, scrolled }: Props) => {
  const ref = useRef<HTMLDivElement>()
  const [isVisible, setVisibility] = useState<boolean>(false)

  const onChangeVisibility = (isVisible: boolean) => {
    setVisibility(isVisible)
  }

  useEffect(() => {
    if (ref?.current && !scrolled) {
      const date = ref.current.attributes.getNamedItem("data-date").value
      if (date == activeDayUrl.date) {
        ref.current?.scrollIntoView()
      }
    }

    return () => null
  }, [activeDayUrl, day.date, scrolled])

  return (
    <VisibilitySensor scrollCheck={true} onChange={onChangeVisibility} active={!isVisible} offset={{ top: 1, bottom: 1 }} partialVisibility>
      {() => (
        <PersonsWrapper ref={ref} data-date={day.date}>
          {isVisible && (
            <VisibilitySensor scrollCheck={true} offset={{ top: 200, bottom: 200 }} partialVisibility onChange={(isActive) => isActive && onChangeActive(day)}>
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
  scrolled: boolean
}

const PersonsWrapper = styled.div`
  height: 100vh;
  position: relative;
`

const Height = styled.div`
  height: 100%;
`

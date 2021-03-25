import React from "react"
import { PersonStatue } from "../ItemsDrawer/PersonStatue"
import styled from "@emotion/styled"
import { personWithStoryWith } from "../../common/config"
import { DeadDay } from "../../pages"

export const PersonWithStory = ({ dateDeadsRefs, dayDead, personPositionArea, onClickOpenModal }: Props) => {
  const substringStory = dayDead.story.length > 150 ? `${dayDead.story.substring(0, 150)}... ` : dayDead.story

  return (
    <PersonWithStoryWrapper
      ref={(el) => dateDeadsRefs.current.push(el)}
      style={{
        top: personPositionArea?.top,
        left: personPositionArea?.left,
        zIndex: 997 // personPositionArea?.zIndex
      }}>
      <PersonStatue personName={dayDead.statue} withStory={true} />

      <StoryWrapper>
        <Name>{`${dayDead.name}, ${dayDead.city ? `${dayDead.city},` : ""} ${dayDead.age} let`}</Name>
        <Story>
          {substringStory} <span onClick={onClickOpenModal}>celý příběh</span>
        </Story>
      </StoryWrapper>
    </PersonWithStoryWrapper>
  )
}

interface Props {
  dayDead: DeadDay
  dateDeadsRefs: React.MutableRefObject<HTMLDivElement[]>
  personPositionArea: any
  onClickOpenModal: () => void
}

const PersonWithStoryWrapper = styled.div`
  position: absolute;
  width: ${personWithStoryWith.width}px;
  height: ${personWithStoryWith.height}px;
  background-color: #ececec;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: stretch;
  place-items: center;
  animation: fadeIn ease 0.5s;
  border-radius: 3px;
  padding: 5px 10px 5px 5px;
`

const StoryWrapper = styled.div``

const Name = styled.div`
  margin-bottom: 5px;
  font-weight: bold;
`

const Story = styled.div`
  span {
    cursor: pointer;
    text-decoration: underline;
  }
`

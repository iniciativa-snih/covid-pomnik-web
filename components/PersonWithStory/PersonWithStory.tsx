import React from "react"
import { PersonStatue } from "../ItemsDrawer/PersonStatue"
import styled from "@emotion/styled"
import { personSize, personWithStoryWith } from "../../common/config"
import { DeadDay } from "../../pages"

export const PersonWithStory = ({ dateDeadsRefs, dayDead, personPositionArea }: Props) => {
  return (
    <PersonWithStoryWrapper
      ref={(el) => dateDeadsRefs.current.push(el)}
      style={{
        top: personPositionArea?.top,
        left: personPositionArea?.left,
        zIndex: 997 // personPositionArea?.zIndex
      }}>
      <PersonStatue personName={dayDead.statue} withStory={true} />

      <StoryWrapper title={dayDead.story}>
        <Name>{`${dayDead.name}, ${dayDead.city ? `${dayDead.city},` : ""} ${dayDead.age} let`}</Name>
        <Story>{dayDead.story}</Story>
      </StoryWrapper>
    </PersonWithStoryWrapper>
  )
}

interface Props {
  dayDead: DeadDay
  dateDeadsRefs: React.MutableRefObject<HTMLDivElement[]>
  personPositionArea: any
}

const PersonWithStoryWrapper = styled.div`
  position: absolute;
  width: ${personWithStoryWith.width}px;
  height: ${personWithStoryWith.height}px;
  background-color: #ececec;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  animation: fadeIn ease 0.5s;
  border-radius: 3px;
`

const StoryWrapper = styled.div`
  padding: 5px 5px 5px 0;
`

const Name = styled.div`
  margin-bottom: 5px;
  font-weight: bold;
`

const Story = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  width: ${personWithStoryWith.width - personSize.width - 5}px;
`

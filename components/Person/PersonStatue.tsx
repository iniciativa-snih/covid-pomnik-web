import React from "react"
import Image from "next/image"
import { personSize } from "../../common/config"
import styled from "@emotion/styled"

// FIXME this is a heck and workaround of Heroku memory leak
const myLoader = ({ src, width, quality }) => {
  return `https://admin.pamatnikpandemie.cz/static/images/persons/${src}.png`
}

export const PersonStatue = ({ personName, withStory }: Props): JSX.Element => {
  return (
    <PersonStatueWrapper withStory={withStory}>
      <Image
        loader={myLoader}
        src={personName}
        alt={personName}
        width={personSize.width}
        height={personSize.height}
        objectFit="contain"
        loading="eager"
      />
    </PersonStatueWrapper>
  )
}

interface Props {
  personName: string
  withStory?: boolean
}

const PersonStatueWrapper = styled.div<{ withStory?: boolean }>`
  width: ${personSize.width}px;
  height: ${personSize.height}px;
  flex: 0 0 40px;
  ${(props: { withStory?: boolean }) => (props.withStory ? `filter: invert(20%);` : "")}
`

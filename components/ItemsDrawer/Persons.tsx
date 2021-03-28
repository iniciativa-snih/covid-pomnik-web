import React, { useEffect, useRef, useState } from "react"
import { PersonWithStory } from "../PersonWithStory/PersonWithStory"
import { Person } from "../Person"
import { personSize, personWithStoryWith } from "../../common/config"
import { DeadPerson, DateDeadsWithStatuesAndStories } from "../../common/types"

export const Persons = ({ day, deadByDateIndex, onClickOpenModalHandler }: Props) => {
  const dateDeadsRefs = useRef<HTMLDivElement[]>([])
  const [personsAreas, setPersonsAreas] = useState([])

  useEffect(() => {
    const maxSearchIterations = 5
    const personMinX = 20
    const personWithStoryMinX = 20

    const personMaxX = window.outerWidth - personSize.width * 2
    const personWithStoryMaxX = window.outerWidth - personWithStoryWith.width

    const min_y = personSize.height
    const max_y = window.outerHeight - personSize.height

    const filled_areas = []
    let index = 0

    const calcOverlap = (a1) => {
      let overlap = 0
      for (const i in filled_areas) {
        const a2 = filled_areas[i]

        if (a1.x + a1.width < a2.x) {
          continue
        }
        if (a2.x + a2.width < a1.x) {
          continue
        }
        if (a1.y + a1.height < a2.y) {
          continue
        }
        if (a2.y + a2.height < a1.y) {
          continue
        }

        const x1 = Math.max(a1.x, a2.x)
        const y1 = Math.max(a1.y, a2.y)
        const x2 = Math.min(a1.x + a1.width, a2.x + a2.width)
        const y2 = Math.min(a1.y + a1.height, a2.y + a2.height)

        const intersection = (x1 - x2) * (y1 - y2)
        overlap += intersection
      }
      return overlap
    }

    const dateDeadsRefsAreas = dateDeadsRefs.current.map((dateDeadsRef) => {
      if (!dateDeadsRef) {
        return
      }

      let rand_x = 0
      let rand_y = 0
      let i = 0
      let smallest_overlap = 9007199254740992
      let best_choice
      let area

      for (i = 0; i < maxSearchIterations; i++) {
        const conditionedMaxX = dateDeadsRef.clientWidth > personSize.width ? personWithStoryMaxX : personMaxX
        const conditionedMinX = dateDeadsRef.clientWidth > personSize.width ? personWithStoryMinX : personMinX

        rand_x = Math.round(personMinX + (conditionedMaxX - conditionedMinX) * (Math.random() % 1))
        rand_y = Math.round(min_y + (max_y - min_y) * (Math.random() % 1))
        area = {
          x: rand_x,
          y: rand_y,
          width: dateDeadsRef.clientWidth || personSize.width,
          height: dateDeadsRef.clientHeight || personSize.height
        }

        const overlap = calcOverlap(area)
        if (overlap < smallest_overlap) {
          smallest_overlap = overlap
          best_choice = area
        }
        if (overlap === 0) {
          break
        }
      }

      filled_areas.push(best_choice)
      return {
        zIndex: index++,
        left: rand_x,
        top: rand_y
      }
    })

    setPersonsAreas(dateDeadsRefsAreas)
  }, [dateDeadsRefs, deadByDateIndex])

  return (
    <>
      {day.daily.map((dayDead, i) => {
        if (dayDead.name && dayDead.story) {
          return (
            <PersonWithStory
              dateDeadsRefs={dateDeadsRefs}
              personPositionArea={personsAreas[i]}
              dayDead={dayDead}
              key={`${day.date}${i}`}
              onClickOpenModal={() => onClickOpenModalHandler(dayDead)}
            />
          )
        }

        return <Person personName={dayDead.statue} dateDeadsRefs={dateDeadsRefs} personPositionArea={personsAreas[i]} key={`${day.date}${i}`} />
      })}
    </>
  )
}

interface Props {
  day: DateDeadsWithStatuesAndStories
  deadByDateIndex: number
  onClickOpenModalHandler: (dayDead: DeadPerson) => void
}

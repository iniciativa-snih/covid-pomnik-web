import React, { createRef, useEffect, useState } from "react"
import { Day } from "./Day"
import moment from "moment"
import styled from "@emotion/styled"
import numeral from "numeraljs"
import { useRouter } from "next/router"
import { DeadPersonModalWindow } from "../DeadPersonModalWindow/DeadPersonModalWindow"
import { DeadPerson, DateDeadsWithStatuesAndStories } from "../../common/types"
import { dateTimeFormat, dateTimeUrlFormat, numeralThousandsFormat } from "../../common/config"
import { usePlausible } from "next-plausible"
import { PlausibleEvents } from "../../common/plausibleEvents"
import { sm } from "../../styles/mediaQuery"

export const ItemsDrawer = ({ deadsWithStatuesAndStories }: Props): JSX.Element => {
  const router = useRouter()
  const daysRefs = Array.from({ length: deadsWithStatuesAndStories.length }).map(() => createRef<HTMLDivElement>())
  const [activeDayUrl, setActiveDayUrl] = useState<DateDeadsWithStatuesAndStories>(deadsWithStatuesAndStories[0])
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState<DeadPerson | undefined>(undefined)
  const plausible = usePlausible()

  const getDeadsFrequencyInMinutes = (deads: number) => {
    if (deads === 0) {
      return null
    }

    const deadsPerMinute = Math.round((24 * 60) / deads)

    if (deadsPerMinute === 0) {
      return null
    }

    if (deadsPerMinute === 1) {
      return ` (každou ${deadsPerMinute} minutu)`
    }

    if (deadsPerMinute >= 2 && deadsPerMinute <= 4) {
      return ` (každé ${deadsPerMinute} minuty)`
    }

    return ` (každých ${deadsPerMinute} minut)`
  }

  const onChangeActiveDayHandler = (day: DateDeadsWithStatuesAndStories) => {
    if (!moment(deadsWithStatuesAndStories[0].date).isSame(moment(day.date))) {
      router.push(`?d=${moment(day.date).format(dateTimeUrlFormat)}`, undefined, {
        shallow: true
      })
      // plausible(PlausibleEvents.ActiveDay, { props: { dateTime: day.date } })
    }
  }

  const onClickOpenModalHandler = (dayDead: DeadPerson) => {
    process.browser && window.document.body.classList.add("disable-scrolling")
    setModalContent(dayDead)
    plausible(PlausibleEvents.OpenDeadPersonModalWindow, {
      props: {
        dayDeadId: dayDead.id
      }
    })
  }

  const onClickCloseModalHandler = () => {
    process.browser && window.document.body.classList.remove("disable-scrolling")
    setModalContent(undefined)
    plausible(PlausibleEvents.CloseDeadPersonModalWindow)
  }

  useEffect(() => {
    const dayParameter = router.query?.d?.toString() || undefined
    const activeDayUrl = deadsWithStatuesAndStories.find((day) => moment(day.date).isSame(moment(dayParameter)))

    if (activeDayUrl) {
      setActiveDayUrl(activeDayUrl)

      const scrollToRef = daysRefs.find((dayRef) => dayRef?.current.attributes.getNamedItem("data-date").value === activeDayUrl.date)
      if (!moment(deadsWithStatuesAndStories[0].date).isSame(moment(scrollToRef.current.attributes.getNamedItem("data-date").value)) && !scrolled) {
        scrollToRef?.current?.scrollIntoView()
        // plausible(PlausibleEvents.ScrollIntoDateView)
      }
    }
  }, [daysRefs, deadsWithStatuesAndStories, plausible, router.query?.d, scrolled])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(true)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {modalContent && (
        <DeadPersonModalWindow onCloseModal={onClickCloseModalHandler}>
          <h1>
            {modalContent.name}{modalContent.city ? `, ${modalContent.city}` : ""}{modalContent.age != null ? `, ${modalContent.age} let` : ""}
          </h1>
          <p>{moment(modalContent.date).format(dateTimeFormat)}</p>
          <p>{modalContent.story}</p>
        </DeadPersonModalWindow>
      )}

      <ActiveDate>
        <div>{moment(activeDayUrl.date).format(dateTimeFormat)}</div>
        <div>
          Úmrtí: {`${numeral(activeDayUrl.daily.length).format(numeralThousandsFormat)}`}
          {getDeadsFrequencyInMinutes(activeDayUrl.daily.length)}
        </div>
        <div>Celkem úmrtí: {`${numeral(activeDayUrl.cumulative).format(numeralThousandsFormat)}`}</div>
      </ActiveDate>

      {deadsWithStatuesAndStories.map((day, index) => (
        <Day
          deadByDateIndex={index}
          key={day.date}
          dayRef={daysRefs[index]}
          day={day}
          onChangeActive={onChangeActiveDayHandler}
          activeDayUrl={activeDayUrl}
          onClickOpenModalHandler={onClickOpenModalHandler}
        />
      ))}
    </>
  )
}

interface Props {
  deadsWithStatuesAndStories: DateDeadsWithStatuesAndStories[]
}

const ActiveDate = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  margin-bottom: 100px;
  background-color: #ececec;
  padding: 10px;
  z-index: 999;
  animation: fadeIn ease 0.5s;
  font-size: 15px;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  line-height: 1.3;

  ${sm} {
    margin-bottom: 50px;
  }
`

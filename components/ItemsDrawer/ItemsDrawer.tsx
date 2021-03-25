import React, { createRef, useEffect, useState } from "react"
import { DeadDay, DeadWithStatuesAndStories } from "../../pages"
import { Day } from "./Day"
import moment from "moment"
import styled from "@emotion/styled"
import numeral from "numeraljs"
import { useRouter } from "next/router"
import { Modal } from "../Modal/Modal"

const thousandsFormat = "0,0"

export const ItemsDrawer = ({ deadsWithStatuesAndStories }: Props) => {
  const router = useRouter()
  const daysRefs = Array.from({ length: deadsWithStatuesAndStories.length }).map(() => createRef<HTMLDivElement>())
  const [activeDayUrl, setActiveDayUrl] = useState<DeadWithStatuesAndStories>(deadsWithStatuesAndStories[0])
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [modalIsOpen, setModalIsOpen] = useState<DeadDay | undefined>(undefined)

  const onChangeActiveDayHandler = (day: DeadWithStatuesAndStories) => {
    if (!moment(deadsWithStatuesAndStories[0].date).isSame(moment(day.date))) {
      router.push(`?d=${moment(day.date).format("YYYY-MM-DD")}`, undefined, {
        shallow: true
      })
    }
  }

  useEffect(() => {
    const dayParameter = router.query?.d?.toString() || undefined
    const activeDayUrl = deadsWithStatuesAndStories.find((day) => moment(day.date).isSame(moment(dayParameter)))

    if (activeDayUrl) {
      setActiveDayUrl(activeDayUrl)

      const scrollToRef = daysRefs.find((dayRef) => dayRef?.current.attributes.getNamedItem("data-date").value === activeDayUrl.date)
      if (!moment(deadsWithStatuesAndStories[0].date).isSame(moment(scrollToRef.current.attributes.getNamedItem("data-date").value)) && !scrolled) {
        scrollToRef?.current?.scrollIntoView()
      }
    }
  }, [daysRefs, deadsWithStatuesAndStories, router.query?.d, scrolled])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(true)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const onClickOpenModalHandler = (dayDead: DeadDay) => {
    process.browser && window.document.body.classList.add("disable-scrolling")
    setModalIsOpen(dayDead)
  }

  const onClickCloseModalHandler = () => {
    process.browser && window.document.body.classList.remove("disable-scrolling")
    setModalIsOpen(undefined)
  }

  return (
    <>
      {modalIsOpen && (
        <Modal onCloseModal={onClickCloseModalHandler}>
          <h1>
            {modalIsOpen.name}, {modalIsOpen.city ? `${modalIsOpen.city}, ` : ""} {modalIsOpen.age} let
          </h1>
          <p>{moment(modalIsOpen.date).format("D. M. YYYY")}</p>
          <p>{modalIsOpen.story}</p>
        </Modal>
      )}

      <ActiveDate>
        <div>{moment(activeDayUrl.date).format("D. M. YYYY")}</div>
        <div>Úmrtí: {`${numeral(activeDayUrl.daily.length).format(thousandsFormat)}`}</div>
        <div>Celkem úmrtí: {`${numeral(activeDayUrl.cumulative).format(thousandsFormat)}`}</div>
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
  deadsWithStatuesAndStories: DeadWithStatuesAndStories[]
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
`

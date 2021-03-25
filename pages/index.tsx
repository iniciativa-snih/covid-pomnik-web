import React, { useState } from "react"
import { ItemsDrawer } from "../components/ItemsDrawer/ItemsDrawer"
import styled from "@emotion/styled"
import { GetStaticProps, GetStaticPropsResult } from "next"
import { getImageFileNameByIndex } from "../common/getImageFileNameByIndex"
import { randomInteger } from "../common/randomInteger"
import moment from "moment"
import { NextSeo } from "next-seo"
import { Menu } from "../components/Menu/Menu"

const dev = process.env.NODE_ENV !== "production"

const Index = ({ deadsWithStatuesAndStories }: Props) => {
  return (
    <>
      <NextSeo
        title="E-památník obětí pandemie v České republice"
        description="Památník obětí pandemie ve své elektronické podobě má dát příležitost virtuálně sdílet smutek i účast, empatii i stesk. Má připomenout oběti a dát prostor pozůstalým."
        canonical="https://covid-pomnik-web.vercel.app/"
        openGraph={{
          url: "https://covid-pomnik-web.vercel.app/",
          title: "E-památník obětí pandemie v České republice",
          description:
            "Památník obětí pandemie ve své elektronické podobě má dát příležitost virtuálně sdílet smutek i účast, empatii i stesk. Má připomenout oběti a dát prostor pozůstalým."
        }}
      />

      <main>
        <Menu />

        <HeaderText>
          <h1>E-památník obětí pandemie v České republice</h1>
          <p>
            Památník obětí pandemie ve své elektronické podobě má dát příležitost virtuálně sdílet smutek i účast, empatii i stesk. Má připomenout oběti a dát
            prostor pozůstalým. A tím není jen blízký příbuzný, nýbrž každý, kdo pozůstal. Každý, komu zemřelý chybí, a kdo pociťuje jeho odchod jako ztrátu, s
            níž je třeba se vyrovnat. Rozloučení, na jaká jsme byli při odchodech našich blízkých zvyklí, se v těchto měsících nemohou uskutečnit. Smutek
            potřebujeme sdílet, třeba i ve virtuální podobě.
          </p>
          <p>
            Desítky tisíc obětí nejsou jen údaj, každá oběť žila svůj jedinečný příběh, který pandemie náhle ukončila. Nyní je na nás, abychom nesli jejich
            památku jako připomínku lidské křehkosti a zranitelnosti. Zůstávají součástí nás všech, kteří odmítáme lhostejnost a víme, že bez soucitu a ochoty
            navzájem se podepřít ve smutku by život byl nesnesitelně chudý.
          </p>
          <p>
            Pokud chcete pridat pribeh, svou vzpomínku na vašeho blízkého, poslete email na{" "}
            <a href="mailto:info@epamatnikpandemie.cz">info@epamatnikpandemie.cz</a> se jmenem, datem umrti, vekem a pribehem.
          </p>
        </HeaderText>

        <ItemsDrawer deadsWithStatuesAndStories={deadsWithStatuesAndStories} />
      </main>

      <footer>© {moment().format("YYYY")} Iniciativa Sníh</footer>
    </>
  )
}

interface Props {
  deadsWithStatuesAndStories: DeadWithStatuesAndStories[]
}

export interface Dead {
  cumulative: number
  daily: number
  date: string
}

export interface Story {
  age: number
  city: string | null
  date: string
  id: number
  name: string
  statue: string
  story: string
}

export interface DeadWithStatuesAndStories {
  cumulative: number
  daily: DeadDay[]
  messages?: Message[]
  date: string
}

export interface DeadDay {
  statue: string
  age?: number
  city?: string | null
  date?: string
  id?: number
  name?: string
  story?: string
}

export interface Message {
  id: number
  date: string
  message: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<Props>> => {
  const deadsByDate: Dead[] = await fetcher("https://covid-pomnik.herokuapp.com/api/deads")
  const stories: Story[] = await fetcher("https://covid-pomnik.herokuapp.com/api/stories")
  const messages: Message[] = await fetcher("https://covid-pomnik.herokuapp.com/api/messages")

  const deadsWithStatuesAndStories = deadsByDate.map((day) => {
    const daily = Array(day.daily)
      .fill(0)
      .map(() => ({ statue: getImageFileNameByIndex(randomInteger(0, 23)) }))

    const dayMessages = messages.filter((m) => moment(m.date).isSame(moment(day.date))) ?? undefined

    return {
      ...day,
      ...(dayMessages && { messages: dayMessages }),
      daily: [...daily, ...stories.filter((s) => moment(s.date).isSame(moment(day.date)))]
    }
  })

  return {
    props: {
      deadsWithStatuesAndStories: deadsWithStatuesAndStories || []
    },
    revalidate: dev ? 1 : 60
  }
}

const HeaderText = styled.div`
  text-align: center;
  padding: 40px 40px 40px 20px;
  top: 0;
  left: 0;
  z-index: 999;
  animation: fadeIn ease 1s;
  color: rgb(0 0 0 / 80%);

  p {
    font-size: 15px;
    line-height: 1.6;
  }
`

export default Index

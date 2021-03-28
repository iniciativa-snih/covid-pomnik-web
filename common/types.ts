export interface DateDead {
  cumulative: number
  daily: number
  date: string
}

export interface PersonStory {
  age: number
  city: string | null
  date: string
  id: number
  name: string
  statue: string
  story: string
}

export interface DateDeadsWithStatuesAndStories {
  cumulative: number
  daily: DeadPerson[]
  messages?: Message[]
  date: string
}

export interface DeadPerson {
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

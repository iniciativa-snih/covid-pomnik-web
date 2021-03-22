import React from "react"
import type { AppProps } from "next/app"
import "@csstools/normalize.css"
import { globalStyles } from "../styles/globalStyle"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {globalStyles}
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

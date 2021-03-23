import React from "react"
import type { AppProps } from "next/app"
import "@csstools/normalize.css"
import { globalStyles } from "../styles/globalStyle"
import { DefaultSeo } from "next-seo"
import SEO from "../next-seo.config"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {globalStyles}
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

import React from "react"
import type { AppProps } from "next/app"
import "@csstools/normalize.css"
import { globalStyles } from "../styles/globalStyle"
import { DefaultSeo } from "next-seo"
import SEO from "../next-seo.config"
import PlausibleProvider from "next-plausible"
import { dev, plausibleDomain } from "../common/config"
import { ParallaxProvider } from "react-scroll-parallax"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {globalStyles}
      <DefaultSeo {...SEO} />
      <PlausibleProvider domain={plausibleDomain} enabled={!dev}>
        <ParallaxProvider>
          <Component {...pageProps} />
        </ParallaxProvider>
      </PlausibleProvider>
    </>
  )
}

export default MyApp

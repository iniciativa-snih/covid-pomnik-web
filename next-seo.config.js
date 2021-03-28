import { mainRootWebUrl } from "./common/config"

export const title = "Památník obětí pandemie"
const description =
  "Památník obětí pandemie ve své elektronické podobě má dát příležitost virtuálně sdílet smutek i účast, empatii i stesk. Má připomenout oběti a dát prostor pozůstalým."

export default {
  title,
  description,
  canonical: mainRootWebUrl,
  openGraph: {
    title,
    description,
    url: mainRootWebUrl,
    type: "website",
    locale: "cs_CZ",
    site_name: "Památník obětí pandemie"
    /* //TODO az budu znat jake je spravne logo
    images: [
          {
            url: 'https://www.example.ie/og-image-01.jpg',
            width: 800,
            height: 600,
            alt: 'Og Image Alt',
          }
         ]
     */
  }
  /*
  //TODO az budu znat Facebook App id
  facebook: {
    appId: '1234567890'
  }
   */
}

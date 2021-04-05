// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require("express")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const next = require("next")

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use((req, res, next) => {
    // const hostname = req.hostname === "www.test.pamatnikpandemie.cz" ? "test.pamatnikpandemie.cz" : req.hostname
    const hostname = req.hostname === "www.pamatnikpandemie.cz" ? "www.pamatnikpandemie.cz" : req.hostname

    // if (req.headers["x-forwarded-proto"] === "http" || req.hostname === "www.test.pamatnikpandemie.cz") {
    if (req.headers["x-forwarded-proto"] === "http" || req.hostname === "www.pamatnikpandemie.cz") {
      res.redirect(301, `https://${hostname}${req.url}`)
      return
    }

    res.setHeader("strict-transport-security", "max-age=31536000; includeSubDomains; preload")
    next()
  })

  server.all("*", (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

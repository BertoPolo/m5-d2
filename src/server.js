import express from "express"
import { join } from "path"
import cors from "cors"
import listEndpoints from "express-list-endpoints"
import authorsRouter from "./services/authors/index.js"
import blogsRouter from "./services/blogs/index.js"
import { genericErrorHandler, notFoundErrorHandler, badRequestErrorHandler, unauthorizedErrorHandler } from "./errorHandlers.js"

const server = express()

const urlList = [process.env.FE_DEV_URL, process.env.FE_PROD_URL]

const port = process.env.PORT || 3001

const publicFolderPath = join(process.cwd(), "./public")

const loggerMiddleware = (req, res, next) => {
  console.log(`Request method: ${req.method} --- URL ${req.url} --- ${new Date()}`)
  next()
}

server.use(express.static(publicFolderPath))
server.use(
  cors({
    origin: (origin, next) => {
      // cors is a global middleware --> for each and every request we are going to be able to read the current origin value
      console.log("ORIGIN: ", origin)

      if (!origin || urlList.indexOf(origin) !== -1) {
        // origin is in the urlList --> move next with no errors
        next(null, true)
      } else {
        // origin is NOT in the urlList --> trigger an error
        next(createError(400, "CORS ERROR!"))
      }
    },
  })
)
server.use(loggerMiddleware) // login */
server.use(express.json())

//endpoints

server.use("/authors", authorsRouter)
server.use("/blogs", blogsRouter)

//ERROR MIDDLEWARES
server.use(badRequestErrorHandler) // 400
server.use(unauthorizedErrorHandler) // 401
server.use(notFoundErrorHandler) // 404
server.use(genericErrorHandler) // 500

server.listen(port, () => {
  console.table(listEndpoints(server))
  console.log("server run on this port : ", port)
})

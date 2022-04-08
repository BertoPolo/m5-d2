import express from "express"
import { join } from "path"

import listEndpoints from "express-list-endpoints"
import authorsRouter from "./services/authors/index.js"
import blogsRouter from "./services/blogs/index.js"
// import filesRouter from "./services/files/index.js"
import { genericErrorHandler, notFoundErrorHandler, badRequestErrorHandler, unauthorizedErrorHandler } from "./errorHandlers.js"

const server = express()

const port = 3001
const publicFolderPath = join(process.cwd(), "../public")

const loggerMiddleware = (req, res, next) => {
  console.log(`Request method: ${req.method} --- URL ${req.url} --- ${new Date()}`)
  next()
}
server.use(express.static(publicFolderPath))
// server.use(cors())
server.use(loggerMiddleware) // login */
server.use(express.json())

//endpoints

server.use("/authors", authorsRouter)
server.use("/blogs", blogsRouter)
// server.use("/files", filesRouter)

//ERROR MIDDLEWARES
server.use(badRequestErrorHandler) // 400
server.use(unauthorizedErrorHandler) // 401
server.use(notFoundErrorHandler) // 404
server.use(genericErrorHandler) // 500

server.listen(port, () => {
  console.table(listEndpoints(server))
  console.log("server run on this port : ", port)
})

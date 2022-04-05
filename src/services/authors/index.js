import express from "express"
import fs from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import uniqid from "uniqid"

const authorsRouter = express.Router()

const currentFilePath = fileURLToPath(import.meta.url)

const parentFolderPath = dirname(currentFilePath)

const authorsJSONPath = join(parentFolderPath, "authors.json")

authorsRouter.post("/", (req, res) => {
  console.log("REQUEST BODY:", req.body)

  const newAuthor = { ...req.body, createdAt: new Date(), id: uniqid() }
  console.log(newAuthor)

  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))

  authorsArray.push(newAuthor)

  fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray))

  res.status(201).send({ id: newAuthor.id })
})

authorsRouter.get("/", (req, res) => {
  const fileContent = fs.readFileSync(authorsJSONPath)

  const authorsArray = JSON.parse(fileContent)

  res.status(200).send({ authorsArray })
})

authorsRouter.get("/:authorId", (req, res) => {
  const authorId = req.params.authorId
  console.log("REQ.PARAMS.authorId: ", req.params.authorId)
  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))

  const foundAuthor = authorsArray.find((author) => author.id === authorId)
  res.send(foundAuthor)
})

authorsRouter.put("/:authorsId", (req, res) => {
  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))

  const index = authorsArray.findIndex((author) => author.id === req.params, authorId)
  const oldAuthor = authorsArray[index]
  const updatedAuthor = { ...oldAuthor, ...req.body, updatedAt: new Date() }

  authorsArray[index] = updatedAuthor
  fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray))

  res.send(updatedAuthor)

  authorsRouter.delete()
})

export default authorsRouter

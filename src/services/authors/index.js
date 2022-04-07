import express from "express"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import uniqid from "uniqid"
import { readAuthors, writeAuthors } from "../../library/fs-tools.js"

const authorsRouter = express.Router()

authorsRouter.post("/", async (req, res) => {
  console.log("REQUEST BODY:", req.body)
  try {
    const newAuthor = { ...req.body, createdAt: new Date(), id: uniqid() }
    console.log(newAuthor)

    const authorsArray = await readAuthors()

    authorsArray.push(newAuthor)

    fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray))

    res.status(201).send({ id: newAuthor.id })
  } catch (error) {}
})
////////////

authorsRouter.get("/", async (req, res) => {
  const authorsArray = await readAuthors()

  res.status(200).send({ authorsArray })
})
////////////

authorsRouter.get("/:authorId", async (req, res) => {
  const authorId = req.params.authorId
  console.log("REQ.PARAMS.authorId: ", req.params.authorId)
  const authorsArray = await readAuthors()

  const foundAuthor = authorsArray.find((author) => author.id === authorId)
  res.send(foundAuthor)
})
////////////

authorsRouter.put("/:authorsId", async (req, res) => {
  const authorsArray = await readAuthors()

  const index = authorsArray.findIndex((author) => author.id === req.params, authorId)
  const oldAuthor = authorsArray[index]
  const updatedAuthor = { ...oldAuthor, ...req.body, updatedAt: new Date() }

  authorsArray[index] = updatedAuthor
  await writeAuthors(authorsArray)
  fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray))

  res.send(updatedAuthor)
})

////////////
authorsRouter.delete("/", async (req, res) => {
  const authorsArray = JSON.parse(fsreadFileSync(authorsJSONPath))
  const remainingAuthors = authorsArray.filter((author) => author.id !== req.params.authorId)
  fs.writeFileSync(authorsJSONPath, JSON.stringify(remainingAuthors))
  await writeAuthors(remainingAuthors)
  res.status(204).send()
})

export default authorsRouter

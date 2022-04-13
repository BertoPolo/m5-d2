import express from "express"
import uniqid from "uniqid"
import { readAuthors, writeAuthors } from "../../library/fs-tools.js"
import { saveAuthorsAvatars, getAuthorsReadableStream } from "../../library/fs-tools.js"
import multer from "multer"
import json2csv from "json2csv"
import { v2 as cloudinary } from "cloudinary"
// import { CloudinaryStorage } from "multer-storage-cloudinary"
import { pipeline } from "stream"
import { createGzip } from "zlib"

const authorsRouter = express.Router()

authorsRouter.post("/", async (req, res, next) => {
  console.log("REQUEST BODY:", req.body)
  try {
    const authorsArray = await readAuthors()

    const isNewEmail = authorsArray.find((author) => author.email === req.body.email)

    const newAuthor = { ...req.body, createdAt: new Date(), id: uniqid(), existingMail: isNewEmail }
    console.log(newAuthor)

    authorsArray.push(newAuthor)
    writeAuthors(authorsArray)

    res.status(201).send({ id: newAuthor.id })
  } catch (error) {
    next(error)
  }
})
////////////
//this "avatar" have to be the same at FE,this is the prop
authorsRouter.post("/:authorId/uploadAvatar", multer().single("avatar"), async (req, res, next) => {
  try {
    //this give the name and extension to the file
    await saveAuthorsAvatars(`${req.params.authorId}.gif`, req.file.buffer)
    console.log("FILES: ", req.file)
    res.status(201).send()
  } catch (error) {
    next(error)
  }
})

///////
authorsRouter.get("/", async (req, res, next) => {
  try {
    const authorsArray = await readAuthors()

    res.status(200).send({ authorsArray })
  } catch (error) {
    next(error)
  }
})

//////////Create an endpoint dedicated to export the list of all the authors as a CSV file m5d8
authorsRouter.get("/downloadCSV", async (req, res, next) => {
  try {
    res.setHeader("Content-Disposition", "attachment; filename=authors.csv")
    const source = getAuthorsReadableStream()
    const transform = new json2csv.Transform({ fields: ["name", "surename", "email", "id"] })
    const destination = res

    pipeline(source, transform, destination, (err) => {
      if (err) console.log(err)
    })
  } catch (error) {
    next(error)
  }
})

////////////

authorsRouter.get("/:authorId", async (req, res, next) => {
  try {
    const authorId = req.params.authorId
    console.log("REQ.PARAMS.authorId: ", req.params.authorId)
    const authorsArray = await readAuthors()

    const foundAuthor = authorsArray.find((author) => author.id === authorId)
    res.send(foundAuthor)
  } catch (error) {
    next(error)
  }
})
////////////

authorsRouter.put("/:authorsId", async (req, res, next) => {
  try {
    const authorsArray = await readAuthors()

    const index = await authorsArray.findIndex((author) => author.id === req.params, authorId)
    const oldAuthor = authorsArray[index]
    const updatedAuthor = { ...oldAuthor, ...req.body, updatedAt: new Date() }

    authorsArray[index] = updatedAuthor
    await writeAuthors(authorsArray)

    res.send(updatedAuthor)
  } catch (error) {
    next(error)
  }
})

////////////
authorsRouter.delete("/", async (req, res, next) => {
  try {
    const authorsArray = await readAuthors()

    const remainingAuthors = authorsArray.filter((author) => author.id !== req.params.authorId)

    await writeAuthors(remainingAuthors)

    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

export default authorsRouter

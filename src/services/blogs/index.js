import express from "express"
import fs from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import uniqid from "uniqid"

const blogsRouter = express.Router()

const authorsJSONPath = join(dirname(fileURLToPath(import.meta.url)), "blogs.json")

blogsRouter.post("/", (req, res) => {})

export default blogsRouter

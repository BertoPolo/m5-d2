import express from "express"
import fs from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import uniqid from "uniqid"

const blogsRouter = express.Router()

const authorsJSONPath = join(dirname(fileURLToPath(import.meta.url)), "blogs.json")

const readBlogs = () => JSON.parse(fs.readFileSync(authorsJSONPath))

const writeBlog = (content) => fs.writeFileSync(authorsJSONPath, JSON.stringify(content))

blogsRouter.post("/", (req, res, next) => {
  try {
    const newBlog = { ...req.body, createdAt: new Date(), id: uniqid() }
    const blogs = readBlogs().push(newBlog)

    res.status(201).send({ id: newBlog.id })
  } catch (error) {
    // next(error)
  }
})

blogsRouter.get("/", (req, res, next) => {
  try {
    const blogs = readBlogs()

    if (req.query && req.query.category) {
      const filteredBlogs = blogs.filter((blog) => blog.category === req.query.category)
      res.send(filteredBlogs)
    } else {
      res.send(blogs)
    }
  } catch (error) {
    // next(error)
  }
})

export default blogsRouter

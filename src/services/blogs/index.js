import express from "express"
import fs from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import uniqid from "uniqid"
import createError from "http-errors"

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
    next(error)
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
    next(error)
  }
})

blogsRouter.get("/blogId", (req, res, next) => {
  try {
    const blogs = readBlogs()

    const blog = blogs.find((person) => person.id === req.params.blogId)

    if (blog) {
      res.status(200).send(blog)
    } else {
      next(createError(404, `this post ${req.params.blogId} is not found`))
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.put("/blogId", (req, res, next) => {
  try {
    const blogs = readBlogs()

    const index = blogs.find((blog) => blog.id === req.params.blogId)

    const oldBlog = blogs[index]

    const updatedBlog = { ...oldBlog, ...req.body, updatedAt: new Date() }

    blogs[index] = updatedBlog

    writeBlog(blogs)
    res.send(updatedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete("/blogId", (req, res, next) => {
  try {
    const blogs = readBlogs()

    const remainingBlogs = blogs.find((blog) => blog.id !== req.params.blogId)

    writeBlog(remainingBlogs)

    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

export default blogsRouter

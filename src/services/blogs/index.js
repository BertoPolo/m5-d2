import express from "express"
import uniqid from "uniqid"
import createError from "http-errors"
import { checkBookSchema, checkValidationResult } from "./validation.js"
import { readBlogs, writeBlogs, saveBlogsCovers, blogsPublicFolderCoverPath } from "../../library/fs-tools.js"
import multer from "multer"

const blogsRouter = express.Router()
////
blogsRouter.post("/", checkBookSchema, checkValidationResult, async (req, res, next) => {
  try {
    const newBlog = { ...req.body, createdAt: new Date(), id: uniqid() }
    const blogs = await readBlogs()

    blogs.push(newBlog)

    await writeBlogs(blogs)

    res.status(201).send({ id: newBlog.id })
  } catch (error) {
    next(error)
  }
})
////////////
blogsRouter.post("/:blogId/uploadCover", multer().single("cover"), async (req, res, next) => {
  try {
    await saveBlogsCovers(`${req.params.blogId}.jpg`, req.file.buffer)
    console.log("FILES: ", req.file)

    const blogs = await readBlogs()

    const theBlog = blogs.find((blog) => blog.id === req.params.blogId)

    theBlog = { ...req.body, cover: join(blogsPublicFolderCoverPath, blogId) }
    writeBlogs(theBlog)
    //grab the blog and update / create a prop " cover" with its path
    res.send()
  } catch (error) {
    next(error)
    console.log(error)
  }
})

///////
blogsRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await readBlogs()

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
//////////
blogsRouter.get("/blogId", async (req, res, next) => {
  try {
    const blogs = await readBlogs()

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
//////////
blogsRouter.get("/blogId/comments", async (req, res, next) => {
  try {
    const blogs = await readBlogs()

    const blog = blogs.find((person) => person.id === req.params.blogId)

    if (blog) {
      res.status(200).send(blog, blog.comment)
    } else {
      next(createError(404, `this post ${req.params.blogId} is not found`))
    }
  } catch (error) {
    next(error)
  }
})

///////
blogsRouter.get("/:blogId/uploadCover/blogId", multer().single("cover"), async (req, res, next) => {
  try {
    console.log("FILES: ", req.file)
    res.send()
  } catch (error) {
    next(error)
    console.log(error)
  }
})

///////
blogsRouter.put("/blogId", async (req, res, next) => {
  try {
    const blogs = await readBlogs()

    const index = await blogs.findIndex((blog) => blog.id === req.params.blogId)

    const oldBlog = blogs[index]

    const updatedBlog = { ...oldBlog, ...req.body, updatedAt: new Date() }

    blogs[index] = updatedBlog

    await writeBlogs(blogs)
    res.send(updatedBlog)
  } catch (error) {
    next(error)
  }
})
//////////
blogsRouter.delete("/blogId", async (req, res, next) => {
  try {
    const blogs = await readBlogs()

    const remainingBlogs = blogs.find((blog) => blog.id !== req.params.blogId)

    await writeBlogs(remainingBlogs)

    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

export default blogsRouter

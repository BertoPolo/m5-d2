import { checkSchema, validationResult } from "express-validator"
import createError from "http-errors"

/* const blogsSchema = () => {
  category: "ARTICLE CATEGORY",
  title: "ARTICLE TITLE",
  cover: "ARTICLE COVER (IMAGE LINK)",
  readTime: {
    value: 2,
    unit: "minute"
  },
  author: {
    name: "AUTHOR AVATAR NAME",
    avatar: "AUTHOR AVATAR LINK"
  },
  content: "HTML",
  createdAt: "NEW DATE"
} */

export const checkBookSchema = checkSchema(blogsSchema)

export const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    next(createError(400, "Validation problems in req.body", { errorsList: errors.array() }))
  } else {
    next()
  }
}

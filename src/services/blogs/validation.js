import { checkSchema, validationResult } from "express-validator"
import createError from "http-errors"

const blogsSchema = {
  title: {
    in: ["body"],
    isString: {
      errorMessage: "title validation failed , type must be string  ",
    },
  },
  category: {
    in: ["body"],
    isString: {
      errorMessage: "category validation failed , type must be  string ",
    },
  },
  cover: {
    in: ["body"],
    isString: {
      errorMessage: "cover validation failed , type must be string ",
    },
  },
  author: {
    in: ["body"],
    isString: {
      errorMessage: "author's name validation failed , type must be string",
    },
  },
  content: {
    in: ["body"],
    isString: {
      errorMessage: "content validation failed , type must be string",
    },
    avatar: {
      in: ["body"],
      isString: {
        errorMessage: "avatar validation failed , type must be string",
      },
    },
    createdAt: {
      in: ["body"],
      isString: {
        errorMessage: "avatar validation failed , type must be string",
      },
    },

    "readTime.value": {
      in: ["body"],
      isNumeric: {
        errorMessage: "readTime.value  validation failed , type must be numeric ",
      },
    },
    "readTime.unit": {
      in: ["body"],
      isString: {
        errorMessage: "readTime.unit  validation failed , type must be string ",
      },
    },
  },
}

export const checkBookSchema = checkSchema(blogsSchema)

export const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    next(createError(400, "Validation problems in req.body", { errorsList: errors.array() }))
  } else {
    next()
  }
}

import express from "express"
import multer from "multer"

const filesRouter = express.Router()

filesRouter.post("/authors/:authorId/uploadAvatar", multer().array("avatars"), async (req, res, next) => {
  try {
    await saveUsersAvatars("whatever.gif", req.file.buffer)
    console.log("FILES: ", req.files)
  } catch (error) {
    next(error)
  }
})

export default filesRouter

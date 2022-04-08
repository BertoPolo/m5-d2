import fs from "fs-extra"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const { readJSON, writeJSON, writeFile } = fs

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")

const blogsJSONPath = join(dataFolderPath, "blogs.json")
const authorsJSONPath = join(dataFolderPath, "authors.json")

const usersPublicFolderPath = join(process.cwd(), "./public/img/users")
const blogsPublicFolderCoverPath = join(process.cwd(), "./public/blogs/covers")

export const readBlogs = () => readJSON(blogsJSONPath)

export const writeBlogs = (content) => writeJSON(blogsJSONPath, content)

export const readAuthors = () => readJSON(authorsJSONPath)

export const writeAuthors = (content) => writeJSON(authorsJSONPath, content)

export const saveUsersAvatars = (filename, contentAsBuffer) => writeFile(join(usersPublicFolderPath, filename), contentAsBuffer)

export const saveBlogsCovers = (filename, contentAsBuffer) => writeFile(join(blogsPublicFolderCoverPath, filename), contentAsBuffer)

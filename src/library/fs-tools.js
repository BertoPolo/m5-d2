import fs from "fs-extra"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const { readJSON, writeJSON, writeFile } = fs

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")

const blogsJSONPath = join(dataFolderPath, "blogs.json")
const authorsJSONPath = join(dataFolderPath, "authors.json")

const usersPublicFolderPath = join(process.cwd(), "./public/img/users")

export const readBlogs = () => readJSON(blogsJSONPath)

export const writeBlogs = (content) => writeJSON(blogsJSONPath, content)

export const readAuthors = () => JSON.parse(readFile(authorsJSONPath))

export const writeAuthors = (content) => writeJSON(authorsJSONPath, content)

export const saveUsersAvatars = (filename, contentAsBuffer) => writeFile(join(usersPublicFolderPath, filename), contentAsBuffer)

import fs from "fs-extra"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const { readJSON, writeJSON, writeFile, createReadStream, createWriteStream } = fs

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")

const blogsJSONPath = join(dataFolderPath, "blogs.json")
const authorsJSONPath = join(dataFolderPath, "authors.json")

const authorsPublicFolderPath = join(process.cwd(), "./public/img/authors")
export const blogsPublicFolderCoverPath = join(process.cwd(), "./public/blogPosts/covers")

export const readBlogs = () => readJSON(blogsJSONPath)

export const writeBlogs = (content) => writeJSON(blogsJSONPath, content)

export const readAuthors = () => readJSON(authorsJSONPath)

export const writeAuthors = (content) => writeJSON(authorsJSONPath, content)

export const saveAuthorsAvatars = (filename, contentAsBuffer) => writeFile(join(authorsPublicFolderPath, filename), contentAsBuffer)

export const saveBlogsCovers = (filename, contentAsBuffer) => writeFile(join(blogsPublicFolderCoverPath, filename), contentAsBuffer)

export const getAuthorsReadableStream = () => createReadStream(authorsJSONPath)

// export const

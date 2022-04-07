import fs from "fs-extra"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const { readJSON, writeJSON, writeFile } = fs

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")

const blogsJSONPath = join(dataFolderPath, "blogs.json")

export const readBlogs = () => JSON.parse(readFile(blogsJSONPath))

export const writeBlogs = (content) => writeFile(blogsJSONPath, content)

// const usersPublicFolderPath = join(process.cwd(), "./public/img/users")
// export const saveUsersAvatars = (filename, contentAsBuffer) => writeFile(join(usersPublicFolderPath, filename), contentAsBuffer)

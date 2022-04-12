import PdfPrinter from "pdfmake"
import blogs from "..data/blogs.json"

const fonts = {
  Helvetica: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
  },
}

const printer = new PdfPrinter(fonts)
const fs = require("fs")

const docDefinition = {
  blogs,
}

const pdfDoc = printer.createPdfKitDocument(docDefinition, options)
pdfDoc.pipe(fs.createWriteStream("document.pdf"))
pdfDoc.end()
// helvetica...

const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
const fs = require("fs");
const path = require("path");

async function extractText() {
  const pdfPath = path.join(__dirname, "ข้อสอบโปรแกรมเมอร์ 2568 V1.4.0.pdf");
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const loadingTask = pdfjsLib.getDocument({ data, useWorkerFetch: false, isEvalSupported: false, useSystemFonts: true });
  const pdfDoc = await loadingTask.promise;
  console.log("Pages:", pdfDoc.numPages);
  let fullText = "";
  for (let i = 1; i <= pdfDoc.numPages; i++) {
    const page = await pdfDoc.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(" ");
    fullText += `\n--- Page ${i} ---\n` + pageText;
  }
  fs.writeFileSync("pdf_text.txt", fullText, "utf8");
  process.stdout.write(fullText.slice(0, 8000));
}

extractText().catch(console.error);

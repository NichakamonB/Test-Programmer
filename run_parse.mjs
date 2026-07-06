import * as pdfjsLib from "./node_modules/pdfjs-dist/legacy/build/pdf.mjs";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
pdfjsLib.GlobalWorkerOptions.workerSrc = pathToFileURL(path.join(__dirname, "node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs")).href;

async function extractText() {
  const pdfPath = path.join(__dirname, "ข้อสอบโปรแกรมเมอร์ 2568 V1.4.0.pdf");
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const loadingTask = pdfjsLib.getDocument({ 
    data, 
    cMapUrl: pathToFileURL(path.join(__dirname, "node_modules/pdfjs-dist/cmaps/")).href,
    cMapPacked: true,
    standardFontDataUrl: pathToFileURL(path.join(__dirname, "node_modules/pdfjs-dist/standard_fonts/")).href
  });
  const pdfDoc = await loadingTask.promise;
  let fullText = "";
  for (let i = 1; i <= pdfDoc.numPages; i++) {
    const page = await pdfDoc.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(" ");
    fullText += `\n=== PAGE ${i} ===\n` + pageText;
  }
  process.stdout.write(fullText.slice(0, 9000));
}
extractText().catch(console.error);

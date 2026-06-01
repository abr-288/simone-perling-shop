import { jsPDF } from "jspdf";
import type { Bag } from "./bags-store";

export async function downloadCatalogPDF(bags: Bag[]) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();

  const accentRgb = [122, 50, 40];
  const textRgb = [35, 20, 15];
  const mutedRgb = [110, 90, 80];
  const backgroundRgb = [248, 243, 241];

  // Cover
  doc.setFillColor(...accentRgb);
  doc.rect(0, 0, pageW, pageH, "F");

  doc.setFillColor(...backgroundRgb);
  doc.roundedRect(20, 26, pageW - 40, 100, 12, 12, "F");
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(28, 34, pageW - 56, 84, 10, 10, "F");

  doc.setTextColor(...accentRgb);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(34);
  doc.text("Simone Perling", pageW / 2, 48, { align: "center" });

  doc.setTextColor(...textRgb);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text("Catalogue des sacs en perles", pageW / 2, 60, { align: "center" });
  doc.setFontSize(10);
  doc.text("Formation complète • 50 000 FCFA • Matériaux offerts", pageW / 2, 68, { align: "center" });

  doc.setFillColor(...accentRgb);
  doc.roundedRect(20, pageH - 32, pageW - 40, 18, 6, 6, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text("Contact : +228 90 08 19 98", pageW / 2, pageH - 20, { align: "center" });

  const dateText = new Date().toLocaleDateString("fr-FR");
  doc.setTextColor(...mutedRgb);
  doc.setFontSize(9);
  doc.text(dateText, pageW / 2, pageH - 8, { align: "center" });

  for (const bag of bags) {
    doc.addPage();
    doc.setFillColor(...backgroundRgb);
    doc.rect(0, 0, pageW, pageH, "F");

    doc.setFillColor(255, 255, 255);
    doc.roundedRect(14, 18, pageW - 28, pageH - 36, 10, 10, "F");

    doc.setFillColor(...accentRgb);
    doc.roundedRect(18, 22, 40, 7, 2, 2, "F");

    doc.setTextColor(...textRgb);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(bag.name || "Sac", 22, 38);

    doc.setTextColor(...accentRgb);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(bag.price, pageW - 18, 38, { align: "right" });

    const imageTop = 48;
    const imageHeightMax = 115;
    const imageLeft = 22;
    const imageWidthMax = pageW - 44;

    if (bag.image) {
      try {
        await new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            const iw = img.naturalWidth || img.width;
            const ih = img.naturalHeight || img.height;
            let drawW = imageWidthMax;
            let drawH = (iw && ih) ? (drawW * (ih / iw)) : imageHeightMax;
            if (drawH > imageHeightMax) {
              drawH = imageHeightMax;
              drawW = drawH * (iw / ih);
            }
            const x = imageLeft + (imageWidthMax - drawW) / 2;
            const y = imageTop;
            const fmt = bag.image.startsWith("data:image/png") ? "PNG" : "JPEG";
            doc.addImage(bag.image, fmt, x, y, drawW, drawH, undefined, "FAST");
            resolve();
          };
          img.onerror = () => resolve();
          img.src = bag.image;
        });
      } catch {
        // continue without image
      }
    }

    if (bag.comment) {
      doc.setTextColor(...mutedRgb);
      doc.setFontSize(11);
      const lines = doc.splitTextToSize(bag.comment, pageW - 40);
      doc.text(lines, 22, imageTop + imageHeightMax + 8);
    }

    doc.setFillColor(...accentRgb);
    doc.roundedRect(18, pageH - 24, pageW - 36, 12, 3, 3, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text("Simone Perling • +228 90 08 19 98", pageW / 2, pageH - 14, { align: "center" });
  }

  doc.save(`Simone-Perling-Catalogue-${Date.now()}.pdf`);
}

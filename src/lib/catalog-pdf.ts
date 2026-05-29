import { jsPDF } from "jspdf";
import type { Bag } from "./bags-store";

export async function downloadCatalogPDF(bags: Bag[]) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();

  // Cover
  doc.setFillColor(120, 50, 40);
  doc.rect(0, 0, pageW, pageH, "F");
  doc.setTextColor(255, 245, 230);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(34);
  doc.text("Simone Perling", pageW / 2, pageH / 2 - 20, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text("Catalogue de sacs en perles", pageW / 2, pageH / 2 - 8, { align: "center" });
  doc.setFontSize(11);
  doc.text("Contact : +228 90 08 19 98", pageW / 2, pageH / 2 + 6, { align: "center" });
  doc.setFontSize(9);
  doc.text(new Date().toLocaleDateString("fr-FR"), pageW / 2, pageH - 15, { align: "center" });

  for (const bag of bags) {
    doc.addPage();
    doc.setTextColor(40, 25, 20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(bag.name || "Sac", 20, 22);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(13);
    doc.setTextColor(120, 50, 40);
    doc.text(bag.price, 20, 30);

    if (bag.image) {
      try {
        const fmt = bag.image.startsWith("data:image/png") ? "PNG" : "JPEG";
        const maxW = pageW - 40;
        const maxH = 140;
        doc.addImage(bag.image, fmt, 20, 38, maxW, maxH, undefined, "FAST");
      } catch {}
    }

    if (bag.comment) {
      doc.setTextColor(60, 40, 35);
      doc.setFontSize(11);
      const lines = doc.splitTextToSize(bag.comment, pageW - 40);
      doc.text(lines, 20, 190);
    }

    doc.setFontSize(9);
    doc.setTextColor(140, 120, 110);
    doc.text("Simone Perling  •  +228 90 08 19 98", pageW / 2, pageH - 10, { align: "center" });
  }

  doc.save(`Simone-Perling-Catalogue-${Date.now()}.pdf`);
}

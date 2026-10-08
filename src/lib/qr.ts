import QRCode from "qrcode";

/** Inline SVG for a QR code, rendered at build time so no QR library ships to the browser. */
export async function qrSvg(text: string, ink = "#2a2018") {
  const svg = await QRCode.toString(text, {
    type: "svg",
    margin: 0,
    errorCorrectionLevel: "M",
    color: { dark: ink, light: "#00000000" },
  });
  return svg.replace("<svg ", '<svg width="100%" height="100%" aria-hidden="true" focusable="false" ');
}

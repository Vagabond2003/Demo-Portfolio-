import { contact } from "@/content/site";

const briefTemplate = [
  "Hi Nafiz,",
  "",
  "What I need:",
  "Who will use it:",
  "When I'd like it live:",
  "Links or examples (optional):",
  "",
  "Thanks,",
].join("\n");

export function orderMailto(lineName?: string) {
  const subject = lineName ? `Order enquiry: ${lineName}` : "Order enquiry from your portfolio";
  const params = new URLSearchParams({ subject, body: briefTemplate });
  // URLSearchParams encodes spaces as "+", which some mail clients show literally.
  return `mailto:${contact.email}?${params.toString().replace(/\+/g, "%20")}`;
}

export const plainMailto = `mailto:${contact.email}`;

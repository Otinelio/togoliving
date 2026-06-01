export const WHATSAPP_NUMBER = "22893872088";

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatFCFA(n: number) {
  return `${n.toLocaleString("fr-FR")} FCFA`;
}

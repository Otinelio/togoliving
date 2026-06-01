const WHATSAPP_NUMBER = "22893872088";
function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
function formatFCFA(n) {
  return `${n.toLocaleString("fr-FR")} FCFA`;
}
export {
  formatFCFA as f,
  whatsappUrl as w
};

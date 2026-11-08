// Dados de contato centralizados.
// Formato: código do país + DDD + número, só dígitos.
export const WHATSAPP_NUMBER = "558488734892"; // Contato temporário autorizado para esta publicação

export const INSTAGRAM_URL = "https://www.instagram.com/coachrafaelmelo/";

const DEFAULT_MESSAGE =
  "Olá, Rafael! Vim pelo site e quero agendar uma avaliação para começar a treinar.";

export function buildWhatsAppUrl(message: string = DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

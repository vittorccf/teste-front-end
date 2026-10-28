const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/** Intl usa espaço não separável depois do "R$"; troca por espaço comum para o texto ficar estável em testes e cópia. */
export function formatBRL(cents: number): string {
  return brl.format(cents / 100).replace(/\u00a0/g, " ");
}

export const INSTALLMENTS = 2;

export function installmentValue(cents: number, installments = INSTALLMENTS): number {
  return Math.ceil(cents / installments);
}

export function installmentLabel(cents: number, installments = INSTALLMENTS): string {
  return `ou ${installments}x de ${formatBRL(installmentValue(cents, installments))} sem juros`;
}

/**
 * O JSON não traz "preço de". O layout mostra um preço riscado acima do preço de venda, então ele é
 * derivado aqui (10% acima, arredondado para ,90). Se a API passar a mandar o valor, basta trocar esta função.
 */
export const LIST_PRICE_MARKUP = 1.1;

export function listPriceInCents(cents: number): number {
  const raw = Math.ceil((cents * LIST_PRICE_MARKUP) / 100) * 100 - 10;
  return Math.max(raw, cents);
}

export interface Carrinho {
  id: number,
  sessionId: string,
  items: { id: string, name: string, price: number}[]
}
import { restaurant } from '../config/restaurant'
import type { CartItem } from '../types/menu'
import { formatPrice } from './format'

export interface OrderDetails {
  customerName: string
  address: string
  paymentMethod: string
  changeFor?: number
  notes?: string
}

function formatCartItemLine(item: CartItem): string {
  const total = formatPrice(item.unitPrice * item.quantity)
  let line = `• ${item.quantity}x ${item.product.name} — ${total}`

  const extras: string[] = []
  if (item.freeToppings?.length) {
    extras.push(`Grátis: ${item.freeToppings.join(', ')}`)
  }
  if (item.paidToppings?.length) {
    extras.push(
      `Pagos: ${item.paidToppings.map((t) => `${t.name} (+${formatPrice(t.price)})`).join(', ')}`,
    )
  }
  if (item.notes) {
    extras.push(`Obs: ${item.notes}`)
  }

  if (extras.length) {
    line += `\n  _${extras.join(' · ')}_`
  }

  return line
}

export function buildWhatsAppUrl(
  items: CartItem[],
  details: OrderDetails,
): string {
  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  )
  const deliveryFee = restaurant.deliveryFee
  const grandTotal = subtotal + deliveryFee

  const lines = [
    `*Novo pedido — ${restaurant.name}*`,
    '',
    `*Cliente:* ${details.customerName}`,
    `*Tipo:* Entrega`,
    `*Endereço:* ${details.address}`,
    `*Pagamento:* ${details.paymentMethod}`,
  ]

  if (details.paymentMethod === 'Dinheiro' && details.changeFor) {
    const change = details.changeFor - grandTotal
    lines.push(`*Troco para:* ${formatPrice(details.changeFor)}`)
    if (change > 0) {
      lines.push(`*Troco:* ${formatPrice(change)}`)
    }
  }

  lines.push('', '*Itens:*')

  for (const item of items) {
    lines.push(formatCartItemLine(item))
  }

  lines.push(
    '',
    `*Subtotal:* ${formatPrice(subtotal)}`,
    `*Taxa de entrega:* ${formatPrice(deliveryFee)}`,
    `*Total:* ${formatPrice(grandTotal)}`,
  )

  if (details.notes) {
    lines.push('', `*Observações:* ${details.notes}`)
  }

  const text = encodeURIComponent(lines.join('\n'))
  return `https://wa.me/${restaurant.whatsapp}?text=${text}`
}

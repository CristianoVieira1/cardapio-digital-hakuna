import { restaurant } from '../config/restaurant'

export function formatPrice(value: number): string {
  return value.toLocaleString(restaurant.locale, {
    style: 'currency',
    currency: restaurant.currency,
  })
}

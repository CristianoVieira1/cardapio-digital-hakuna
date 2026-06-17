export function productImage(
  folder: 'produtos-batatas' | 'produtos-acai',
  filename: string,
): string {
  return new URL(`../assets/${folder}/${filename}`, import.meta.url).href
}

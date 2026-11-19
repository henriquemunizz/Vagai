export function accessTarget(value: string | null) {
  return value === 'favoritos' || value === 'cadastrar' ? value : null
}

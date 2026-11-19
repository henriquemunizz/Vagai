export function accessTarget(value: string | null) {
  if (value === 'favoritos' || value === 'cadastrar') return value
  return value && /^locais\/[1-9]\d*$/.test(value) ? value : null
}

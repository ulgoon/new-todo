export interface GeocodeResult {
  lat: number
  lng: number
}

export async function geocodeAddress(address: string): Promise<GeocodeResult | null> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(address)}`
  const response = await fetch(url)
  if (!response.ok) return null

  const results: Array<{ lat: string; lon: string }> = await response.json()
  const first = results[0]
  if (!first) return null

  return { lat: parseFloat(first.lat), lng: parseFloat(first.lon) }
}

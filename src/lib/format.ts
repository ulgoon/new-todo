export function formatDateTime(isoString: string) {
  return new Date(isoString).toLocaleString('ko-KR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export function toDateTimeLocalValue(isoString: string | null): string {
  if (!isoString) return ''
  const date = new Date(isoString)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export function fromDateTimeLocalValue(value: string): string | null {
  if (!value) return null
  return new Date(value).toISOString()
}

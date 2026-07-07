export function formatDateTime(isoString: string) {
  return new Date(isoString).toLocaleString('ko-KR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

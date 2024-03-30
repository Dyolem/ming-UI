export async function useClipBoard(content: string) {
  const type = 'text/plain'
  const blob = new Blob([content], { type })
  const data = [new ClipboardItem({ [type]: blob })]
  await navigator.clipboard.write(data)
}

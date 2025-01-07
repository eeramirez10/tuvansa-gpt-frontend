const URI = import.meta.env.VITE_GPT_API
interface Options {
  prompt: string
  lang: string
  abortSignal: AbortSignal

}

export async function* translateUseCase(options: Options) {

  const { prompt, lang, abortSignal } = options
  try {

    const resp = await fetch(`${URI}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt, lang }),
      signal: abortSignal
    })

    if (!resp.ok) throw new Error('Hubo un error');

    const reader = resp.body?.getReader();

    if (!reader) return null;

    const decoder = new TextDecoder()

    let text = ''

    while (true) {
      const { value, done } = await reader.read()
      if (done) break;

      const decodedChunk = decoder.decode(value, { stream: true })

      text += decodedChunk
      yield text
    }





  } catch (error) {
    console.log(error)
    return null
  }
}
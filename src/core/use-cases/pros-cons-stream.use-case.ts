

const URI = import.meta.env.VITE_GPT_API

export const prosConsStreamUseCase = async (prompt: string) => {

  try {

    const resp = await fetch(`${URI}/pros-cons-discusser-stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    })

    if (!resp.ok) throw new Error('Hubo un error');

    const reader = resp.body?.getReader();

    if(!reader) return null;

    // const decoder = new TextDecoder()

    // let text = ''

    // while(true){
    //   const { value, done} = await reader.read()
    //   if(done) break;

    //   const decodedChunk = decoder.decode(value, { stream: true})

    //   text += decodedChunk
    //   console.log(text)
    // }

    return reader



  } catch (error) {
    console.log(error)
    return null
  }


}
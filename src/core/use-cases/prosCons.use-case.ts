import { ProsConsResponse } from "../../interfaces/prosConsRespose";

const URI = import.meta.env.VITE_GPT_API

export const prosConsUseCase = async (prompt: string) => {

  try {

    const resp = await fetch(`${URI}/pros-cons-discusser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    })

    if (!resp.ok) throw new Error('Hubo un error');

    const data = await resp.json() as ProsConsResponse;

    return {
      ok: true,
      ...data
    }

  } catch (error) {
    console.log(error)
    return {
      ok: false,
      content: 'Hubo un error'
    }
  }


}
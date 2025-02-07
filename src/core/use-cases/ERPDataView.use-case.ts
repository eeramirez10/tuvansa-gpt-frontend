import { ERPDataViewResponse } from "../../interfaces";

interface ErpDataViewUseCase extends ERPDataViewResponse {
  ok: boolean
}

export const ERPDataViewUseCase = async (prompt: string): Promise<ErpDataViewUseCase> => {
  const URI = import.meta.env.VITE_GPT_API

  try {

    const resp = await fetch(`${URI}/proscai/data-analysis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({ prompt })
    })

    if (!resp.ok) throw new Error('No se pudo realizar la conexion');

    const data = await resp.json() as ERPDataViewResponse

    return {
      ok: true,
      ...data
    }

  } catch (error) {
    console.log(error)
    return {
      ok: false,
      query: 'Hubo un error al procesar ',
      originaPrompt: undefined,
      error: 'Hubo un error al procesar ',
      queryResults: undefined

    }
  }



}
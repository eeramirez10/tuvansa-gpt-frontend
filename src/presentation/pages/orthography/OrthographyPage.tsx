import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {
  GptMessage,
  MyMessage,
  TextMessageBox,

  // TextMessageBox,
  // TextMessageBoxFile,
  TypingLoader
} from '../../components'
import { orthographyUseCase } from '../../../core'
import { GptOrtographyMessage } from '../../components/chat-bubbles/GptOrtographyMessage';


// interface Option {
//   id: string
//   text: string
// }

interface Message {
  value: string
  id: string
  isGpt: boolean
  info?: {
    userScore: number
    errors: string[]
    message: string
  }
}

// const options: Option[] = [
//   { id: crypto.randomUUID(), text: 'hola mundo' },
//   { id: crypto.randomUUID(), text: 'Perros' }
// ]



export const OrthographyPage = () => {

  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])



  const handleOnsendMessage = async (message: string) => {

    const id = uuidv4();




    setLoading(true)
    setMessages([...messages, { value: message, id: id, isGpt: false }])

    try {

      const data = await orthographyUseCase(message)

      if (!data.ok) {
        setMessages(prev =>
          [...prev,
          {
            value: 'Hubo un error al procesar tu respuesta',
            id: '1',
            isGpt: true
          }]
        )
        return
      }
      const { message: value, errors, userScore } = data

      const gptResponse = `
      tuviste los siguientes errores:  ${errors.length > 0 ? errors.join(', ') : 'Sin errores'}
      tu puntuacion: ${userScore}
      ${value}
     
     `

      setMessages(prev => [...prev, { value: gptResponse, id, isGpt: true }])





    } catch (error) {
      console.log(error)
      throw new Error('Hubo un error')
    } finally {
      setLoading(false)
    }






  }

  return (
    <div className=' chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'>

          {/* Biemvenida */}
          <GptMessage text='Hola, puedes escribir tu texto en español y te ayudare con lo que me pidas' />



          {
            (messages && messages.length) > 0 &&
            messages.map(({ value, id, isGpt, info }) => (
              isGpt
                ? (
                  <GptOrtographyMessage
                    key={id} userScore={info?.userScore} errors={info?.errors} message={info?.message}
                  />
                ) : (
                  <MyMessage text={value} />
                )
            ))
          }

          {
            loading &&
            <TypingLoader className='fade-in ' />
          }



        </div>

      </div>

      <TextMessageBox
        onSendMessage={handleOnsendMessage}
        placeholder='Escrfibe aqui lo que deseas'
        disableCorrections
      />

      {/* <TextMessageBoxFile
        onSendMessage={handleOnsendMessage}
        placeholder='Escrfibe aqui lo que deseas'
        disableCorrections
      /> */}

      {/* <TextMessageBoxSelect
        onSendMessage={handleOnsendMessage}
        placeholder='Escrfibe aqui lo que deseas'
        disableCorrections
        options={options}
      /> */}

    </div>
  )
}

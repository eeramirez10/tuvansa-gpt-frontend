import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader
} from '../../components'

import { ERPDataViewUseCase } from '../../../core/use-cases/ERPDataView.use-case'
import { useScrollBottom } from '../../hooks/useScrollBottom';


interface Message {
  value: string
  id: string
  isGpt: boolean
  query?: string
  queryResults?: unknown
  originaPrompt?: string
  error?: string
  info?: {
    userScore: number
    errors: string[]
    message: string
  }
}

export const ERPDataView = () => {

  const [loading, setLoading] = useState(false)
  const bottomRef = useScrollBottom()
  const [messages, setMessages] = useState<Message[]>(localStorage.getItem('chat_user_admin') !== null ? JSON.parse(localStorage.getItem('chat_user_admin') ?? '') : [])



  useEffect(() => {

    localStorage.setItem('chat_user_admin', JSON.stringify(messages))
  }, [messages]);




  const handleOnsendMessage = async (message: string) => {



    setLoading(true)
    setMessages([...messages, { value: message, id: uuidv4(), isGpt: false }])

    try {

      const data = await ERPDataViewUseCase(message)



      if (!data.ok) {
        setMessages(prev =>
          [...prev,
          {
            value: 'Hubo un error al procesar tu respuesta',
            id: uuidv4(),
            isGpt: true
          }]
        )
        return
      }




      setMessages(
        prev =>
          [
            ...prev,
            {
              value: data.query,
              id: uuidv4(),
              isGpt: true,
              query: data.query,
              queryResults: data.queryResults,
              error: data.error
            }
          ]
      )





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
            messages.map(({ value, id, isGpt, query, error, originaPrompt }) => (
              isGpt
                ? (
                  <GptMessage
                    key={id}
                    sql={query}
                    originalPropmt={originaPrompt}
                    
                    error={error}
                    text={value}

                  />
                ) : (
                  <MyMessage
                    key={id}
                    text={value}
                  />
                )
            ))
          }



          {
            loading &&
            <TypingLoader className='fade-in ' />
          }

          <div ref={bottomRef} />

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

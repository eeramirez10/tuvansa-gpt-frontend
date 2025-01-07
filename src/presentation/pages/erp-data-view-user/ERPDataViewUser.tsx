import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader
} from '../../components'

import { ERPDataViewUseCase } from '../../../core/use-cases/ERPDataView.use-case'




interface Message {
  value: string
  id: string
  isGpt: boolean
  query?: string
  queryResults?: Record<string, string>[]
  originaPrompt?: string
  responseToHuman?: string
  error?: string
  info?: {
    userScore: number
    errors: string[]
    message: string
  }
}

export const ERPDataViewUser = () => {

  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>(localStorage.getItem('chat_user') !== null ? JSON.parse(localStorage.getItem('chat_user')) : [])
  const bottomRef = useRef<HTMLDivElement | null>(null); // 



  useEffect(() => {
    // Desplazarse al último mensaje cuando cambia la lista de mensajes
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    localStorage.setItem('chat_user', JSON.stringify(messages))
  }, [messages]);




  const handleOnsendMessage = async (message: string) => {


    setLoading(true)

    const newChatUser = {
      value: message,
      id: uuidv4(),
      isGpt: false
    }
    setMessages([...messages, newChatUser])





    try {

      const data = await ERPDataViewUseCase(message)

      const newChat = {
        value: data?.responseToHuman ?? '',
        responseToHuman: data.responseToHuman,
        error: data.error,
        isGpt: true,
        id: uuidv4()
      }




      setMessages(prev => [...prev, newChat])






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
          <GptMessage text='Hola, puedes escribir tu texto en español y te ayudare con lo que me pidas en base a la BD Proscai' />



          {
            (messages && messages.length) > 0 &&
            messages.map(({ value, id, isGpt, error }) => (
              isGpt
                ? (
                  <GptMessage
                    key={id}
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

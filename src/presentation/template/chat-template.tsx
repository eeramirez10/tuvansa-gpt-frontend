import React, { useState } from 'react'
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from '../components'



interface Message {
  value: string
  id: string
  isGpt: boolean
}

export const ChatTemplate = () => {

  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])



  const handleOnsendMessage = (message: string) => {

    setLoading(true)
    setMessages([...messages, { value: message, id: crypto.randomUUID(), isGpt: false }])
    setLoading(false)





  }


  return (
    <div className=' chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'>

          {/* Biemvenida */}
          <GptMessage text='Hola, puedes escribir tu texto en español y te ayudare con lo que me pidas' />



          {
            (messages && messages.length) > 0 &&
            messages.map(({ value, id, isGpt }) => (
              isGpt
                ? (
                  <GptMessage
                    key={id}
                    text='Hola, puedes escribir tu texto en español y te ayudare con lo que me pidas' />
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



        </div>

      </div>

      <TextMessageBox
        onSendMessage={handleOnsendMessage}
        placeholder='Escrfibe aqui lo que deseas'
        disableCorrections
      />

    </div>
  )
}

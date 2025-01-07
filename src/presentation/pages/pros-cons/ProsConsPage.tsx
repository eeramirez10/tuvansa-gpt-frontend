import { useState } from 'react'
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from '../../components'
import { prosConsUseCase } from '../../../core/use-cases/prosCons.use-case'

interface Message {
  value: string
  id: string
  isGpt: boolean
}

export const ProsConsPage = () => {

  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])



  const handleOnsendMessage = async (message: string) => {

    setLoading(true)
    setMessages([...messages, { value: message, id: crypto.randomUUID(), isGpt: false }])
    const { content } = await prosConsUseCase(message)

    setMessages(prev => [...prev, { value: content, id: crypto.randomUUID(), isGpt: true }])

    setLoading(false)

  }


  return (
    <div className=' chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'>

          {/* Biemvenida */}
          <GptMessage text='Puedes escribir lo que sea que quieres que compare y te de mis puntos de vista.' />



          {
            (messages && messages.length) > 0 &&
            messages.map(({ value, id, isGpt }) => (
              isGpt
                ? (
                  <GptMessage
                    key={id}
                    text={value} />
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

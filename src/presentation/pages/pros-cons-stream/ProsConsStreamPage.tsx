import { useRef, useState } from 'react'
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from '../../components'
import { prosConsStreamGeneratorUseCase } from '../../../core/use-cases/pros-cons-stream-generator.use-case'
import { useScrollBottom } from '../../hooks/useScrollBottom'

interface Message {
  value: string
  id: string
  isGpt: boolean
}

export const ProsConsStreamPage = () => {

  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const abortController = useRef(new AbortController())
  const isRunning = useRef(false);

  const bottomRef = useScrollBottom()

  const handleOnsendMessage = async (text: string) => {

    console.log(isRunning)

    if (isRunning.current) {
      abortController.current.abort()
      abortController.current = new AbortController()
    }

    setLoading(true)
    isRunning.current = true
    setMessages([...messages, { value: text, id: crypto.randomUUID(), isGpt: false }])


    const stream = prosConsStreamGeneratorUseCase({ prompt: text, abortSignal: abortController.current.signal });
    setLoading(false)
    const id = crypto.randomUUID()
    setMessages(prev => [...prev, { value: text, id, isGpt: true }])

    for await (const message of stream) {
      setMessages(prev => {

        const indexMessage = prev.findIndex(message => message.id === id);
        prev[indexMessage].value = message
        return [...prev]

      })
    }

    isRunning.current = false


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

          <div ref={bottomRef} ></div>

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

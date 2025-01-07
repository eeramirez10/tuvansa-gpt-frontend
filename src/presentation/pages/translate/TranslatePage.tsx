import { useRef, useState } from 'react'
import { GptMessage, MyMessage, TextMessageBoxSelect, TypingLoader } from '../../components'
import { translateUseCase } from '../../../core/use-cases/translate.use-case';
import { useScrollBottom } from '../../hooks/useScrollBottom';

const languages = [
  { id: "alemán", text: "Alemán" },
  { id: "árabe", text: "Árabe" },
  { id: "bengalí", text: "Bengalí" },
  { id: "francés", text: "Francés" },
  { id: "hindi", text: "Hindi" },
  { id: "inglés", text: "Inglés" },
  { id: "japonés", text: "Japonés" },
  { id: "mandarín", text: "Mandarín" },
  { id: "portugués", text: "Portugués" },
  { id: "ruso", text: "Ruso" },
];

interface Message {
  value: string
  id: string
  isGpt: boolean
}

export const TranslatePage = () => {

  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const abortController = useRef(new AbortController);
  const isReading = useRef(false)
  const bottomRef = useScrollBottom()


  const handleOnsendMessage = async (message: string, selectedOption: string) => {


    if (isReading) {
      abortController.current.abort()
      abortController.current = new AbortController()
    }

    setLoading(true)
    isReading.current = true
    setMessages([...messages, { value: message, id: crypto.randomUUID(), isGpt: false }])

    const stream = translateUseCase({ prompt: message, lang: selectedOption, abortSignal: abortController.current.signal })

    const id = crypto.randomUUID()
    setMessages(prev => [...prev, { value: '', id, isGpt: true }])

    for await (const message of stream) {
      setMessages(prev => {

        const indexMessage = prev.findIndex(message => message.id === id);
        prev[indexMessage].value = message
        return [...prev]

      })
    }


    setLoading(false)
    isReading.current = false

  }


  return (
    <div className=' chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'>

          {/* Biemvenida */}
          <GptMessage text='Escribe un texto y lo traducire' />



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

          <div ref={bottomRef}></div>

        </div>

      </div>

      <TextMessageBoxSelect
        options={languages}
        onSendMessage={handleOnsendMessage}
        placeholder='Escrfibe aqui lo que deseas'
        disableCorrections
      />

    </div>
  )
}

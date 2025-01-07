import { FormEvent, useState } from 'react';


interface Props {
  onSendMessage: (message: string, selectedOption: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  options: Option[]
}

interface Option {
  id: string
  text: string
}


export const TextMessageBoxSelect = ({ onSendMessage, placeholder, disableCorrections = false, options }: Props) => {

  const [message, setMessage] = useState('')
  const [selectedOption, setSelectedOption] = useState(options[1].text)


  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (message.trim().length === 0) return;
    if (selectedOption.trim().length === 0) return;

    onSendMessage(message, selectedOption);
    setMessage('');

  }

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
    >

      <div className="flex-grow">
        <div className=" flex">

          <input
            type="text"
            autoFocus
            name="message"
            className="w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
            placeholder={placeholder}
            autoComplete={disableCorrections ? 'on' : 'off'}
            autoCorrect={disableCorrections ? 'on' : 'off'}
            spellCheck={disableCorrections ? 'true' : 'false'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <select
            name="select"
            className='w-2/5 ml-5 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10'
            onChange={(e) => {
              console.log(e.target.value)
              setSelectedOption(e.target.value)
            }}
            value={selectedOption}

          >
            {
              options.map(op => (
                <option key={op.id} value={op.text} >{op.text}</option>
              ))
            }

          </select>


        </div>
      </div>


      <div className="ml-4">
        <button className="btn-primary">
          <span className="mr-2">Enviar</span>
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>




    </form>
  )
}
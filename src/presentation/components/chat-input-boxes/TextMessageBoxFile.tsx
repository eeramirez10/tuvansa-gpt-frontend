import { ChangeEvent, FormEvent, useRef, useState } from 'react';


interface Props {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  accept?: string
}


export const TextMessageBoxFile = ({ onSendMessage, placeholder, disableCorrections = false, accept }: Props) => {

  const [message, setMessage] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>()

  const inputFileRef = useRef<HTMLInputElement>(null)

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (message.trim().length === 0) return;

    onSendMessage(message);
    setMessage('');
  }

  const onChangeInputFile = (event: ChangeEvent<HTMLInputElement>) => {

    const files = event.target.files
    if (files !== undefined && files !== null) setSelectedFile(files[0])


  }

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
    >
      <div className='mr-3'>
        <button
          type='button'
          className='flex items-center justify-center text-gray-400 hover:text-gray-600'
          onClick={() => inputFileRef.current?.click()}
        >
          <i className='fa-solid fa-paperclip text-xl'></i>
        </button>

        <input
          type="file"
          hidden
          ref={inputFileRef}
          accept={accept}
          onChange={onChangeInputFile}
        />

      </div>

      <div className="flex-grow">
        <div className=" w-full">

          <input
            type="text"
            autoFocus
            name="message"
            className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
            placeholder={placeholder}
            autoComplete={disableCorrections ? 'on' : 'off'}
            autoCorrect={disableCorrections ? 'on' : 'off'}
            spellCheck={disableCorrections ? 'true' : 'false'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

        </div>
      </div>


      <div className="ml-4">
        <button className="btn-primary" disabled={!selectedFile}>
          {
            !selectedFile
              ? <span className="mr-2">Enviar</span>
              : <span className='mr-2'>{selectedFile.name.substring(0, 10) + '...'}</span>
          }

          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>




    </form>
  )
}
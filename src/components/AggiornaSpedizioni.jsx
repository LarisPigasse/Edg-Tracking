import {useEffect, useState} from 'react'
import axios from 'axios';

function AggiornaSpedizioni() {

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
   console.log(file)
  }, [file])
  

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://tools.expressdeliverygroup.com/upload', formData);
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };  

  return (
    <>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      <p>{message}</p>
    </>
  );
}


export default AggiornaSpedizioni



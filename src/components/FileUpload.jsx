import { useState } from 'react';
import axios from 'axios';
import engine from '../engine'

function FileUpload() {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        axios.post(engine.backend+'/upload', formData).then((response) => {
        console.log(response);
        });
    };

    return (
        <div class="flex flex-row">
            <div class="basis-1/5">

            </div>
            <div class="basis-2/5">
                <input 
                    className='block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.40rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.40rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:border-sky-300 hover:border-sky-300  dark:border-neutral-00 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100' 
                    type="file" onChange={handleFileChange} 
                />            
            </div>
            <div class="basis-1/5">
                <button className='my-btn my-btn-add' onClick={handleUpload}>Carica il file scelto</button>
            </div>
            <div class="basis-1/5">

            </div>            
        </div>
    )
}

export default FileUpload
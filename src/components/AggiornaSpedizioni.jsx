import {useEffect, useState} from 'react';
import engine from '../engine';
import DataTable from '../data/MyDataTables';
import FileUpload from './FileUpload';
import Button from '../components/Button';

function AggiornaSpedizioni() {

  const colAggiornamenti = [
    {
        name: 'ID',
        selector: row => row.id_aggiornamento,
        sortable: true,
        maxWidth: '4%',        
    },
    {
        name: 'DATA',
        selector: row => row.data_aggiornamento,
        sortable: true,
        maxWidth: '16%',  
    },
    {
        name: 'FILE',
        selector: row => row.nome_file,
        sortable: true,      
    },
    {
        name: "QTA' NEL FILE",
        selector: row => row.qta_file,
        sortable: true,
        maxWidth: '8%',
    },
    {
      name: "QTA' AGGIORNATA",
      selector: row => row.qta_aggiornata,
      sortable: true,
      maxWidth: '8%',  
    },         
  ]

  const [aggiornamenti, setAggiornamenti] = useState([]);

  const getAggiornamenti = async () => {
    try {
      const response = await fetch(engine.backend+'/aggiornamenti');
      const data = await response.json();
      setAggiornamenti(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAggiornamenti()
  }, [])

  return (
    <>
      <div className="my-4">
        <div class="bg-white flex flex-col p-8">
             <FileUpload />        
        </div>
        <div className='uppercase font-semibold pl-4 mt-8 flex flex-row'>
            <div className="basis-1/2 pt-3">Tabella aggiornamenti</div>
            <div className="basis-1/2 text-end">
              <Button variant="open" text="Aggiorna" />
            </div>               
        </div>
        <div className='bg-neutral-100 p-4 mt-2'> 
          <DataTable 
            columns={colAggiornamenti}
            data={aggiornamenti}
            selectableRows
          />
        </div> 
      </div>
    </>
  );
}


export default AggiornaSpedizioni



import {useEffect, useState} from 'react';
import engine from '../engine'
import DataTable from '../data/MyDataTables';

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

      <div class="grid grid-cols-3 gap-4">
        
        <div class="">Upload aggiornamento</div>
        <div class="col-span-2">Ultimi aggiornamenti</div>

        <div class=""></div>
        <div class="col-span-2 bg-neutral-100 p-4 mt-2">
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



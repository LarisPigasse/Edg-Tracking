import React from 'react'
import DataTable from '../data/MyDataTables';
import {righe, colonne} from '../data/test';

function Tables() {
  return (
    <div>
      <div className='my-page-title'>
        Tables
      </div>
      <div className='bg-neutral-100 p-4 mt-2'> 
        <DataTable 
          columns={colonne}
          data={righe}
          selectableRows
        />
      </div>
    </div>
  )
}

export default Tables





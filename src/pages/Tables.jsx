import React from 'react'
import DataTable from '../data/MyDataTables';
import {righe, colonne} from '../data/Test';

function Tables() {
  return (
    <div>
      <div className='my-page-title'>
        Tables
      </div>      
      <DataTable 
        columns={colonne}
        data={righe}
        selectableRows
      />
    </div>
  )
}

export default Tables





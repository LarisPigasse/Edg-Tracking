const colonne = [
    {
        name: 'CLIENTE',
        selector: row => row.cliente,
        sortable: true,
    },
    {
        name: 'SPEDIZIONE',
        selector: row => row.spedizione,
        sortable: true,
    },
    {
        name: 'CORRIERE',
        selector: row => row.corriere,
        sortable: true,
    },
    {
        name: 'NUMERO',
        selector: row => row.numero,
    }, 
    {
        name: 'DESTINATARIO',
        selector: row => row.destinatario,
        sortable: true,
    }
]

const righe =[
    {
        id: 1,
        cliente: 'Adriatica Surgelati Adriatica Surgelati Adriatica Surgelati Adriatica Surgelati Adriatica Surgelati Adriatica Surgelati',
        spedizione: '266294',
        corriere:'Pallex',
        numero:'2355662102',
        destinatario:'Rossana Marconi',
    },
    {
        id: 2,
        cliente: 'Mediaprint',
        spedizione: '266202',
        corriere:'TNT',
        numero:'2377662102',
        destinatario:'Alessio Tarquini',
    },
    {
        id: 3,
        cliente: 'Hotel Mary',
        spedizione: '266103',
        corriere:'FeDex',
        numero:'2377666543',
        destinatario:'Gabriel Pantoli',
    }, 
    {
        id: 4,
        cliente: 'Posta Network',
        spedizione: '266111',
        corriere:'Pallex',
        numero:'2377666352',
        destinatario:'Renato Casalena',
    },              
]



export {colonne, righe}
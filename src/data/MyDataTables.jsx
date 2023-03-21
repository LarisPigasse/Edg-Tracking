import DataTable from 'react-data-table-component';
import {RiArrowDownFill} from 'react-icons/ri';

const sortIcon = <RiArrowDownFill />;
const selectProps = {indeterminate: "false" }

const MyDataTables = (props) => {

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', // override the row height
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                minHeight:'48px',
                background:'#FAFAFA',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },
    };    
    return (
        <DataTable
            pagination
            selectableRowsComponentProps={selectProps}
            sortIcon={sortIcon}
            dense
            direction="auto"
            fixedHeaderScrollHeight="300px"
            responsive
            subHeaderAlign="right"
            subHeaderWrap
            customStyles={customStyles}           
            {...props}
        />
    );
}

export default MyDataTables;
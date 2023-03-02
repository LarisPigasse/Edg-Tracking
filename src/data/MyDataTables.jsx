import DataTable from 'react-data-table-component';
import {RiArrowDownFill} from 'react-icons/ri';

const sortIcon = <RiArrowDownFill />;
const selectProps = {indeterminate: "false" };

function MyDataTables(props) {
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
            {...props}
        />
    );
}

export default MyDataTables;
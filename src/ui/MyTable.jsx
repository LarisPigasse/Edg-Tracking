import { useReactTable, createColumnHelper, flexRender, getCoreRowModel} from '@tanstack/react-table'

function MyTable(props) {
  return (
        <>
        <table className=" w-full bg-white">
            <thead>
            {table.getHeaderGroups().map(headerGroup => (
                <tr className="bg-gray-50" key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                    <th className="px-2 py-4 text-start uppercase text-xs text-zinc-800 font-semibold border-b border-zinc-300" key={header.id}>
                    {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header.className,
                            header.getContext()
                        )}
                    </th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map(row => (
                <tr key={row.id} className=" hover:bg-stone-50">
                {row.getVisibleCells().map(cell => (
                    <td className="px-2 text-sm text-zinc-700 py-2 border-b" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>
    </>    
  )
}

export default MyTable
import React from "react"
import Button from "./Button";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender
} from "@tanstack/react-table"

export default function DataTable( { title, data : dataRemote, columns: columnsRemote, search, searchColumns, pagination, ordering, customProps, addProps } ) {
  customProps = {
    startPageSize: 40,
    striped:false,
    classTable: '',
    ...customProps
  }
  
  //const rerender = React.useReducer(() => ({}), {})[1]

  const [columnFilters, setColumnFilters] = React.useState([])
  const [globalFilter, setGlobalFilter] = React.useState("")

  const columns = React.useMemo(
    () => columnsRemote,[]
  )

  const [data, setData] = React.useState([])

  React.useEffect(() => {
    setData(dataRemote)  
  }, [dataRemote])


  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      globalFilter
    },
    initialState: {
        pagination: {
            pageSize: customProps.startPageSize,
        },
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: false,
    debugHeaders: false,
    debugColumns: false
  })

  return (
      <div className="w-full">

        <div class="flex gap-4 px-4 py-2">
          <div class="grow uppercase font-semibold">
            { title ?? ''}
          </div>
          <div class="flex-none">
            {
              search ?
                <DebouncedInput
                    value={globalFilter ?? ""}
                    onChange={value => setGlobalFilter(String(value))}
                    className="p-2 sm:text-sm shadow-sm rounded-md border border-gray-300 focus:outline-none focus:border-orange-400 hover:border-sky-300"
                    placeholder="Cerca..."
                />
              : null
            }
          </div>
          <div class=" grow-0">
            {
              addProps &&   <Button variant="add" text="Nuovo"
                          {...addProps}
                        />
            }
          </div>
        </div>

                        
        <table className={`min-w-full divide-y table-auto divide-gray-300 ${customProps.classTable}`}>
          <thead className="bg-zinc-50">
              {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => {
                          return (
                              <th className="p-2 pt-4 text-start uppercase text-xs text-zinc-800 font-semibold border-b border-b-zinc-300" key={header.id} colSpan={header.colSpan}>
                                  {header.isPlaceholder ? null : (
                                      <>
                                          <div
                                              {... ordering && {
                                                  className: header.column.getCanSort()
                                                      ? "cursor-pointer select-none text-xs"
                                                      : "text-xs",
                                                  onClick: header.column.getToggleSortingHandler()
                                              }
                                            }
                                          >
                                              {flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext()
                                              )}
                                              {{
                                                  asc: " 🔼",
                                                  desc: " 🔽"
                                              }[header.column.getIsSorted()] ?? null}
                                          </div>
                                          {searchColumns && header.column.getCanFilter() ? (
                                              <div className="">
                                                  <Filter column={header.column} table={table} />
                                              </div>
                                          ) : null}
                                      </>
                                  )}
                              </th>
                          )
                      })}
                  </tr>
              ))}
          </thead>
          <tbody className=" bg-white">
              {table.getRowModel().rows.map(row => {
                  return (
                      <tr key={row.id} className={`hover:bg-sky-50 ${ customProps.striped && row.id % 2 != 0 ? 'bg-zinc-50' : ''} ${ customProps.rowline ? 'border-b border-b-zinc-200' : ''}`}>
                          {row.getVisibleCells().map((cell,i) => {
                              return (
                                  <td className="px-2 text-sm text-black py-2" key={cell.id}>
                                      {flexRender(
                                          cell.column.columnDef.cell,
                                          cell.getContext()
                                      )}
                                  </td>
                              )
                          })}
                      </tr>
                  )
              })}
          </tbody>
        </table>
        <div className="flex border-t border-t-zinc-300"> 
          
          <div className="flex-auto text-start px-2 py-4 text-black font-semibold text-xs">{table.getPrePaginationRowModel().rows.length} RIGHE</div>       
          
          {
            pagination
            ?

              <div className="flex flex-auto gap-2 text-sm pt-2 justify-end">
                  
                  <BtnAvDietro
                              handleClick={() => table.setPageIndex(0)}
                              disabled={!table.getCanPreviousPage()} 
                              html="<<"
                  />
                  <BtnAvDietro
                              handleClick={() => table.previousPage()}
                              disabled={!table.getCanPreviousPage()} 
                              html="<"
                  />
                  <BtnAvDietro
                              handleClick={() => table.nextPage()}
                              disabled={!table.getCanNextPage()} 
                              html=">"
                  />
                  <BtnAvDietro
                              handleClick={() => table.setPageIndex(table.getPageCount() - 1)}
                              disabled={!table.getCanNextPage()} 
                              html=">>"
                  />

                  <span className="flex items-center gap-1">
                      <div>Pagina</div>
                      <strong>
                          {table.getState().pagination.pageIndex + 1} of{" "}
                          {table.getPageCount()}
                      </strong>
                  </span>
                  <span className="flex items-center gap-1">
                      | Vai alla pagina:
                      <input
                          type="number"
                          defaultValue={table.getState().pagination.pageIndex + 1}
                          onChange={e => {
                              const page = e.target.value ? Number(e.target.value) - 1 : 0
                              table.setPageIndex(page)
                          }}
                          className="block p-1 m-1 w-16 rounded-sm border border-zinc-200 focus:outline-none focus:border-orange-400 hover:border-sky-300 sm:text-sm"
                      />
                  </span>
                  <select
                      value={table.getState().pagination.pageSize}
                      onChange={e => {
                          table.setPageSize(Number( e.target.value == -1 ? data.length : e.target.value))
                      }}
                      className="block p-1 m-1 w-32 rounded-sm border border-zinc-200 focus:outline-none focus:border-orange-400 hover:border-sky-300 sm:text-sm"
                  >
                      {[10, 20, 30, 40, 50, data.length].map(pageSize => (
                          <option key={pageSize} value={pageSize}>
                              Mostra { pageSize == data.length ? 'Tutti' : pageSize }
                          </option>
                      ))}
                  </select>
              </div>          
            : null
          }            

        </div>
      </div>
  )
}

function Filter({ column, table }) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  )

  return typeof firstValue === "number" ? (
    <div>
      <div className="flex">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={columnFilterValue?.[0] ?? ""}
          onChange={value => column.setFilterValue(old => [value, old?.[1]])}
          placeholder={`min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ""
          }`}
          className="block w-full sm:text-sm rounded-sm px-1 py-2 mr-1 mt-1 hover:shadow-sm border border-zinc-200 focus:outline-none focus:border-orange-400 hover:border-sky-300"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={columnFilterValue?.[1] ?? ""}
          onChange={value => column.setFilterValue(old => [old?.[0], value])}
          placeholder={`max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ""
          }`}
          className="block w-full sm:text-sm rounded-sm px-1 py-2 mr-1 mt-1 hover:shadow-sm border border-zinc-200 focus:outline-none focus:border-orange-400 hover:border-sky-300"
        />
      </div>
    </div>
  ) : (
    <>
      <DebouncedInput
        type="text"
        value={columnFilterValue ?? ""}
        onChange={value => column.setFilterValue(value)}
        placeholder={`Cerca... (${column.getFacetedUniqueValues().size})`}
        className="block w-full sm:text-sm rounded-sm px-1 py-2 mr-1 mt-1 hover:shadow-sm border border-zinc-200 focus:outline-none focus:border-orange-400 hover:border-sky-300"
      />
    </>
  )
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <input {...props} value={value} onChange={e => setValue(e.target.value)} />
  )
}

function BtnAvDietro({ handleClick, disabled, children, html }){
    return (
        <button
            className="rounded-sm min-w-[32px] px-2 text-sm font-medium cursor-pointer hover:shadow-md border border-zinc-200 focus:outline-none hover:border-sky-300 hover:bg-white"
            onClick={handleClick}
            disabled={disabled}
        >
            {children ?? html}
        </button>
    )
}
import React from "react"

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

export default function App( { title, data : dataRemote, columns: columnsRemote, search, searchColumns, pagination, ordering, customProps } ) {
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

//   React.useEffect(() => {
//     if (table.getState().columnFilters[0]?.id === "fullName") {
//       if (table.getState().sorting[0]?.id !== "fullName") {
//         table.setSorting([{ id: "fullName", desc: false }])
//       }
//     }
//   }, [table.getState().columnFilters[0]?.id])

  return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flex flex-col">
            <div className="-mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">

                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">

                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">

                          <div className="flex w-full justify-between my-2">

                              <div className="text-2xl font-semibold p-1 mx-4 items-start">
                                  { title ?? ''}
                              </div>
                              {
                                  search ?
                                      <div className="items-end mx-4">
                                          <DebouncedInput
                                              value={globalFilter ?? ""}
                                              onChange={value => setGlobalFilter(String(value))}
                                              className="p-2 border shadow-2xl rounded-md border-gray-300 sm:text-sm focus:border-emerald-700 focus:ring-emerald-700"
                                              placeholder="Ricerca..."
                                          />
                                      </div>
                                      : null
                              }

                          </div>

                        <table className={`min-w-full divide-y table-auto divide-gray-300 ${customProps.classTable}`}>
                            <thead className="bg-gray-100">
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map(header => {
                                            return (
                                                <th className="p-1 text-start uppercase text-xs text-zinc-800 font-semibold" key={header.id} colSpan={header.colSpan}>
                                                    {header.isPlaceholder ? null : (
                                                        <>
                                                            <div
                                                                {... ordering && {
                                                                    className: header.column.getCanSort()
                                                                        ? "cursor-pointer select-none text-sm mx-2"
                                                                        : "text-sm mx-2",
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
                                                                <div className="mx-2">
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
                                        <tr key={row.id} className={`hover:bg-stone-50 ${ customProps.striped && row.id % 2 != 0 ? 'bg-gray-100' : ''}`}>
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

                    </div>
                
                    {
                          pagination
                          ?
                          <>
                          <div className="h-2" />
                        <div className="flex items-center gap-2">
                            
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
                                    className="block p-1 m-1 w-16 rounded-md border-gray-300 shadow-sm focus:border-emerald-700 focus:ring-emerald-700 sm:text-sm"
                                />
                            </span>
                            <select
                                value={table.getState().pagination.pageSize}
                                onChange={e => {
                                    table.setPageSize(Number( e.target.value == -1 ? data.length : e.target.value))
                                }}
                                className="block p-1 m-1 w-32 rounded-md border-gray-300 shadow-sm focus:border-emerald-700 focus:ring-emerald-700 sm:text-sm"
                            >
                                {[10, 20, 30, 40, 50, data.length].map(pageSize => (
                                    <option key={pageSize} value={pageSize}>
                                        Mostra { pageSize == data.length ? 'Tutti' : pageSize }
                                    </option>
                                ))}
                            </select>
                        </div>
                          </> 
                          
                          : null
                        }

                        <div>{table.getPrePaginationRowModel().rows.length} Rows</div>
                </div>
            </div>
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
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ""
          }`}
          className="block w-full p-1 m-1 rounded-md border-gray-300 shadow-sm focus:border-emerald-700 focus:ring-emerald-700 sm:text-sm"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={columnFilterValue?.[1] ?? ""}
          onChange={value => column.setFilterValue(old => [old?.[0], value])}
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ""
          }`}
          className="block w-full p-1 m-1 rounded-md border-gray-300 shadow-sm focus:border-emerald-700 focus:ring-emerald-700 sm:text-sm"
        />
      </div>
    </div>
  ) : (
    <>
      <DebouncedInput
        type="text"
        value={columnFilterValue ?? ""}
        onChange={value => column.setFilterValue(value)}
        placeholder={`Ricerca... (${column.getFacetedUniqueValues().size})`}
        className="block w-full p-1 m-1 rounded-md border-gray-300 shadow-sm focus:border-emerald-700 focus:ring-emerald-700 sm:text-sm"
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
            className="rounded-md border bg-emerald-700 ring-gray-50 py-1 px-2 text-sm font-medium cursor-pointer text-white shadow-sm 
            hover:bg-gray-50 hover:ring-emerald-700 hover:text-emerald-700 hover:border hover:border-emerald-700 focus:outline-none disabled:bg-stone-200 disabled:text-black"
            onClick={handleClick}
            disabled={disabled}
        >
            {children ?? html}
        </button>
    )
}

// JSON Argentina
const campeonesArg = [
    {
        "id": 0,
        "nombre": "Emiliano",
        "apellido": "Martínez",
        "dorsal": 23,
        "posicion": "POR",
        "equipo": "Aston Villa"
    },
    {
        "id": 1,
        "nombre": "Gerónimo",
        "apellido": "Rulli",
        "dorsal": 12,
        "posicion": "POR",
        "equipo": "Villarreal"
    },
    {
        "id": 2,
        "nombre": "Franco",
        "apellido": "Armani",
        "dorsal": 1,
        "posicion": "POR",
        "equipo": "River Plate"
    },
    {
        "id": 3,
        "nombre": "Nahuel",
        "apellido": "Molina",
        "dorsal": 26,
        "posicion": "DEF",
        "equipo": "Atlético de Madrid"
    },
    {
        "id": 4,
        "nombre": "Gonzalo",
        "apellido": "Montiel",
        "dorsal": 4,
        "posicion": "DEF",
        "equipo": "Sevilla"
    },
    {
        "id": 5,
        "nombre": "Cristian",
        "apellido": "Romero",
        "dorsal": 13,
        "posicion": "DEF",
        "equipo": "Tottenham"
    },
    {
        "id": 6,
        "nombre": "Germán",
        "apellido": "Pezzella",
        "dorsal": 6,
        "posicion": "DEF",
        "equipo": "Real Betis"
    },
    {
        "id": 7,
        "nombre": "Nicolás",
        "apellido": "Otamendi",
        "dorsal": 19,
        "posicion": "DEF",
        "equipo": "Benfica"
    },
    {
        "id": 8,
        "nombre": "Lisandro",
        "apellido": "Martínez",
        "dorsal": 25,
        "posicion": "DEF",
        "equipo": "Manchester United"
    },
    {
        "id": 9,
        "nombre": "Marcos",
        "apellido": "Acuña",
        "dorsal": 8,
        "posicion": "DEF",
        "equipo": "Sevilla"
    },
    {
        "id": 10,
        "nombre": "Nicolás",
        "apellido": "Tagliafico",
        "dorsal": 3,
        "posicion": "DEF",
        "equipo": "Olympique de Lyon"
    },
    {
        "id": 11,
        "nombre": "Juan",
        "apellido": "Foyth",
        "dorsal": 2,
        "posicion": "DEF",
        "equipo": "Villarreal"
    },
    {
        "id": 12,
        "nombre": "Rodrigo",
        "apellido": "De Paul",
        "dorsal": 7,
        "posicion": "MED",
        "equipo": "Atlético de Madrid"
    },
    {
        "id": 13,
        "nombre": "Leandro",
        "apellido": "Paredes",
        "dorsal": 5,
        "posicion": "MED",
        "equipo": "Juventus"
    },
    {
        "id": 14,
        "nombre": "Alexis",
        "apellido": "Mac Allister",
        "dorsal": 20,
        "posicion": "MED",
        "equipo": "Brighton"
    },
    {
        "id": 15,
        "nombre": "Guido",
        "apellido": "Rodríguez",
        "dorsal": 18,
        "posicion": "MED",
        "equipo": "Betis"
    },
    {
        "id": 16,
        "nombre": "Alejandro",
        "apellido": "Gómez",
        "dorsal": 15,
        "posicion": "MED",
        "equipo": "Sevilla"
    },
    {
        "id": 17,
        "nombre": "Enzo",
        "apellido": "Fernández",
        "dorsal": 24,
        "posicion": "MED",
        "equipo": "Benfica"
    },
    {
        "id": 18,
        "nombre": "Exequiel",
        "apellido": "Palacios",
        "dorsal": 14,
        "posicion": "MED",
        "equipo": "Bayer Leverkusen"
    },
    {
        "id": 19,
        "nombre": "Thiago",
        "apellido": "Almada",
        "dorsal": 16,
        "posicion": "MED",
        "equipo": "Atlanta United"
    },
    {
        "id": 20,
        "nombre": "Ángel",
        "apellido": "Di María",
        "dorsal": 11,
        "posicion": "DEL",
        "equipo": "Juventus"
    },
    {
        "id": 21,
        "nombre": "Lautaro",
        "apellido": "Martínez",
        "dorsal": 22,
        "posicion": "DEL",
        "equipo": "Inter"
    },
    {
        "id": 22,
        "nombre": "Julián",
        "apellido": "Álvarez",
        "dorsal": 9,
        "posicion": "DEL",
        "equipo": "Manchester City"
    },
    {
        "id": 23,
        "nombre": "Paulo",
        "apellido": "Dybala",
        "dorsal": 21,
        "posicion": "DEL",
        "equipo": "Roma"
    },
    {
        "id": 24,
        "nombre": "Ángel",
        "apellido": "Correa",
        "dorsal": 16,
        "posicion": "DEL",
        "equipo": "Atlético de Madrid"
    },
    {
        "id": 25,
        "nombre": "Lionel",
        "apellido": "Messi",
        "dorsal": 10,
        "posicion": "DEL",
        "equipo": "PSG"
    }
]

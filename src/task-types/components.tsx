import {Duration} from "luxon";
import {
  type ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  type TableOptions,
  useReactTable
} from "@tanstack/react-table";
import {
  PlusIcon,
  Repeat2Icon, Trash2Icon,
} from "lucide-react";
import * as React from "react";
import {Card} from "@/components/ui/card.tsx";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

type Element = React.JSX.Element;

export const formatFrequency = (frequency: string) => {
  const duration = Duration.fromISO(frequency);
  return (duration.isValid ?
      <span>{duration.toHuman({showZeros: false})} </span> :
      <span className="text-sm text-red-500"> No frequency set! </span>
  )
}

export type TaskTypeFormRow = {
  name: string;
  frequency: string;
  action?: Element;
};

type TaskTypeFormTable = ReturnType<typeof useReactTable<TaskTypeFormRow>>

const makeEmptyRow = (): TaskTypeFormRow => {
  return {
    name: "",
    frequency: "1",
    action: undefined,
  }
}

const RenderedTable = ({data, columns, FooterRow, ...props}: |
                         Pick<TableOptions<TaskTypeFormRow>, "data" | "columns"> &
                         {
                           FooterRow?: React.ComponentType<{
                             table: TaskTypeFormTable;
                           }>
                         }) => {
  const table = useReactTable<TaskTypeFormRow>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const getStripeColoring = (index: number) => {
    return index % 2 === 0 ? "" : "bg-gray-100 dark:bg-gray-800";
  }

  return (
    <Card className="flex justify-center px-1 py-1" {...props}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, idx) => (
                <TableHead key={header.id} className={getStripeColoring(idx)}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id} className="border-0">
              {row.getVisibleCells().map((cell, idx) => (
                <TableCell key={cell.id} className={getStripeColoring(idx)}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {(table.getRowModel().rows.length > 0) && !FooterRow ?
            <TableRow id="spacer-row">
              {table.getAllLeafColumns().filter((c) => c.getIsVisible()).map((column, idx) => (
                <TableCell key={`spacer-cell=${column.id}`} className={getStripeColoring(idx)}></TableCell>
              ))}</TableRow> : null}
        </TableBody>
        <TableFooter className="pt-4">
          {FooterRow ? <FooterRow table={table}/> :
            table.getFooterGroups().map(footerGroup => (
              <TableRow key={footerGroup.id}>
                {footerGroup.headers.map((header, idx) => (
                  <TableCell key={header.id} className={getStripeColoring(idx)}>
                    {header.isPlaceholder ? null :
                      flexRender(header.column.columnDef.footer, header.getContext())
                    }
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableFooter>
      </Table>
    </Card>
  )
}

export const EditableTableWithAddFooter = ({taskTypeFormData, setTaskTypeFormData, footerType = "input"}: {
  taskTypeFormData: TaskTypeFormRow[],
  setTaskTypeFormData: React.Dispatch<React.SetStateAction<TaskTypeFormRow[]>>,
  footerType: "input" | "button"
}): Element => {
  const [newRow, setNewRow] = useState<TaskTypeFormRow>(makeEmptyRow());

  const updateData = (rowIndex: number, columnId: string, value: unknown) => {
    setTaskTypeFormData((old: TaskTypeFormRow[]) =>
      // Return an array of rows where each row is returned as is, except the row for `rowIndex`
      old.map((row: TaskTypeFormRow, index: number) =>
        index === rowIndex ? {...row, [columnId]: value} : row
      )
    );
  };

  const updateNewRow = (columnId: string, value: unknown) => {
    // Set a given column value in the footer row
    setNewRow((row) => ({...row, [columnId]: value}));
  };

  const commitNewRow = () => {
    console.log(`new row: ${JSON.stringify(newRow)}`);
    setTaskTypeFormData((old: TaskTypeFormRow[]) => [...old, newRow]);
    setNewRow(makeEmptyRow()); // reset
  };

  const removeRow = (rowIndex: number) => {
    setTaskTypeFormData((old: TaskTypeFormRow[]) => old.filter((row: TaskTypeFormRow, index: number) => index !== rowIndex));
  }

  const columnHelper = createColumnHelper<TaskTypeFormRow>()
  const columns: ColumnDef<TaskTypeFormRow>[] = [
    columnHelper.accessor('name', {
      header: () => {
        return <div className={"flex justify-center"}>Name</div>
      },
      cell: ({getValue, row, column}) => {
        return <Input
          defaultValue={getValue() as string}
          required={true}
          onBlur={(e) => {
            e.stopPropagation()
            updateData(row.index, column.id, e.target.value)
          }}
        />
      },
      footer: ({column}) => (
        <Input className={""}
               placeholder="some name..."
               defaultValue={newRow.name}
               onBlur={
                 (e) => {
                   e.stopPropagation()
                   updateNewRow(column.id, e.target.value)
                 }}
        />
      ),
    }),
    columnHelper.accessor('frequency', {
      header: () => {
        return <div className={"flex justify-center items-center-safe gap-2"}>Repeats <Repeat2Icon/><span
          className="sr-only">Repeats every X days</span></div>
      },
      cell: ({getValue, row, column}) => {
        return <span className={"flex items-center gap-2"}>
          every
          <Input
            className={"w-12 h-9 text-center px-2"}
            type="number"
            min="1"
            defaultValue={getValue()}
            required={true}
            onBlur={(e) => {
              e.stopPropagation()
              updateData(row.index, column.id, e.target.value)
            }}
          />day(s)</span>
      },
      footer: ({column}) => (
        <span className={"flex items-center gap-2"}>
          every
        <Input
          className={"w-12 h-9 text-center px-2"}
          type="number"
          defaultValue={newRow.frequency}
          onBlur={(e) => {
            e.stopPropagation()
            updateNewRow(column.id, e.target.value)
          }}
        />
          day(s)
        </span>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: undefined,
      cell: ({row}) => {
        return <Button type="button" variant="ghost" size="icon" className={""}
                       onClick={() => removeRow(row.index)}><Trash2Icon
          className={"text-red-500"}/><span
          className="sr-only">Remove row</span></Button>
      },
      footer: () => (
        <Button type="button" variant="ghost" size="icon" className={"-ms-3"} onClick={commitNewRow}><PlusIcon/><span
          className="sr-only">Add row</span></Button>
      ),
    })
  ]
  if (footerType === "input") {
    return <RenderedTable data={taskTypeFormData} columns={columns}/>;
  }
  const addBlankRow = () => {
    setTaskTypeFormData((old: TaskTypeFormRow[]) => [...old, makeEmptyRow()]);
  };

  const FooterRow = ({table}: { table: TaskTypeFormTable }): Element => {
    return <TableRow className="">
      <TableCell className="text-center p-0"
                 colSpan={table.getAllLeafColumns().filter((c) => c.getIsVisible()).length}>
        <Button
          type="button" variant="ghost" size="icon" className={"w-full"}
          onClick={addBlankRow}><PlusIcon/><span
          className="">Add new row</span>
        </Button>
      </TableCell>
    </TableRow>
  }

  return <RenderedTable data={taskTypeFormData} columns={columns} FooterRow={FooterRow}/>;
}

export const NonEditableTable = ({taskTypeData}: { taskTypeData: TaskTypeFormRow[] }) => {
  const columnHelper = createColumnHelper<TaskTypeFormRow>()
  const columns = [
    columnHelper.accessor('name', {
      header: () => {
        return <div className={"flex justify-center"}>Name</div>
      },
      cell: ({getValue}) => {
        return <span>{getValue()}</span>
      },
    }),
    columnHelper.accessor('frequency', {
      header: () => {
        return <div className={"flex justify-center items-center-safe gap-2"}>Repeats <Repeat2Icon/><span
          className="sr-only">Repeats every X days</span></div>
      },
      cell: ({getValue}) => {
        return <span className={"flex items-center gap-2"}>
          every {Duration.fromISO(getValue()).toHuman()}
        </span>
      },
    }),
  ]
  return <RenderedTable data={taskTypeData} columns={columns}/>;
}
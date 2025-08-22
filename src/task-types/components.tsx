import {Duration} from "luxon";
import {
  type ColumnDef,
  type CoreOptions,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  type Row,
  useReactTable
} from "@tanstack/react-table";
import type {TaskType} from "@/task-types/service.ts";
import {ChevronRightIcon, MinusIcon, PlusIcon} from "lucide-react";
import * as React from "react";
import {Card} from "@/components/ui/card.tsx";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {data} from "react-router";
import {Button} from "@/components/ui/button.tsx";

export const formatFrequency = (frequency: string) => {
  const duration = Duration.fromISO(frequency);
  return (duration.isValid ?
      <span>{duration.toHuman({showZeros: false})} </span> :
      <span className="text-sm text-red-500"> No frequency set! </span>
  )
}

// 2 liner:
/*
type RowTypeFromCols<T> =
  T extends ColumnDef<infer Row, any>[] ? Row : never;

type InferredTaskType = RowTypeFromCols<typeof columns>;
 */

// choreId is undefined in the CreateChoreCard.
type TaskTypeFormRow = {
  name: string;
  frequency: number;
  choreId: string | undefined;
  action: Element | undefined;
};

const makeEmptyRow = (choreId: string | undefined): TaskTypeFormRow => {
  return {
    choreId,
    name: "",
    frequency: 1,
    action: undefined,
  }
}

export const EditableTableWithAddFooter = ({taskTypes, choreId}: {
  taskTypes: TaskTypeFormRow[],
  choreId?: string
}) => {
  const [data, setData] = useState<TaskTypeFormRow[]>(taskTypes);
  const [newRow, setNewRow] = useState<TaskTypeFormRow>(makeEmptyRow(choreId));

  const updateData = (rowIndex: number, columnId: string, value: unknown) => {
    setData((old) =>
      // Return an array of rows where each row is returned as is, except the row for `rowIndex`
      old.map((row, index) =>
        index === rowIndex ? {...row, [columnId]: value} : row
      )
    );
  };

  const updateNewRow = (columnId: string, value: unknown) => {
    // Set a given column value in the footer row
    setNewRow((row) => ({...row, [columnId]: value}));
  };

  const commitNewRow = () => {
    // only add if not completely empty
    if (newRow.name || newRow.frequency || newRow.choreId) {
      setData((old) => [...old, newRow]);
      setNewRow(makeEmptyRow(choreId)); // reset
    }
  };

  const removeRow = (rowIndex: number) => {
    setData((old) => old.filter((row, index) => index !== rowIndex));
  }

  const columnHelper = createColumnHelper<TaskTypeFormRow>()
  const columns = [
    columnHelper.accessor('choreId', {
      header: "Chore ID",
      cell: info => info.getValue(),
      enableHiding: true, // default but set explicitly
    }),
    columnHelper.accessor('name', {
      header: "Name",
      cell: ({getValue, row, column}) => {
        return <Input
          value={getValue() as string}
          onChange={(e) =>
            updateData(row.index, column.id, e.target.value)
          }
        />
      },
      footer: ({column}) => (
        <Input
          placeholder="Enter name"
          value={newRow.name}
          onChange={(e) => updateNewRow(column.id, e.target.value)}
        />
      ),
    }),
    columnHelper.accessor('frequency', {
      header: "Repeats every ... days",
      cell: ({getValue, row, column}) => {
        return <Input
          type="number"
          min="1"
          value={getValue()}
          onChange={(e) =>
            updateData(row.index, column.id, e.target.value)
          }
        />
      },
      footer: ({column}) => (
        <Input
          type="number"
          value={newRow.frequency}
          onChange={(e) => updateNewRow(column.id, e.target.value)}
        />
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Add / Remove Row",
      cell: ({row}) => {
        return <Button onClick={() => removeRow(row.index)}><MinusIcon/><span
          className="sr-only">Remove row</span></Button>
      },
      footer: () => (
        <Button onClick={commitNewRow}><PlusIcon/><span className="sr-only"> Add row</span></Button>
      ),
    })
  ]
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      columnVisibility: {choreId: false}
    }
  });

  return (
    <Card className="flex justify-center px-2 py-1">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
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
            <TableRow key={row.id} className="border-0 ">
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          {table.getFooterGroups().map(footerGroup => (
            <TableRow key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <TableCell key={header.id}>
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

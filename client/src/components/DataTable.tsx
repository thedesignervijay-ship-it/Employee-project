import { ReactNode } from "react";

interface Column {
  header: string;
  className?: string;
  render: (item: any) => ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  keyFn: (item: any) => string;
}

function DataTable({ columns, data, keyFn }: DataTableProps) {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i} className={col.className}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={keyFn(item)}>
              {columns.map((col, i) => (
                <td key={i} className={col.className}>
                  {col.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;

import React from "react";

function parseCsvToRowsAndColumn(csvText: string, csvColumnDelimiter = "\t") {
  const rows = csvText.split("\n");
  if (!rows || rows.length === 0) {
    return [];
  }

  return rows.map((row) => row.split(csvColumnDelimiter));
}
const CsvToHtmlTable = ({
  data,
  csvDelimiter,
  hasHeader,
  tableClassName,
  tableRowClassName,
  tableColumnClassName,
  rowKey,
  colKey,
  renderCell,
}: any) => {
  const rowsWithColumns = parseCsvToRowsAndColumn(data.trim(), csvDelimiter);
  let headerRow = undefined;
  if (hasHeader) {
    headerRow = rowsWithColumns.splice(0, 1)[0];
  }

  const renderTableHeader = (row: any) => {
    if (row && row.map) {
      return (
        <thead>
          <tr>
            {row.map((column: string, i: string) => (
              <th key={`header-${i}`}>{column}</th>
            ))}
          </tr>
        </thead>
      );
    }
  };

  const renderTableBody = (rows: any) => {
    if (rows && rows.map) {
      return (
        <tbody>
          {rows.map((row: any, rowIdx: string) => (
            <tr
              className={tableRowClassName}
              key={typeof rowKey === "function" ? rowKey(row, rowIdx) : rowIdx}
            >
              {row.map &&
                row.map((column: any, colIdx: string) => (
                  <td
                    className={tableColumnClassName}
                    key={
                      typeof rowKey === "function"
                        ? colKey(row, colIdx, rowIdx)
                        : column[colKey]
                    }
                  >
                    {typeof renderCell === "function"
                      ? renderCell(column, colIdx, rowIdx)
                      : column}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      );
    }
  };

  return (
    <table className={`csv-html-table ${tableClassName}`}>
      {renderTableHeader(headerRow)}
      {renderTableBody(rowsWithColumns)}
    </table>
  );
};

CsvToHtmlTable.defaultProps = {
  data: "",
  rowKey: (row: string, rowIdx: string) => `row-${rowIdx}`,
  colKey: (col: string, colIdx: string) => `col-${colIdx}`,
  hasHeader: true,
  csvDelimiter: "\t",
  tableClassName: "",
  tableRowClassName: "",
  tableColumnClassName: "",
};

export default CsvToHtmlTable;

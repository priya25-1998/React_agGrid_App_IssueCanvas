// Importiing all the Grid Packages...
import "./App.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useState, useEffect, useMemo } from "react";
import "ag-grid-enterprise";
import { LicenseManager } from "ag-grid-enterprise";
LicenseManager.setLicenseKey(
  "MTY4ODA3OTYwMDAwMA==5266e2b19455d0b5c7c8c52bf6367755"
);



function App() {
  // Define all the static variables

  const animateRows = true;
  const [rowData, setRowData] = useState();
  const enableCharts = true;
  const enableRangeSelection = true;
  const enableRangeHandle = true;

  // Define the columns and Rows

  const [columnDefs] = useState([
    {
      field: "Control ID",
      headerName: "Control ID",
      chartDataType: "category",
      filter: true,
      tooltipField: "Control ID",
      headerCheckboxSelection: true,
      enableRowGroup: true,
      checkboxSelection: true,
      rowDrag: true,
      enablePivot: true,
      enableValue: true,
      //aggFunc: 'count'
    },
    {
      field: "Control Name",
      headerName: "Control Name",
      tooltipField: "Control Name",
      chartDataType: "category",
      filter: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      //aggFunc: 'count'
    },
    {
      field: "Control Description",
      headerName: "Control Description",
      tooltipField: "Control Description",
      chartDataType: "category",
      filter: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      //aggFunc: 'count'
    },

    {
      field: "Insight",
      headerName: "Insight",
      chartDataType: "category",
      filter: true,
      tooltipField: "Insight",
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      //aggFunc: 'count'
    },
    {
      field: "Tested LoB",
      headerName: "Tested LoB",
      chartDataType: "category",
      filter: "agSetColumnFilter",
      tooltipField: "Tested LoB",
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      //aggFunc: 'count'
    },
    {
      field: "Total Test Count",
      headerName: "Total Test Count",
      chartDataType: "series",
      tooltipField: "Total Test Count",
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      //aggFunc: 'count'
    },
    {
      field: "Duplicate/Similar Count",
      headerName: "Duplicate/Similar Count",
      chartDataType: "series",
      tooltipField: "Duplicate/Similar Count",
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      //aggFunc: 'count'
    },
  ]);

  useEffect(() => {
    const object_URL =
      "https://ms-optimizer.s3.us-east-2.amazonaws.com/Sample/Duplicate_controls_within_same_Lob.csv";
    fetch(object_URL)
      .then((response) => response.text())
      .then((csvData) => {
        const rows = csvData.split("\n");
        const headers = rows[0].split(",").map((header) => header.trim());
        const rowData = rows
          .slice(1)
          .filter((row) => row.trim() !== "")
          .map((row) => {
            const values = row.split(",").map((value) => value.trim());
            return headers.reduce((rowObject, header, index) => {
              const key = header.replace(/\s+/g, " ");
              console.log(key);
              rowObject[key] = values[index];
              return rowObject;
            }, {});
          });
        setRowData(rowData);
        console.log(rowData);
      })
      .catch((error) => {
        console.error("Error fetching CSV data:", error);
      });
  }, []);

  // Define the Default columns Parameters

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      flex: 1,
      minWidth: 270,
      resizable: true,
      floatingFilter: true,
      enablePivot: true,
      autoHeaderHeight: true,
    };
  }, []);

  // Define the Sidebar Parameters

  const sideBar = {
    toolPanels: [
      {
        id: "columns",
        labelDefault: "Columns",
        labelKey: "columns",
        iconKey: "columns",
        toolPanel: "agColumnsToolPanel",
        minWidth: 225,
        maxWidth: 225,
        width: 225,
      },
      {
        id: "filters",
        labelDefault: "Filters",
        labelKey: "filters",
        iconKey: "filter",
        toolPanel: "agFiltersToolPanel",
        minWidth: 180,
        maxWidth: 400,
        width: 250,
      },
    ],
    position: "right",
    defaultToolPanel: "filters",
  };

  // Define the Statusbar Parameters

  const statusBar = useMemo(() => {
    return {
      statusPanels: [
        { statusPanel: "agTotalRowCountComponent", align: "left" },
        { statusPanel: "agSelectedRowCountComponent", align: "left" },
      ],
    };
  }, []);

  const popupParent = useMemo(() => {
    return document.body;
  }, []);

  return (
    <div
      id="root"
      className="ag-theme-alpine"
      style={{ height: 500, width: 1350 }}
    >
      <h2>Duplicate Controls within Same LOB</h2>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection={"multiple"}
        rowMultiSelectWithClick={true}
        animateRows={animateRows}
        enableCharts={enableCharts}
        enableRangeSelection={enableRangeSelection}
        enableRangeHandle={enableRangeHandle}
        popupParent={popupParent}
        sideBar={sideBar}
        rowDragManaged={true}
        suppressMoveWhenRowDragging={true}
        statusBar={statusBar}
        suppressBrowserResizeObserver={true}
        pivotMode={false}
      />
    </div>
  );
}

export default App;

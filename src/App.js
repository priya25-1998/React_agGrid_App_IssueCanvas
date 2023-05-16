// Importiing all the Grid Packages...
import "./App.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useState, useEffect, useMemo } from "react";
import "ag-grid-enterprise";
import { LicenseManager } from "ag-grid-enterprise";
LicenseManager.setLicenseKey(
  "MTY4NTQ4NzYwMDAwMA==1e9d6ab04f075a6ef1ea64d676600ee9"
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
      field: "LoB",
      headerName: "LOB",
      chartDataType: "category",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      filter: "agSetColumnFilter",
      tooltipField: "LoB",
      rowDrag: true,
      enableRowGroup: true,
      enablePivot:true
    },
    {
      field: "ControlID",
      chartDataType: "category",
      filter: true,
      tooltipField: "ControlID",
      enableRowGroup: true,
      enablePivot:true
    },
    {
      field: "ControlName",
      tooltipField: "ControlName",
      chartDataType: "category",
      filter: true,
      enableRowGroup: true,
      enablePivot:true
    },
    {
      field: "CurrentTestFrequency",
      chartDataType: "category",
      enableRowGroup: true,
      enablePivot:true
    },
    {
      field: "RecommendationAction",
      chartDataType: "category",
      filter: true,
      tooltipField: "RecommendationAction",
      enableRowGroup: true,
      enablePivot:true
    },
    {
      field: "Recommendation",
      chartDataType: "category",
      filter: true,
      tooltipField: "Recommendation",
      enableRowGroup: true,
      enablePivot:true,
      cellStyle: (params) => {
        if (params.value === "Re-test") {
          return {
            backgroundColor: "LightCoral",
            fontWeight: "bold",
            borderRadius: "2px",
            textAlign: "center",
            border: "crimson Solid",
            color: "white",
            width: "160px",
            height: "35px",
            
          };
        }
        if (params.value === "Optimize") {
          return {
            backgroundColor: "MediumAquamarine",
            fontWeight: "bold",
            borderRadius: "2px",
            textAlign: "center",
            border: "LightSeaGreen Solid",
            color: "white",
            width: "160px",
            height: "35px",
          };
        }
      },
    },
    {
      field: "Action",
      chartDataType: "series",
      enableRowGroup: true,
      enablePivot:true,
      cellRenderer: function (params) {
        if (params.value === "Take Action") {
          return (
            <button
              onClick={() =>
                navigateToDetails(
                  params.data.id,
                  "https://mdosri.rnd.metricstream.com/ui/report/101077/report5568"
                )
              }
              className="btn"
            >
              Take Action
            </button>
          );
        } else {
          return params.value;
        }
      },
    },
    {
      field: "Mode",
      chartDataType: "category",
      filter: true,
      enableRowGroup: true,
      enablePivot:true
    },
    {
      field: "Rationale",
      tooltipField: "Rationale",
      chartDataType: "category",
      enableRowGroup: true,
      enablePivot:true
    },
    {
      field: "Rationale Filter",
      chartDataType: "category",
      tooltipField: "Rationale Filter",
      enableRowGroup: true,
      enablePivot:true,
      filter: true,
      /*cellStyle: (params) => {
        if (params.value === "Issue Detected") {
          return { fontWeight: "bold", borderRadius:'15px', textAlign:'center'};
        }
        if (params.value === "Control Consistently Passed") {
          return {fontWeight: "bold",borderRadius:'15px', textAlign:'center'};
        }
      },*/
    },
    {
      field: "ControlTestCount",
      chartDataType: "series",
      tooltipField: "ControlTestCount",
      enableRowGroup: true,
      enablePivot:true
    },
  ]);

  useEffect(() => {
    const object_URL =
      "https://ms-optimizer.s3.us-east-2.amazonaws.com/Sample/test_plan_recommendations.csv";
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
      minWidth: 220,
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

  // navigateToDetails Function
  function navigateToDetails(id, url) {
    console.log("Navigating to details for each row using a URL");
    window.location.href = url;
  }

  const popupParent = useMemo(() => {
    return document.body;
  }, []);

  return (
    <div
      id="root"
      className="ag-theme-alpine"
      style={{ height: 500, width: 1350 }}
    >
      <h2>Test Plan Recommendations</h2>
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
        pivotMode={true}
      />
    </div>
  );
}

export default App;

// import React from "react";
// import { useTable, useFilters, useGlobalFilter } from 'react-table'

// function defaultColumnFilter({
//     column: { filterValue, preFilteredRows, setFilter }
//   }) {
//     const count = preFilteredRows.length;
  
//     return (
//       <input
//         value={filterValue || ""}
//         onChange={(e) => {
//           setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
//         }}
//         placeholder={`Search ${count} records...`}
//       />
//     );
//   }

  


//   const Records  = function ({ columns, data }) {
//     const filterTypes = React.useMemo(
//       () => ({
//         text: (rows, id, filterValue) => {
//           return rows.filter((row) => {
//             const rowValue = row.values[id];
//             return rowValue !== undefined
//               ? String(rowValue)
//                   .toLowerCase()
//                   .startsWith(String(filterValue).toLowerCase())
//               : true;
//           });
//         }
//       }),
//       []
//     );
  
//     const defaultColumn = React.useMemo(
//       () => ({
//         // Add default filter 
//         Filter: defaultColumnFilter
//       }),
//       []
//     );
  
//     const {
//       getTableProps,
//       getTableBodyProps,
//       headerGroups,
//       rows,
//       prepareRow
//     } = useTable(
//       {
//         columns,
//         data,
//         defaultColumn, 
//         filterTypes
//       },
//       useFilters, 
//       useGlobalFilter
//     );  
//     return (
//       <>
//         <table class="table table-hover" {...getTableProps()} >
//           <thead className="bg-light">
//             {headerGroups.map((headerGroup) => (
//               <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column) => (
//                   <th {...column.getHeaderProps()}>
//                     {column.render("Header")}
//                     {/* Render the columns filter UI */}
//                     <div>{column.canFilter ? column.render("Filter") : null}</div>
//                   </th>
//                 ))}
//               </tr>
//             ))}
            
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {rows.map((row, i) => {
//               prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()}>
//                   {row.cells.map((cell) => {
//                     return (
//                       <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                     );
//                   })}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//         <br />
//         <div class="text-primary"><h6>Total {rows.length} record found ..</h6></div>
//       </>
//     );
//   }
  
//  const SelectFilter =  function ({
//     column: { filterValue, setFilter, preFilteredRows, id }
//   }) {
    
//     const options = React.useMemo(() => {
//       const options = new Set();
//       preFilteredRows.forEach((row) => {
//         options.add(row.values[id]);
//       });
//       return [...options.values()];
//     }, [id, preFilteredRows]);
  
//     return (
//       <select
//         value={filterValue}
//         onChange={(e) => {
//           setFilter(e.target.value || undefined);
//         }}
//       >
//         <option value="">All</option>
//         {options.map((option, i) => (
//           <option key={i} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     );
//   }



//   export {SelectFilter,Records}
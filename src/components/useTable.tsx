import { useState, useEffect } from "react";

const useTable = (data:any, page:any, rowsPerPage:any) => {
    const [tableRange, setTableRange] = useState([]);
    const [slice, setSlice] = useState([]);
    const sliceData = (data:any, page:any, rowsPerPage:any) => {
        return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
      };
    const calculateRange = (data:any, rowsPerPage:number) => {
        const range = [];
        const num = Math.ceil(data.length / rowsPerPage);
        let i = 1;
        for (let i = 1; i <= num; i++) {
          range.push(i);
        }
        return range;
      };

    useEffect(() => {
      const range:any[] = calculateRange(data, rowsPerPage);
      // setTableRange([...range]);
  
      const slice:any[] = sliceData(data, page, rowsPerPage);
      // setSlice([...slice]);
    }, [data, setTableRange, page, setSlice]);
  
    return { slice, range: tableRange };

  };

  export default useTable;




    
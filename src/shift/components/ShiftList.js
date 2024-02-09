import React, { useState } from 'react';
import Card from '../../shared/components/UIElements/Card';
import { useSelector } from "react-redux";

import { DataGrid } from '@mui/x-data-grid';

const ShiftList = () => {

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const shifts = useSelector((state) => state.shift.shifts);

  
  const shiftList = shifts.map(shift => ({
    ...shift,
    doctor: shift.doctor.name
  }));

  if (shifts.length === 0) {
    return (
      <div className="shift-list center">
        <Card>
          <h2>No shifts found.</h2>
        </Card>
      </div>
    );
  };

  const columns = [
    { field: 'day', headerName: 'Day', width: 180 },
    { field: 'hour', headerName: 'Hour', width: 180 },
    { field: 'dni', headerName: 'DNI', width: 130 },
    { field: 'description', headerName: 'Description', width: 230 },
    { field: 'available', headerName: 'Available', width: 230 },
    { field: 'doctor', headerName: 'Doctor', width: 230 },
  ];

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={shiftList.slice(page * pageSize, (page + 1) * pageSize)}
        columns={columns}
        pagination
        pageSize={pageSize}
        rowCount={shiftList.length}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default ShiftList;
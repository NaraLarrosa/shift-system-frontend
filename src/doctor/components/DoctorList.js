import React, { useState } from 'react';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import { useSelector } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';

import './DoctorList.css';

const DoctorList = () => {

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const doctors = useSelector((state) => state.doctor.doctors.doctors);

  if (doctors.length === 0) {
    return (
      <div className="doctor-list center">
        <Card>
          <h2>No doctors found. Maybe create one?</h2>
          <Button to="/doctor/add">Share Doctor</Button>
        </Card>
      </div>
    );
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 230 },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'surname', headerName: 'Surname', width: 180 },
    {
      field: 'dni', headerName: 'DNI', width: 130,
    },
    {
      field: 'specialty.name', headerName: 'Specialty', width: 230
    }
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
        rows={doctors.slice(page * pageSize, (page + 1) * pageSize)}
        columns={columns}
        pagination
        pageSize={pageSize}
        rowCount={doctors.length}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default DoctorList;

import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import { useSelector } from "react-redux";

import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/Visibility';

import './DoctorList.css';

const DoctorList = () => {

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const doctors = useSelector((state) => state.doctor.doctors.doctors);

  const doctorList = doctors.map(doctor => ({
    ...doctor,
    specialty: doctor.specialty.name
  }));

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
      field: 'dni', headerName: 'DNI', width: 120,
    },
    {
      field: 'specialty', headerName: 'Specialty', width: 230
    },
    { field: 'show', headerName: 'Show', width: 200,
      renderCell: (params) => (
        <div className="action-buttons">
          <IconButton
            aria-label="show doctor"
            component={RouterLink}
            to={`/doctor/${params.row.id}`}
            // to={`/Show/${doctors.id}`}
          >
            <VisibilityIcon />
          </IconButton>
        </div>
      ),
    },
    { field: 'update', headerName: 'Update', width: 200,
      renderCell: (params) => (
        <div className="action-buttons">
          <IconButton
            aria-label="update doctor"
            component={RouterLink}
            to={`/doctors/update/${params.row.id}`}
            // to={`/UpdateDoctor/${doctors.id}`}
          >
            <ModeEditIcon />
          </IconButton>
        </div>
      ),
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
      <div className="action-buttons-right">
      <IconButton
          aria-label="add doctor"
          component={RouterLink}
          to="/doctors/add"
        >
        <AddIcon />ADD DOCTOR
      </IconButton>
      </div>
      <DataGrid
        rows={doctorList.slice(page * pageSize, (page + 1) * pageSize)}
        columns={columns}
        pagination
        pageSize={pageSize}
        rowCount={doctorList.length}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default DoctorList;

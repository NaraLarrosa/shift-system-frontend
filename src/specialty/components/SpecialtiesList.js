import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import './SpecialtiesList.css';

const SpecialtiesList = () => {

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const specialties = useSelector((state) => state.specialty.specialties.specialties);

  const columns = [
    { field: 'id', headerName: 'ID', width: 230 },
    { field: 'name', headerName: 'Name', width: 180 }
  ];

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

    return (
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
      <div className="action-buttons-right" style={{ position: 'absolute', top: 0, right: 0, margin: '10px' }}>
        <IconButton
          aria-label="add specialty"
          component={RouterLink}
          to="/specialty/add"
        >
          <AddIcon />ADD SPECIALTY
        </IconButton>
      </div>
      <div>
        <h3>AVAILABLE SPECIALTIES:</h3>
      </div>
      <div style={{ width: 'fit-content' }}>
        <DataGrid
          rows={specialties.slice(page * pageSize, (page + 1) * pageSize)}
          columns={columns}
          pagination
          pageSize={pageSize}
          rowCount={specialties.length}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          className="data-grid-root"
        />
      </div>
      </div>
    );
};

export default SpecialtiesList;
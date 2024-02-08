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

//   return (
//     <ul className="specialty-list">
//       {specialties.map(specialty => (
//         <SpecialtyItem
//           key={specialty.id}
//           id={specialty.id}
//           name={specialty.name}
//         />
//       ))}
//     </ul>
//   );
// };

// export default SpecialtiesList;

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

  // if (specialties.length === 0) {
  //   return (
  //     <div className="center">
  //       <Card>
  //         <h2>No specialty found.</h2>
  //       </Card>
  //     </div>
  //   );
  // } else {
    return (
      <div style={{ height: 400, width: '100%' }}>
        <div className="action-buttons-right">
        <IconButton
            aria-label="add specialty"
            component={RouterLink}
            to="/specialty/add"
          >
          <AddIcon />ADD SPECIALTY
        </IconButton>
        </div>
        <DataGrid
          rows={specialties.slice(page * pageSize, (page + 1) * pageSize)}
          columns={columns}
          pagination
          pageSize={pageSize}
          rowCount={specialties.length}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    );
  // }
};

export default SpecialtiesList;
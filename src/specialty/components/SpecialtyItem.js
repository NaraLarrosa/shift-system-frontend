// import React from 'react';
// import Card from '../../shared/components/UIElements/Card';
// import ErrorModal from '../../shared/components/UIElements/ErrorModal';
// import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
// import { useHttpClient } from '../../shared/hooks/http-hook';

// import { useSelector } from 'react-redux';
// import './SpecialtyItem.css';

// const SpecialtyItem = props => {
//   const specialties = useSelector((state) => state.specialty.specialties);
//   const { isLoading, error, clearError } = useHttpClient();

//   //cambiar card a tabla

//   return (
//     <React.Fragment>
//       <ErrorModal error={error} onClear={clearError} />
//       <li className="specialty-item">
//         <Card className="specialty-item__content">
//           {isLoading && <LoadingSpinner asOverlay />}
//           <div className="specialty-item__info">
//             <h2>{specialties.name}</h2>
//           </div>
//         </Card>
//       </li>
//     </React.Fragment>
//   );
// };

// import React, { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import { useSelector } from "react-redux";

// import { DataGrid } from '@mui/x-data-grid';
// import AddIcon from '@mui/icons-material/Add';
// import IconButton from '@mui/material/IconButton';

// const SpecialtiesList = () => {

//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(5);
//   const specialties = useSelector((state) => state.specialty.specialties.spécialties);

//   const columns = [
//     { field: 'id', headerName: 'ID', width: 230 },
//     { field: 'name', headerName: 'Name', width: 180 }
//   ];

//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//   };

//   const handlePageSizeChange = (newPageSize) => {
//     setPageSize(newPageSize);
//   };

//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <div className="action-buttons-right">
//       <IconButton
//           aria-label="add specialty"
//           component={RouterLink}
//           to="/NewSpecialty"
//         >
//         <AddIcon />ADD SPECIALTY
//       </IconButton>
//       </div>
//       <DataGrid
//         rows={specialties.slice(page * pageSize, (page + 1) * pageSize)}
//         columns={columns}
//         pagination
//         pageSize={pageSize}
//         rowCount={specialties.length}
//         onPageChange={handlePageChange}
//         onPageSizeChange={handlePageSizeChange}
//       />
//     </div>
//   );

// };

// export default SpecialtiesList;


import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import { useSelector } from "react-redux";


import './SpecialtyItem.css';

const SpecialtyItem = () => {

  const specialties = useSelector((state) => state.specialty.specialties);

  if (specialties.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No specialty found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="specialty-item">
        {specialties.map(specialty => (
            <div>
                key={specialty.id}
                id={specialty.id}
                name={specialty.name}
            </div>
        ))}
    </ul>
  );
};

export default SpecialtyItem;

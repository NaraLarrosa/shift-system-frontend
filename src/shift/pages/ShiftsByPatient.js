import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, Typography, TableHead, TableRow, Paper } from '@mui/material';

function ShiftByPatient() {
  const { isLoading, sendRequest } = useHttpClient();
  const [shifts, setShifts] = useState([]);
  const userId = useParams().userId;
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/shift/pat/${userId}`,
          'GET',
          null,
          {
            Authorization: 'Bearer ' + token,
          }
        );
        setShifts(responseData.shiftByPatient);
      } catch (error) {
        console.error('Error fetching shifts:', error.message);
      }
    };
    fetchShifts();
  }, [sendRequest, userId, token]);

  return (
    <React.Fragment>
      <Typography variant="h5" style={{ textAlign: 'center', margin: '20px 0' }}>
        PATIENT SHIFTS:
      </Typography>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && shifts.length > 0 && (
        <TableContainer component={Paper}>
          <Table aria-label="shifts table">
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell>Hour</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shifts.map((shift) => (
                <TableRow key={shift._id}>
                  <TableCell>{shift.day}</TableCell>
                  <TableCell>{shift.hour}</TableCell>
                  <TableCell>{shift.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </React.Fragment>
  );
}

export default ShiftByPatient;
import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography } from '@mui/material';

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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {shifts.map((shift) => (
          <Card key={shift._id} style={{ margin: '10px', width: '300px' }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Day: {shift.day}
              </Typography>
              <Typography variant="h6" component="div">
                Hour: {shift.hour}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description: {shift.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </React.Fragment>
  );
}

export default ShiftByPatient;
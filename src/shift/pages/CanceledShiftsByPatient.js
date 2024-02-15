import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

function CanceledShiftByPatient() {
  const { isLoading, sendRequest } = useHttpClient();
  const [canceledShifts, setCanceledShifts] = useState([]);
  const userId = useParams().userId;
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchCanceledShifts = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/shift/history/cancel/${userId}`,
          'GET',
          null,
          {
            Authorization: 'Bearer ' + token,
          }
        );
  
        if (responseData && responseData.canceledShifts) {
          setCanceledShifts(responseData.canceledShifts);
        } else {
          setCanceledShifts([]);
        }
      } catch (error) {
        console.error('Error fetching canceled shifts:', error.message);
      }
    };
    fetchCanceledShifts();
  }, [sendRequest, userId, token]);

  return (
    <React.Fragment>
      <Typography variant="h5" style={{ textAlign: 'center', margin: '20px 0' }}>
        History of canceled shifts for this patient:
      </Typography>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {canceledShifts.length === 0 && !isLoading && (
        <Card style={{ margin: '20px', width: '300px', textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h6">
              This patient does not have canceled shifts
            </Typography>
          </CardContent>
        </Card>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {canceledShifts.map((shift) => (
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

export default CanceledShiftByPatient;
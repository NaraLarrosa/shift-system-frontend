import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Card from '../../shared/components/UIElements/Card';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useSelector } from "react-redux";
import Button from '../../shared/components/FormElements/Button';

import { Typography, List, ListItem, ListItemText, Paper, CardContent } from '@mui/material';

const DoctorItem = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedDoctors, setLoadedDoctors] = useState();
    const token = useSelector((state) => state.user.token);
    const doctorId = useParams().did;

  useEffect(() => {
    const fetchDoctors = async () => {
        try {
            const headers = {
                "Authorization": "Bearer " + token
            }
            const responseData = await sendRequest(
                `http://localhost:5000/api/doctor/${doctorId}`, "GET", null, headers
            );
    
            setLoadedDoctors(responseData);
    
        } catch (err) {}
    };
        fetchDoctors();
        }, [doctorId, sendRequest, token]);


    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <div>
                {isLoading && (
                    <div className="center">
                    <LoadingSpinner />
                    </div>
                )}
                {!isLoading && loadedDoctors &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', width: '60%'}}>
                        <Typography variant="h5" gutterBottom>
                        <strong>Doctor Information:</strong>
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary={`Name: ${loadedDoctors.doctor.name}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Surname: ${loadedDoctors.doctor.surname}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`DNI: ${loadedDoctors.doctor.dni}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Specialty: ${loadedDoctors.doctor.specialty.name}`} />
                            </ListItem>
                        </List>
                        <Typography variant="h5" gutterBottom>
                            <strong>Shifts:</strong>
                        </Typography>
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                                {loadedDoctors.shifts.map((shift, index) => (
                                    <Card key={index} style={{ margin: '10px', minWidth: '200px' }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {`Day: ${shift.day}`}
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            {`Hour: ${shift.hour}`}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            {`Description: ${shift.description}`}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            {`Available: ${shift.available}`}
                                        </Typography>
                                        <Button component={Link} to="/reservation" variant="contained" color="primary">
                                            Reserve
                                        </Button>
                                    </CardContent>
                                    </Card>
                                ))}
                            </div>
                    </Paper>
                </div>
                }
            </div>
        </React.Fragment>
    );    
};

export default DoctorItem;
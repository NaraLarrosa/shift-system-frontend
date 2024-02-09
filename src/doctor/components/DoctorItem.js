import React, { useEffect, useState } from 'react';
import DoctorList from './DoctorList';
import { useParams } from 'react-router-dom';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useSelector } from "react-redux";
import { Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

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
                    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                        <Typography variant="h5" gutterBottom>
                        Información del Doctor
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary={`Nombre: ${loadedDoctors.doctor.name}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Apellido: ${loadedDoctors.doctor.surname}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`DNI: ${loadedDoctors.doctor.dni}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Especialidad: ${loadedDoctors.doctor.specialty.name}`} />
                            </ListItem>
                        </List>
                    </Paper>
                }
            </div>
        </React.Fragment>
    );    
};

export default DoctorItem;
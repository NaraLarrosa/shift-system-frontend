import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useSelector } from "react-redux";
import { Typography, Paper, Card, CardContent } from '@mui/material';
import Pagination from '@mui/material/Pagination';

const ShiftByDoctor = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedDoctors, setLoadedDoctors] = useState([]);
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
        
                setLoadedDoctors(responseData.doctors);
        
            } catch (err) {}
        };
        fetchDoctors();
    }, [doctorId, sendRequest, token]);

    const handleChangePage = (event, newPage) => {
        // Aquí puedes agregar la lógica para cargar más turnos del doctor para la nueva página
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <div>
                {isLoading && (
                    <div className="center">
                    <LoadingSpinner />
                    </div>
                )}
                {!isLoading && loadedDoctors.length > 0 &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', width: '60%'}}>
                        <Typography variant="h5" gutterBottom>
                            <strong>SHIFTS BY DOCTOR:</strong>
                        </Typography>
                        {loadedDoctors.map((doctor, index) => (
                            <div key={index}>
                                <Card variant="outlined" style={{ marginBottom: '20px' }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            Name: {doctor.name}
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            Surname: {doctor.surname}
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            Specialty: {doctor.specialty.name}
                                        </Typography>
                                        <Typography variant="h6" gutterBottom>
                                            <strong>Shifts:</strong>
                                        </Typography>
                                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                        <Pagination count={10} onChange={handleChangePage} />
                    </Paper>
                </div>
                }
            </div>
        </React.Fragment>
    );    
};

export default ShiftByDoctor;
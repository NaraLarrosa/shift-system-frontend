import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink  } from 'react-router-dom';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Card from '../../shared/components/UIElements/Card';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Typography, List, ListItem, ListItemText, Paper, CardContent } from '@mui/material';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';

const DoctorItem = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedDoctors, setLoadedDoctors] = useState();
    const token = useSelector((state) => state.user.token);
    const doctorId = useParams().did;
    const [idShift, setIdShift] = useState('');

    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [formData, setFormData] = useState({
        day: '',
        hour: '',
        description: '',
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenEdit = (shiftId) => {
        setIdShift(shiftId);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {    
            const headers = {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            };
    
            const body = JSON.stringify({
                "day": formData.day,
                "hour": formData.hour,
                "description": formData.description,
                "available": true,
                "doctor": doctorId
            });
    
            const response = await fetch(
                `http://localhost:5000/api/shift/create`, {
                method: "POST",
                headers: headers,
                body: body
            });
    
            if (!response.ok) {
                throw new Error("Error.");
            }
    
            const responseData = await response.json();
            console.log("Shift created successfully:", responseData);
        } catch (err) {
            console.error("Error occurred while creating shift:", err);
        }
    
        handleClose();
    };

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


        const handleClick = async (shiftId) => {
            try {
                const headers = {
                    "Authorization": "Bearer " + token
                };
                const responseData = await sendRequest(
                    `http://localhost:5000/api/shift/reservation/${shiftId}`,
                    "PUT",
                    null, 
                    headers
                );
                console.log("Shift reserved successfully:", responseData);
            } catch (err) {
                console.error("Error occurred while reserving shift");
            }
        };

        const handleClickCancel = async (shiftId) => {
            try {
                const headers = {
                    "Authorization": "Bearer " + token
                };
        
                const responseData = await sendRequest(
                    `http://localhost:5000/api/shift/cancel/${shiftId}`,
                    "PUT",
                    { cancelled: true },
                    headers
                );
        
                console.log("Shift cancelled successfully:", responseData);
            } catch (err) {
                console.error("Error occurred while cancelling shift.");
            }
        };

        const handleDeleteShift = async(shiftId) => {
            try {
                const headers = {
                    "Authorization": "Bearer " + token
                };
        
                const responseData = await sendRequest(
                    `http://localhost:5000/api/shift/delete/${shiftId}`,
                    "DELETE",
                    null,
                    headers
                );
        
                console.log("Shift deleted successfully:", responseData);
            } catch (err) {
                console.error("Error occurred while deleting shift:", err);
            };
        };

        const handleEditShift = async (e) => {
            e.preventDefault();
            try {

                const updatedFormData = {
                    day: formData.day,
                    hour: formData.hour,
                    description: formData.description
                };

                const headers = {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                };
        
                const body = JSON.stringify({
                    "day": updatedFormData.day,
                    "hour": updatedFormData.hour,
                    "description": updatedFormData.description,
                    "available": true,
                    "doctor": doctorId
                });
        
                const response = await fetch(
                    `http://localhost:5000/api/shift/update/${idShift}`, {
                    method: "PATCH",
                    headers: headers,
                    body: body
                });
        
                if (!response.ok) {
                    throw new Error("Error updating shift.");
                }
        
                const responseData = await response.json();
                console.log("Shift successfully updated:", responseData);
                
            } catch (err) {
                console.error("Error updating shift:", err);
            }
            handleClose();
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
                {!isLoading && loadedDoctors &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', width: '60%'}}>
                        <Typography variant="h5" gutterBottom>
                            <Button
                                onClick={handleOpen}
                                variant="contained"
                                color="primary"
                                style={{ float: 'right' }}
                            >
                                ADD NEW SHIFT
                            </Button>
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
                                {loadedDoctors.shifts.map((sid, index) => (
                                    <Card key={index} style={{ margin: '10px', minWidth: '200px' }}>
                                        <IconButton
                                            onClick={() => handleDeleteShift(sid._id)}
                                            color="error"
                                            style={{ top: 5, right: 5 }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleOpenEdit(sid._id)}
                                            // onClick={() => handleEditShift(sid._id)}
                                            color="primary"
                                            style={{ top: 5, right: 25, marginLeft: '180px' }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {`Day: ${sid.day}`}
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            {`Hour: ${sid.hour}`}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            {`Description: ${sid.description}`}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            {`Available: ${sid.available}`}
                                        </Typography>
                                        <Button 
                                            onClick={() => handleClick(sid._id)}
                                            component={RouterLink}
                                            to="/shift/reservation"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Reserve
                                        </Button>
                                        <Button 
                                            onClick={() => handleClickCancel(sid._id)}
                                            component={RouterLink}
                                            to="/shift/cancel"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Cancel
                                        </Button>
                                    </CardContent>
                                    </Card>
                                ))}
                            </div>
                    </Paper>
                </div>
                }
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                    >
                    <form onSubmit={handleSubmit} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', minWidth: '300px' }}>
                    <Typography variant="h6" component="h2" id="modal-title">
                        Add new shift
                    </Typography>
                    <TextField
                        label="Day"
                        name="day"
                        value={formData.day}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Hour"
                        name="hour"
                        value={formData.hour}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        SEND
                    </Button>
                    </form>
                </Modal>
                <Modal
                    open={openEdit}
                    onClose={handleCloseEdit}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                    >
                    <form onSubmit={handleEditShift} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', minWidth: '300px' }}>
                    <Typography variant="h6" component="h2" id="modal-title">
                        Edit shift
                    </Typography>
                    <TextField
                        label="Day"
                        name="day"
                        value={formData.day}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Hour"
                        name="hour"
                        value={formData.hour}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        SEND
                    </Button>
                    </form>
                </Modal>
            </div>
        </React.Fragment>
    );    
};

export default DoctorItem;
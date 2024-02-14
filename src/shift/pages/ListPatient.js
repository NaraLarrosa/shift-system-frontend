import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link as RouterLink } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';

function ListPatient() {
    const [users, setUsers] = useState([]);
    const token = useSelector((state) => state.user.token);

    useEffect(() => {

        async function fetchUsers() {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/user/users`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });

                const data = await response.json();
                setUsers(data.users);
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        }
        fetchUsers();
    }, [token]);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>USER-PATIENT LIST</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Name</b></TableCell>
                            <TableCell><b>Surname</b></TableCell>
                            <TableCell><b>Email</b></TableCell>
                            <TableCell><b>Type</b></TableCell>
                            <TableCell><b>Shifts</b></TableCell>
                            <TableCell><b>Cancellations</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.surname}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.type}</TableCell>
                                <TableCell>
                                    {<div className="action-buttons">
                                        <IconButton
                                            aria-label="show shift"
                                            component={RouterLink}
                                            to={`/pat/${user.id}`}
                                        >
                                            <VisibilityIcon />
                                        </IconButton>
                                    </div>}
                                </TableCell>
                                <TableCell>
                                    {<div className="action-buttons">
                                        <IconButton
                                            aria-label="show cancellations"
                                            component={RouterLink}
                                            to={`/history/cancel/${user.id}`}
                                        >
                                            <VisibilityIcon />
                                        </IconButton>
                                    </div>}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default ListPatient;
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const ViewShift = () => {

    return (
        <div>
        <h1>WELCOME TO THE SHIFT MANAGER!</h1>
            <h3>Please log in with the corresponding user:</h3>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Card variant="outlined" style={{ width: '400px', marginRight: '20px', textAlign: 'center' }}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Shifts By Doctor
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to="/shift/doctor"
                        href="/shift/doctor"
                        size="large"
                        style={{ marginTop: '20px' }}
                    >
                        View Shifts By Doctor
                    </Button>
                </CardContent>
            </Card>
            <Card variant="outlined" style={{ width: '400px', textAlign: 'center' }}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Shifts By Patient
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    component={RouterLink}
                    to="/shift/patient"
                    href="/shift/patient"
                    size="large"
                    style={{ marginTop: '20px' }}
                >
                    View Shifts By Patient
                </Button>
            </CardContent>
            </Card>
        </div>
        </div>
    );
};

export default ViewShift;
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const UserItem = () => {

    return (
        <div>
        <h1>Welcome! Enter the appropriate option:</h1>
            <h3> </h3>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
            <Card variant="outlined" style={{ width: '400px', marginRight: '20px', textAlign: 'center' }}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        <strong>LOGIN</strong>
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to="/login"
                        size="large"
                        style={{ marginTop: '20px' }}
                    >
                      CLICK HERE!
                    </Button>
                </CardContent>
            </Card>
            <Card variant="outlined" style={{ width: '400px', textAlign: 'center' }}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    <strong>RECOVER PASSWORD</strong>
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    component={RouterLink}
                    to="/USERS"
                    size="large"
                    style={{ marginTop: '20px' }}
                >
                    CLICK HERE!
                </Button>
            </CardContent>
            </Card>
        </div>
        </div>
    );
};

export default UserItem;

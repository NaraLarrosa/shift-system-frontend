import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './Welcome.css';

// const UserItem = () => {

//     return (
//         <div>
//         <h1>WELCOME TO THE SHIFT SYSTEM!</h1>
//             <h3> </h3>
//             <h3>After logging in with your username you will find the options available to you.
//                  Select the action to perform:
//             </h3>
//             <h3> </h3>
//         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
//             <Card variant="outlined" style={{ width: '400px', marginRight: '20px', textAlign: 'center' }}>
//                 <CardContent>
//                     <Typography variant="h5" component="h2">
//                         <strong>LOGIN</strong>
//                     </Typography>
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         component={RouterLink}
//                         to="/"
//                         size="large"
//                         style={{ marginTop: '20px' }}
//                     >
//                       CLICK HERE!
//                     </Button>
//                 </CardContent>
//             </Card>
//             <Card variant="outlined" style={{ width: '400px', textAlign: 'center' }}>
//             <CardContent>
//                 <Typography variant="h5" component="h2">
//                     <strong>RECOVER PASSWORD</strong>
//                 </Typography>
//                 <Button
//                     variant="contained"
//                     color="primary"
//                     component={RouterLink}
//                     to="/USERS"
//                     size="large"
//                     style={{ marginTop: '20px' }}
//                 >
//                     CLICK HERE!
//                 </Button>
//             </CardContent>
//             </Card>
//         </div>
//         </div>
//     );
// };

// export default UserItem;



function Dashboard() {

  return (

    <div className="dashboard-container">
      <div className="logo-container">
        <img src="/shift-system.jpeg" alt="Shift System Logo" />
      </div>
      <div>
         <h1>WELCOME TO THE SHIFT SYSTEM!</h1>
            <h3> </h3>
            <h3>After logging in with your username you will find the options available to you.
                Select the action to perform:
            </h3>
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
                    to="/"
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
      
    {/* //   <div className="login-container">
    //     <h2>Iniciar Sesión</h2>
    //     <input
    //       type="email"
    //       placeholder="Correo Electrónico"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <input
    //       type="password"
    //       placeholder="Contraseña"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <button onClick={handleLogin}>Iniciar Sesión</button>
    //     <button onClick={handleForgotPassword}>Recuperar Contraseña</button>
    //   </div> */}
      </div> 
  );
};

export default Dashboard;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useForm } from '../../shared/hooks/form-hook';
// import { useHttpClient } from '../../shared/hooks/http-hook';
// import ErrorModal from '../../shared/components/UIElements/ErrorModal';
// import Input from '../../shared/components/FormElements/Input';
// import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
// import '../pages/DoctorForm.css';
// import '../pages/DoctorForm.css';

// const DoctorItem = () => {
//   const { isLoading, error, clearError, sendRequest } = useHttpClient();
//   const [loadedDoctor, setLoadedDoctor] = useState();
//   const doctorId = useParams().doctorId;

//   const [inputHandler, setFormData] = useForm(
//     {
//       name: {
//         value: '',
//         isValid: false
//       },
//       surname: {
//         value: '',
//         isValid: false
//       },
//       dni: {
//         value: '',
//         isValid: false
//       },
//       specialty: {
//         value: '',
//         isValid: false
//       }
//     },
//     false
//   );

//   useEffect(() => {
//     const fetchDoctor = async () => {
//       try {
//         const responseData = await sendRequest(
//           `http://localhost:5000/api/doctor/${doctorId}`
//         );
//         setLoadedDoctor(responseData.doctor);
//         setFormData(
//           {
//             name: {
//               value: responseData.doctor.name,
//               isValid: true
//             },
//             surname: {
//               value: responseData.doctor.surname,
//               isValid: true
//             },
//             dni: {
//               value: responseData.doctor.dni,
//               isValid: true
//             },
//             specialty: {
//               value: responseData.doctor.specialty,
//               isValid: true
//             }
//           },
//           true
//         );
//       } catch (err) {}
//     };
//     fetchDoctor();
//   }, [sendRequest, doctorId, setFormData]);


//   return (
//     <React.Fragment>
//       <ErrorModal error={error} onClear={clearError} />
//         {!isLoading && loadedDoctor && (
//           <form className="doctor-form">
//             <Input
//               id="name"
//               element="input"
//               type="text"
//               label="Name"
//               validators={[VALIDATOR_REQUIRE()]}
//               errorText="Please enter a valid name."
//               onInput={inputHandler}
//               initialValue={loadedDoctor.name}
//               initialValid={true}
//             />
//             <Input
//               id="surname"
//               element="textarea"
//               label="Surname"
//               validators={[VALIDATOR_REQUIRE()]}
//               errorText="Please enter a valid surname."
//               onInput={inputHandler}
//               initialValue={loadedDoctor.surname}
//               initialValid={true}
//             />
//             <Input
//               id="dni"
//               element="number"
//               label="DNI"
//               validators={[VALIDATOR_MINLENGTH(7)]}
//               errorText="Please enter a valid DNI (min. 7 characters)."
//               onInput={inputHandler}
//               initialValue={loadedDoctor.dni}
//               initialValid={true}
//             />
//             <Input
//               id="specialty"
//               element="textarea"
//               label="Specialty"
// //               validators={[VALIDATOR_REQUIRE()]}
// //               errorText="Please enter a valid specialty."
// //               onInput={inputHandler}
// //               initialValue={loadedDoctor.specialty}
// //               initialValid={true}
// //             />
// //           </form>
// //         )}
// //     </React.Fragment>
// //   )
// // };

// // export default DoctorItem;

// import React from 'react';
// import Card from '../../shared/components/UIElements/Card';
// import ErrorModal from '../../shared/components/UIElements/ErrorModal';
// import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
// import { useHttpClient } from '../../shared/hooks/http-hook';
// import './DoctorItem.css';

// const DoctorItem = props => {
//   const { isLoading, error, clearError } = useHttpClient();

//   return (
//     <React.Fragment>
//       <ErrorModal error={error} onClear={clearError} />
//       <li className="doctor-item">
//         <Card className="doctor-item__content">
//           {isLoading && <LoadingSpinner asOverlay />}
//           <div className="doctor-item__info">
//             <h2>{props.name}</h2>
//           </div>
//         </Card>
//       </li>
//     </React.Fragment>
//   );
// };

// export default DoctorItem;


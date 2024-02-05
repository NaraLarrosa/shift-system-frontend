import React, { useEffect , useState } from 'react';
import DoctorList from '../components/DoctorList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useSelector, useDispatch } from "react-redux";
import { updateDoctors } from "../doctorSlice";

const Doctors = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedDoctors, setLoadedDoctors] = useState();
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const headers = {
          "Authorization": "Bearer " + token
        }
        const responseData = await sendRequest(
          'http://localhost:5000/api/doctor', "GET", null, headers
        );

        setLoadedDoctors(responseData);
        dispatch(updateDoctors(responseData));

      } catch (err) {}
    };
    fetchDoctors();
  }, [dispatch, sendRequest, token]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedDoctors && <DoctorList items={loadedDoctors} />}
    </React.Fragment>
  );
};

export default Doctors;
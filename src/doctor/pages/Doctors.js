import React, { useEffect , useState } from 'react';
import DoctorsList from '../components/DoctorsList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Doctors = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedDoctors, setLoadedDoctors] = useState();


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const headers = {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTgyMmQ5OWQ0YTNhYzkzNTg5Yjk4YWQiLCJ0eXBlIjoiYWRtaW4iLCJpYXQiOjE3MDMxNjc4MDl9.Q92FQGpCZM2qZW0HNiwBWbhhrTx8j6qV2k8Q20Kb-p0"
        }
        const responseData = await sendRequest(
          'http://localhost:5000/api/doctor', "GET", null, headers
        );

        setLoadedDoctors(responseData);

      } catch (err) {}
    };
    fetchDoctors();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedDoctors && <DoctorsList items={loadedDoctors} />}
    </React.Fragment>
  );
};

export default Doctors;
import React, { useEffect , useState } from 'react';
import SpecialtiesList from '../components/SpecialtiesList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Specialties = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedSpecialties, setLoadedSpecialties] = useState();


  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const headers = {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTgyMmQ5OWQ0YTNhYzkzNTg5Yjk4YWQiLCJ0eXBlIjoiYWRtaW4iLCJpYXQiOjE3MDMxNjc4MDl9.Q92FQGpCZM2qZW0HNiwBWbhhrTx8j6qV2k8Q20Kb-p0"
        }
        const responseData = await sendRequest(
          'http://localhost:5000/api/specialty', "GET", null, headers
        );

        setLoadedSpecialties(responseData);

      } catch (err) {}
    };
    fetchSpecialties();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedSpecialties && <SpecialtiesList items={loadedSpecialties} />}
    </React.Fragment>
  );
};

export default Specialties;

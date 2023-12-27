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
          "Authorization": "Bearer "
        }
        const responseData = await sendRequest(
          'http://localhost:5000/api/specialty', "GET", null, headers
        );

        setLoadedSpecialties(responseData.specialties);

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

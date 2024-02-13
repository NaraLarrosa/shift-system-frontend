import React, { useEffect , useState } from 'react';
import DoctorList from '../components/DoctorList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useSelector, useDispatch } from "react-redux";
import { updateShifts } from "../shiftSlice";

const pId = useParams().pid;

const CanceledShiftsByPatient = ({ pid }) => { 
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedShifts, setLoadedShifts] = useState();
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchShiftCanceled = async () => {
      try {
        const headers = {
          "Authorization": "Bearer " + token
        }
        const responseData = await sendRequest(
          `http://localhost:5000/api/shift/history/cancel/${pId}`,
          "GET",
          null,
          headers
        );

        setLoadedShifts(responseData);
        dispatch(updateShifts(responseData));

      } catch (err) {}
    };
    fetchShiftCanceled();
  }, [dispatch, sendRequest, token, pid]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
    </React.Fragment>
  );
};

export default CanceledShiftsByPatient;
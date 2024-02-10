import React, { useEffect , useState } from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useSelector, useDispatch } from "react-redux";
import { updateShift } from "../shiftSlice";

const Shifts = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedShifts, setLoadedShifts] = useState();
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const headers = {
          "Authorization": "Bearer " + token
        }
        const responseData = await sendRequest(
          'http://localhost:5000/api/shift/pat', "GET", null, headers
        );

        setLoadedShifts(responseData);
        dispatch(updateShift(responseData));

      } catch (err) {}
    };
    fetchShifts();
  }, [dispatch, sendRequest, token]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {/* {!isLoading && loadedShifts && <ShiftList items={loadedShifts} />} */}
    </React.Fragment>
  );
};

export default Shifts;
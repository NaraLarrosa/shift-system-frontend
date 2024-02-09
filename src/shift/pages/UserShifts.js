import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShiftList from '../components/ShiftList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useSelector } from "react-redux";


const UserShift = () => {
  const [loadedShifts, setLoadedShifts] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userShift = useSelector((state) => state.user.shift.shifts);

  const userId = useParams().userId;

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/shift/reservation/${userId}`
        );
        setLoadedShifts(responseData.userShift);
      } catch (err) {}
    };
    fetchShifts();
  }, [sendRequest, userId]);

  const shiftDeletedHandler = deletedShiftId => {
    setLoadedShifts(prevShifts =>
      prevShifts.filter(shift => userShift.id !== deletedShiftId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedShifts && (
        <ShiftList items={loadedShifts} onDeleteShift={shiftDeletedHandler} method='GET' />
      )}
    </React.Fragment>
  );
};

export default UserShift;

import React, { useEffect , useState } from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useSelector, useDispatch } from "react-redux";
import { updateShift } from "../shiftSlice";

const CanceledShiftsByPatient = ({ pid }) => {

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedShifts, setLoadedShifts] = useState([]);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchShiftCanceled = async () => {

        try {
            const headers = {
            "Authorization": "Bearer " + token
        }
        const responseData = await sendRequest(
          `http://localhost:5000/api/shift/history/cancel/${pid}`,
          "GET",
          null,
          headers
        );

        const canceledShiftsByPatient = responseData.filter(shift => shift.canceled);

        setLoadedShifts(canceledShiftsByPatient);
        dispatch(updateShift(canceledShiftsByPatient));

      } catch (err) {}
    };

    fetchShiftCanceled();
    }, [dispatch, sendRequest, token, pid]);

    return (
        <React.Fragment>
            <Typography variant="h4" component="h2" gutterBottom>
                Cancellation history by patient:
            </Typography>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
                )}
            {!isLoading && loadedShifts && (
                <List>
                {loadedShifts.map(shift => (
                    <ListItem key={shift.id}>
                        <ListItemText primary={shift.title} />
                    </ListItem>
                ))}
                </List>
            )}
        </React.Fragment>
    );
};

export default CanceledShiftsByPatient;
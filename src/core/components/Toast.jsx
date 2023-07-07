import { IconButton, Snackbar } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleNotification } from '../state';
import CloseIcon from '@mui/icons-material/Close';

const Toast = () => {
  const { notification } = useSelector((state) => state.global);
  const {show, message} = notification;
  const dispatch = useDispatch();

  const closeNotification = () => {
    dispatch(handleNotification({ show: false, message: "" }));

  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeNotification}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={show}
      autoHideDuration={6000}
      onClose={closeNotification}
      message={message}
      action={action}
    />
  );
};

export default Toast;

import React, { useState, useEffect } from 'react';
import { Box, Fab, CircularProgress } from '@mui/material';
import { Check } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { Save } from '@mui/icons-material';
import Update from 'src/api/profile/update_publisher';

const UserAction = ({ params, rowId, setRowId }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const { id, ...data } = params.row;
    const sendData = {
      ...data,
      _id: id,
    };
    await Update(sendData);
    console.log(data);
    console.log(id);
    setLoading(false);
    setSuccess(true);
    setRowId(null);
  };

  useEffect(() => {
    if (rowId === params.id && success) {
      setSuccess(false);
    }
  }, [rowId, success]);
  return (
    <Box
      sx={{
        m: 1,
        position: 'relative',
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            '&:hover': { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: '40px',
            height: '40px',
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default UserAction;

import PageContainer from 'src/components/container/PageContainer';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState, useMemo } from 'react';
import getAll from 'src/api/publisher/getAll';
import Avatar from '@mui/material/Avatar';
import UserAction from './UserAction';

const Publisher = () => {
  const [pageSize, setPageSize] = useState(5);
  const [rows, setRows] = useState([]);
  const [rowId, setRowId] = useState(null);

  const columns = useMemo(
    () => [
      {
        field: 'logo',
        headerName: 'Avator',
        width: 100,
        renderCell: (params) => <Avatar src={params.row.logo} sx={{ width: 40, height: 40 }} />,
        sortable: false,
        filterable: false,
      },
      { field: 'name', headerName: 'Name', width: 150, editable: true },
      { field: 'email', headerName: 'Email', width: 250, editable: true },
      { field: 'username', headerName: 'Username', width: 120 , editable: true},
      { field: 'bio_data', headerName: 'Bio Data', width: 250 , editable: true},
      { field: 'phonenumber', headerName: 'Phone Number', width: 130 , editable: true},
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        renderCell: params => <UserAction {...{params,rowId,setRowId}} />,
      },
    ],
    [rowId],
  );

  const fetchData = async () => {
    try {
      const data = await getAll();
      for (let i = 0; i < data.publishers.length; i++) {
        let item = {
          logo: data.publishers[i].logo,
          name: data.publishers[i].name,
          email: data.publishers[i].email,
          username: data.publishers[i].username,
          bio_data: data.publishers[i].bio_data,
          phonenumber: data.publishers[i].phonenumber,
          id: data.publishers[i]._id,
        };
        setRows((rows) => [...rows, item]);
      }
      console.log(data);
    } catch (err) {
      window.location.href = '/auth/login';
    }
  };

  useEffect(() => {
    fetchData();
    console.log(rowId);
  }, []);
  return (
    <PageContainer title="Publisher Page" description="this is Publisher Page">
      <Box
        sx={{
          height: 400,
          width: '100%',
        }}
      >
        <Typography variant="h3" component="h3" sx={{ textAlign: 'center', mt: 3, mb: 3 }}>
          Manage Publihsers
        </Typography>
        <DataGrid
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          rowsPerPageOptions={[5, 10, 20]}
          pageSize={pageSize}
          pagination
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          checkboxSelection
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          sx={{
            '& .MuiDataGrid-cell--textLeft': {
              textAlign: 'left',
            },
            '& .MuiDataGrid-columnsContainer': {
              backgroundColor: (theme) => (theme.palette.mode === 'light' ? '#fafafa' : '#1c2125'),
            },
            '& .MuiDataGrid-iconSeparator': {
              display: 'none',
            },
            '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
              borderRight: `2px solid rgba(224, 224, 224, 1)`,
            },
            '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
              borderBottom: `5px solid rgba(224, 224, 224, 1)`,
            },
          }}
          onCellEditStop={(params) => {
            // This callback is called when a cell is edited and committed.
            // You can access the row ID using params.id.
            const editedRowId = params.id;
            setRowId(editedRowId); // Update the rowId state with the edited row ID
          }}
        />
      </Box>
    </PageContainer>
  );
};

export default Publisher;

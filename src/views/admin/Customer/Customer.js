import PageContainer from 'src/components/container/PageContainer';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState, useMemo } from 'react';
import getAll from 'src/api/customers/getAll';
import moment from 'moment';

const Customer = () => {
  const [pageSize, setPageSize] = useState(5);
  const [rows, setRows] = useState([]);
  const columns = useMemo(
    () => [
      { field: 'name', headerName: 'Name', width: 150 },
      { field: 'email', headerName: 'Email', width: 200 },
      { field: 'username', headerName: 'Username', width: 120 },
      { field: 'createdAt', headerName: 'Created At', width: 100, renderCell: (params) => {return moment(params.value).format('DD/MM/YYYY')} },
      { field: 'bio_data', headerName: 'Bio Data', width: 300 },
      { field: 'phonenumber', headerName: 'Phone Number', width: 130 },
    ],
    [],
  );

  const fetchData = async () => {
    try {
      const data = await getAll();
      for (let i = 0; i < data.users.length; i++) {
        let item = {
            name: data.users[i].name,
            email: data.users[i].email,
            username: data.users[i].username,
            createdAt: data.users[i].createdAt,
            bio_data: data.users[i].bio_data,
            phonenumber: data.users[i].phonenumber,
            id: i,
        };
        setRows((rows) => [...rows, item]);
        // console.log(data.data[i]);
      }
      console.log(data);
    } catch (err) {
      window.location.href = '/auth/login';
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PageContainer title="Customer Page" description="this is Customer Page">
      <Box
        sx={{
          height: 400,
          width: '100%',
        }}
      >
        <Typography variant="h3" component="h3" sx={{ textAlign: 'center', mt: 3, mb: 3 }}>
          Manage Customers
        </Typography>
        <DataGrid
          columns={columns}
          rows={rows}
          getRowId={(rows) => rows.id}
          rowsPerPageOptions={[5, 10, 20]}
          pageSize={pageSize}
          pagination
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          checkboxSelection       
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
        />
      </Box>
    </PageContainer>
  );
};

export default Customer;

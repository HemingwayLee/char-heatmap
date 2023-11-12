import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { mainListItems } from './listItems';
import Main from './main';

function Order() {
  return <h2>Order</h2>;
}

function Customer() {
  return <h2>Customer</h2>;
}

function NotFound() {
  return <h2>NotFound</h2>;
}

const drawerWidth = 240;
const Drawer = styled(MuiDrawer, {})(
  ({}) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      boxSizing: 'border-box'
    },
  }),
);

export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer variant="permanent">
        <List component="nav">
          { mainListItems }
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: '#AAAAAA',
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid item xs={12}>
            <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<Main/>}/>
                <Route exact path="/main" element={<Main/>}/>
                <Route exact path="/order" element={<Order/>}/>
                <Route exact path="/customer" element={<Customer/>}/>
                <Route path="*" element={<NotFound/>}/>
              </Routes>
            </BrowserRouter>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

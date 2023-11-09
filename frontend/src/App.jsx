import Button from '@mui/material/Button';
import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';

export default function Dashboard() {
  const [freqData, setFreqData] = React.useState([]);
  const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  React.useEffect(() => {
    
  }, []);

  const doInsert = () => {
    fetch('/api/insert/', {
      method: 'GET',
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      alert(myJson["result"]);
    });
  }

  const getFreqWords = (page) => {
    console.log(page);

    fetch(`api/freq/word/${page-1}/`, {
      method: 'GET',
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson["result"])
      setFreqData(myJson["result"])
    });
  }
  
  return (
      <Box sx={{ display: 'flex' }}>
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
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Button variant="contained" component="label" onClick={doInsert}>Init database from dictionary</Button>
                <div style={{textAlign: "center"}}>
                {
                  buttons.map(btn => {
                    return (<Button onClick={()=>{getFreqWords(btn)}}>{btn}</Button>)
                  })
                }
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, overflowX: "auto", overflowY: "hidden" }}>
                <BarChart width={2200} height={300} data={freqData}>
                  <Bar dataKey="freq" fill="green" />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="char" />
                  <YAxis />
                </BarChart>
              </Paper>
            </Grid>
          </Container>
        </Box>
      </Box>
  );
}

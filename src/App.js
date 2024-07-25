import { Box, Button, InputAdornment, TextField, Typography, useTheme } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import './App.css';
import { useState } from 'react';
import axios from 'axios';



function App() {
  const theme = useTheme();
  const [image, setImage] = useState();
  const [url, setUrl] = useState();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUrl(value);
  }

  const handleURLSubmit = () => {
    const url = document.getElementById('url').value;
    console.log(url);
    let call = axios.get(`https://asia-south1-my-storage-backup-429707.cloudfunctions.net/qr-code-generator?url=${url}`);
    call.then(response => {
      console.log(response.data);
      setImage(response.data);
    });
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: {xs: 'column', md: 'row'}, alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: 'rgb(15, 23, 31)', '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.primary.main } }}>
      <Box sx={{marginRight: {xs: '0', md: '4rem'}, p: {xs: '3rem', md: '0'}}}>
        <Typography variant="h4" sx={{ color: 'white', textAlign: 'center', marginBottom: 2 }}>Cloud QR Code Generator</Typography>
        <TextField variant="outlined" id='url' value={url} onChange={handleInputChange} placeholder="Enter a URL..." sx={{ width: '100%' }} InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LinkIcon sx={{ color: 'white' }} />
            </InputAdornment>
          ),
          inputProps: { // Correct property name is inputProps with lowercase 'p'
            style: { color: 'white', outlineColor: 'white' } // Correct way to apply styles to the input element
          }
        }} />
        <Button variant="contained" onClick={handleURLSubmit} sx={{ marginTop: 2 }}>Generate QR Code</Button>
      </Box>
      <Box sx={{marginLeft: {xs: '0', md: '4rem'}}}>
        <Box sx={{ border: '2px solid grey', borderRadius: '15px', padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ color: 'white', textAlign: 'center', marginBottom: 2 }}>Scan to visit the URL</Typography>
          {image && <img height="300px" src={`${image}`} alt="QR Code" />}
          {!image && <Box sx={{ height: '300px', color: 'grey', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}><QrCodeScannerIcon sx={{ fontSize: '10rem', mb: 3 }} /><Typography>Generate QR to view</Typography></Box>}
          {/* <Button variant="contained" sx={{ marginTop: 2 }} {`${image && 'disabled'}`}>Download QR Code</Button> */}
          <Button variant="contained" sx={{ marginTop: 2 }} disabled={!image}>Download QR Code</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
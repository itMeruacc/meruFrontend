// import React, {useState} from 'react'

// import { Box, TextField } from '@mui/material';
// import { LoadingButton } from '@mui/lab';

// const AddMembers = ({teamId}) => {
//     // const setClients = useStore((state) => state.setClients);
//     const [value, setvalue] = useState('');
//     const [helperText, sethelperText] = useState('');
//     const [error, seterror] = useState(false);
//     const [loading, setloading] = useState(false);
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//     };
//   return (
//       <Box
//         sx={{ m: 1 }}
//         onBlur={() => {
//           seterror(false);
//         }}
//       >
//         <TextField
//           error={error}
//           value={value}
//           onChange={(e) => setvalue(e.target.value)}
//           helperText={helperText}
//           required
//           fullWidth
//           label="Add new client"
//         />
//         <LoadingButton
//           fullWidth
//           type="submit"
//           loading={loading}
//           // loadingPosition="end"
//           variant="contained"
//           sx={{ mt: 1 }}
//           onClick={handleSubmit}
//         >
//           Add Members
//         </LoadingButton>
//       </Box>
//   )
// }

// export default AddMembers
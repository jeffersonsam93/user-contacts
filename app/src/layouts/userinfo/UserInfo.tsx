import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import buffer from 'buffer/';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid, TextField,styled } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Fab from '@mui/material/Fab';
import Person from '@mui/icons-material/Person';
import {apiQuery} from '../../apicall';

const Input = styled('input')({
    display: 'none',
  });

function UserInfo(props: any) {
	const { userInfo, base64,componentActions,initialized,selValue,dispValue } = props;
    const arrayBufferToBase64= (inputbuffer:any) => {
        console.log(buffer.Buffer.from(inputbuffer).toString('base64'))
        return buffer.Buffer.from(inputbuffer).toString('base64');
    }
    const navigate=useNavigate();
    useEffect(()=>{
        if(!initialized){
            apiQuery('Users/all',{},'GET',{}).then((res)=>{
                componentActions.updateComponent({userInfo:res.data,initialized:true})
            })
        }
    })
	return (
       <div style={{top:'50%',left:'50%',position:'fixed',transform:'translate(-50%, -50%)'}}>
           <Card sx={{ minWidth: 350 }} style={{background:'#fafafa'}}>
           <Grid 
                direction="column"
                alignItems="center"
                spacing={0}
                container
            >
            <CardContent style={{textAlign:'center',minHeight:'150px'}}>
                <div> 
                    <Typography variant="h6" style={{fontWeight:'bold'}} color="text.secondary" gutterBottom>
                        FIND USER DETAILS
                    </Typography>
                </div>
                <div>
                <Box display="flex" justifyContent="center">
                <Autocomplete
                    disablePortal
                    getOptionLabel={(option:any) => option && option.phoneNumber?option.phoneNumber:''}
                    id="combo-box-demo"
                    options={userInfo}
                    value={selValue}
                    onChange={(event: any, newValue: any | null) => {
                        console.log(newValue);
                        componentActions.updateComponent({
                            selValue:newValue
                        })
                        if(newValue && newValue.userId){
                            apiQuery(`Users/${newValue.userId}`,{},'GET',{}).then((res)=>{
                                componentActions.updateComponent({
                                    dispValue:{...res.data,base64:arrayBufferToBase64(res.data.userImage.image)}
                                })
                            })
                        }
                        
                    }}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Enter Mobile Number" variant="standard" />}
                    renderOption={(props, option, { inputValue }) => {
                        const matches = match(option.phoneNumber, inputValue);
                        const parts = parse(option.phoneNumber, matches);
                
                        return (
                          <li {...props}>
                            <div>
                              {parts.map((part:any, index:any) => (
                                <span
                                  key={index}
                                  style={{
                                    fontWeight: part.highlight ? 700 : 400,
                                  }}
                                >
                                  {part.text}
                                </span>
                              ))}
                            </div>
                          </li>
                        );
                      }}
                />
                </Box>
                </div>
                <br/>
                <div>
                    {dispValue.userId?<table style={{textAlign:'left'}}>
                        <tbody>
                        <tr>
                            <td>
                                <Typography variant="subtitle1" style={{fontWeight:'bold'}} color="text.secondary" gutterBottom>
                                    NAME:
                                </Typography>
                            </td>
                            <td>
                                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                    {dispValue.userName}
                                </Typography>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Typography variant="subtitle1" style={{fontWeight:'bold'}} color="text.secondary" gutterBottom>
                                    MOBILE NUMBER:
                                </Typography>
                            </td>
                            <td>
                                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                {dispValue.phoneNumber}
                                </Typography>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Typography variant="subtitle1" style={{fontWeight:'bold'}} color="text.secondary" gutterBottom>
                                    DATE OF REGISTRATION:
                                </Typography>
                            </td>
                            <td>
                                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                {new Date(dispValue.create_on).toDateString()}
                                </Typography>
                            </td>
                        </tr>
                        </tbody>
                    </table>:''}
                </div>                
            </CardContent>
            
            {dispValue && dispValue.userImage && dispValue.userImage.image?<CardContent style={{textAlign:'center'}}>
             <div>   
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Photo
            </Typography>
            </div>
            <div>
                <img src={`data:image;base64,${dispValue.base64}`} style={{minHeight:'100px',maxHeight:'150px'}}></img>
            </div>
            </CardContent>:''}
            <CardActions style={{justifyContent:'center'}}>
            <div>
                <Fab size="small" variant="extended" color="secondary" component="span" style={{minWidth:'300px'}} onClick={()=>{
                   componentActions.updateComponent({
                    name:'', 
                    mobilenumber:'' ,
                    base64:'',
                   });
                   navigate('/user')
                }}>
                    <Person sx={{ mr: 1 }} />
                    Add User
                </Fab>
            </div>
            </CardActions>
            </Grid>
            </Card>
       </div>
	);
}

export default UserInfo;

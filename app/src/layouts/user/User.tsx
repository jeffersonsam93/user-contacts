import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, TextField,styled } from '@mui/material';
import Fab from '@mui/material/Fab';
import FileUpload from '@mui/icons-material/FileUpload';
import Save from '@mui/icons-material/Save';
import PersonSearch from '@mui/icons-material/PersonSearch';
import StyledTextField from '../../components/StyledTextField';
import {apiQuery} from '../../apicall';

const Input = styled('input')({
    display: 'none',
  });

function User(props: any) {
	const { name, mobilenumber,base64,componentActions } = props;
    let navigate = useNavigate();
    const getBase64=(file:any, cb:any) =>{
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
	return (
       <div style={{top:'50%',left:'50%',position:'fixed',transform:'translate(-50%, -50%)'}}>
           <Card sx={{ minWidth: 350 }} style={{background:'#fafafa'}}>
           <Grid 
                direction="column"
                alignItems="center"
                spacing={0}
                
            >
            <CardContent style={{textAlign:'center'}}>
                <div> 
                    <Typography variant="h6" style={{fontWeight:'bold'}} color="text.secondary" gutterBottom>
                        ADD USER DETAILS
                    </Typography>
                </div>
                <Box display="flex" justifyContent="center">
                    <StyledTextField 
                        inputProps={{min: 0, style: { textAlign: 'center' }}} 
                        fullWidth label="Enter Name" 
                        variant="standard"
                        value={name} 
                        onChange={(evt:any)=>{
                            componentActions.updateComponent({name:evt.target.value})
                        }} 
                    />
                    </Box>
                    <br/>
                <Box display="flex" justifyContent="center">
                    <StyledTextField 
                        inputProps={{min: 0, style: { textAlign: 'center' }}} 
                        fullWidth label="Enter Mobile Number" 
                        variant="standard" 
                        value={mobilenumber}
                        onChange={(evt:any)=>{
                            componentActions.updateComponent({mobilenumber:evt.target.value})
                        }} 
                    />
                </Box>
                
            </CardContent>
            <CardActions style={{justifyContent:'center'}}>
            <div>
            <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" type="file" onChange={(evt:any)=>{
                    console.log(evt.target.files)
                    if (evt.target.files[0].size > 2000000) {
                        componentActions.updateComponent({
                            snackbar:{
                                open:true,
                                severity:'error',
                                message:['File size cannot exceed 2MB'],
                            }
                        })
                        return false;
                      }
                    getBase64(evt.target.files[0],(base64:any)=>{
                        componentActions.updateComponent({base64:base64})
                    })
                }}
                />
                <Fab size="small" variant="extended" color="primary" component="span" style={{minWidth:'300px'}}>
                    <FileUpload sx={{ mr: 1 }} />
                    Upload Picture
                </Fab>
            </label>
            </div>
            </CardActions>
            {base64?<CardActions style={{justifyContent:'center'}}>
            <div>
                <img src={base64} style={{minHeight:'80px',maxHeight:'80px'}}></img>
            </div>
            </CardActions>:''}
            <CardActions style={{justifyContent:'center'}}>
            <div>
                <Fab size="small" variant="extended" color="secondary" component="span" style={{minWidth:'300px'}} onClick={()=>{
                    apiQuery('Users',{},'POST',{
                        userName:name,
                        phoneNumber:mobilenumber,
                        image: base64.split(',')[1],
                        update_by:'SYSTEM',
                    }).then((res)=>{
                        componentActions.updateComponent({
                            name:'',
                            mobilenumber:'',
                            base64:'',
                            update_by:'',
                            snackbar:{
                                open:true,
                                message:['User Added Successfully'],
                                severity:'success',
                            }
                        })
                    }).catch((err)=>{
                        console.log(err);
                        componentActions.updateComponent({
                            snackbar:{
                                open:true,
                                message: err && err.response && err.response.data && err.response.data.message? err.response.data.message:['Error while adding user'],
                                severity:'error',
                            }
                        })
                    })
                }}>
                    <Save sx={{ mr: 1 }} />
                    Submit
                </Fab>
            </div>
            </CardActions>
            <CardActions style={{justifyContent:'center'}}>
            <div>
                <Fab size="small" variant="extended" color="secondary" component="span" style={{minWidth:'300px'}} onClick={()=>{
                    componentActions.updateComponent({
                        initialized:false,
                        selValue:{},
                        dispValue:{}
                    });
                   navigate('/userinfo')
                }}>
                    <PersonSearch sx={{ mr: 1 }} />
                    Search User
                </Fab>
            </div>
            </CardActions>
            </Grid>
            </Card>
       </div>
	);
}

export default User;

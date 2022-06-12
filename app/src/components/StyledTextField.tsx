import React from "react";
import { styled } from "@mui/material/styles";
import TextField, {TextFieldProps} from "@mui/material/TextField";       
        
const StyledTextField = styled(TextField)<TextFieldProps>({
          root: {
            "& label": {
              width: "100%",
              textAlign: "center",
              transformOrigin: "center",
                "&.Mui-focused": {
                  transformOrigin: "center"
                }
             }
          }});
        
export default function StyledCustomization(props:any) {
    return <StyledTextField {...props}/>;
}
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert ,{AlertProps} from '@mui/material/Alert';
import Slide, { SlideProps } from '@mui/material/Slide';
import { Stack } from '@mui/material';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref,
  ) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  
export default function SnackBarAlert(props: any) {
	const { snackbar, componentActions } = props;
	return (
		<Stack sx={{ position: "absolute", bottom: 24, right: 24 }} spacing={2}>
			<Snackbar
			open={snackbar && snackbar.open}
			anchorOrigin={{vertical:'top', horizontal:'right' }}
			autoHideDuration={snackbar && snackbar.duration ? snackbar.duration : 60000}
            TransitionComponent={Slide}
			onClose={() => {
				componentActions.updateComponent({ snackbar: null });
			}}
		>
			<Alert
				onClose={() => {
					componentActions.updateComponent({ snackbar: null });
				}}
				severity={snackbar && snackbar.severity ? snackbar.severity : 'success'}
			>
				{snackbar && snackbar.message && snackbar.message.length>0 ? snackbar.message[0] : ''}
			</Alert>
		</Snackbar>
		</Stack>
	);
}

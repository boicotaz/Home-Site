import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

export default function DeleteUserAction() {
  const [open, setOpen] = React.useState(false);
  const [userName,setUserName] = React.useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    //console.log(userName);
    
    axios.delete('https://192.168.1.1:8082/home/delete-user-from-group', {
        data: {
            "fullName": userName
              }
      });
    console.log('axios passed')
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" className="btn btn-danger bttn bttn-pill mt-3" onClick={handleClickOpen}>
        Delete User
      </Button>
      <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete someone from group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To delete a group member, please enter his fullname here.
          </DialogContentText>
          <TextField
            value={userName}
            onChange={e => setUserName(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Fullname"
            type="fullname"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
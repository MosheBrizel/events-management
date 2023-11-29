import { useState, useEffect } from "react";
import { Modal, Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';

const WheelWaiting = (props) => {
  return (
    <div>
      <Modal open={props.open}>
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <CircularProgress 
            color="yelow"
            /> 
        </div>
        </div>
      </Modal>
    </div>
  );
}

export default WheelWaiting;
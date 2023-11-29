import { useState, useEffect } from "react";
import { Modal, Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';

const WheelWaitingLogo = (props) => {
  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:"150px"}}>
      <img src="logo/logo.png" alt=""
          style={{width: '422.89px',
                  top: '171.09px',
                  left: '305px'
                }}/>
      </div>
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

export default WheelWaitingLogo;
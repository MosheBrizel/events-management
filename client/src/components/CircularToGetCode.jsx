import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import WheelWaiting from "./Features/wheelWaiting.jsx";

// import the atom
import { emailUserForgetPassword } from "../atoms/atomsFile.jsx";
import { useAtom } from "jotai";
import urlPage from "../../url/urlPath.js";

export default function CircularTogetCode(props) {
  const [waiting, setWaiting] = React.useState(false);
  const [timer, setTimer] = React.useState(120);
  const [progress, setProgress] = React.useState(100);
  const [emailAtom, setEmailAtom] = useAtom(emailUserForgetPassword);

  async function hndelSendEmail() {
    setWaiting(true)
    try {
      const sendEmailUser = await axios.post(urlPage + "users/email", {
        email: emailAtom,
        type: props.typeCode,
      });
      setTimer(120);
      setProgress(100)
      setWaiting(false)
    } catch (error) {
      setWaiting(false)
      console.error(error);
    }
  }

  React.useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
        if (progress > 0) {
          setProgress(progress - 100 / 120);
        }
      } else {
        clearInterval(timerInterval);
        setTimer("time over");
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer, progress]);

  return (
    <>
    <WheelWaiting open={waiting}/>
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      {timer == "time over" ? (
        <>
          <Button color="blue" onClick={hndelSendEmail} variant="outlined">
            Sand Again
          </Button>
        </>
      ) : (
        <>
          <CircularProgress
            variant="determinate"
            value={progress}
            color="blue"
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="caption" component="div">
              {timer}
            </Typography>
          </Box>
        </>
      )}
    </Box>
    </>
  );
}

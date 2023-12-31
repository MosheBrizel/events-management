import { Box, Button, CardMedia, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEvent } from "./atom";
import {
  useDataRegistered,
  useToken,
  useUserInfo,
} from "../../atoms/atomsFile";
import PopupLogIn from "../PopupLogIn";

import instance from "../../../exios/axiosInstance";
import urlPage from "../../../url/urlPath";

export default function InformationEvent(props) {
  const [corentEvent, setCorentEvent] = useEvent();
  const [token, setToken] = useToken();
  const [logInComp, setLogInComp] = useState(false);
  const [user, setUser] = useUserInfo();
  const [DataRegist, setDataRegist] = useDataRegistered();


  async function handleRegister() {
    if (!token) {
      setLogInComp(true);
    } else {
      if (corentEvent.places - corentEvent.placesTaking <= 0){
        return
      }
      try {
        const result = await instance.post(
          urlPage + "event/RegistrationEvent",
          {
            corentEvent: corentEvent.numberEvent,
            email: user.email,
          }
        );
        console.log(result);
        setDataRegist(result.data.data.map((item) => item.eventId));
        props.funcClos();
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <>
      {logInComp && (
        <PopupLogIn  logInComp={() => setLogInComp(false)} open={logInComp} />
      )}
      <Box sx={{ margin: "5%" }}>
        <CardMedia
          component="img"
          height="400"
          image={corentEvent.image}
          
          alt="green iguana"
        />
        <Box display={"flex"} flexDirection={"column"}>
          <Typography gutterBottom variant="h2" component="div">
            {corentEvent.label}
          </Typography>
          <Typography
            sx={{ width: "60%" }}
            gutterBottom
            variant="p"
            component="div"
          >
            {corentEvent.description}
          </Typography>
          <Box
            display={"flex"}
            alignItems="center"
            justifyContent={"center"}
            marginTop={"60px"}
            flexWrap={"wrap"}
            gap={"50px"}
          >
            <Box width={"25%"}>
              <Typography gutterBottom variant="h5" component="div">
                Date
              </Typography>
              <Typography gutterBottom variant="p" component="div">
                {`Day : ${new Date(corentEvent.date).toDateString()} `}
              </Typography>
              <Typography gutterBottom variant="p" component="div">
                {` Time : ${new Date(corentEvent.date).toLocaleTimeString()}`}
              </Typography>
            </Box>
            <Box width={"25%"}>
              <Typography gutterBottom variant="h5" component="div">
                Age restriction
              </Typography>
              <Typography gutterBottom variant="p" component="div">
                {`${
                  corentEvent.ageRestriction
                    ? corentEvent.ageRestriction
                    : "There is no age limit"
                } `}
              </Typography>
            </Box>
            <Box width={"25%"}>
              <Typography gutterBottom variant="h5" component="div">
                Places left
              </Typography>
              <Typography gutterBottom variant="p" component="div">
                {`${corentEvent.places - corentEvent.placesTaking} places `}
              </Typography>
            </Box>
            <Box width={"25%"}>
              <Typography gutterBottom variant="h5" component="div">
                Dress code
              </Typography>
              <Typography gutterBottom variant="p" component="div">
                {`${
                  corentEvent.dressCode
                    ? corentEvent.dressCode
                    : "There is no dress code"
                } `}
              </Typography>
            </Box>
            <Box width={"25%"}>
              <Typography gutterBottom variant="h5" component="div">
                Location
              </Typography>
              <Typography gutterBottom variant="p" component="div">
                {`${corentEvent.location}`}
              </Typography>
              {corentEvent.noteLocation ? (
                <>
                  <Typography
                    marginTop={2}
                    gutterBottom
                    variant="p"
                    component="div"
                  >
                    Notes :
                  </Typography>
                  <Typography gutterBottom variant="p" component="div">
                    {corentEvent.noteLocation}
                  </Typography>
                </>
              ) : null}
            </Box>
            <Box width={"25%"}>
              <Typography gutterBottom variant="h5" component="div">
                Price
              </Typography>
              <Typography gutterBottom variant="p" component="div">
                {corentEvent.cost.toLocaleString("en-US", {
                  style: "currency",
                  currency: "ILS",
                })}
              </Typography>
            </Box>
          </Box>
          <Box
            width={"100%"}
            padding={"10px"}
            display={"flex"}
            sx={{ height: "10%" }}
            justifyContent={"center"}
            marginTop="50px"
          >
            {!DataRegist.includes(String(corentEvent.numberEvent)) ? (
              <Button onClick={handleRegister} sx={{ border: "1px solid" }}>
                Register for the event
              </Button>
            ) : (
              <Box>You registered for the event</Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

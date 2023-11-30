import { Backdrop, Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

import fack from "../../../fackData/fack.json";
import EventCard from "./EventCard";
import { useEvent } from "./atom";
import InformationEvent from "./informationEvent";
import CloseIcon from "@mui/icons-material/Close";

function SimpleBackdrop(props) {
  return <div></div>;
}
export default function DashboardCards() {
  const [evens, setEvens] = useState([]);
  const [oneEvent, setOneEvent] = useEvent();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setOneEvent(null)
  };
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    setEvens(fack);
    console.log(evens);
  }, []);

  return (
    <>
      {open && <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <Box
          sx={{
            height: "90vh",
            width: "80%",
            padding: "10px",
            background: "white",
            borderRadius: "10px",
          }}
        >
          <Button onClick={handleClose}>
            <CloseIcon />
          </Button>
          <Box
            sx={{
              overflow: "scroll",
              height: "100%",
              width: "100%",
              background: "white",
            }}
          >
            <InformationEvent />
          </Box>
        </Box>
      </Backdrop>}
      <Box
        display={"flex"}
        alignContent="space-around"
        flexWrap={"wrap"}
        justifyContent={"space-around"}
        width={"90%"}
        gap={"50px"}
        marginLeft={"5%"}
        marginTop={"5%"}
      >
        {evens.map((cardInfo, index) => {
          return (
            <Button onClick={handleOpen}>
              <EventCard key={index} data={cardInfo} />
            </Button>
          );
        })}
      </Box>
    </>
  );
}

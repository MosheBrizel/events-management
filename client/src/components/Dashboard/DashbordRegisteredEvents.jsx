import { Backdrop, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";

import EventCard from "./EventCard";
import { useEvent } from "./atom";
import InformationEvent from "./informationEvent";
import CloseIcon from "@mui/icons-material/Close";
import urlPage from "../../../url/urlPath";
import axios from "axios";
import { useDataRegistered } from "../../atoms/atomsFile";

export default function DashbordRegisteredEvents() {
  const [evens, setEvens] = useState([]);
  const [oneEvent, setOneEvent] = useEvent();
  const [open, setOpen] = useState(false);
  const [DataRegist, setDataRegist] = useDataRegistered()
  const handleClose = () => {
    setOpen(false);
    setOneEvent(null);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const dataEvents = evens.filter((item) => DataRegist.includes(String(item.numberEvent)))
  useEffect(() => {
    async function getDataServer(){
      try {
        const data = await axios.get(urlPage + "event/allEvents");
        setEvens(data.data);
      } catch (error) {
        console.log(error);
        setEvens([])
      }
    }
    getDataServer()
  }, []);

  return (
    <>
      {open && (
        <Backdrop
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
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
                height: "95%",
                width: "100%",
                background: "white",
              }}
            >
              <InformationEvent funcClos={() => handleClose()} />
            </Box>
          </Box>
        </Backdrop>
      )}
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
        {dataEvents.map((cardInfo, index) => {
          return (
            <Button key={index} onClick={handleOpen}>
              <EventCard registered={DataRegist.includes(String(cardInfo.numberEvent))} key={index} data={cardInfo} />
            </Button>
          );
        })}
      </Box>
    </>
  );
}

import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

import fack from "../../../fackData/fack.json";
import EventCard from "./EventCard";
export default function DashboardCards() {
  const [evens, setEvens] = useState([]);

  useEffect(() => {
    setEvens(fack);
    console.log(evens);
  }, []);

  return (
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
      {evens.map((cardInfo) => {
        return <EventCard data={cardInfo} />;
      })}
    </Box>
  );
}

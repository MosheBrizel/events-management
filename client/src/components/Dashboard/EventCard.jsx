import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Box, CardActionArea, Chip } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useEvent } from "./atom";

export default function EventCard(props) {
  const [corentEvent, setCorentEvent] = useEvent();
  return (
    <Box
      bgcolor={"white"}
      sx={{ backgroundColor: "white.main", borderRadius: "20px" }}
    >
      <Card
        sx={{
          maxWidth: 345,
          minWidth: 345,
          boxShadow: " 0px 0px 26px -2px rgba(122,120,122,1)",
          backgroundColor: props.registered
            ? "rgba(44, 177, 88, 0.300)"
            : "white",
          padding: "10px",
          borderRadius: "20px",
        }}
      >
        <CardActionArea onClick={() => setCorentEvent(props.data)}>
          <CardMedia
            sx={{ borderRadius: "20px" }}
            component="img"
            height="140"
            image={props.data.image}
            alt="image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.data.label}
            </Typography>
            <div style={{ height: 50, whiteSpace: "nowrap" }}>
              <Typography
                component="div"
                sx={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  my: 2,
                  p: 1,
                }}
                variant="body2"
                color="text.secondary"
              >
                {props.data.description}
              </Typography>
            </div>
            <Box
              display="flex"
              alignItems="end"
              justifyContent={"space-between"}
            >
              <Box display={"flex"} flexDirection={"column"}>
                <Chip
                  color="info"
                  label={new Date(props.data.date).toDateString()}
                  icon={<CalendarTodayIcon />}
                  sx={{ padding: "10px", margin: "5px" }}
                />
                <Chip
                  color="info"
                  label={`Places left ${
                    props.data.places - props.data.placesTaking
                  }`}
                  icon={<PeopleAltIcon />}
                  sx={{ padding: "10px", margin: "5px" }}
                />
              </Box>
              <Box
                color="#0288d1"
                fontFamily='"Roboto","Helvetica","Arial",sans-serif'
                fontSize="0.9125rem"
              >
                {props.data.cost.toLocaleString("en-US", {
                  style: "currency",
                  currency: "ILS",
                })}
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}

import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { Form } from "react-router-dom";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import UploadPhoto from "../Features/UploadPhoto";
import instance from "../../../exios/axiosInstance";
import urlPage from "../../../url/urlPath";

export default function FormCreateEvent() {
  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!/^-?\d*\.?\d+$/.test(data.get("cost") )|| !/^-?\d*\.?\d+$/.test(data.get("places"))) {
      return;
    }
    console.log(data.get("cost"));
    const result = await instance.post(urlPage + "event/createEvent", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(result);
  }

  return (
    <Box
      marginLeft={"5%"}
      width={"90%"}
      sx={{
        color: "blue.main",
        ".MuiInputLabel-root, .MuiSvgIcon-root, .MuiInputBase-inputMultiline, .MuiOutlinedInput-root, .MuiOutlinedInput-notchedOutline":
          {
            color: "blue.main",
            borderColor: "blue.main",
          },
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Typography
          sx={{
            color: "blue.main",
          }}
          color="blue"
          gutterBottom
          variant="h2"
          component="div"
        >
          Create your one event
        </Typography>
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"50px"}
          alignItems={"baseline"}
        >
          <TextField
            sx={{
              color: "blue.main",
            }}
            color="blue"
            id="standard-multiline-flexible"
            label="Label"
            multiline
            maxRows={4}
            variant="standard"
            name="label"
            required
          />
          <TextField
            sx={{
              color: "blue.main",
            }}
            color="blue"
            id="standard-multiline-flexible"
            label="description"
            multiline
            minRows={2}
            maxRows={10}
            variant="standard"
            name="description"
            required
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateField"]}>
              <DateField
                name="date"
                variant="standard"
                multiline
                required
                label="Date"
              />
            </DemoContainer>
          </LocalizationProvider>
          <TextField
            sx={{
              color: "blue.main",
            }}
            color="blue"
            id="standard-multiline-flexible"
            label="Cost"
            multiline
            maxRows={4}
            variant="standard"
            name="cost"
          />
          <TextField
            sx={{
              color: "blue.main",
            }}
            color="blue"
            id="standard-multiline-flexible"
            label="Places"
            multiline
            maxRows={4}
            variant="standard"
            name="places"
            required
          />
          <TextField
            sx={{
              color: "blue.main",
            }}
            color="blue"
            id="standard-multiline-flexible"
            label="Location"
            multiline
            maxRows={4}
            variant="standard"
            name="location"
            required
          />
          <TextField
            sx={{
              color: "blue.main",
            }}
            color="blue"
            id="standard-multiline-flexible"
            label="Note location"
            multiline
            maxRows={4}
            variant="standard"
            name="noteLocation"
          />
          <TextField
            sx={{
              color: "blue.main",
            }}
            color="blue"
            id="standard-multiline-flexible"
            label="Dress code"
            multiline
            maxRows={4}
            variant="standard"
            name="dressCode"
          />
          <TextField
            //   fullWidth
            sx={{
              color: "blue.main",
            }}
            color="blue"
            id="standard-multiline-flexible"
            label="Arrival instructions"
            multiline
            maxRows={4}
            variant="standard"
            name="arrivalInstructions"
          />
          <TextField
            sx={{
              color: "blue.main",
            }}
            color="blue"
            id="standard-multiline-flexible"
            label="Age restriction (write the age)"
            multiline
            maxRows={4}
            variant="standard"
            name="ageRestriction"
          />
          <UploadPhoto CreateEvent={true} />
          <Button sx={{ border: "1px solid", width: "15%" }} type="submit">
            create
          </Button>
        </Box>
      </Form>
    </Box>
  );
}

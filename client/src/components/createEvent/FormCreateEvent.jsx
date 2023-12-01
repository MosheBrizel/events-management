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

    async function handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get('image'));
        const result = await instance.post(urlPage + 'event/createEvent',data,{
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        console.log(result);
    }


  return (
    <Box marginLeft={"5%"} width={"90%"}>
      <Form onSubmit={handleSubmit}>
        <Typography gutterBottom variant="h2" component="div">
          Create your one event
        </Typography>
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"50px"}
          alignItems={"baseline"}
        >
          <TextField
            //   fullWidth

            id="standard-multiline-flexible"
            label="Label"
            multiline
            maxRows={4}
            variant="standard"
            name="label"
            required
          />
          <TextField
            //   fullWidth

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
            //   fullWidth

            id="standard-multiline-flexible"
            label="Cost"
            multiline
            maxRows={4}
            variant="standard"
            name="cost"
          />
          <TextField
            //   fullWidth

            id="standard-multiline-flexible"
            label="Places"
            multiline
            maxRows={4}
            variant="standard"
            name="places"
            required
          />
          <TextField
            //   fullWidth

            id="standard-multiline-flexible"
            label="Location"
            multiline
            maxRows={4}
            variant="standard"
            name="location"
            required
          />
          <TextField
            //   fullWidth

            id="standard-multiline-flexible"
            label="Note location"
            multiline
            maxRows={4}
            variant="standard"
            name="noteLocation"
          />
          <TextField
            //   fullWidth

            id="standard-multiline-flexible"
            label="Dress code"
            multiline
            maxRows={4}
            variant="standard"
            name="dressCode"
          />
          <TextField
            //   fullWidth

            id="standard-multiline-flexible"
            label="Arrival instructions"
            multiline
            maxRows={4}
            variant="standard"
            name="arrivalInstructions"
          />
          <TextField
            //   fullWidth

            id="standard-multiline-flexible"
            label="Age restriction (write the age)"
            multiline
            maxRows={4}
            variant="standard"
            name="ageRestriction"
          />
          <UploadPhoto />
          <Button type="submit">create</Button>

          
        </Box>
      </Form>
    </Box>
  );
}

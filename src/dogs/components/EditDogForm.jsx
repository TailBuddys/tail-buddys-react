import React, { useEffect } from "react";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import ROUTES from "../../routes/routesModel";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { pink } from "@mui/material/colors";
import VaccinesIcon from "@mui/icons-material/Vaccines";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import GoogleAddressComponent from "../../components/GoogleAddressComponent";
import useDogs from "../hooks/useDogs";

export default function EditDogForm({
  onSubmit,
  onReset,
  validateForm,
  title,
  errors,
  data,
  onInputChange,
  handleSelectAddress,
  resetGoogleAddressRef,
}) {
  const { dogTypes, fetchDogTypes } = useDogs();

  useEffect(() => {
    fetchDogTypes();
  }, [fetchDogTypes]);

  return (
    <Form
      onSubmit={onSubmit}
      onReset={() => {
        if (onReset) onReset();
      }}
      validateForm={validateForm}
      title={title}
      styles={{ maxWidth: "800px" }}
      to={ROUTES.ROOT}
    >
      <Grid2 container spacing={2} justifyContent="center">
        <Grid2
          container
          direction="column"
          spacing={2}
          xs={12}
          md="auto"
          alignItems="center"
        >
          <Grid2 sx={{ width: "340px" }}>
            <Input
              name="name"
              label="name"
              error={errors.name}
              onChange={onInputChange}
              data={data}
            />
          </Grid2>

          <Grid2 sx={{ width: "340px" }}>
            <FormControl fullWidth>
              <InputLabel id="type">Type</InputLabel>
              <Select
                name="type"
                labelId="type"
                value={data.type}
                error={errors.type}
                onChange={onInputChange}
              >
                {dogTypes.map(({ value, displayName }) => (
                  <MenuItem key={value} value={value}>
                    {displayName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>

          <Grid2 sx={{ width: "340px", mb: "14px" }}>
            <FormControlLabel
              value="end"
              control={
                <Checkbox
                  name="vaccinated"
                  value={data.vaccinated}
                  checked={data.vaccinated}
                  error={errors.vaccinated}
                  onChange={onInputChange}
                  sx={{
                    color: "grey",
                    opacity: 0.4,
                    "&.Mui-checked": {
                      color: pink[600],
                      opacity: 1,
                    },
                  }}
                  icon={<VaccinesIcon />}
                  checkedIcon={<VaccinesIcon />}
                />
              }
              label="vaccinated"
              labelPlacement="start"
            />
          </Grid2>

          <Grid2 sx={{ width: "340px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                name="birthDate"
                label="birth Date"
                error={errors.birthDate}
                onChange={(value) =>
                  onInputChange({
                    target: {
                      name: "birthDate",
                      value: value,
                    },
                  })
                }
                value={data.birthDate ? dayjs(data.birthDate) : null}
                disableFuture
                slotProps={{
                  textField: {
                    inputProps: {
                      readOnly: true,
                    },
                    fullWidth: true,
                    error: Boolean(errors.birthDate),
                    helperText: errors.birthDate,
                  },
                }}
              />
            </LocalizationProvider>
          </Grid2>
        </Grid2>

        <Grid2
          container
          direction="column"
          spacing={2}
          xs={12}
          md="auto"
          alignItems="center"
        >
          <Grid2 sx={{ width: "340px" }}>
            <Input
              name="description"
              label="description"
              error={errors.description}
              onChange={onInputChange}
              data={data}
            />
          </Grid2>

          <Grid2 sx={{ width: "340px" }}>
            <FormControl fullWidth>
              <InputLabel id="size">Size</InputLabel>
              <Select
                name="size"
                labelId="size"
                value={data.size}
                error={errors.size}
                onChange={onInputChange}
              >
                <MenuItem value={0}>Small</MenuItem>
                <MenuItem value={1}>Medium</MenuItem>
                <MenuItem value={2}>Large</MenuItem>
              </Select>
            </FormControl>
          </Grid2>

          <Grid2 sx={{ width: "340px" }}>
            <GoogleAddressComponent
              onReset={(callback) => (resetGoogleAddressRef.current = callback)}
              onSelectAddress={handleSelectAddress}
              data={data}
            />
          </Grid2>

          <Grid2 sx={{ width: "340px" }}>
            <FormControl fullWidth>
              <InputLabel id="gender">Gender</InputLabel>
              <Select
                name="gender"
                labelId="gender"
                value={data.gender}
                error={errors.gender}
                onChange={onInputChange}
              >
                <MenuItem value={0}>Male</MenuItem>
                <MenuItem value={1}>Female</MenuItem>
              </Select>
            </FormControl>
          </Grid2>
        </Grid2>
      </Grid2>
    </Form>
  );
}

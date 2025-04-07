import React, { useEffect } from "react";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import ROUTES from "../../routes/routesModel";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { pink } from "@mui/material/colors";
import VaccinesIcon from "@mui/icons-material/Vaccines";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
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
      <Input
        name="name"
        label="name"
        error={errors.name}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="description"
        label="description"
        error={errors.description}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <FormControl fullWidth>
        <InputLabel id="type">Type</InputLabel>
        <Select
          name="type"
          labelId="type"
          label="type"
          id="demo-simple-select"
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
      <FormControl fullWidth>
        <InputLabel id="size">Size</InputLabel>
        <Select
          name="size"
          labelId="size"
          id="demo-simple-select"
          label="size"
          value={data.size} // ליצור אפקט
          error={errors.size}
          onChange={onInputChange}
        >
          <MenuItem value={0}>Small</MenuItem>
          <MenuItem value={1}>Medium</MenuItem>
          <MenuItem value={2}>Large</MenuItem>
        </Select>
      </FormControl>
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
      <GoogleAddressComponent
        onReset={(callback) => (resetGoogleAddressRef.current = callback)} // ✅ pass reset setter
        onSelectAddress={handleSelectAddress} // לדחוף את לון ולאט כמו ששלחנו ערכים בתאריך
        data={data}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
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
          data={data}
          sm={6}
          slotProps={{
            textField: {
              inputProps: { readOnly: true },
              fullWidth: true,
              error: Boolean(errors.birthDate),
              helperText: errors.birthDate,
            },
          }}
        />
      </LocalizationProvider>
      <FormControl fullWidth>
        <InputLabel id="gender">Gender</InputLabel>
        <Select
          name="gender"
          labelId="gender"
          id="demo-simple-select"
          label="gender"
          value={data.gender}
          error={errors.gender}
          onChange={onInputChange}
        >
          <MenuItem value={0}>Male</MenuItem>
          <MenuItem value={1}>Female</MenuItem>
        </Select>
      </FormControl>
    </Form>
  );
}

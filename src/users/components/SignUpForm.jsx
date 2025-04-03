import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import ROUTES from "../../routes/routesModel";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
export default function SignupForm({
  onSubmit,
  onReset,
  validateForm,
  title,
  errors,
  data,
  onInputChange,
  onDateChange,
  handleGenderChange,
}) {
  return (
    <Form
      onSubmit={onSubmit}
      onReset={onReset}
      validateForm={validateForm}
      title={title}
      styles={{ maxWidth: "800px" }}
      to={ROUTES.ROOT}
    >
      <Input
        name="FirstName"
        label="first name"
        error={errors.first}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="LastName"
        label="last name"
        error={errors.last}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="phone"
        label="phone"
        type="phone"
        error={errors.phone}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="email"
        label="email"
        error={errors.email}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="password"
        label="password"
        type="password"
        error={errors.password}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          name="birthDate"
          label="birth Date"
          error={errors.birthDate}
          onChange={onDateChange}
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
          value={data.gender}
          label="Gender"
          error={errors.gender}
          onChange={handleGenderChange}
        >
          <MenuItem value={0}>Male</MenuItem>
          <MenuItem value={1}>Female</MenuItem>
          <MenuItem value={2}>Other</MenuItem>
        </Select>
      </FormControl>
    </Form>
  );
}

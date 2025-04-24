import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid2,
} from "@mui/material";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import ROUTES from "../../routes/routesModel";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import GoogleLoginButton from "./GoogleLoginButton";
import { Height } from "@mui/icons-material";
export default function SignupForm({
  onSubmit,
  onReset,
  validateForm,
  title,
  errors,
  data,
  onInputChange,
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
              name="FirstName"
              label="first name"
              error={errors.first}
              onChange={onInputChange}
              data={data}
            />
          </Grid2>
          <Grid2 sx={{ width: "340px" }}>
            <Input
              name="phone"
              label="phone"
              type="phone"
              error={errors.phone}
              onChange={onInputChange}
              data={data}
            />
          </Grid2>
          <Grid2 sx={{ width: "340px" }}>
            <Input
              name="password"
              label="password"
              type="password"
              error={errors.password}
              onChange={onInputChange}
              data={data}
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
                    target: { name: "birthDate", value },
                  })
                }
                value={data.birthDate ? dayjs(data.birthDate) : null}
                disableFuture
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
              name="LastName"
              label="last name"
              error={errors.last}
              onChange={onInputChange}
              data={data}
            />
          </Grid2>
          <Grid2 sx={{ width: "340px" }}>
            <Input
              name="email"
              label="email"
              error={errors.email}
              onChange={onInputChange}
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
                label="Gender"
                error={errors.gender}
                onChange={onInputChange}
              >
                <MenuItem value={0}>Male</MenuItem>
                <MenuItem value={1}>Female</MenuItem>
                <MenuItem value={2}>Other</MenuItem>
              </Select>
            </FormControl>
          </Grid2>
          <Grid2 sx={{ width: "340px" }}>
            <GoogleLoginButton to={ROUTES.ROOT} />
          </Grid2>
        </Grid2>
      </Grid2>
    </Form>
    // <Form
    //   onSubmit={onSubmit}
    //   onReset={onReset}
    //   validateForm={validateForm}
    //   title={title}
    //   styles={{ maxWidth: "800px" }}
    //   to={ROUTES.ROOT}
    // >
    //   <Input
    //     name="FirstName"
    //     label="first name"
    //     error={errors.first}
    //     onChange={onInputChange}
    //     data={data}
    //     sm={6}
    //   />
    //   <Input
    //     name="LastName"
    //     label="last name"
    //     error={errors.last}
    //     onChange={onInputChange}
    //     data={data}
    //     sm={6}
    //   />
    //   <Input
    //     name="phone"
    //     label="phone"
    //     type="phone"
    //     error={errors.phone}
    //     onChange={onInputChange}
    //     data={data}
    //     sm={6}
    //   />
    //   <Input
    //     name="email"
    //     label="email"
    //     error={errors.email}
    //     onChange={onInputChange}
    //     data={data}
    //     sm={6}
    //   />
    //   <Input
    //     name="password"
    //     label="password"
    //     type="password"
    //     error={errors.password}
    //     onChange={onInputChange}
    //     data={data}
    //     sm={6}
    //   />
    //   <LocalizationProvider dateAdapter={AdapterDayjs}>
    //     <MobileDatePicker
    //       name="birthDate"
    //       label="birth Date"
    //       error={errors.birthDate}
    //       onChange={(value) =>
    //         onInputChange({
    //           target: {
    //             name: "birthDate",
    //             value: value,
    //           },
    //         })
    //       }
    //       value={data.birthDate ? dayjs(data.birthDate) : null}
    //       disableFuture
    //       data={data}
    //       sm={6}
    //       slotProps={{
    //         textField: {
    //           inputProps: { readOnly: true },
    //           fullWidth: true,
    //           error: Boolean(errors.birthDate),
    //           helperText: errors.birthDate,
    //         },
    //       }}
    //     />
    //   </LocalizationProvider>

    //   <FormControl fullWidth>
    //     <InputLabel id="gender">Gender</InputLabel>
    //     <Select
    //       name="gender"
    //       labelId="gender"
    //       id="demo-simple-select"
    //       value={data.gender}
    //       label="Gender"
    //       error={errors.gender}
    //       onChange={onInputChange}
    //     >
    //       <MenuItem value={0}>Male</MenuItem>
    //       <MenuItem value={1}>Female</MenuItem>
    //       <MenuItem value={2}>Other</MenuItem>
    //     </Select>
    //   </FormControl>
    // </Form>
  );
}

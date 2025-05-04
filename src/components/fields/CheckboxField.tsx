import { Checkbox, FormControlLabel } from "@mui/material";

const CheckboxField = ({ field, register }: any) => (
  <FormControlLabel
    control={
      <Checkbox
        {...register(field.name)}
        sx={{
          "&:hover": { color: "primary.main" },
          "&.Mui-checked": { color: "primary.main" },
        }}
      />
    }
    label={field.label}
  />
);

export default CheckboxField;


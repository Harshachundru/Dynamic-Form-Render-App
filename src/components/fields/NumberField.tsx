import { TextField as MUITextField } from "@mui/material";

const NumberField = ({ field, register, error }: any) => (
  <MUITextField
    type="number"
    fullWidth
    label={field.label}
    error={!!error}
    helperText={error?.message}
    variant="outlined"
    size="small"
    {...register(field.name)}
    sx={{
      "& .MuiOutlinedInput-root": {
        borderRadius: 2,
        "&:hover fieldset": { borderColor: "#1976d2" },
        "&.Mui-focused fieldset": { borderColor: "#1565c0" },
      },
    }}
  />
);

export default NumberField;


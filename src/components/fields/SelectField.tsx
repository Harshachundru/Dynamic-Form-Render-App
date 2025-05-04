import { TextField as MUITextField, MenuItem } from "@mui/material";

const SelectField = ({ field, register, error }: any) => (
  <MUITextField
    select
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
  >
    <MenuItem value="">-- Select --</MenuItem>
    {field.options?.map((opt: string) => (
      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
    ))}
  </MUITextField>
);

export default SelectField;


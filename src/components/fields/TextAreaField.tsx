import { TextField as MUITextField } from "@mui/material";

const TextAreaField = ({ field, register, error }: any) => (
  <MUITextField
    fullWidth
    label={field.label}
    multiline
    rows={4}
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

export default TextAreaField;



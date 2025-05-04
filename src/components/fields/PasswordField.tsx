import { TextField as MUITextField } from "@mui/material";

const PasswordField = ({ field, register, error }: any) => (
  <div style={{ marginBottom: "1rem" }}>
    <MUITextField
      fullWidth
      label={field.label}
      type="password"
      variant="outlined"
      size="small"
      error={!!error}
      helperText={error?.message}
      {...register(field.name)}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          "&:hover fieldset": { borderColor: "#1976d2" },
          "&.Mui-focused fieldset": { borderColor: "#1565c0" },
        },
      }}
    />
  </div>
);

export default PasswordField;

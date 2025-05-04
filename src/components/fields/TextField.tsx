import { TextField as MUITextField } from "@mui/material";

const TextField = ({ field, register, error }: any) => (
  <div className="mb-4">
    <MUITextField
      fullWidth
      label={field.label}
      error={!!error}
      variant="outlined"
      size="small"
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

export default TextField;

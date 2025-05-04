import { useForm } from "../hooks/useForm";
import FieldRenderer from "./FieldRenderer";
import { useState } from "react";
import { Box, Typography, Container, Paper, Button, Divider} from "@mui/material";

const FormRenderer = ({ schema }: any) => {

  const { register, handleSubmit, formState: { errors }} = useForm(schema);

  const [submittedData, setSubmittedData] = useState<any>(null);

  const onSubmit = (data: any) => {

    //Form data is shown in UI.
    setSubmittedData(data); 
    console.log("Submitted:", data);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 6 }}>
        <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 3 }}>
          {schema.title}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {schema.fields.map((field: any) => (
            <FieldRenderer
              key={field.name}
              field={field}
              register={register}
              errors={errors}
            />
          ))}

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              borderRadius: 4,     
              textTransform: "uppercase",
              fontWeight: "bold",
              py: 1.5,
              px: 2,
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            Register
          </Button>
        </Box>
      </Paper>

      {submittedData && (
        <Paper
          elevation={1}
          sx={{ mt: 4, p: 3, backgroundColor: "#f9f9f9", borderRadius: 4 }}
        >
          <Typography variant="h6" gutterBottom>
            Submitted User Data:
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <pre style={{ fontSize: 14, whiteSpace: "pre-wrap" }}>
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </Paper>
      )}
    </Container>
  );
};

export default FormRenderer;


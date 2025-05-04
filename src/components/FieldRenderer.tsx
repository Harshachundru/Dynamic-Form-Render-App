import TextField from "./fields/TextField";
import NumberField from "./fields/NumberField";
import CheckboxField from "./fields/CheckboxField";
import SelectField from "./fields/SelectField";
import TextAreaField from "./fields/TextAreaField";
import DateField from "./fields/DateField";

const FieldRenderer = ({ field, register, errors }: any) => {
  const props = { field, register, error: errors[field.name] };

  switch (field.type) {
    case "text": return <TextField {...props} />;
    case "number": return <NumberField {...props} />;
    case "checkbox": return <CheckboxField {...props} />;
    case "select": return <SelectField {...props} />;
    case "textarea": return <TextAreaField {...props} />;
    case "date": return <DateField {...props} />;
    default: return null;
  }
};

export default FieldRenderer;


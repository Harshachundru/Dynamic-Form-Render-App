export interface FieldSchema {
    label: string;
    type: string;
    name: string;
    required?: boolean;
    options?: string[]; // For select
  }
  
  export interface FormSchema {
    title: string;
    fields: FieldSchema[];
  }
  
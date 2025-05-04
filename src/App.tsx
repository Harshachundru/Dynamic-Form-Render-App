// src/App.tsx
import React from "react";
import FormRenderer from "./components/FormRenderer";
import schema from "./schema.json";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <FormRenderer schema={schema} />
    </div>
  );
}

export default App;



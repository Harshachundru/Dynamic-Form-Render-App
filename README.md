# Dynamic Field Renderer (React + TypeScript)

A flexible and scalable dynamic form renderer built using **React**, **TypeScript**, **React Hook Form**, and **Zod** for schema validation. This project demonstrates the ability to create modular, type-safe form components that can dynamically render fields based on a configuration schema.

> Developed as part of a technical take-home assessment. Focuses on best practices, reusability, validation, maintainability and developer experience.

---
## Project Purpose

The primary objective of this project is to dynamically render form fields based on a JSON schema using React and TypeScript, while ensuring that the implementation is:

Reusable — Field components and logic can be reused across forms.
Maintainable — Logic is modular and easy to extend.
Readable — Clear and consistent naming, clean structure, and concise code.
well-structured — Code is organized to enforce separation of concerns and scalability.

---

## Design Decisions and Implementation: 

- Schema driven forms:
The entire form is generated dynamically using a schema object, reducing the need for hardcoded UI. 
This allows Faster form prototyping, Consistency across forms and Minimal developer effort to change or add new fields. 

- Reusable Field Components: 
Each input type (text, checkbox, password, etc.) is abstracted into a reusable component under components/fields/.
The benefits are the Components are isolated, easier to test and maintain and follows DRY (Don’t Repeat Yourself) principles.
Also, Simplifies updates by making UI/UX changes apply universal.

- Central Dispatcher: 
The FieldRenderer.tsx component decouples logic from UI by mapping each field type to its component. 
It removes the need for scattered if/switch logic throughout the app.
It simplyfies future extensibility to add new component or case.

- Form lifecycle: 
The FormRenderer.tsx wraps everything, initialises form via custom hook (useForm.ts), iterates through the schema and render fields, Handles from submission and show submitted data. This component uses Material UI's Box, Container, and Paper for clean layout. 

- Custom Hook: 
The hooks/useForm.tsx is a wrapper around react-hook-form which builds Zod validation schema dynamically using the schema, sets default values, Returns register, handleSubmit, errors. This hook cleanly separates logic from rendering and improves testability.

- Validation with Zod: 
The Zod schema is built dynamically from the form schema in zodBuilder.ts. It perfroms actions such as Type-specific validation (e.g., regex for email), Conditional validation (e.g., confirm password), Custom word-count checks (e.g., 20-word minimum for textarea) and Ensures client-side robustness with strong types.

- Testing Strategy:
Validation logic in zodBuilder.ts is covered with unit tests in zodBuilder.test.ts. Designed to be extended with component-level tests via @testing-library/react

---

## Major Features

- Dynamic form generation from JSON schema
- Type-safe validation with `Zod` and Form Data management with`React Hook Form`
- Customizable UI with `MUI` (Material UI)
- Unit tested with `Jest` and `React Testing Library`
- Zero-config setup using `Create React App`
- Strict TypeScript support

---

## Major Tech Stack

- React 19
- TypeScript 4
- React Hook Form 7
- Zod 3
- MUI v7
- Tailwind CSS 3
- Jest + React Testing Library

| Tool / Library        | Purpose                                                  |
| --------------------- | -------------------------------------------------------- |
| React (w/ TypeScript) | Component-based UI with strong typing                    |
| React Hook Form       | High-performance, declarative form state management      |
| Zod                   | Type-safe schema validation at runtime                   |
| Material UI (MUI)     | UI components with accessibility and design consistency  |
| Jest                  | Testing framework for unit and integration tests         |
| Yarn                  | Package manager for efficient and deterministic installs |

---

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development or testing purposes.

### Prerequisites

Ensure you have the following installed:

- **Node.js** (>= 16.x)
- **npm** (>= 8.x)

Follow the steps below to set up and run the project locally using **Yarn**.

 **Install yarn if you don't have it installed as a package manager**
 npm install --global yarn


### Installation

1. **Clone the repository**

git clone https://github.com/your-username/dynamic-form-render.git
cd dynamic-form-render

2. **Install Dependecies**
yarn install

3. **Run the app Locally**
Start the deployment server,by default the app runs on http://localhost:3000
yarn start

3. **Run test**
yarn test

4. **To check test coverage**
yarn test --coverage

5. **To check for Build errors and to create optimised build**
yarn build

6. **The app is deployed through Netlify**
Visit : https://dynamic-from-render-app.netlify.app/




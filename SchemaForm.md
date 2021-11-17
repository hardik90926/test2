<div align="center">
  <h1>Dhiwise Core UI</h1>
  <p>Build Forms using Databse Schemas</p>
</div>

<div align="center">

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=for-the-badge)](https://standardjs.com)

</div>

## Features

- Built with performance, using [react-hook-form](https://github.com/react-hook-form/react-hook-form)
- Build UI from multiple backend json Postgres, Mongodb, Mysql, SQL Server
- Supports Multiple Database Fields
  ### Basic Types
  - String | Text | SingleLine | MultiLine | Char 
  - Enum
  - Number 
  - Boolean
  - Date

  ### Nested Types
  - Array of Values | Array of Objects
  - JSON

  ### Custom Types
  - File Uploads
  - Relation Fields

## Install

    npm install @dhiwise/core-ui

## Contents

- [QuickStart](#quickstart)
- [Props](#props)
- [Prop Functions Documentation](#prop-functions-documentation)
- [Schema Reference
](#schema-reference)
- [Field Types
](#field-types)
- [Customization](#customization)
- [Demo](#demo)

## Quickstart

```jsx
import React from 'react';
import JsonSchemaForm from "@dhiwise/core-ui";
import schema from './schema';

export const App = () => {
  const formRef = React.createRef();
  const onSubmit = (data) => console.log(data);
  return (
    <div>
      <h1>React Json Form</h1> 
      <JsonSchemaForm
        formRef={formRef}
        onSubmit={onSubmit}
        schema={schema}
        defaultValues={{}}
      />
    </div>
  );
}
```

## Props

Common props you may want to specify include:

- `handleUpload` - Common function, called for image uploads.
- `themeMode` - `light` | `dark` - Theme color for form to use.
- `formRef` - A ref object used by form to assign form `submit` and `reset` actions.
- `onSubmit` - Function called to handle `submit` action of form.
- `schema` - Database Schema for form, must have the format mentioned below.
- `defaultValues` - Default values to be assigned to form context.
- `loadOptions` - Function called to load options for Relation Fields.
- `widgets` - Custom widgets to override existing ones, check out the widget definition below.


## Prop Functions Documentation :

| Function Name | Description                                         | Input Args                                                                                                                                                                               |
|---------------|-----------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| handleUpload  | Common function, called for image uploads.          | - `fileList: FileList` - List of uploaded files - `setImages` - set successfully uploaded images to `formContext`.                                                                       |
| onSubmit      | Function called to handle `submit` action of form   | - `data: Partial<Record<string, unknown>>` - Data object of the filled form as key value pairs.                                                                                          |
| loadOptions   | Function called to load options for Relation Fields | - `data: Field` - Field attributes from Schema. - `inputValue: string` - Input/Search string entered by user. -  `callback: function` - Called to pass new list of options to dropdown.  |


## Schema Reference

### Example Schema
```jsx
export const schema = {
  name: "modelName" // Name of schema model
  databaseType: "DATABASE_TYPE" // MONGODB | MYSQL | POSTGRESQL | SQL
  attributes: [ // List of Fields in the form
    {
      "attrName": "title", // unique field name
      "label": "Title", // Field Label Value to display
      "inputType": "InputWidget", // Field UI type - Optional
      "type": "String", // Field DB Type
      "noEdit": false, // Flag to Control Disabled State
    },

    // Reference Field Example
    {
      "attrName": "patientID",
      "label": "Patient",
      "inputType": "RefWidget", // Reference Dropdown UI
      "type": "ObjectId",
      "ref": "Patient", // Referring Model Name
      "noEdit": false,
      "valueAttribute": "_id", // Ref Model Attribute to store value
      "displayAttribute": "name", // Ref Model Attribute to display value
    }

    // Array of Object Example
    {
      "attrName": "caseDocs",
      "label": "Case Docs",
      "inputType": "ArrayWidget",
      "type": "Array",
      "children": { // List of Nested Children of Field

        // Same structure as above attributes
        "title": { 
          "type": "String",
          "inputType": "InputWidget"
        },
        "doc": {
          "type": "String",
          "inputType": "SingleUpload"
        }
      }
    }

    // Array of Single Type Example
    {
      "attrName": "caseLinks",
      "label": "Case Links",
      "inputType": "ArrayWidget",
      "type": "Array",
      "childType": "String",
    }

    // JSON Object Example
    {
      "attrName": "testingJSON",
      "label": "Testing JSON",
      "inputType": "JsonWidget",
      "type": "JSON",
      "children": { // Nested Child attributes for JSON Field
        "testingKey1": {
          "type": "String",
          "inputType": "InputWidget"
        },
        "testingKey2": {
          "type": "Date",
          "inputType": "DatePicker"
        },
        "testingImage": {
          "type": "String",
          "inputType": "SingleUpload"
        }
      }
    },
  ],
};
```

| Name                        | Description                            | Required          | Type                                                                                                                                                                                                                                                                                                                       |
|-----------------------------|----------------------------------------|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name                        | Model Name                             | required          | `String`                                                                                                                                                                                                                                                                                                                   |
| databaseType                | Type of schema Database                | required          | `String` must be one of `MONGODB \| MYSQL \| POSTGRESQL \| SQL`                                                                                                                                                                                                                                                            |
| attributes                  | List of Fields in model.               | required          | `[Partial<Field>]` Array of Field Objects.                                                                                                                                                                                                                                                                                 |
| attributes.attrName         | Unique name of field                   | required          | `String`                                                                                                                                                                                                                                                                                                                   |
| attributes.label            | Display Label of Field                 | optional          | `String`                                                                                                                                                                                                                                                                                                                   |
| attributes.type             | Database Input Type                    | required          | `String` - Refer the Input Types doc below.                                                                                                                                                                                                                                                                                |
| attributes.inputType        | UI Widget to use.                      | optional          | `String` - Options  - Strings - `InputWidget` \| `TextAreaWidget` \| `UrlInput` \| `EmailWidget`  - Boolean - `CheckboxWidget` \| `RadioWidget` \|   - Number - `PercentageWidget` \| `NumberWidget`  - Date  - `DatePicker` \| `DateTimePicker`  - Dropdown - `SelectWidget`  - Custom - `ButtonWidget` \| `UploadWidget` |
| attributes.noEdit           | Control Disable State                  | optional          | `Boolean`                                                                                                                                                                                                                                                                                                                  |
| attributes.ref              | Model name for Reference Fields        | required for Refs | `String`                                                                                                                                                                                                                                                                                                                   |
| attributes.valueAttribute   | Value field to use from model          | required for Refs | `String`                                                                                                                                                                                                                                                                                                                   |
| attributes.displayAttribute | field used to display in dropdown      | required for Refs | `String`                                                                                                                                                                                                                                                                                                                   |
| attributes.children         | Nested fields for Array and JSON types | optional          | `Record<string, Partial<Field>>` - Nested fields as key/value pairs                                                                                                                                                                                                                                                        |
| attributes.childType        | Field Type for Array of values         | optional          | `String`                                                                                                                                                                                                                                                                                                                   |
| screenLayout.singlePageForm | Column layout for form                 | optional          | `String` \| one of `singleLine` \| `doubleLine` \| `threeLine`                                                                                                                                                                                                                                                             |

## Field Types

```jsx
const MONGODB = {
  STRING: 'String',
  EMAIL: 'Email',
  NUMBER: 'Number',
  BOOL: 'Boolean',
  ARRAY: 'Array',
  JSON: 'JSON',
  MIXED: 'Mixed',
  DATE: 'Date',
  BUFFER: 'Buffer',
  MAP: 'Map',
  OBJECTID: 'ObjectId',
  VIRTUAL_RELATION: 'virtualRelation',
  SINGLELINE: 'SingleLine',
  MULTILINE: 'MultiLine',
  URL: 'URL',
  DECIMAL: 'Decimal',
  PERCENT: 'Percentage',
  POINT: 'Point',
};

const POSTGRESQL = {
  STRING: 'STRING',
  TEXT: 'TEXT',
  CHAR: 'CHAR',
  BOOL: 'BOOLEAN',
  INTEGER: 'INTEGER',
  BIGINT: 'BIGINT',
  FLOAT: 'FLOAT',
  REAL: 'REAL',
  DOUBLE: 'DOUBLE',
  DECIMAL: 'DECIMAL',
  DATE: 'DATE',
  DATEONLY: 'DATEONLY',
  UUID: 'UUID',
  UUIDV4: 'UUIDV4',
  BLOB: 'BLOB',
  ENUM: 'ENUM',
  JSON: 'JSON',
  JSONB: 'JSONB',
  ARRAY: 'ARRAY',
  GEOMETRY: 'GEOMETRY',
  GEOGRAPHY: 'GEOGRAPHY',
  RANGE: 'RANGE',
};

const MYSQL = {
  STRING: 'STRING',
  TEXT: 'TEXT',
  CHAR: 'CHAR',
  BOOL: 'BOOLEAN',
  INTEGER: 'INTEGER',
  BIGINT: 'BIGINT',
  FLOAT: 'FLOAT',
  REAL: 'REAL',
  DOUBLE: 'DOUBLE',
  DECIMAL: 'DECIMAL',
  DATE: 'DATE',
  DATEONLY: 'DATEONLY',
  ENUM: 'ENUM',
  JSON: 'JSON',
  GEOMETRY: 'GEOMETRY',
  GEOGRAPHY: 'GEOGRAPHY',
};

const SQL = {
  STRING: 'STRING',
  TEXT: 'TEXT',
  CHAR: 'CHAR',
  BOOL: 'BOOLEAN',
  INTEGER: 'INTEGER',
  BIGINT: 'BIGINT',
  FLOAT: 'FLOAT',
  REAL: 'REAL',
  DOUBLE: 'DOUBLE',
  DECIMAL: 'DECIMAL',
  DATE: 'DATE',
  DATEONLY: 'DATEONLY',
  ENUM: 'ENUM',
};

```


## Customization

You can overrride the default behaviour of widgets by
passing your own custom widgets

```jsx

// src/widgets.jsx
import React from 'react';
import { FormGroup, Label, Input, FormFeedback } from './components/common'

// Custom input widget

// Must be forward ref, to let form access fields,
// to trigger focus on validation.
const InputWidget = React.forwardRef(({ 
  name, // unique name
  displayName, // label value
  error, // field validation errors
  onChange, 
  onBlur,
  value
  ...rest // contains all other attributes passed to field in schema 
  }, ref) => {

  return (
    <FormGroup>
      <Label className="mb-2">{ displayName || name }</Label>
      <Input invalid={!!error} type={name.toLowerCase() === 'password' ? 'password' : 'text'} name={name}  placeholder={displayName || name} {...rest} ref={ref} />
      {
        error &&
        <FormFeedback>{ error.message }</FormFeedback>
      }
    </FormGroup>
  )
});

export { InputWidget };

```

## Demo
check out our working demo [here](https://codesandbox.io/s/react-json-form-example-9700n?file=/src/schema.js)

## License

MIT © [](https://github.com/)

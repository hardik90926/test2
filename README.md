
	
<div>
  <h1 align="center">Getting Started with React Admin Panel 🚀 </h1>
  <strong>
    Generated with ❤️ from Dhiwise
  </strong>
  <p>
    This is the documentation of React Admin Panel.
    It holds all the info you need to get started with
    and make changes to your Admin Panel
  </p>
</div>


# Prerequisites

- Basic knowledge of [React](https://reactjs.org/docs/getting-started.html)
- [React Query](https://react-query.tanstack.com/overview)
- [React Table](https://react-table.tanstack.com/docs/overview)

# System Requirements

- [git](https://git-scm.com/) - v2.13 or greater
- [NodeJS](https://nodejs.org/en/) - `12 || 14 `
- [npm](https://www.npmjs.com/) - v6 or greater

# Setup
Setup you project by running the following commands.
## Install Dependencies
    npm install

## .env file
This file contains various environment variables that you can configure.

**PORT** - Port to run your frontend on \
**REACT_APP_DATABASE_TYPE** - Type of Database being used. \
**REACT_APP_SERVICE_URL** - Backend API URL. \
**REACT_APP_IS_MOCKING** - Set this to `true` is you want to see fakeData, no backend required. Set it to `false` if you want to connect to a backend API.

## Note
Please refer to node application's **README.MD** for login credentials (Use admin credentials only)
The React Admin Panel initially runs on mock data. To connect to the back end, please change **REACT_APP_IS_MOCKING** to `false` and assign `URL` to **REACT_APP_SERVICE_URL**  in the .env

## Running the App
    npm start

# Folder Structure

```
├── public
│   └── assets
│       └── css // Styling Assets
└── src
    ├── api // Holds Api Client & Configs
    ├── assets
    │   ├── fonts // Fonts Used
    │   ├── images // Static Image assets
    │   └── scss
    │       ├── theme // SCSS Files to our theme
    ├── components
    │   ├── AssignRole
    │   ├── common // List of Common Components
    │   │   ├── AddDrawer
    │   │   ├── Button
    │   │   ├── Confirmation
    │   │   ├── EditDrawer
    │   │   ├── EditPopup
    │   │   ├── FileViewer
    │   │   ├── Header
    │   │   ├── Pop
    │   │   ├── PopoverComponent
    │   │   ├── Popup
    │   │   ├── Sidebar
    │   │   ├── Viewcomponent
    │   │   └── ViewDetails
    │   ├── Form // Some common fomr Components
    │   └── Table // All Components used by Table
    ├── constant // Constants
    ├── hooks // custom hooks
    ├── pages // All pages of our Admin Panel
    │   ├── auth // Login and other Auth Pages
    │   ├── Cases
    │   ├── Dashboard
    │   ├── Doctor
    │   ├── errors
    │   ├── Patient
    │   └── User
    ├── queries // React Query custom hooks
    ├── redux // Our Redux Setup
    │   └── reducers
    ├── services // All APi Functions
    └── utils // Helpful utils

```

 --- Folder Structure Description ---

# Model Files

## ModelNameTable.jsx
Eg: src/pages/Cases/CasesTable.jsx

These files contain the Listing table of the model. All the columns and various settings are passed from `schema.actions.listing`.

This file also contains:
  - API call to load Data
  - Pagination
  - Search & Sort
  - Filtering Queries

This file accepts `onAdd, onEdit, onDelete, onView` function as props for containers.

<hr />

## ModelName.jsx
Eg: src/pages/Cases/Cases.jsx

These files are the wrappers above the tables containing other components.

Apart from ModelTable, these files also hold the `AddDrawer` & `EditDrawer` components responsible for Add and Edit Forms.

You can read more about our form [here](https://www.npmjs.com/package/@dhiwise/core-ui).

The form uses `schema.actions.addEdit` && `schema.screenLayout` to render the UI.

Finally it also contains a Delete modal as well.


<hr />

## ModelNameContainer.jsx
Eg: src/pages/Cases/CasesContainer.jsx

These are the wrapper components responsible for providing api function to its' children. These use custom hooks to create apiFunctions.

This separates our api implementations from UI Logic and can be very helpful incase we wanna switch api clients and remove/customize the custom hooks.


<hr />

## ModelNameDetail.jsx
Eg: src/pages/Cases/CasesDetail.jsx

These files are the Detail pages of the Models, they contain all the code
required to render the detail page of any model.

The use `schema.actions.detailView` portion of the schema to render ui.

They have two parts:
 - ViewDetail - Contains code to render details of a praticular item.
 - ModelTables - Render tables in tabs on any Relational Files(One to Many)

# Schema Definitions
```jsx
{
  name: "Cases" // Model Name
  attributes: [
    // all model attributes
    {
      attrName: "test",  // unique field Name
      type: "Boolean", // field Type
    }
  ],
  screenLayout: {
    singlePageForm: "doubleLine" // columns in form
    listing: {
      // Listing Layout flags
      ...
    },
    loader: "lazyLoading" // loader type skeleton | lazy
  },
  actions: [
    // Action specific attributes from Step 3
    {
      category: "addEdit",
      attributes: [
        // attributes used in Add/Edit form
        ...
      ]
    },
    {
      category: "listing",
      attributes: [
        // attributes used as table columns
        ...
      ],
    },
    {
      category: "detailView",
      attributes: [
        // attributes used in details page
        ...
      ]
    }
  ]
}
```

# Table Component

| Property                                                     | Description                        | Type     | Default Value |
|--------------------------------------------------------------|------------------------------------|----------|---------------|
| appliedFilters                                               | Filters applied on table           | Array    | `[]`          |
| initialState                                                 | Initail Table Context              | Object   | `{}`          |
| columns                                                      | Table columns                      | Array    | `[]`          |
| data                                                         | Table Data                         | Array    | `[]`          |
| applyFilters                                                 | Manually set filters               | function | `() => {}`    |
| allowRowSelection                                            | Flag - Row Selection               | boolean  | false         |
| allowTotalCount                                              | Flag - Show/Hide Total Count       | boolean  | false         |
| globalSearch                                                 | Flag - Global Search               | boolean  | false         |
| paginate                                                     | Flag - Show/Hide Pagination        | boolean  | false         |
| allowSorting                                                 | Flag - Sorting                     | boolean  | false         |
| allowColResize                                               | Flag - Column Resize               | boolean  | false         |
| allowColVisibility                                           | Flag - Visible Columns Picker      | boolean  | false         |
| isMocking                                                    | Flag - `true` for test env         | boolean  | false         |
| pageLimit                                                    | Pages Limit                        | number   | 10            |
| onAdd, onEdit, onView, onDelete, onMultiDelete, onAssignRole | CRUD Api functions                 | function |               |
| paginationProps                                              | Pagination data from API           | Object   | `{}`          |
| onPageChange                                                 | Api function  to get new page data | function | `() => {}`    |
| onLimitChange                                                | Update Page Limit API              | function | `() => {}`    |
# Add Drawer Component :

| Property |     Description      |   Type   | Default Value |
| :------- | :------------------: | :------: | :-----------: |
| onSubmit | Handle submit action | Function |       -       |
| schema   |     Modal Schema     |   JSON   |       -       |
| open     |   Show/Hide drawer   | Boolean  |     false     |
| onClose  | Handle close action  | Function |       -       |

# Edit Drawer Component :

| Property    |     Description      |   Type   | Default Value |
| :---------- | :------------------: | :------: | :-----------: |
| onSubmit    | Handle submit action | Function |       -       |
| schema      |     Modal Schema     |   JSON   |       -       |
| open        |   Show/Hide drawer   | Boolean  |     false     |
| onClose     | Handle close action  | Function |       -       |
| currentData |     Current Data     |   JSON   |       -       |

# Queries

Eg: src/pages/queries/<ModelName>.queries.js

These files contain custom hooks made for api call. A new file is made of every model. The hooks are made using `react-query`. This helps us to improve performance by `caching` api data. You can learn more about `react-query` [here](https://react-query.tanstack.com/overview).

# API Configs and Constants

src/api/config.js

This file contians our `BASE_URL`  and all other API routes for every model. These are used by api funcitons defined in queries.

src/api/client.js

This file contains our `apiClient`, currently we are using `axios` for our client, but you are free to change it to anything else like `fetch`.

# Webpack Setup

This project uses **Webpack 5** \
The project has a custom defined webpack config. `webpack.config.development.js` contains all the development environment setup. It contains most of the commonly used loaders setup right out of the box. \

For production build `webpack.config.production.js` is used. It has optimized loaders most commonly suggested. You can create a production build by running:

    npm run build



#### By default Admin panel will be running with mock data environment,
which means your admin panel will not be connected with backend.
So to connect your admin panel with backend APIs,
just change `REACT_APP_IS_MOCKING` to false in .env file.

#### If you don't have server running in local system
and want to use deployed sandbox environment,
then change `REACT_APP_SERVICE_URL` to afa13b-ongo-sandbox.dhiwise.co in .env file.
        

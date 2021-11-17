
    import React from "react";
    import { generateQueryFromFilters,getSchemaOptions } from "../../api/general";
    import Loader from "../../components/common/Loader";
    import SkeletonLoader from "../../components/common/SkeletonLoader";
    import SchemaTable from "../../components/Table/SchemaTable";
    import { useUserList } from "../../queries/User.queries";

    import ModelJsonSchema from "./User.schema.json";
    
    const tableSchema = ModelJsonSchema.actions.find(
      (action) => action.category === "listing"
    );
    
    const UserTable = ({
      mockData = [],
      onAdd,
      onEdit,
      onView,
      onDelete,
      onMultiDelete,
      onAssignRole,
      onCustomActionClick = () => {},
    
      noAdd,
      noEdit,
      noDelete,
      noView,
    
      queryOptions = {},
    }) => {
      const [page, setPage] = React.useState(1);
      const [limit, setLimit] = React.useState(
        ModelJsonSchema?.screenLayout?.listing?.config?.limitSetup || 10
      );
      const [filters, setFilters] = React.useState([]);

      const [tableState, setTableState] = React.useState({});
      const [queryData, setQueryData] = React.useState(() => ({
        query: { isActive: true, isDeleted: false },
        options: {
          ...getSchemaOptions(tableSchema,tableState),
          
          },
      }));

      React.useEffect(() => {
        setQueryData({
          options: {
            ...getSchemaOptions(tableSchema,tableState?.sortBy||[]),
          },
        })
      }, [tableState?.sortBy]);

      const { error, data, isLoading } = useUserList({
        query: { isActive: true, isDeleted: false, ...queryData.query, ...queryOptions },
        options: { page, limit, ...queryData.options } ,
      });

      const applyFilters = (data) => {
        setQueryData({
          query: {
            ...generateQueryFromFilters(data?.filters),
            isActive: true,
            isDeleted: false,
            },
          options: {
            ...getSchemaOptions(tableSchema),
            
            }
        });
        setFilters(data?.filters?.map((filter, index) => ({ id: index, ...filter  })) || []);
      };

      const onPageChange = React.useCallback((pageIndex) => {
        pageIndex >= 0 && setPage(pageIndex + 1);
      }, []);
    
      const onLimitChange = React.useCallback((pageLimit) => {
        setLimit(pageLimit);
      }, []);
    
      if (isLoading)
        return ModelJsonSchema?.screenLayout?.loader === "lazyLoading" ? (
          <SkeletonLoader />
        ) : (
          <Loader />
        );
    
      if (error) {
        console.log("error => ", error);
      }
    
      return (
        <SchemaTable
          applyFilters={applyFilters}
          appliedFilters={filters}
          setFilter={setTableState}
          initialState={tableState}
          data={data}
          mockData={mockData}
          schema={ModelJsonSchema}
  
          onAdd={onAdd}
          onEdit={onEdit}
          onDelete={onDelete}
          onMultiDelete={onMultiDelete}
          onAssignRole={onAssignRole}
          onView={onView}
          onCustomActionClick={onCustomActionClick}
  
          noAdd={noAdd}
          noEdit={noEdit}
          noDelete={noDelete}
          noView={noView}
  
          onPageChange={onPageChange}
          onLimitChange={onLimitChange}
        />
      );
    };
    
    export default UserTable; 
    
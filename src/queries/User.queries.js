
  import { useQuery, useQueryClient, useMutation } from "react-query";
  import {listUsers,createUser,updateUser,softDeleteUser,softDeleteMultipleUser,deleteUser,getUserAggregate,getUserById,getUserCount} from '../services/User.service';

  function useUserList(args){
    const { page, limit } = args.options;
    let $and = [],sort = {};

    if(args.query?.$and) {
      $and = { ...args.query?.$and };
    }
    if(args.options?.sort) {
      sort = { ...args.options?.sort };
    }
    return useQuery(["User", { page, limit, $and, sort }],
    ()=>listUsers(args))
  }
  
  function useUserCreate(){
    const queryClient = useQueryClient();
    return useMutation(
      record => createUser(record),
      {
        onMutate: async (newRecord) => {
          await queryClient.cancelQueries(['User']);
    
          const previousValue = queryClient.getQueryData(['User']) || [];
    
          queryClient.setQueryData(['User'], () => [...previousValue, newRecord]);
          return previousValue;
        },
        // On failure, roll back to the previous value
        onError: (err, variables, previousValue) =>
          queryClient.setQueryData(['User'], previousValue),
        // After success or failure, refetch the Users query
        onSettled: () => {
          queryClient.invalidateQueries(['User']);
        },
      }
    )
  }
  
  function useUserUpdate(){
    const queryClient = useQueryClient();
    return useMutation(
      record => updateUser(record),
      {
        onMutate: async (updatedData) => {
          await queryClient.cancelQueries(['User']);
  
          const previousValue = queryClient.getQueryData(['User']);
  
          queryClient.setQueryData(['User'], (old) => {
            return old?.map((oldData) => {
              if (oldData.id === updatedData.id) return updatedData;
              else return oldData;
            });
          });
          return previousValue;
        },
  
        // On failure, roll back to the previous value
        onError: (err, variables, previousValue) =>
          queryClient.setQueryData(['User'], previousValue),
        // After success or failure, refetch the Users query
        onSettled: () => {
          queryClient.invalidateQueries(['User']);
        },
      }
    )
  }
  
  function useUserSoftDelete() {
    const queryClient = useQueryClient();
    return useMutation(record => softDeleteUser(record),
      {
        onMutate: async (deletedRecord) => {
          await queryClient.cancelQueries(['User']);
  
          const previousValue = queryClient.getQueryData(['User']) || [];
          queryClient.setQueryData(['User'], oldData => previousValue.filter(record => record.id !== deletedRecord.id));
          return previousValue;
        },
  
        // On failure, roll back to the previous value
        onError: (err, variables, previousValue) =>
          queryClient.setQueryData(['User'], previousValue),
        // After success or failure, refetch the Users query
        onSettled: () => {
          queryClient.invalidateQueries(['User']);
        },
      }
    );
  }

  function useUserMultipleSoftDelete() {
    const queryClient = useQueryClient();
    return useMutation(record => softDeleteMultipleUser(record),
      {
        onMutate: async (deletedRecord) => {
          await queryClient.cancelQueries(['User']);
  
          const previousValue = queryClient.getQueryData(['User']) || [];
          queryClient.setQueryData(['User'], oldData => previousValue.filter(record => !deletedRecord.ids.includes(record.id)));
          return previousValue;
        },
  
        // On failure, roll back to the previous value
        onError: (err, variables, previousValue) =>
          queryClient.setQueryData(['User'], previousValue),
        // After success or failure, refetch the Users query
        onSettled: () => {
          queryClient.invalidateQueries(['User']);
        },
      }
    );
  }
  
  function useUserDelete() {
    const queryClient = useQueryClient();
    return useMutation(record => deleteUser(record),
    {
        onMutate: async (deletedRecord) => {
          await queryClient.cancelQueries(['User']);
  
          const previousValue = queryClient.getQueryData(['User']) || [];
          queryClient.setQueryData(['User'], oldData => previousValue.filter(record => record.id !== deletedRecord.id));
          return previousValue;
        },
  
        // On failure, roll back to the previous value
        onError: (err, variables, previousValue) =>
          queryClient.setQueryData(['User'], previousValue),
        // After success or failure, refetch the Users query
        onSettled: () => {
          queryClient.invalidateQueries(['User']);
        },
      }
    );
  }
  
  function useUserCount() {
    return useQuery(["UserCount"],()=>{
      return getUserCount();
    })
  }
  
  function useUserAggregate(record) {
    return useQuery("User", () => {
      return getUserAggregate(record);
    });
  }
  
  function useUserGetById(id) {
    return useQuery(['User',id], () => {
      return getUserById(id);
    }
    );
  }
  
  export {
    useUserList,
    useUserCreate,
    useUserUpdate,
    useUserDelete,
    useUserMultipleSoftDelete,
    useUserCount,
    useUserSoftDelete,
    useUserAggregate,
    useUserGetById,
  };
  
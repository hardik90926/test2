
    import React from 'react';
    import { useUserCreate, useUserSoftDelete,useUserMultipleSoftDelete, useUserUpdate } from '../../queries/User.queries';
    import User from './User';
    
    const UserContainer = () => {
    
      const {mutate:addRecord} = useUserCreate();
      const {mutate:editRecord} = useUserUpdate();
      const {mutate:deleteRecord} = useUserSoftDelete();
      const {mutate:deleteRecords} = useUserMultipleSoftDelete();
    
      const onAddRecord = (record) => {
        return new Promise((resolve,reject) => {
          addRecord(record, {
            onSuccess: async () => resolve('Record created successfully.'),
            onError: async (error) => reject(error?.message),
          });
        })
      };
    
      const onEditRecord = (record) => {
        return new Promise((resolve, reject) => {
          editRecord(
            record,
            {
              onSuccess: async () => resolve('Record updated successfully.'),
              onError: async (error) => reject(error?.message),
            }
          );
        });
      };
    
      const onDeleteRecord = (record) => {
        return new Promise((resolve, reject) => {
          deleteRecord(
            record, 
            {
              onSuccess: async () => resolve('Record deleted successfully.'),
              onError: async (error) => reject(error?.message),
            }
          );
        });
      };

      const onMultiDelete = (record) => {
        return new Promise((resolve, reject) => {
          deleteRecords(
            record, 
            {
              onSuccess: async () => resolve('Records deleted successfully.'),
              onError: async (error) => reject(error?.message),
            }
          );
        });
      };

      return (
        <User 
          addRecord={onAddRecord}
          deleteRecord={onDeleteRecord}
          deleteRecords={onMultiDelete}
          editRecord={onEditRecord}
        />
      )
    }
    
    export default UserContainer;
    
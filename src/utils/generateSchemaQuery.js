import dayjs from 'dayjs';
import { DATABASE_TYPES, CURRENT_DATABASE_TYPE, DATE_FORMAT } from '../constant/common';

export const getSchemaQuery = (schema,{filters=[]}={}) => {
  const queryObj = {};
  if (filters && Array.isArray(filters) && filters.length > 0) {
    queryObj["$or"] = filters.map((col) => {
      const attribute = schema.attributes.find((item) => item.attrName === col.id);
      // Boolean or Enum Types
      if([DATABASE_TYPES?.BOOL].includes(attribute?.type) || attribute?.enum) {
        return({
          [col.id]: {
            $in: col.value.map(item => item?.value),
          },
        });
      }

      // Date Types
      if([DATABASE_TYPES?.DATE, DATABASE_TYPES?.DATEONLY].includes(attribute?.type)) {
        return({
          [col.id]: {
            $gte: dayjs(col.value[0]).format(DATE_FORMAT),
            $lte: dayjs(col.value[1]).format(DATE_FORMAT),
          }
        });
      }

      // Number Types
      if([DATABASE_TYPES?.NUMBER].includes(attribute?.type)) {
        return ({
          [col.id]: {
            $gt: col.value[0] || 0,
            $lt: col.value[1] || 0,
          },
        });
      }

      // String Types
      return ({
        [col.id]: {
          $regex: col.value,
          $options: "i",
        },
      });
    });
  }
  return queryObj
}

export const getSchemaOptions = (schema,{sortBy=[]}={}) => {
  const queryObj = {};
  if (sortBy && Array.isArray(sortBy) && sortBy.length > 0) {
    queryObj['sort'] = {};
    sortBy.forEach(col => {
      queryObj['sort'][col.id] = col.desc ? -1 : 1;
    });
  }

  let relations = schema.attributes.filter(item => item.type === "ObjectId")
  if(relations && relations.length > 0) {
    queryObj['populate'] = relations.map(item => ({path:item.attrName, select:item.displayAttribute}))
  }
  return queryObj
}

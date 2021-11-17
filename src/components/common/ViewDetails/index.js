import React from "react";
import { apiClient } from "../../../api/client";
import { API_URLS } from "../../../api/config";
import { DATABASE_TYPES, CURRENT_DATABASE_TYPE, STATUS } from "../../../constant/common";
import { useParams } from "react-router";
import { errorToast } from "../../../utils/notifications";
import { ViewComponent } from "../Viewcomponent";
import detailViewFilter from "../../../utils/detailViewFilter";
import { getSchemaOptions } from "../../../api/general";
export const ViewDetails = ({
  getDetails,
  modelName,
  schemaJson,
  apiURL = ""
}) => {
  const params = useParams();
  const recordID = params.id;
  const [data, setData] = React.useState({});
  const detailViewSchema = React.useMemo(() => {
    let detailAttributes = schemaJson?.actions?.find(a => a.category === "detailView");
    detailAttributes = detailAttributes ? detailAttributes?.attributes : [];
    return detailViewFilter(detailAttributes);
  }, [schemaJson]);
  React.useEffect(() => {
    getDetails({
      query: {
        _id: recordID,
        isActive: true,
        isDeleted: false
      },
      options: { ...getSchemaOptions({
          attributes: detailViewSchema
        })
      }
    }).then(res => {
      setData(res.data?.find(record => record.id.toString() === recordID.toString()) || {});
    }).catch(err => errorToast(err));
  }, [modelName, recordID, apiURL]);
  return <div className="viewBoxWrap">
      {data && typeof data === "object" ? detailViewSchema?.map((attribute, i) => <React.Fragment key={`record-${i}`}>
                <div className="viewBox">
                <ViewComponent attribute={attribute} data={data} />
                </div>
              </React.Fragment>) : "No Data Found"}
    </div>;
};

    import React from "react";
    import { useParams } from "react-router";
    import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
    import { formatLabel } from "../../utils/utils";
    import { ViewDetails } from "../../components/common/ViewDetails";
    import schemaJson from "./User.schema.json";
    
    import { listUsers } from "../../services/User.service";
    
    const UserDetails = ({ apiURL = "" }) => {
      const [BottomLineTab, setBottomLineTab] = React.useState("1");
      const params = useParams();
      const recordID = params.id;
    
      const modelName = formatLabel(schemaJson?.name);
    
      return (
        <div className="pageDetailView flex-column d-flex">
          <div className="py-2 px-2 mb-2 pageHead">
            <h4 className="mb-0">View {modelName} Record</h4>
          </div>
          <ViewDetails getDetails={listUsers} apiURL={apiURL} modelName={schemaJson?.name} schemaJson={schemaJson} />
          <div className="d-flex flex-column flex-grow-1 h-0">
            <Nav className="border-tab mb-0" tabs>
            

            </Nav>
            <TabContent activeTab={BottomLineTab} className="flex-grow-1 h-0">

            
              
            </TabContent>
          </div>
        </div>
      );
    };
    
    export default UserDetails;
    
    
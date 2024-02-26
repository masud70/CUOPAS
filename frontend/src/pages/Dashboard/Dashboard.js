import React from "react";
import Activity from "../../Components/Activity/Activity";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <>
      <div className="bg-light row-1 px-2 mt-2 divider d-flex justify-content-center align-items-center flex-wrap-wrap flex-direction-row">
        <div className="h5">Welcome To University of Chittagong</div>
      </div>
      <div className="row-2 row">
        <Activity
          title="Payment"
          icon="fab fa-cc-amazon-pay activityIcon"
          link="/payment"
        />
        <Activity
          title="My Class"
          icon="fas fa-list-alt activityIcon"
          link="/myClass"
        />
        <Activity
          title="User"
          icon="fas fa-user-tie activityIcon"
          link="/user"
        />
      </div>
    </>
  );
};

export default Dashboard;

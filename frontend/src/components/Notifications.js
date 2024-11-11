import React, { useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import "./Notifications.css";

function Notifications() {
  const [activeTab, setActiveTab] = useState("unseen");
  const { user } = useSelector((state) => state.user);

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Layout>
      <h1 className="page-title">Notifications</h1>
      <div className="tabs">
        <button
          className={activeTab === "unseen" ? "active-tab" : ""}
          onClick={() => switchTab("unseen")}
        >
          Unseen
        </button>
        <button
          className={activeTab === "seen" ? "active-tab" : ""}
          onClick={() => switchTab("seen")}
        >
          Seen
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "unseen" && (
          <div className="d-flex justify-content-end">
            <h1 className="anchor">Mark all as seen</h1>
            
          </div>
        )}
        {activeTab === "seen" && (
          <div className="d-flex justify-content-end">
            <h1 className="anchor">Delete All</h1>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Notifications;

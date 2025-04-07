import React, { useContext, useState, useEffect } from "react";
import StatusContext from "../Context/StatusContext";
import Navbar from "./Navbar";

const Setting = () => {
  const { statuses, setStatuses, defaultStatuses } = useContext(StatusContext);
  const [newStatus, setNewStatus] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const [defaultStatusTracker, setDefaultStatusTracker] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("defaultStatusTracker")) || {};
    defaultStatuses.forEach(status => { if (!saved[status]) saved[status] = status; });
    return saved;
  });

  useEffect(() => {
    localStorage.setItem("defaultStatusTracker", JSON.stringify(defaultStatusTracker));
  }, [defaultStatusTracker]);

  const isDefaultStatus = status => Object.values(defaultStatusTracker).includes(status);
  const isDeletable = status => !isDefaultStatus(status);

  const addStatusHandler = () => {
    const trimmed = newStatus.trim();
    if (trimmed && !statuses.includes(trimmed)) {
      setStatuses(prev => [...prev, trimmed]);
      setNewStatus("");
    }
  };

  const deleteHandler = index => {
    const status = statuses[index];
    if (isDeletable(status)) setStatuses(prev => prev.filter((_, i) => i !== index));
  };

  const startEdit = index => {
    setEditingIndex(index);
    setEditText(statuses[index]);
  };

  const saveEdit = index => {
    const oldStatus = statuses[index];
    const newStatusText = editText.trim();

    if (newStatusText && !statuses.some((s, i) => i !== index && s === newStatusText)) {
      setStatuses(prev => prev.map((item, i) => (i === index ? newStatusText : item)));

      if (isDefaultStatus(oldStatus)) {
        setDefaultStatusTracker(prev => {
          const updated = { ...prev };
          const originalKey = Object.keys(prev).find(key => prev[key] === oldStatus) || oldStatus;
          updated[originalKey] = newStatusText;
          return updated;
        });
      }
      setEditingIndex(null);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-1">
        <h2>Manage Task Statuses</h2>
        <div className="big-box">
          <div className="newcontain">
            <h3>Existing Statuses</h3>
            <ul className="status-list">
              {statuses.map((status, index) => (
                <li key={index} className="status-item">
                  {editingIndex === index ? (
                    <input
                      className="editText"
                      type="text"
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && saveEdit(index)}
                    />
                  ) : (
                    <span className="new-item">
                      {status}
                      {isDefaultStatus(status) && <span className="default-badge"></span>}
                    </span>
                  )}
                  <span className="buttons">
                    {editingIndex === index ? (
                      <button className="save" onClick={() => saveEdit(index)}>Save</button>
                    ) : (
                      <button className="rename" onClick={() => startEdit(index)}>Rename</button>
                    )}
                    {isDeletable(status) && (
                      <button className="delete" onClick={() => deleteHandler(index)}>Delete</button>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="add-status">
            <h3>Add New Status</h3>
            <input
              type="text"
              placeholder="Status Name"
              value={newStatus}
              onChange={e => setNewStatus(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addStatusHandler()}
            />
            <button
              onClick={addStatusHandler}
              className="add-button"
              disabled={!newStatus.trim() || statuses.includes(newStatus.trim())}
            >
              Add Status
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;

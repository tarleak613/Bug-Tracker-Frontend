import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function BugList() {
  const [bugs, setBugs] = useState([]);
  const [severity, setSeverity] = useState("");
  const [status, setStatus] = useState("");

  const fetchBugs = async () => {
    const params = {};
    if (severity) params.severity = severity;
    if (status) params.status = status;

    const res = await API.get("/bugs", { params });
    setBugs(res.data);
  };

  useEffect(() => {
    fetchBugs();
  }, [severity, status]);

  const changeStatus = async (id, newStatus) => {
    await API.put(`/bugs/${id}/status`, { status: newStatus });
    fetchBugs();
  };

  const getNextAction = (currentStatus) => {
    switch (currentStatus) {
      case "NEW":
        return { label: "Start", next: "IN_PROGRESS" };
      case "IN_PROGRESS":
        return { label: "Fix", next: "FIXED" };
      case "FIXED":
        return { label: "Verify", next: "VERIFIED" };
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Bugs</h2>

      {/* Filters */}
      <div>
        <select value={severity} onChange={e => setSeverity(e.target.value)}>
          <option value="">All Severities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="NEW">New</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="FIXED">Fixed</option>
          <option value="VERIFIED">Verified</option>
        </select>
      </div>

      {/* Bugs Table */}
      <table border="1" cellPadding="5" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Severity</th>
            <th>Status</th>
            <th>Assignee</th>
            <th>Actions</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {bugs.map(bug => {
            const action = getNextAction(bug.status);
            return (
              <tr key={bug.id}>
                <td><Link to={`/bugs/${bug.id}`}>{bug.title}</Link></td>
                <td>{bug.severity}</td>
                <td>{bug.status}</td>
                <td>{bug.assigneeId ? `User ${bug.assigneeId}` : "Unassigned"}</td>
                <td>
                  {action && (
                    <button onClick={() => changeStatus(bug.id, action.next)}>
                      {action.label}
                    </button>
                  )}
                </td>
                <td>{new Date(bug.createdAt).toLocaleString()}</td>
                <td>{new Date(bug.updatedAt).toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

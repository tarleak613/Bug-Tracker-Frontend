import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function NewBug() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("LOW");
  const [assigneeId, setAssigneeId] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      await API.post("/bugs", { title, description, severity, status: "NEW", assigneeId: Number(assigneeId) });
      alert("Bug created!");
      navigate("/bugs");
    } catch (err) {
      alert("Failed to create bug");
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>Create New Bug</h2>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <select value={severity} onChange={e => setSeverity(e.target.value)}>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>
      <input placeholder="Assignee ID" value={assigneeId} onChange={e => setAssigneeId(e.target.value)} />
      <button onClick={handleCreate}>Create Bug</button>
    </div>
  );
}

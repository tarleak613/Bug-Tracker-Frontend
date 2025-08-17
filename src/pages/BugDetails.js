import { useEffect, useState } from "react";
import API from "../api";
import { useParams } from "react-router-dom";

export default function BugDetail() {
  const { id } = useParams();
  const [bug, setBug] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchBug = async () => {
    const res = await API.get(`/bugs/${id}`);
    setBug(res.data);
  };

  const fetchComments = async () => {
    const res = await API.get(`/bugs/${id}/comments`);
    setComments(res.data);
  };

  const handleAddComment = async () => {
    await API.post(`/bugs/${id}/comments`, { authorId: 1, body: newComment });
    setNewComment("");
    fetchComments();
  };

  useEffect(() => {
    fetchBug();
    fetchComments();
  }, [id]);

  if (!bug) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{bug.title}</h2>
      <p><strong>Description:</strong> {bug.description}</p>
      <p><strong>Severity:</strong> {bug.severity}</p>
      <p><strong>Status:</strong> {bug.status}</p>
      <p><strong>Assignee ID:</strong> {bug.assigneeId}</p>

      <h3>Comments</h3>
      <ul>
        {comments.map(c => <li key={c.id}>{c.body} (Author {c.authorId})</li>)}
      </ul>

      <textarea value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Add comment" />
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
}

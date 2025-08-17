import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1> Bug Tracker</h1>
      <p>Welcome to the Bug Tracker! Choose an option below:</p>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link to="/register"> Register</Link>
        </li>
        <li>
          <Link to="/login"> Login</Link>
        </li>
        <li>
          <Link to="/bugs"> View All Bugs</Link>
        </li>
        <li>
          <Link to="/bugs/new"> Create New Bug</Link>
        </li>
        <li>
          <Link to="/bugs/1"> View Bug Details (example)</Link>
        </li>
      </ul>

      <p style={{ marginTop: 20, fontStyle: "italic" }}>
        ⚠️ For Update/Delete you’ll normally navigate into a specific bug’s detail
        page, then perform actions there.
        <ul>
        <li>hosting-link/{`{id}`}/edit</li>
        <li>hosting-link/{`{id}`}/update</li>
        </ul>
      </p>
    </div>
  );
}
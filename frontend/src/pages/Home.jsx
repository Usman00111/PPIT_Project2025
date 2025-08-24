import { Link } from "react-router-dom";
export default function Home(){ return (<div>
  <h1>Welcome to Ballaghaderreen Grocery</h1>
  <p>Shop fresh groceries online.</p>
  <Link to="/products">Browse Products →</Link>
</div>); }

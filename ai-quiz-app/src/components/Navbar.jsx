import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 w-full bg-white shadow-md p-4 flex justify-between">
      <h1 className="font-bold">AI Quiz App</h1>

      <button onClick={() => navigate("/")} className="text-sm">
        Home
      </button>
    </div>
  );
}

import {  useNavigate } from "react-router-dom";

 function NotFound() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6f1e7] text-center px-4">
      <h1 className="text-6xl font-bold text-[#5b4636] mb-4">404</h1>
      <p className="text-xl mb-6 text-[#5b4636]">
        Oops! The page you're looking for doesn’t exist.
      </p>

      <button
        onClick={() => navigate(-1)}
        className="px-6 py-3 rounded text-white"
        style={{ backgroundColor: "#bfa98a" }}
      >
        Go Back
      </button>
    </div>
  );
}
export default NotFound;

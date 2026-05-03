import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-app py-24 text-center">
      <div className="text-8xl mb-6">🗺️</div>
      <h1 className="font-display font-extrabold text-5xl text-gray-900 mb-3">404</h1>
      <p className="text-xl text-gray-600 mb-2 font-medium">Page not found</p>
      <p className="text-gray-400 mb-10 max-w-sm mx-auto">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => window.history.back()}
          className="btn-ghost border border-gray-200"
        >
          <ArrowLeft size={15} /> Go back
        </button>
        <Link to="/" className="btn-primary">
          <Home size={15} /> Home
        </Link>
      </div>
    </div>
  );
}
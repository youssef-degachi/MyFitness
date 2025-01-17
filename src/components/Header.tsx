import { useEffect } from "react";
import {
  Link,
  createRootRoute,
  useNavigate,
} from "@tanstack/react-router";

export const Route = createRootRoute({
  component: Header,
});

function Header() {
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
  }, []);
  const changURL = useNavigate();
  const logout = () => {
    localStorage.clear();
    changURL("/login");
  };
  return (
    <header className="bg-gray-800 shadow-xl">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          <span className="text-gray-300">My</span>
          <span className="text-white">Fitness</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/exercise" className="text-white">
                Exercise
              </Link>
            </li>
            {userId ? (
              <li>
                <Link href="/login" onClick={logout} className="text-white">
                  logout
                </Link>
              </li>
            ) : (
              <li>
                <Link href="/login" className="text-white">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

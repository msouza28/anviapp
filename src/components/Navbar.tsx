import { Link, useNavigate } from "react-router-dom";
import anviLogo from "../assets/images/anviLogo.svg"
import { useAuth } from "@clerk/clerk-react";
import SingOutClerk from "./SingOutClerk";
import SingOutDb from "./SingOutDb";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { getStoredUsuario } from "../service/UsuarioService";
import { HashLink } from "react-router-hash-link";

interface NavBarProps {
  fixed: boolean;
  isCriadoresPage: boolean;
}
const NavBar: React.FC<NavBarProps> = ({ fixed , isCriadoresPage}) =>{
 
  const navigate = useNavigate()
  const { userId } = useAuth()

  const isLoggedIn =  localStorage.getItem('isLoggedIn') === 'true';
  const usuario = getStoredUsuario();

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const [showLinks, setShowLinks] = useState(false);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const navBarClass = isLoggedIn || userId
    ? "flex items-center justify-center mr-14 md:mr-15 lg:mr-32 se:mr-3 se:-ml-4 overflow-hidden sm:overflow-visible"
    : "flex items-center justify-center mr-14 se:mr-3 se:-ml-4 overflow-hidden sm:overflow-visible";

  return (
    <nav className={`${fixed || isCriadoresPage ? 'fixed top-0 left-0 w-full sm:max-w-full bg-bgCustom z-50 p-2' : 'bg-bgCustom p-2'}`}>
      <div className="max-w-9xl mx-4 mt-4 flex  items-center se:mx-0">
        <div className="flex items-center flex-shrink-0 text-white ">
          {fixed ? (
            <HashLink to="#top">
              <img src={anviLogo} alt="Logo" className="h-10 " />
            </HashLink>
          ) : (
            <Link to="/">
              <img src={anviLogo} alt="Logo" className="h-10 " />
            </Link>
          )}
        </div>

        <div className="flex-grow text-center ">
          <div
            className={`${navBarClass} ${
              showLinks ? "max-w-full" : "max-w-0 sm:max-w-full"
            } transition-max-width duration-500 ease-in-out`}
          >
            {!isLoggedIn && !userId && (
              <>
                <Link
                  to="/login"
                  className="px-2 md:px-3 py-2 rounded-md text-sm font-normal text-white sm:text-base sm:font-medium hover:bg-gray-700 transition-transform"
                >
                  Login
                </Link>

                {fixed ? (
                  <HashLink
                    smooth
                    to="#sobre"
                    className="px-2 md:px-3 py-2 rounded-md text-sm font-normal text-white sm:text-base sm:font-medium hover:bg-gray-700 transition-transform"
                  >
                    Sobre
                  </HashLink>
                ) : (
                  <Link
                    to="/"
                    className="px-2 md:px-3 py-2 rounded-md text-sm font-normal text-white sm:text-base sm:font-medium hover:bg-gray-700 transition-transform"
                  >
                    Homepage
                  </Link>
                )}

                <HashLink
                  to="/criadores#top"
                  className="px-2 md:px-3 py-2 rounded-md text-sm font-normal text-white sm:text-base sm:font-medium hover:bg-gray-700 transition-transform"
                >
                  Criadores
                </HashLink>
              </>
            )}

            {userId && (
              <>
                <Link
                  to="/minhasDenuncias"
                  className="px-2 md:px-3 py-2 rounded-md text-sm font-normal text-white sm:text-base sm:font-medium hover:bg-gray-700 transition-transform"
                >
                  Minhas Denuncias
                </Link>

                <Link
                  to="/denunciar"
                  className="px-2 md:px-3 py-2 rounded-md text-sm font-normal text-white sm:text-base sm:font-medium hover:bg-gray-700 transition-transform"
                >
                  Denunciar
                </Link>
                <SingOutClerk />
              </>
            )}

            {isLoggedIn && (
              <>
                {usuario?.isAgentResolucao ? (
                  <Link
                    to="/ocorrencias"
                    className="px-2 md:px-3 py-2 rounded-md text-sm font-normal text-white sm:text-base sm:font-medium hover:bg-gray-700 transition-transform"
                  >
                    Ocorrências
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/minhasDenuncias"
                      className="px-2  py-2 rounded-md text-sm font-normal text-white sm:text-base sm:font-medium hover:bg-gray-700 transition-transform"
                    >
                      Minhas Denuncias
                    </Link>
                    <Link
                      to="/denunciar"
                      className="px-2 py-2 rounded-md text-sm font-normal text-white sm:text-base sm:font-medium hover:bg-gray-700 transition-transform"
                    >
                      Denunciar
                    </Link>
                  </>
                )}
                <div className="w-0" onClick={handleSignOut}>
                  <SingOutDb />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center sm:hidden">
          <div
            className="text-whiteCustom focus:outline-none cursor-pointer"
            onClick={toggleLinks}
          >
            <FaBars style={{ fontSize: "24px" }} />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
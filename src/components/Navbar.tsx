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

  return (
    <nav className={`${fixed || isCriadoresPage ? 'fixed top-0 left-0 w-full  sm:max-w-1.5 md:max-w-full bg-bgCustom z-50 p-2' : 'bg-bgCustom p-2'}`}>
      <div className="max-w-9xl mx-4 mt-4 flex justify-between items-center">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
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

        <div className="flex-grow text-center">
          <div
            className={`flex items-center justify-center se:justify-start xr:justify-center overflow-hidden sm:justify-center sm:space-x-4  ${
              showLinks ? "max-w-full" : "max-w-0"
            } transition-max-width duration-500 ease-in-out`}
          >
            {!isLoggedIn && !userId && (
              <>
                <Link
                  to="/login"
                  className={`px-2 md:px-3 py-2 rounded-md text-sm font-normal  text-white sm:text-base sm:font-medium hover:bg-gray-700 transform transition-transform ${
                    showLinks ? "translate-x-0" : "-translate-x-full"
                  }`}
                  style={{
                    transitionDuration: "0.5s",
                    transitionDelay: `${showLinks ? "0s" : "1s"}`,
                  }}
                >
                  Login
                </Link>

                {fixed ? (
                  <HashLink
                    to="#sobre"
                    className={`px-2 md:px-3 py-2 rounded-md text-sm font-normal text-white sm:text-base sm:font-medium hover:bg-gray-700 transform transition-transform ${
                      showLinks ? "translate-x-0" : "-translate-x-full"
                    }`}
                    style={{
                      transitionDuration: "0.5s",
                      transitionDelay: `${showLinks ? "0s" : "2s"}`,
                    }}
                  >
                    Sobre
                  </HashLink>
                ) : (
                  <Link
                    to="/"
                    className={`px-2 md:px-3 py-2 rounded-md text-sm font-normal text-white sm:text-base sm:font-medium hover:bg-gray-700 transform transition-transform ${
                      showLinks ? "translate-x-0" : "-translate-x-full"
                    }`}
                    style={{
                      transitionDuration: "0.5s",
                      transitionDelay: `${showLinks ? "0s" : "2s"}`,
                    }}
                  >
                    Homepage
                  </Link>
                )}

                <HashLink
                  to="/criadores#top"
                  className={`px-2 md:px-3 py-2 rounded-md text-sm font-normal text-white sm:text-base sm:font-medium hover:bg-gray-700 transform transition-transform ${
                    showLinks ? "translate-x-0" : "-translate-x-full"
                  }`}
                  style={{
                    transitionDuration: "0.5s",
                    transitionDelay: `${showLinks ? "0s" : "3s"}`,
                  }}
                >
                  Criadores
                </HashLink>
              </>
            )}

            {userId && (
              <>
                <Link
                  to="/minhasDenuncias"
                  className={`px-2 md:px-3 py-2 rounded-md text-sm font-normal text-white sm:text-base sm:font-medium hover:bg-gray-700 transform transition-transform ${
                    showLinks ? "translate-x-0" : "-translate-x-full"
                  }`}
                  style={{
                    transitionDuration: "0.5s",
                    transitionDelay: `${showLinks ? "0s" : "1s"}`,
                  }}
                >
                  Denuncias
                </Link>

                <Link
                  to="/denunciar"
                  className={`px-2 md:px-3 py-2 rounded-md text-sm font-normal text-white sm:text-base sm:font-medium hover:bg-gray-700 transform transition-transform ${
                    showLinks ? "translate-x-0" : "-translate-x-full"
                  }`}
                  style={{
                    transitionDuration: "0.5s",
                    transitionDelay: `${showLinks ? "0s" : "1s"}`,
                  }}
                >
                  Denunciar
                </Link>
                <SingOutClerk />
              </>
            )}

            {isLoggedIn && (
              <>
                {usuario?.isAgentResolucao ? (
                  <>
                    <Link
                      to="/ocorrencias"
                      className={`px-2 md:px-3 py-2 rounded-md text-sm font-normal text-white sm:text-base sm:font-medium hover:bg-gray-700 transform transition-transform ${
                        showLinks ? "translate-x-0" : "-translate-x-full"
                      }`}
                      style={{transitionDuration: "0.5s",transitionDelay: `${showLinks ? "0s" : "1s"}`, }}
                    >
                      Ocorrências
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/minhasDenuncias"
                      className={`px-2 md:px-3 py-2 rounded-md text-sm font-normal text-white sm:text-base sm:font-medium hover:bg-gray-700 transform transition-transform ${
                        showLinks ? "translate-x-0" : "-translate-x-full"
                      }`}
                      style={{transitionDuration: "0.5s",transitionDelay: `${showLinks ? "0s" : "1s"}`,
                      }}
                    >
                      Denuncias
                    </Link>
                    <Link
                      to="/denunciar"
                      className={`px-2 md:px-3 py-2 rounded-md text-sm font-normal text-white sm:text-base sm:font-medium hover:bg-gray-700 transform transition-transform ${
                        showLinks ? "translate-x-0" : "-translate-x-full"
                      }`}
                      style={{transitionDuration: "0.5s",transitionDelay: `${showLinks ? "0s" : "1s"}`,
                      }}
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

        <div className="flex items-center">
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
}
export default NavBar;
import NavBar from "../components/Navbar";
import {useLocation } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import Equipe from "../components/Equipe";

export default function Criadores(){

const location = useLocation();
const isHomePage = location.pathname === '/';

    return (
      <div className="w-full">
        <NavBar fixed={isHomePage} />
        <div id="top" className="flex flex-col items-center justify-center">
        <div id="equipe" className=" pt-20 mb-28">
        <h2  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-whiteCustom mb-4 sm:mb-6 md:mb-8 lg:mb-10 font-bold text-center px-4 sm:px-6 lg:px-8">
          Nossa equipe
        </h2>
        <Equipe />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-whiteCustom mb-4 sm:mb-6 md:mb-8 lg:mb-10 font-bold text-center px-4 sm:px-6 lg:px-8 ">
          Contato
        </h2>
        <div className="flex justify-center items-center w-full h-800px px-4 sm:px-6 lg:px-8 mb-10">
          <ContactForm />
        </div>
      </div>
      </div>
    );
}

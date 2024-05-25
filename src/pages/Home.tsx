import FAQ from "../components/FAQ";
import NavBar from "../components/Navbar";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import MapaInterativo from "../components/MapaInterativo";
import CardSlider from "../components/CardSlider";
import Sumario from "../components/Sumario";
import Footer from "../components/Footer";

export default function Home(){

const location = useLocation();
const isHomePage = location.pathname === '/';


return (
  <div className="w-full">
    <NavBar fixed={isHomePage} isCriadoresPage={false} />
    <div id="top" className="flex flex-col items-center justify-center h-screen max-w-7xl mx-auto pt-14 px-4 sm:px-6 lg:px-8">
      <h1 className="text-center text-whiteCustom mb-4 text-3xl sm:text-4xl sm:mb-6 md:mb-8 md:text-5xl lg:mb-10 lg:text-7xl">
        <strong className="mr-2">Simplificamos</strong> o seu{" "}
        <strong>dever de cidadão</strong> em poucos cliques!
      </h1>
      <HashLink smooth to={"#sobre"}>
        <div className="bg-bgCustom hover:bg-gray-700 text-white text-lg font-bold py-4 px-6 rounded border-2 border-white-600 mt-4 sm:mt-6 md:mt-8">
          <p>Sobre o projeto</p>
        </div>
      </HashLink>
    </div>

    <div id="sobre" className="flex flex-col pt-20 px-4 sm:px-6 lg:flex-row lg:pt-20">
      <div className="flex flex-col sm:mt-24 lg:mt-4 xl:mt-32 ">
        <h2  className="text-3xl flex justify-center text-whiteCustom font-bold text-start pb-5 sm:text-4xl lg:pb-5 ">
          Sobre o projeto
        </h2>
        <div className=" text-lg text-whiteCustom mx-5 sm:mx-10 md:mx-20 lg:mx-5 space-y-3">
        <p >
          AnVigilants é um projeto que visa o fornecimento de um canal de
          denúncias anônimas para que os cidadãos possam denunciar os crimes
          relacionados ao descarte inadequado de lixo.
        </p>
        <p>
          Com AnVigilants, simplificamos o burocrático processo de denúncia
          de descarte de lixo e disponibilizamos as ocorrências em um só
          lugar, onde as autoridades competentes podem atuar na solução do problema.
          </p>
          </div>
      </div>
      <CardSlider/>
    </div>

    <div id="mapa" className="flex flex-col-reverse items-center mt-32 sm:-mb-5 sm:-mt-8 lg:pt-28 xl:pt-16 lg:flex-row gap-10 justify-center h-auto  px-4 pb-10 se:pb-0 sm:pb-10 lg:pb-10 xl:pb-10 sm:px-6  lg:px-20">
      <div className="w-full md:w-3/4 lg:w-3/5 h-auto mb-4   lg:mb-0 mx-auto">
      <MapaInterativo/>
      </div>
      <div className="flex flex-col text-left lg:w-2/5">
        <h2 className=" flex justify-center text-4xl text-whiteCustom font-bold pb-12 sm:text-5xl lg:text-6xl">
          Regiões
        </h2>
        <p className=" pb-12 text-whiteCustom text-xl ml-5 mr-2  md:m-0 sm:text-2xl">
          39 cidades da região metropolitana de São Paulo
          podem receber sua denúncia.
        </p>
        <div className="flex itens-center justify-center sm:-mt-4">
          <Link to={"/login"}>
            <button className=" flex flex-col itens-center justify-center bg-whiteCustom hover:bg-whitePholder text-bgCustom text-center text-xl py-2 px-4 rounded-2xl border-2 font-semibold border-bgCustom">
              Denuncie na sua região
            </button>
          </Link>
        </div>
      </div>
    </div>
    <Sumario/>
    <div className="h-80  mt-32 px-4 sm:px-6 lg:px-8">
      <div className="bg-whiteCustom/5 flex flex-col items-center justify-center py-10 mx-4 rounded-2xl sm:mx-10 ">
        <h2 className="text-xl  text-whiteCustom mb-4 font-bold text-center sm:text-2xl sm:mb-6 md:text-4xl md:mb-8 lg:text-5xl lg:mb-10 ">
          Rápido, simples, eficaz e sem burocracia!
        </h2>
        <Link to={"/cadastro"}>
          <button className="mt-4 bg-whiteCustom hover:bg-whitePholder text-bgCustom text-center text-2xl py-2 px-4 rounded-2xl border-2 font-semibold border-bgCustom">
            Cadastre-se
          </button>
        </Link>
      </div>
    </div>

    <div className="bg-bgCustom px-4 py-10 sm:px-6 lg:px-20">
      <h2 className="text-2xl text-whiteCustom my-6 font-bold text-start sm:text-3xl md:text-4xl lg:text-5xl">
        Perguntas frequentes
      </h2>
      <p className="text-start text-whiteCustom text-lg">
        Existem algumas duvidas que podem ser de interesse comum. Deixamos algumas explicações abaixo!
      </p>
      <FAQ />
    </div>
    <Footer />
  </div>
);
}

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Publicacao from "./pages/Publicacao";
import MinhasDenuncias from "./pages/MinhasDenuncias";
import Criadores from "./pages/Criadores";
import Ocorrencias from "./pages/Ocorrencias";
import { useEffect } from "react";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/cadastro",
    element: <Cadastro/>,
  },
  {
    path: "/denunciar",
    element: <Publicacao/>,
  },
  {
    path: "/minhasDenuncias",
    element: <MinhasDenuncias/>,
  },
  {
    path: "/criadores",
    element: <Criadores/>,
  },
  {
    path: "/ocorrencias",
    element: <Ocorrencias/>,
  },
]);

export default function App() {
  useEffect(() => {
    
    function clearLocalStorage() {
      localStorage.clear(); 
    }

    // Adiciona o evento para limpar o localStorage quando a página é fechada ou recarregada
    window.addEventListener('beforeunload', clearLocalStorage);

    // Remove o evento quando o componente é desmontado
    return () => {
      window.removeEventListener('beforeunload', clearLocalStorage);
    };
  }, []);
  return (
    <div className="bg-bgCustom min-h-screen">
     <RouterProvider router={router}></RouterProvider>
    </div>
  )
}
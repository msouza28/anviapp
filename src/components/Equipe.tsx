import Matheus from '../assets/images/equipe/Matheus.jpg';
import Isaac from '../assets/images/equipe/Isaac.jpg';
import Vinicius from '../assets/images/equipe/Vinicius.jpg';
import Rafael from '../assets/images/equipe/Rafael.jpg';
import { Link } from 'react-router-dom';

const ImageGrid = () => {
    return (
        <div id='top' className="flex flex-wrap justify-center">
            <Link to={'https://www.linkedin.com/in/matheus-emiliano/'} target="_blank" className="relative w-64 m-4">
                <img src={Matheus} alt="Imagem" className="w-full h-auto" />
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 w-full flex justify-center items-center">
                    Matheus Emiliano
                </div>
            </Link>
            <Link to={'https://www.linkedin.com/in/isaac-fs-santos/'} target="_blank" className="relative w-64 m-4">
                <img src={Isaac} alt="Imagem" className="w-full h-auto" />
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 w-full flex justify-center items-center">
                    Isaac Santos
                </div>
            </Link>
            <Link to={'https://www.linkedin.com/in/vinicius-piovesan/'} target="_blank" className="relative w-64 m-4">
                <img src={Vinicius} alt="Imagem" className="w-full h-auto" />
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 w-full flex justify-center items-center">
                    Vinicius Piovesan
                </div>
            </Link>
            <Link to={'https://www.linkedin.com/in/rafael-budoya-desenvolvedor/'} target="_blank" className="relative w-64 m-4">
                <img src={Rafael} alt="Imagem" className="w-full h-auto" />
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 w-full flex justify-center items-center">
                    Rafael Budoya
                </div>
            </Link>

        </div>
    );
};

export default ImageGrid;
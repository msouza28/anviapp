import Matheus from '../assets/images/equipe/Matheus.jpg';
import Isaac from '../assets/images/equipe/Isaac.jpg';
import Vinicius from '../assets/images/equipe/Vinicius.jpg';
import Rafael from '../assets/images/equipe/Rafael.jpg';

const ImageGrid = () => {
    return (
        <div id='top' className="flex flex-wrap justify-center">
            <div className="relative w-64 m-4">
                <img src={Matheus} alt="Imagem" className="w-full h-auto" />
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 w-full flex justify-center items-center">
                    Matheus Emiliano
                </div>
            </div>
            <div className="relative w-64 m-4">
                <img src={Isaac} alt="Imagem" className="w-full h-auto" />
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 w-full flex justify-center items-center">
                    Isaac Santos
                </div>
            </div>
            <div className="relative w-64 m-4">
                <img src={Vinicius} alt="Imagem" className="w-full h-auto" />
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 w-full flex justify-center items-center">
                    Vinicius Piovesan
                </div>
            </div>
            <div className="relative w-64 m-4">
                <img src={Rafael} alt="Imagem" className="w-full h-auto" />
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 w-full flex justify-center items-center">
                    Rafael Budoya
                </div>
            </div>

        </div>
    );
};

export default ImageGrid;
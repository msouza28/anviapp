
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Lixo1 from '../assets/images/lixo1.jpg';
import Lixo2 from '../assets/images/lixo2.jpg';
import Gari from '../assets/images/gari.jpg';

const CardSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-1 mb-16 sm:px-6 lg:px-8 sm:mt-9 ">
      <Slider {...settings} className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center h-full text-center ">
          <img
            src={Lixo1}
            alt="Imagem"
            className="max-w-full h-auto mx-auto mb-2 rounded-lg "
          />
        </div>
        <div className="flex flex-col items-center justify-center h-full text-center">
          <img
            src={Lixo2}
            alt="Imagem"
            className="max-w-full h-auto mx-auto mb-4 rounded-lg"
          />
        </div>
        <div className="flex flex-col items-center justify-center h-full text-center">
          <img
            src={Gari}
            alt="Imagem"
            className="max-w-full h-auto mx-auto mb-4 rounded-lg"
          />
        </div>
      </Slider>
    </div>
  );
};

export default CardSlider;
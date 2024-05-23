
export default function Sumario() {

    return (
        <div className="flex pt-6 sm:pt-3 justify-center">
          <div  className="flex mx-4 sm:mx-0 items-center gap-2">
          <span className={`h-3 w-3 rounded-full bg-white`}></span>
          <span className="text-whiteCustom text-sm">Nenhuma denúncia</span>

          <span className={`h-3 w-3 rounded-full bg-yellow-300`}></span>
          <span className="text-whiteCustom text-sm">Entre 1 a 3 denúncias</span>

          <span className={`h-3 w-3 rounded-full bg-orange-600`}></span>
          <span className="text-whiteCustom text-sm">Entre 4 a 5 denúncias</span>

          <span className={`h-3 w-3 rounded-full bg-red-600`}></span>
          <span className="text-whiteCustom text-sm">Acima de 5 denúncias</span>
          </div>
        </div>
      );
    };

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string;
  }
  
  const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrl }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-bgCustom p-4 rounded-lg max-w-3xl max-h-[70vh] overflow-auto">
          <button onClick={onClose} className="absolute top-2 right-2 text-sm py-1 px-1 font-semibold text-bgCustom bg-slate-400  rounded hover:bg-slate-700">
            Fechar
          </button>
          <img src={imageUrl} alt="Expanded" className="w-auto h-auto max-w-3xl max-h-[50vh] object-contain" />
        </div>
      </div>
    );
  };
  
  export default ImageModal;

import React from 'react';
import { Modal } from 'react-bootstrap';
import { X } from 'lucide-react';

interface FullImageModalProps {
  show: boolean;
  onHide: () => void;
  imageUrl: string;
  memberName: string;
  memberPosition: string;
}

const FullImageModal: React.FC<FullImageModalProps> = ({
  show,
  onHide,
  imageUrl,
  memberName,
  memberPosition
}) => {
  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered 
      size="lg"
      className="image-modal"
    >
      <Modal.Body className="p-0 position-relative">
        <button
          className="btn position-absolute top-0 end-0 m-3 bg-white rounded-circle shadow"
          onClick={onHide}
          style={{ zIndex: 1050, width: '40px', height: '40px' }}
        >
          <X size={20} />
        </button>
        <div className="text-center p-4">
          <img 
            src={imageUrl} 
            alt={memberName}
            className="img-fluid rounded-4 shadow-lg animate-fade-in"
            style={{ 
              maxHeight: '70vh',
              objectFit: 'cover'
            }}
          />
          <div className="mt-3">
            <h4 className="mb-1">{memberName}</h4>
            <p className="text-primary mb-0">{memberPosition}</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default FullImageModal;

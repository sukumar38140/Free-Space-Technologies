
import React, { useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  currentImage: string;
  onImageChange: (imageUrl: string) => void;
  show: boolean;
  onHide: () => void;
  memberName: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  currentImage,
  onImageChange,
  show,
  onHide,
  memberName
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string>(currentImage);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onImageChange(previewImage);
    onHide();
  };

  const handleClose = () => {
    setPreviewImage(currentImage);
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Update Profile Picture - {memberName}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <div className="mb-4">
          <img 
            src={previewImage} 
            alt={memberName}
            className="rounded-circle mb-3 shadow-lg"
            style={{ 
              width: '200px', 
              height: '200px', 
              objectFit: 'cover',
              border: '4px solid #fff',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
          />
        </div>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          style={{ display: 'none' }}
        />
        
        <Button 
          className="btn-gradient-primary me-3"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="me-2" size={20} />
          Select Image
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button className="btn-gradient-primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageUpload;

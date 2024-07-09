import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ProductOptions = ({ options, setSelectedSize }) => {
  const [show, setShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState('모든 사이즈');

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setSelectedOption(size);
    setShow(false);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="product-options">
      <Button id="sizeButton" name="size" className="form-select w-100" onClick={handleShow}>
        {selectedOption}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="sizeModalLabel">사이즈 선택</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {options.map((option, index) => (
            <Button
              variant="outline-secondary"
              className="size-option w-100 mb-2"
              data-size={option.size}
              data-price={option.optionPrice}
              key={index}
              onClick={() => handleSizeClick(option.size)}
            >
              {option.size} - {option.optionPrice}원
            </Button>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            선택 완료
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductOptions;

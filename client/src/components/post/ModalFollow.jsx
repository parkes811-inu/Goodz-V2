import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

const ModalFollow = ({ show, onHide, title }) => {

    const [modalShow, setModalShow] = React.useState(false);


    return (
        <>
            <Modal show={show} onHide={onHide} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter"><h5 className="m-0">{title}</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>팔로우정보~</p>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalFollow
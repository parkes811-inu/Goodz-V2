import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileInfo from '../common/ProfileInfo';
import BtnFollow from '../post/BtnFollow';


const ModalFollow = ({ show, onHide, title, followList, handleFollow}) => {

    const [modalShow, setModalShow] = React.useState(false);
    // console.log("자증난다")
    // console.log(followList)

    return (
        <>
            <Modal show={show} onHide={onHide} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter"><h5 className="m-0">{title}</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {followList.length == 0 ?
                    <>
                        <h5>조회된 유저가 없습니다</h5>
                    </>
                    :
                    <>
                        {followList.map( (follow) => (
                            <>
                                <div className="d-flex justify-content-between mb-3">
                                    <ProfileInfo nickname={follow.nickname} profileImgNo={follow.profileImgNo} size={"-m"}/>
                                    <BtnFollow followInfo={follow} handleFollow={handleFollow} />
                                </div>
                            </>
                        ))}
                    </>
                    }
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalFollow
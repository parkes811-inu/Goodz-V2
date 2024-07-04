import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileInfo from '../common/ProfileInfo';

const ModalFollow = ({ show, onHide, title, followList }) => {

    const [modalShow, setModalShow] = React.useState(false);
    // let followId = '';
    // if (title === "팔로우") {
    //     followId = 'followerId'
    // } else {
    //     followId =  'userId'
    // }


    return (
        <>
            <Modal show={show} onHide={onHide} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter"><h5 className="m-0">{title}</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {followList.map( (follow) => {
                        const id = title === "팔로워" ? follow.followerId : follow.userId;
                        const nickname = title === "팔로워" ? follow.followerNickname : follow.followingNickname;
                        // return <ProfileInfo nickname={nickname}, profile/>
                    })}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalFollow
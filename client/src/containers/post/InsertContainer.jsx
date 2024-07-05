import React, { useContext, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContextProvider';
import { Button, Modal } from 'react-bootstrap';
import SearchedItem from '../../components/post/SearchedItem';

const InsertContainer = () => {

    const[content, setContent] = useState("");
    const[mainImgIndex, setMainImgIndex] = useState(0);
    const[searchKeyWord, setSearchKeyword] = useState('');
    const[searchedItems, setSearchedItems] = useState([]);
    const[addedTags, setAddedTags] = useState([]);

    // 💨상품태그 검색 감지
    const handleSearchInput = (e) => {
        setSearchKeyword(e.target.value);
        console.log(e.target.value);
    }

    // 상품태그 추가
    const addTag = (product) => {
        // 이미 존재하는 상품인지 확인
        const isExisting = addedTags.some(tag => tag.id === product.id);
        
        if (!isExisting) {
            // 새로운 배열을 생성하여 기존 태그들과 새 상품을 포함
            const updatedTags = [...addedTags, product];
            setAddedTags(updatedTags);
        } else {
            // 이미 존재하는 상품이라면 사용자에게 알림
            alert("이 상품은 이미 태그되어 있습니다.");
        }
    }

    // console.log("게시글번호: " + postNo);
    const navigate = useNavigate();

    // 유저 정보
    const {userInfo} = useContext(LoginContext);
    const userId = userInfo.userId;

    // 👩‍💼⭕ 유저 로그인
    if (!userInfo) {
        navigate('/users/login');
    }

    // 상품태그 추가 모달창
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5 fw-bold" id="exampleModalLabel">상품태그 추가</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <nav class="navbar">
                                <div class="container-fluid">
                                    {/* <!-- 상품검색창 --> */}
                                    <div class="d-flex w-100" role="search">
                                        <input class="form-control me-2" type="search" id="searchInput" placeholder="Search" aria-label="Search" />
                                    </div>
                                    {/* <!-- 검색된 상품 리스트 --> */}
                                    <div class="searchResults d-flex flex-column w-100" id="searchResults">
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- 상품추가 모달창 끝--> */}

            <div class="container">
        
                <div class="my-5 d-flex flex-column align-items-center">
                    <p class="fs-3 fw-bold" style={{width:'600px'}}>게시글 등록</p>

                    <form id="form" action="/styles/insert" method="post" style={{width:'600px'}} enctype="multipart/form-data">
                        {/* <!-- 이미지첨부 --> */}
                        <span class="form-text">최대 10장</span>
                        <input id="imageInput" name="attachedFiles" class="form-control" type="file"  multiple />

                        {/* <!-- 첨부파일 미리보기 --> */}
                        <div id="imagePreview" style={{ height: '100%', padding: '15px'}}></div>

                        {/* <!-- 대표로 선택한 이미지가 넘어감 --> */}
                        <input type="hidden" name="mainImgIndex" value={mainImgIndex} />

                        <br />

                        {/* <!-- 내용 --> */}
                        <textarea class="form-control" type="text" placeholder="내용을 입력하세요" style={{boxShadow: 'none !important'  ,fontSize: 'smaller', height: '150px'}} ></textarea>

                        <br />

                        {/* <!-- 상품태그 영역 --> */}
                        <div class="d-flex justify-content-between">
                            <label for="formFileMultiple" class="form-label" style={{fontWeight: 'bold', marginBottom: 0}}>상품태그</label>
                            {/* <!-- 상품추가버튼 --> */}
                            <Button variant="primary" onClick={handleShow}>
                                Launch demo modal
                            </Button>
                            <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="p-0 mb-1" style={{color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: 'none', padding: '5px', borderRadius: '4px', textDecoration: 'none', backgroundColor: '#393e46'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6" width="24px" height="24px">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>
                        </div>
                            
                
                        {/* <!-- 태그된 상품 --> */}
                        <div class="productTag-area border rounded-2">
                            <div class="row row-cols-2 row-cols-md-4 g-2 p-3" style={{minHeight: '233px'}}>

                            </div>
                        </div>
                        <button type="submit" id="btn-insert" class="btn my-5" style={{color: 'white', backgroundClip: '#393E46', width: '600px'}}>작성 완료</button>
                    </form>
                </div>
            </div>

            {/* <!-- 상품추가 모달창 시작--> */}
            {/* <!-- Modal --> */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>상품태그 추가</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input class="form-control me-2" value={searchKeyWord} onChange={handleSearchInput} placeholder="Search"/>
                    <div className="d-flex flex-column w-100">
                        {searchedItems.length == 0 ?
                        <>  
                            <br />
                            <h5 className='text-center text-body-tertiary'>조회된 상품이 없습니다.</h5>
                            <br />
                        </>
                        :
                        <>
                            {searchedItems.map((item) => {
                                <SearchedItem product={item} addItem={addTag}/>
                            })}
                        </>
                        }
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default InsertContainer
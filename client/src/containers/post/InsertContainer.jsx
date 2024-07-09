import React, { useContext, useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContextProvider';
import { Button, Modal } from 'react-bootstrap';
import SearchedItem from '../../components/post/SearchedItem';
import MainBtn from '../../components/common/MainBtn';
import TagItem from '../../components/post/TagItem';
import * as tag from '../../apis/post/tag';
import * as post from '../../apis/post/post';

const InsertContainer = () => {

    const navigate = useNavigate();

    // 유저 정보
    const {userInfo} = useContext(LoginContext);
    const userId = userInfo ? userInfo.userId : null;

    const [content, setContent] = useState("");             // 게시글 내용
    const [attachedFiles, setAttachedFiles] = useState([]); // 첨부 이미지
    const [previewImages, setPreviewImages] = useState([]); // 첨부 이미지 미리보기       
    const fileInputRef = useRef(null);                      // 대표이미지 선택
    const [mainImgIndex, setMainImgIndex] = useState(0);    // 대표이미지 인덱스번호
    const [searchKeyWord, setSearchKeyword] = useState(''); // 상품태그 검색 키워드
    const [searchedItems, setSearchedItems] = useState([]); // 검색된 상품
    const [addedTags, setAddedTags] = useState([]);         // 추가된 상품

    /* 📄 게시글 관련 */
    // 내용 작성 감지
    const handleContent = (e) => {
        setContent(e.target.value);
        // console.log(e.target.value)
    }
    
    /* 💾첨부이미지 */
    // 첨부이미지 미리보기 제공
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newPreviewImages = files.map(file => ( {file, url: URL.createObjectURL(file)} ))
        setPreviewImages(newPreviewImages);
        setAttachedFiles(files);
    }
    // 대표이미지 선택
    const selectMainImg = (index)=> {
        setMainImgIndex(index);
    }

    // 게시글 등록 처리
    const onSubmit = async(e) => {

        // console.log(content)
        // console.log(attachedFiles)
        // console.log(mainImgIndex)
        // console.log(addedTags)

        e.preventDefault();

        if (attachedFiles.length == 0 || attachedFiles === null) {
            alert('게시글은 이미지가 최소 1장 이상 첨부되어야 합니다.');
            return;
        }
        if (content === "" || content===null) {
            alert('내용을 입력해주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('content', content);
        attachedFiles.forEach((file, index) => {
            formData.append(`attachedFiles[${index}]`, file);
        });
        formData.append('mainImgIndex', mainImgIndex);
        addedTags.forEach((tag, index) => {
            formData.append(`taggedProducts[${index}]`, tag.pno);
        });

        const headers = {
            headers: {
                'conxtent-Type': 'multipart/form-data'
            }
        }

        try {
            const response = await post.insert(formData, headers);
            const data = response.data;         // 처리 성공 시, 작성자의 닉네임을 반환함.
            // console.log(data);
            navigate(`/styles/user/@${data}`);
        } catch (error) {
            console.error("에러발생...", error);            
        }


    }



    /* 🎫상품태그 관련 */
    // 💨상품태그 검색 감지 & 검색처리
    const handleSearchInput = async(e) => {
        setSearchKeyword(e.target.value);
    }

    // 검색 키워드로 상품 검색
    const searchItem = async (searchKeyWord) => {
        if (searchKeyWord == 0) {
            setSearchedItems([]);
        }
        if (searchKeyWord.length > 0) {     // 검색키워드를 1글자 이상 입력
            // console.log(e.target.value);
            const response = await tag.searchItems(searchKeyWord);
            const data = response.data;
            // console.log(response.data);
            setSearchedItems(data);
        }
    }

    // 상품태그 추가
    const addTag = (product) => {
        // console.log(product);
        // 이미 존재하는 상품인지 확인
        const isExisting = addedTags.some(tag => tag.pno === product.pno);  // 기존의 배열을 순회하며 조건을 체크 ➡️ 이미 존재하는 상품인지 확인
        // console.log("존재여부: " +  isExisting);
        
        if (!isExisting) {
            // 새로운 배열을 생성하여 기존 태그들과 새 상품을 포함
            const updatedTags = [...addedTags, product];
            setAddedTags(updatedTags);
            // console.log(updatedTags);
        } else {
            // 이미 존재하는 상품이라면 사용자에게 알림
            alert("이 상품은 이미 태그되어 있습니다.");
        }
    }

    // 상품태그 삭제
    const removeTag = (product) => {
        // console.log("상품태그 삭제요청")
        // console.log(product);

        const updatedTags = addedTags.filter(tag => tag.pno !== product.pno);

        setAddedTags(updatedTags);
        // console.log(updatedTags);
    }



    // 상품태그 추가 모달창
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        searchItem(searchKeyWord);
    }, [searchKeyWord])

    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">상품태그 추가</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <nav className="navbar">
                                <div className="container-fluid">
                                    {/* <!-- 상품검색창 --> */}
                                    <div className="d-flex w-100" role="search">
                                        <input className="form-control me-2" type="search" id="searchInput" placeholder="Search" aria-label="Search" />
                                    </div>
                                    {/* <!-- 검색된 상품 리스트 --> */}
                                    <div className="searchResults d-flex flex-column w-100" id="searchResults">
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- 상품추가 모달창 끝--> */}

            <div className="container">
        
                <div className="my-5 d-flex flex-column align-items-center">
                    <p className="fs-3 fw-bold" style={{width:'600px'}}>게시글 등록</p>

                    <form id="form"style={{width:'600px'}} onSubmit={(e)=> onSubmit(e)}>
                        {/* <!-- 이미지첨부 --> */}
                        <span className="form-text">최대 10장</span>
                        <input ref={fileInputRef} name="attachedFiles" className="form-control" type="file"  multiple onChange={handleFileChange}/>

                        {/* <!-- 첨부파일 미리보기 --> */}
                        <div id="imagePreview" style={{ height: '100%', padding: '15px'}}>
                            {previewImages.map( (img, index) => (
                                <img key={index} src={img.url} alt='첨부이미지' width={100} height={100} style={{
                                    cursor: 'pointer',
                                    border: index === mainImgIndex ? '2px solid red':'none',
                                    margin: '5px'
                                }}
                                onClick={() => selectMainImg(index)}
                                />
                            ))}
                        </div>

                        {/* <!-- 대표로 선택한 이미지가 넘어감 --> */}
                        <input type="hidden" name="mainImgIndex" value={mainImgIndex} />

                        <br />

                        {/* <!-- 내용 --> */}
                        <textarea className="form-control" type="text" placeholder="내용을 입력하세요" onChange={handleContent} style={{boxShadow: 'none' , fontSize: 'smaller', height: '150px'}} ></textarea>

                        <br />

                        {/* <!-- 상품태그 영역 --> */}
                        <div className="d-flex justify-content-between">
                            <label htmlFor="formFileMultiple" className="form-label" style={{fontWeight: 'bold', marginBottom: 0}}>상품태그</label>
                            {/* <!-- 상품추가버튼 --> */}
                            
                            <Button variant="primary" onClick={handleShow} style={{width:'30px', height: '30px', backgroundColor:"#393E46", border:"none"}} className='d-flex justify-content-center align-items-center p-0 m-0'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" width="24px" height="24px">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </Button>
                        </div>
                            
                
                        {/* <!-- 태그된 상품 --> */}
                        <div className="productTag-area border rounded-2">
                            <div className="row row-cols-2 row-cols-md-4 g-2 p-3" style={{minHeight: '233px'}}>
                            {!addedTags || addedTags.length === 0 ?
                            <>
                            </>
                            :
                            <>
                                {addedTags.map((item) => (
                                    <TagItem product={item} removeTag={removeTag}/>
                                ))

                                }
                            </>
                            }
                            </div>
                        </div>
                        <div className="my-5">
                            <MainBtn text={"작성 완료"} />
                        </div>
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
                    <input className="form-control me-2" value={searchKeyWord} onChange={handleSearchInput} placeholder="Search"/>
                    <div className="d-flex flex-column w-100">
                        {searchedItems.length == 0 ?
                        <>  
                            <br />
                            <h5 className='text-center text-body-tertiary'>조회된 상품이 없습니다.</h5>
                            <br />
                        </>
                        :
                        <>
                            {/* <div className="overflow-y-scroll"> */}
                                {searchedItems.map((item) => (
                                    <SearchedItem product={item} addTag={addTag}/>
                                ))}

                            {/* </div> */}
                        </>
                        }
                    </div>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default InsertContainer
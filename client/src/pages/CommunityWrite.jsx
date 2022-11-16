import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../utils/Layout";
import "remixicon/fonts/remixicon.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageList from "../components/Community/ImageList";

const CommunityWrite = () => {
  const navigate = useNavigate();
  const [cate, setCate] = useState(1);
  const titleRef = useRef();
  const contentRef = useRef();
  const [imgs, setImg] = useState([]);
  const postInfo = useLocation();

  const getModifyPost = async () => {
    if (postInfo.state.id) {
      const {
        state: { category, id },
      } = postInfo;
      const [
        {
          data: [post],
        },
        { data: imges },
      ] = await Promise.all([
        axios.get(`http://localhost:8080/api/post/${category}/${id}`),
        axios.get(`http://localhost:8080/api/post/img/${category}/${id}`),
      ]);
      titleRef.current.value = post.title;
      contentRef.current.value = post.text;
      setCate(parseInt(category));

      setImg(imges.map((img) => ({ ...img, isDel: false, isRecent: false })));
    }
  };

  useEffect(() => {
    postInfo.state?.id ? getModifyPost() : setCate(postInfo.state.category);
  }, []);

  const onImgSubmit = async (e) => {
    e.preventDefault();

    if (e.target.files) {
      const uploadFile = e.target.files[0];
      const formData = new FormData();
      formData.append("img", uploadFile);

      const {
        data: [fileId],
      } = await axios({
        method: "post",
        url: "http://localhost:8080/api/file",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data; charset=utf-8",
        },
      });
      console.log(fileId);
      setImg((prev) => [
        ...prev,
        { file: fileId, isDel: false, isRecent: true },
      ]);
    }
  };
  const submitBtn = async () => {
    if (!titleRef.current.value) {
      return toast.error("제목을 입력해주세요");
    }
    if (!contentRef.current.value) {
      return toast.error("내용을 입력해주세요");
    }
    if (parseInt(cate) === 2 && imgs.length < 1) {
      return toast.error("자랑게시판에는 최소 1개의 사진이 필요해요");
    }

    try {
      let pid;
      if (postInfo.state.id) {
        const { category, id } = postInfo.state;
        await fetch(`http://localhost:8080/api/post/${category}/${id}/1`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify([
            {
              title: titleRef.current.value,
              content: contentRef.current.value,
            },
          ]),
        });
        imgs.length > 0 &&
          imgs.filter((img) => img.isDel).length > 0 &&
          (await fetch(`http://localhost:8080/api/post/img/${cate}/${id}`, {
            method: "PATCH",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              filesKeys: imgs.filter((img) => img.isDel).map((img) => img.file),
            }),
          }));
        pid = id;
      } else {
        const [data] = await (
          await fetch("http://localhost:8080/api/post", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify([
              {
                user: 101,
                category: cate,
                title: titleRef.current.value,
                content: contentRef.current.value,
              },
            ]),
          })
        ).json();
        pid = data;
      }

      imgs.length > 0 &&
        imgs.filter((img) => img.isRecent).length > 0 &&
        (await fetch(`http://localhost:8080/api/post/img/${cate}/${pid}`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            filesKeys: imgs
              .filter((img) => img.isRecent)
              .map((img) => img.file),
          }),
        }));

      postInfo.state.id
        ? toast.success("글이 수정되었습니다")
        : toast.success("게시물이 작성되었습니다.", {
            autoClose: 500,
            position: toast.POSITION.BOTTOM_CENTER,
          });
      navigate(`${cate}/${pid}`);
    } catch (err) {
      console.error(err);
    }
  };

  const onChange1 = (e) => {
    setCate(e.target.value);
    console.log(imgs);
  };

  const imgDelete = (evt) => {
    setImg(
      imgs.map((img) =>
        img.file !== parseInt(evt.target.value) ? img : { ...img, isDel: true }
      )
    );
  };

  //랜더링 될 때마다 카테 번호 확인
  // useEffect(() => {
  //   console.log(content)
  // }, [content])
  return (
    <>
      <Layout>
        <div className="communityWriteBoxWrap">
          <div className="communityWriteTop flex justify-between mx-2.5">
            <button type="button" onClick={() => navigate(-1)}>
              <i className="ri-arrow-left-line"></i>
            </button>
            <h2 className="text-base translate-x-2.5">등록 위치 선택</h2>
            <div>
              <select value={cate} onChange={onChange1}>
                {/* 추후 수정 */}
                <option value={1}>자유</option>
                <option value={2}>자랑</option>
              </select>
            </div>
            <button
              onClick={submitBtn}
              type="button"
              className="px-2.5 bg-black text-white rounded"
            >
              등록
            </button>
          </div>
          <div className="communityWriteContents mt-3.5">
            {/* 제목 */}
            <input
              type="text"
              className="w-full py-3 px-2.5 border-t border-b"
              placeholder="제목을 입력해 주세요"
              id="title"
              ref={titleRef}
            />

            {imgs.length > 0 ? (
              <ImageList imgs={imgs} isWrite={true} imgDelete={imgDelete} />
            ) : null}

            <div className="m-2.5 h-screen">
              {/* 내용 */}
              <textarea
                className="w-full h-full py-2.5"
                id="content"
                ref={contentRef}
              />
            </div>
            <div className="attachedFileBtn py-3 border-t">
              <label htmlFor="file">
                <div className="uploadBtn flex items-center justify-center cursor-pointer">
                  <i className="ri-camera-fill text-3xl"></i>
                </div>
              </label>
              <input
                type="file"
                name="avatar"
                id="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={onImgSubmit}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CommunityWrite;

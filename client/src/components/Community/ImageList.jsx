const ImageList = ({ imgs, isWrite, imgDelete }) => {
  return (
    <>
      {imgs.map((img) =>
        !img.isDel ? (
          <div className='relative' key={`${img.file}thImg`}>
            <div
              className='relative w-[500px] h-[500px] object-cover z-10'
              crossOrigin='anonymous'
              src={`http://localhost:8080/${img.path}`}
              alt={img.path}
            />
            {isWrite ? (
              <button
                className='absolute top-5 right-5 bg-white rounded p-2'
                key={img.file}
                onClick={imgDelete}
                value={img.file}
              >
                삭제
              </button>
            ) : null}
          </div>
        ) : null
      )}
    </>
  );
};

export default ImageList;

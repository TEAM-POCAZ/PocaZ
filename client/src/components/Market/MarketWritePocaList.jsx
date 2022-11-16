const MarketWritePocaList = ({ pocas, setPocaMemo, setModal }) => {
  return (
    <>
      <div className='relative modal bg-white border w-full h-screen my-2.5'>
        <h2>판매할 포토카드를 선택해 주세요!</h2>
        <div className='absolute dfdfdf bg-white border-b'>
          <ul className='flex'>
            {pocas?.length > 0 ? (
              pocas?.map((poca) => (
                <li key={poca.id}>
                  <button
                    className='w-full'
                    onClick={() => {
                      setPocaMemo({ id: poca.id, name: poca.name });
                      setModal(false);
                    }}
                  >
                    <img
                      src={poca.img}
                      alt={poca.name}
                      className='max-h-[220px] min-h-[220px]'
                    />
                  </button>
                </li>
              ))
            ) : (
              <p>해당 멤버의 포토카드가 없습니다.</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MarketWritePocaList;

import React from "react";

const MarketWritePocaList = ({ pocas, setPocaMemo, setModal }) => {
  return (
    <>
      <div className="relative modal bg-white border w-full h-96">
        <h2>모달 리스트</h2>
        <div className="absolute dfdfdf">
          <ul className="flex">
            {pocas?.length > 0 ? (
              pocas?.map((poca) => (
                <li key={poca.id}>
                  <button
                    onClick={() => {
                      setPocaMemo({ id: poca.id, name: poca.name });
                      setModal(false);
                    }}
                  >
                    <img src={poca.img} alt={poca.name} />
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

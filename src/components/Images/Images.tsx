import React from 'react';

interface ImageProps {
  imagesData: { imgype: 'cat' | 'dog' | 'fox'; img: string }[];
  showType: (item: { imgype: 'cat' | 'dog' | 'fox'; img: string }) => void;
}

const Images: React.FC<ImageProps> = ({ imagesData, showType }) => {
  return (
    <div className="bg-[#E1E8EB] flex flex-row justify-center flex-wrap border">
      <div className="p-5">
        {imagesData.slice(0, 3)?.map((item) => (
          <img
            src={item?.img}
            width="200"
            height="200"
            className="object-cover w-[200px] h-[200px] compImage"
            alt={item.img}
            onClick={(e) => {
              e.preventDefault();
              showType(item);
            }}
          />
        ))}
      </div>
      <div className="p-5">
        {imagesData.slice(3, 6)?.map((item) => (
          <img
            src={item?.img}
            width="200"
            height="200"
            className="object-cover w-[200px]  h-[200px] compImage "
            alt={item.img}
            onClick={(e) => {
              e.preventDefault();
              showType(item);
            }}
          />
        ))}
      </div>
      <div className="p-5">
        {imagesData.slice(6, 9)?.map((item) => (
          <img
            src={item?.img}
            width="200"
            height="200"
            className="object-cover w-[200px]  h-[200px] compImage "
            alt={item.img}
            onClick={(e) => {
              e.preventDefault();
              showType(item);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Images;

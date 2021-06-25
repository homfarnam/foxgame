/* eslint-disable @typescript-eslint/no-unused-expressions */
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';

const Competition = () => {
  const [imagesData, setImagesData] = useState<
    { imgype: 'cat' | 'dog' | 'fox'; img: string }[]
  >([]);

  const [score, setScore] = useState<number>(0);

  const fetchAll = () => {
    const dog = axios.get('https://dog.ceo/api/breeds/image/random/4');
    const fox = axios.get('https://randomfox.ca/api/v1/getfoxes/?count=1');
    const cat = axios.get('https://api.thecatapi.com/v1/breeds?limit=4');

    axios.all([dog, fox, cat]).then(
      axios.spread((...allData) => {
        console.log(allData);
        const dogs = allData[0].data?.message?.map((item: any) => ({
          img: item,
          imgype: 'dog'
        }));
        const foxed = allData[1].data?.images?.map((item: any) => ({
          img: item,
          imgype: 'fox'
        }));

        const cats = allData[2].data.map((item: any) => ({
          img: item?.image?.url,
          imgype: 'cat'
        }));

        if (cats && foxed && dogs) {
          setImagesData(
            [...dogs, ...foxed, ...cats].sort(() => Math.random() - 0.5)
          );
        }
      })
    );
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const showType = (item: { imgype: 'cat' | 'dog' | 'fox'; img: string }) => {
    console.log(item);
    if (item?.imgype === 'fox') {
      setScore((prev) => prev + 1);
      fetchAll();
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-full flex flex-col items-center justify-center my-24">
        <h2 className="font-mono flex justify-center mb-10">Competition</h2>
        <div className="w-full flex flex-row items-center justify-center ">
          <span className="mx-10">Score: {score}</span>
          <span>Time left: </span>
        </div>
        <div className="border w-full h-auto">
          <div className="flex flex-row justify-center flex-wrap">
            <div>
              {imagesData.slice(0, 3)?.map((item) => (
                <img
                  src={item?.img}
                  width="200"
                  height="200"
                  className="object-cover w-[200px]  h-[200px]"
                  alt={item.img}
                  onClick={(e) => {
                    e.preventDefault();
                    showType(item);
                  }}
                />
              ))}
            </div>
            <div>
              {imagesData.slice(3, 6)?.map((item) => (
                <img
                  src={item?.img}
                  width="200"
                  height="200"
                  className="object-cover w-[200px]  h-[200px]"
                  alt={item.img}
                  onClick={(e) => {
                    e.preventDefault();
                    showType(item);
                  }}
                />
              ))}
            </div>
            <div>
              {imagesData.slice(6, 9)?.map((item) => (
                <img
                  src={item?.img}
                  width="200"
                  height="200"
                  className="object-cover w-[200px]  h-[200px]"
                  alt={item.img}
                  onClick={(e) => {
                    e.preventDefault();
                    showType(item);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Competition;

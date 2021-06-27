/* eslint-disable @typescript-eslint/no-unused-expressions */
import axios from 'axios';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import Images from '../components/Images/Images';

const Competition = () => {
  const [imagesData, setImagesData] = useState<
    { imgype: 'cat' | 'dog' | 'fox'; img: string }[]
  >([]);
  const [score, setScore] = useState<number>(0);
  const [counter, setCounter] = useState<number>(30);

  const history = useHistory();

  useEffect(() => {
    let timer: any;
    if (imagesData && counter > 0) {
      timer = setInterval(() => setCounter((prev) => prev - 1), 1000);

      if (counter === 0) {
        toast.warning('Times up!!');
      }
    }

    return () => clearInterval(timer);
  }, [counter, imagesData]);

  useEffect(() => {
    const date = moment().format('MM/DD/YYYY');
    if (counter === 0) {
      const user = localStorage.getItem('user');
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const id = Math.random() * 1000;

      users.push({
        id: id,
        user: user,
        date: date,
        score: score
      });
      localStorage.setItem('users', JSON.stringify(users));

      history.push('/scores');
    }
  }, [counter, history, score]);

  const fetchAll = () => {
    const dog = axios.get('https://dog.ceo/api/breeds/image/random/4');
    const fox = axios.get('https://randomfox.ca/api/v1/getfoxes/?count=1');
    const cat = axios.get('https://api.thecatapi.com/v1/breeds?limit=4');

    axios.all([dog, fox, cat]).then(
      axios.spread((...allData) => {
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
      setScore((prev) => prev + 100);
      fetchAll();
    } else {
      toast.error('Wrong image');
      setCounter((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-full flex flex-col items-center justify-center my-24">
        <h2 className="flex text-4xl justify-center mb-10">Competition</h2>
        <div className="w-full flex flex-col items-center justify-center mb-10">
          <div className="flex">
            <span className="mx-10 text-2xl">Score: {score}</span>

            <span className="text-2xl">Time left: {counter}</span>
          </div>
          <div className="flex justify-center items-center my-5 text-xl">
            <p>You should select foxes to get score</p>
          </div>
        </div>
        <div className="w-3/4 h-auto">
          <Images showType={showType} imagesData={imagesData} />
        </div>
      </div>
    </div>
  );
};

export default Competition;

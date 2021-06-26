import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import _ from 'lodash';

const Scores = () => {
  const [usersData, setUsersData] =
    useState<{ id: number; user: string; date: string; score: string }[]>();

  const history = useHistory();

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');

    const sorted = _.orderBy(allUsers, 'score', 'desc');

    console.log(sorted);
    setUsersData(sorted);
  }, []);

  return (
    <div>
      <div className="w-full flex justify-center my-5">
        <h2>Scores</h2>
      </div>
      <div className="w-full flex justify-center">
        <table className="border border-black">
          <thead className="p-2">
            <th>Rank</th>
            <th>Name</th>
            <th>Date</th>
            <th>Score</th>
          </thead>
          <tbody className="p-2">
            {usersData?.map((item, i) => (
              <tr key={item?.id}>
                <td>{i + 1}</td>
                <td>{item?.user}</td>
                <td>{item?.date}</td>
                <td>{item?.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-center m-auto mt-10">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            history.push('/');
            localStorage.removeItem('user');
          }}
        >
          Go to home page
        </Button>
      </div>
    </div>
  );
};

export default Scores;

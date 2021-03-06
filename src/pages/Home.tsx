import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { RouteComponentProps } from 'react-router';
import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';

const Home = (props: RouteComponentProps) => {
  const initialValue = localStorage.getItem('user');
  const [user, setUser] = useState<string>(initialValue ? initialValue : '');
  const [isText, setIsText] = useState<boolean>(false);

  useEffect(() => {
    const value = localStorage.getItem('user');
    if (value) {
      setUser((prev) => value.toString());
      setIsText(true);
    }
  }, []);

  return (
    <div className="w-full flex items-center justify-center">
      <div className="border p-5 flex flex-col items-center justify-between h-[400px]">
        <div>
          <h3>Click the fox! Game</h3>
          {isText ? (
            <span onClick={() => setIsText((prev) => !prev)}>Hello {user}</span>
          ) : (
            <Formik
              initialValues={{ username: user }}
              onSubmit={(values, actions) => {
                actions.setSubmitting(true);

                setUser((prevState) => {
                  localStorage.setItem('user', values.username);
                  return values.username;
                });
                setIsText(true);
                actions.setSubmitting(false);
              }}
            >
              {({
                values,
                handleReset,
                handleSubmit,
                handleBlur,
                handleChange,
                errors
              }) => (
                <Form
                  onReset={handleReset}
                  onSubmit={handleSubmit}
                  className="w-full h-full space-y-5 flex flex-col justify-around"
                >
                  <div>
                    <TextField
                      id="username"
                      value={values.username}
                      label="User"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      placeholder="Enter your name"
                    />
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
        <Link to="/competition">
          <Button
            disabled={!isText}
            className="absolute bottom-0"
            variant="contained"
            color="primary"
            type="submit"
          >
            Play!
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

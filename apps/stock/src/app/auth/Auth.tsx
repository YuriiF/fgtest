import React, { FC, useState } from 'react';
import { Button, Card, Container, Input } from 'rendition';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { User } from '@fgtest/stock/interfaces';
import { authActions } from './auth.slice';
import { setUser } from '../user/user.slice';

const schema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .max(16, 'Username must be max 16 characters long.'),
  password: Yup.string().required('Password is required.'),
  email: Yup.string().email('Email address is not valid (name@example.com)'),
});

const Auth: FC = () => {
  const { handleSubmit, register, errors } = useForm<User>({
    /* @ts-ignore */
    validationSchema: schema,
  });

  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();

  const submitForm = async (data: User) => {
    try {
      const path = isLogin ? '/auth/login' : '/auth/signup';
      // @ts-ignore
      const { payload } = await dispatch(setUser({ path, data }));
      const { token } = payload;
      dispatch(authActions.addToken(token));
      dispatch(authActions.setIsAuth(true));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container textAlign="center">
      <Card small width="33%" margin="auto">
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="inputWrapper">
            <span>user: admin</span>
            <Input
              ref={register}
              name="username"
              placeholder="Username"
              marginBottom={16}
            />
            {errors && errors.username && (
              <p className="error">{errors.username.message}</p>
            )}
          </div>

          <div className="inputWrapper">
            <span>pass: admin</span>
            <Input
              ref={register}
              name="password"
              type="password"
              placeholder="Password"
              marginBottom={16}
            />
            {errors && errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>

          {!isLogin && (
            <div className="inputWrapper">
              <Input
                ref={register}
                name="email"
                placeholder="Email (optional)"
                marginBottom={16}
              />
              {errors && errors.email && (
                <p className="error">{errors.email.message}</p>
              )}
            </div>
          )}

          <div className="inputWrapper">
            <Button type="submit">
              {isLogin ? 'Login' : 'Create account'}
            </Button>
          </div>

          <p
            onClick={() => setIsLogin(!isLogin)}
            style={{ cursor: 'pointer', opacity: 0.7 }}
          >
            {isLogin ? 'No account? Create one' : 'Already have an account?'}
          </p>
        </form>
      </Card>
    </Container>
  );
};

export default Auth;

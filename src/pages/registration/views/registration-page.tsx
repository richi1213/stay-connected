import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, Controller } from 'react-hook-form';
import {
  RegistrationType,
  AxiosErrorResponse,
  errorMsgType,
} from '@/types/types.ts';
import { Link } from 'react-router-dom';
import ScreenMd from '@/components/layout/page-containers/screen-md';
import FormContainer from '@/components/layout/page-containers/form-container';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '@/components/api/user';
import SuccessMsg from './success-msg.tsx';
import { useState } from 'react';

const RegistrationPage = () => {
  const [errorMsg, setErrorMsg] = useState<errorMsgType>({
    email: '',
    password: '',
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegistrationType>({
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    mode: 'onSubmit',
  });
  const { mutate: register, isSuccess } = useMutation({
    mutationKey: ['register'],
    mutationFn: registerUser,
    onError: (error: AxiosErrorResponse) => {
      const test = Object.entries(error?.response.data);

      if (test.length == 2) {
        setErrorMsg({
          email: String(test[0][1]),
          password: String(test[1][1]),
        });
      }
      if (test.length < 2) {
        if (test[0][0] === 'email') {
          setErrorMsg({
            email: String(test[0][1]),
            password: '',
          });
        }
        if (test[0][0] === 'password') {
          setErrorMsg({
            email: '',
            password: String(test[0][1]),
          });
        }
      }
    },
  });

  const onSubmit = (fieldValues: RegistrationType) => {
    register(fieldValues);
  };

  return (
    <>
      <ScreenMd>
        {isSuccess ? (
          <SuccessMsg />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className='text-center text-2xl font-bold'>
                Sign Up
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FormContainer onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <Label htmlFor='full_name'>Full Name</Label>
                  <Controller
                    name='fullname'
                    control={control}
                    rules={{
                      required: 'This field is required',
                      minLength: {
                        value: 1,
                        message: 'This field is required',
                      },
                    }}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Input
                          onChange={onChange}
                          minLength={1}
                          value={value}
                          className='mb-2 mt-2'
                          placeholder='Full Name'
                        />
                      );
                    }}
                  />
                  {errors.fullname && (
                    <span
                      role='alert'
                      className='pt-2 text-sm text-destructive'
                    >
                      {String(errors.fullname.message)}
                    </span>
                  )}
                </div>
                <div>
                  <Label htmlFor='email'>Email</Label>
                  <Controller
                    name='email'
                    control={control}
                    rules={{
                      required: 'This field is required',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Please enter a valid email address',
                      },
                      minLength: {
                        value: 1,
                        message: 'This field is required',
                      },
                    }}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Input
                          onChange={onChange}
                          value={value}
                          className='mb-2 mt-2'
                          placeholder='Email'
                        />
                      );
                    }}
                  />
                  {errors.email && (
                    <span
                      role='alert'
                      className='pt-2 text-sm text-destructive'
                    >
                      {String(errors.email.message)}
                    </span>
                  )}
                  {errorMsg.email && (
                    <span
                      role='alert'
                      className='pt-2 text-sm text-destructive'
                    >
                      {String(errorMsg.email)}
                    </span>
                  )}
                </div>
                <div className='mb-2 md:m-0'>
                  <Label htmlFor='password'>Password</Label>
                  <Controller
                    name='password'
                    control={control}
                    rules={{
                      required: 'This field is required',
                      minLength: {
                        value: 8,
                        message:
                          'Your password must be at least 8 characters long',
                      },
                    }}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Input
                          onChange={onChange}
                          value={value}
                          type='password'
                          placeholder='password'
                          className='mb-2 mt-2'
                        />
                      );
                    }}
                  />
                  {errors.password && (
                    <p role='alert' className='pt-2 text-sm text-destructive'>
                      {String(errors.password.message)}
                    </p>
                  )}
                  {errorMsg.password && (
                    <p role='alert' className='pt-2 text-sm text-destructive'>
                      {/* {String(errorMsg.password)} */}
                      This password is too common
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor='confirmPassword'>Confirm Password</Label>
                  <Controller
                    name='confirm_password'
                    control={control}
                    rules={{
                      required: 'This field is required',
                      validate: (value) => {
                        if (watch('password') != value) {
                          return 'Passwords do not match';
                        }
                      },
                    }}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Input
                          onChange={onChange}
                          value={value}
                          type='password'
                          className='mb-4 mt-2'
                          placeholder='Confirm Password'
                        />
                      );
                    }}
                  />
                  {errors.confirm_password && (
                    <span
                      role='alert'
                      className='pt-2 text-sm text-destructive'
                    >
                      {String(errors.confirm_password.message)}
                    </span>
                  )}
                </div>
                <div className='grid gap-4'>
                  <div>
                    <Button className='w-full' type='submit' size='lg'>
                      Sign Up
                    </Button>
                  </div>
                  <div className='cursor-pointer space-x-2 text-center text-sm text-muted-foreground'>
                    <span>Already have an account?</span>
                    <Link to='/login' className='font-semibold text-primary'>
                      Log In
                    </Link>
                  </div>
                </div>
              </FormContainer>
            </CardContent>
          </Card>
        )}
      </ScreenMd>
    </>
  );
};

export default RegistrationPage;

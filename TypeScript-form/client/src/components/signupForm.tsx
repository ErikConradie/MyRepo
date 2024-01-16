import React from 'react'
import styled from '@emotion/styled'
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import '../index.css';

type UserSubmitForm = {
    name: string;
    email: string;
    password: string;
};


export const SignUpForm = () => {

    const validationSchema = yup.object({
        name: yup.string().required('Missing Name')
            .min(6, 'Username must be at least 6 characters')
            .max(20, 'Username must not exceed 20 characters'),
        email: yup.string().required('Missing Email')
            .email('Invalid email format'),
        password: yup.string().required('Missing Password')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
    }).required()

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })
    const onSubmit = (data: UserSubmitForm) => {
        console.log('data', data);
        alert('Sign Up Successful!');
        reset();
    }

    return (
        <div className='form-container'>
            <form className='form-fields' onSubmit={handleSubmit(onSubmit)}>

                <h1 style={{ color: '#344563' }}>Sign Up</h1>
                <p style={{ marginBottom: '20px' }}>Let's get you started</p>

                <div className="field">
                    <StyledInput {...register('name')} type="text" placeholder="Name"
                        style={{
                            border: errors.name ? '2px solid red' : '2px solid #E4E5ED',
                        }}
                    />
                    {errors.name && (
                        <span className='error'>{errors.name.message}</span>
                    )}
                </div>
                <div className="field">
                    <StyledInput {...register('email')} type="text" placeholder="Email" 
                     style={{
                        border: errors.email ? '2px solid red' : '2px solid #E4E5ED',
                    }}
                    />
                    {errors.email && (
                        <span className='error'>{errors.email.message}</span>
                    )}
                </div>
                <div className="field">
                    <StyledInput {...register('password')} type="password" placeholder="Password" 
                     style={{
                        border: errors.password ? '2px solid red' : '2px solid #E4E5ED',
                    }}
                    />
                    {errors.password && (
                        <span className='error'>{errors.password.message}</span>
                    )}
                </div>

                <StyledButton>Sign Up</StyledButton>

                <p>Already have an account? <a style={{ color: '#1B82E9 ' }}>Log In</a></p>

                <p style={{ fontSize: '0.8rem', margin: '130px 100px 0px 100px', textAlign: 'center' }}>By signing up to create an account I accept Company's <a style={{ color: '#1B82E9 ' }}>Terms of Use and Privacy Policy.</a></p>
            </form>


        </div>
    )
}

const StyledInput = styled.input`
    width: 335px;
    border-radius: 7px;
    text-indent: 10px;
    border: 2px #E4E5ED solid;
    outline: none;
    height: 40px; 
    transition: all 0.3s ease;
    &:focus {
        box-shadow: 0 0 2px #59C3F4;
    }
`;

const StyledButton = styled.button`
width: 335px;
height: 40px;
border-radius: 7px;
cursor: pointer;
border: 1px #344563 solid;
background-color: #344563;
color: white;
transition: all 0.3s ease;
&:hover {
  transform: scale(1.01);
}
`

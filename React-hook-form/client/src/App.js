import logo from './logo.svg';
import './Styles.css';
import { css } from '@emotion/styled'
import styled from '@emotion/styled'
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

const StyledInput = styled.input`
border-radius: 2px;
text-indent: 5px;
border: 1px #717274 solid;
outline: none;
height: 35px;
transition: all 0.3s ease;
&:focus {
  box-shadow: 0 0 10px #0077C5;
}
`

const StyledLabel = styled.label`
display: flex;
height: 1.5em;
`
const StyledButton = styled.button`
height: 4em;
border-radius: 2px;
cursor: pointer;
border: 1px #0077C5 solid;
background-color: #0077C5;
color: white;
transition: all 0.3s ease;
&:hover {
  transform: scale(1.01);
}
`

const inputform = ({ label, register }) => {

  return (

    <div className='field'>
      <Label >{label}</Label>
      <Input {...register(label)} type="text" />
    </div>

  )

}

function App() {

  const validationSchema = yup.object({
    name: yup.string().required('Missing Name'),
    surname: yup.string().required('Missing Surname'),
    email: yup.string().required('Missing Email').email('Invalid email format'),
    password: yup.string().required('Missing Password'),
    dateofbirth: yup.date().required('Missing Date of Birth'),
  
  }).required()

  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      dateofbirth: ''
    }
  })
  console.log(errors);
  const onSubmit = data => {
    console.log('data', data);
  }

  return (

    <div>
      <div className='form-container'>

        <div className='form-header'>
          <h1>Create an Account</h1>
          <h3>Please fill in the necessary details to proceed.</h3>
        </div>

        <form className="container" onSubmit={handleSubmit(onSubmit)}>

          {/* <inputform label='Name' register={register} /> */}

          <div className="field">
            <StyledLabel for="name">Name</StyledLabel>
            <StyledInput {...register('name')} type="text" />
            {errors.name && (
              <span className='error'>{errors.name.message}</span>
            )}
          </div>
          <div className="field">
            <StyledLabel for="surname">Surname</StyledLabel>
            <StyledInput {...register('surname')} type="text" />
            {errors.surname && (
              <span className='error'>{errors.surname.message}</span>
            )}
          </div>
          <div className="field">
            <StyledLabel for="email">Email</StyledLabel>
            <StyledInput {...register('email')} type="email" />
            {errors.email && (
              <span className='error'>{errors.email.message}</span>
            )}
          </div>
          <div className="field">
            <StyledLabel for="password">Password</StyledLabel>
            <StyledInput {...register('password')} type="password" />
            {errors.password && (
              <span className='error'>{errors.password.message}</span>
            )}
          </div>
          <div className="field">
            <StyledLabel for="dob">Date of Birth</StyledLabel>
            <StyledInput {...register('dateofbirth')} type="date" />
          </div>

          <StyledButton>Create Account</StyledButton>

        </form>

        <div className='form-footer'>
          <p>some footer blah blah for a signup page</p>
        </div>


      </div>
    </div>




  );
}

export default App;

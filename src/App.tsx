import { Routes, Route } from 'react-router-dom';
import './globals.css'
import SignInForm from './_auth/forms/SignInForm';
import { Home } from './_root/pages';
import SignUpForm from './_auth/forms/SignUpForm';
import AuthLayout from './_auth/AuthLayout';

export const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/*Public Routes*/}
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<SignInForm />}/>
          <Route path='/sign-up' element={<SignUpForm />}/>
        </Route>

        {/*Private Routes*/}
        <Route index element={<Home/>}/>
      </Routes>
    </main>
  )
}

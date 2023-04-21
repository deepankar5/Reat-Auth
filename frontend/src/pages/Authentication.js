import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function submitAuth({request}){
  const data = await request.formData()
  const authData = {
    email: data.get('email'),
    password: data.get('password')
  }
  const searchParms = new URL(request.url).searchParams
  const mode = searchParms.get('mode') || 'login'
  if(mode !== 'signup' && mode !== 'login'){
    throw json({message: 'Incorrect mode selected'}, {status: 422})
  }
  const response = await fetch('http://localhost:8080/' + mode, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
  },
    body: JSON.stringify(authData)
  })

  if(response.status === 422 || response.status === 401){
    return response
  }
 if(!response.ok){
  throw json({message: 'Can\'t authenticate'}, {status: 500})
 }
  const resDate = await response.json()
  const token = resDate.token
  localStorage.setItem('token', token)

  let expiration = new Date()
  expiration.setHours(expiration.getHours() + 1)
  localStorage.setItem('expiration', expiration.toISOString())
  
  return redirect('/')
 
}
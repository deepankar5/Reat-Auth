import { Form, Link, useActionData, useSearchParams } from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
  const [searchParms] = useSearchParams()
  const isLogin = searchParms.get('mode') === 'login'
  const response = useActionData()
  const errors = response?.errors
  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        {response?.message && <p style={{color: 'red'}}>{response.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        {errors?.email && <p style={{color: 'red'}}>{errors.email}</p>}
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        {errors?.password && <p style={{color: 'red'}}>{errors.password}</p>}
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'signup': 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button>Save</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;

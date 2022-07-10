import { Link, useNavigate } from 'react-router-dom';
import Menu from '../../components/Menu';
import './styles.scss';
import '../styles.scss';
import { useForm } from 'react-hook-form';
import { ILoginFormData, login } from '../../services/auth.service';
import { useAuth } from '../../hooks/useAuth';

function Login() {
  const {register, handleSubmit} = useForm<ILoginFormData>();
  const navigate = useNavigate();
  const {setToken, setCode} = useAuth();

  const submit = async(loginData: ILoginFormData) => {
    try {
      const { data } = await login(loginData);
      if(!data.success || !data.success.token) return;
      console.log(data.success.auth.code)

      localStorage.setItem('token', data.success.token);
      localStorage.setItem('code', data.success.auth.code.toString());
      setToken(data.success.token);
      setCode(data.success.auth.code);
      
      alert('Logged in.');
      navigate('/pokedex');
    } catch(err: any) {
      console.log(err);
    }
  }

  return (
    <>
      <Menu/>
      <div className="account-container">
        <h1 className="account-container__title">
          Hello ^-^
        </h1>
        <div className="account-container__inputbox">
          <span className="account-container__inputbox--label">E-mail</span>
          <input {...register("email")} className="account-container__inputbox--input"></input>
        </div>
        <div className="account-container__inputbox">
          <span className="account-container__inputbox--label">Password</span>
          <input {...register("password")} type="password" className="account-container__inputbox--input"></input>
        </div>
        <span className="account-container__noaccount">No account?
          <Link to="/register">Register</Link>.
        </span>
        <div className="account-container__button-container">
          <button onClick={handleSubmit(submit)} className="account-container__button-container--button">Login</button>
        </div>
      </div>
    </>
  );
}

export default Login;

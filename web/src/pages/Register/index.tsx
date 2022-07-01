import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import '../Login/styles.scss';
import '../styles.scss';
import { useForm, Controller } from 'react-hook-form';
import { create, IRegisterFormData } from '../../services/trainer.service';
import { useAuth } from '../../hooks/useAuth';


function Register() {
  const [ slide, setSlide ] = useState(0);
  const {
    register, 
    unregister, 
    handleSubmit, 
    watch, 
    control, 
    formState: {errors}
  } = useForm<IRegisterFormData>();
  const {setToken} = useAuth();

  const password = useRef({});
  password.current = watch('password', "");

  const submit = async(registerFormData: IRegisterFormData) => {
    try {

      delete registerFormData['passwordRepeat'];
      console.log(registerFormData);
      registerFormData.avatar = 'https://i.pinimg.com/736x/61/a4/d8/61a4d8536eb6275b05556d9609e8d406.jpg';
      const {data} = await create(registerFormData); 
      
      if(!data.success || !data.success.token) return;

      setToken(data.success.token);
      alert('Conta cadastrada');
    } catch(err: any) {

    }
  }

  return (
    <>
      <Menu/>
      <div className="account-container">
        <h1 className="account-container__title">
          new account
        </h1>
        {
          slide == 0 ?
          <>
            <div className="account-container__inputbox">
              <span className="account-container__inputbox--label">Name</span>
              <input {...register("name")} className="account-container__inputbox--input"></input>
            </div>
            <div className="account-container__inputbox">
              <span className="account-container__inputbox--label">Birthdate</span>
              <input {...register("birthday")} className="account-container__inputbox--input"></input>
            </div>
            <span className="account-container__noaccount">Already have an account?
              <Link to="/login">Login</Link>.
            </span>
            <div className="account-container__button-container">
              <button onClick={() => {setSlide(1)}} className="account-container__button-container--button">&gt;&gt;</button>
            </div> </> : <>
            <div className="account-container__inputbox">
              <span className="account-container__inputbox--label">E-mail</span>
              <input {...register("email")} className="account-container__inputbox--input"></input>
            </div>
            <div className="account-container__inputbox">
              <span className="account-container__inputbox--label">Password</span>
              <input {...register("password")} className="account-container__inputbox--input"></input>
            </div>
            <div className="account-container__inputbox">
              <span className="account-container__inputbox--label">Confirm Password</span>
             
              <Controller
              name="passwordRepeat"
              control={control}
              defaultValue=""
              render={() => (
                <input {...register("passwordRepeat")} className="account-container__inputbox--input"></input>
              )}
              rules={{validate: value => password.current === value || 'As senhas não conferem'}}
              />
              {errors.passwordRepeat?.message && (<p>{errors.passwordRepeat.message}</p>)}
            </div>
            <div className="account-container__button-container pair">
              <button onClick={() => {setSlide(0);}} className="account-container__button-container--button">&lt;&lt;</button>
              <button onClick={handleSubmit(submit)} className="account-container__button-container--button">Register</button>
            </div>
          </> 
        }
      </div>
    </>
  );
}

export default Register;

import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Menu from '../../components/Menu';
import '../Login/styles.scss';
import '../styles.scss';
import { useForm, Controller } from 'react-hook-form';
import { create, IRegisterFormData } from '../../services/trainer.service';
import { randomImages } from '../../hooks/useRandomImage';

function Register() {
  const [ slide, setSlide ] = useState(0);

  const {
    register,  
    handleSubmit, 
    watch, 
    control, 
    formState: {errors}
  } = useForm<IRegisterFormData>();


  const password = useRef({});
  const navigate = useNavigate();
  password.current = watch('password', "");

  const submit = async(registerFormData: IRegisterFormData) => {
    try {
      //@ts-ignore
      registerFormData.birthday = new Date(registerFormData.birthday).toISOString();
      delete registerFormData['passwordRepeat'];
      registerFormData.avatar = randomImages();

      const {data} = await create(registerFormData); 
      
      if(!data.success || !data.success.token) return;

      alert('Registered account.');
      navigate("/login");
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
        {/* <div className="account-container__inputbox">
          <span className="account-container__inputbox--label">Name</span>
          <input {...register("name")} className="account-container__inputbox--input"></input>
        </div>
        <div className="account-container__inputbox">
          <span className="account-container__inputbox--label">Birthdate</span>
          <input {...register("birthday")} type="date" className="account-container__inputbox--input"></input>
        </div>
        <span className="account-container__noaccount">Already have an account?
          <Link to="/login">Login</Link>.
        </span>
        <div className="account-container__button-container">
          <button onClick={() => {setSlide(1)}} className="account-container__button-container--button">&gt;&gt;</button>
        </div>
        <div className="account-container__inputbox">
          <span className="account-container__inputbox--label">E-mail</span>
          <input {...register("email")} className="account-container__inputbox--input"></input>
        </div>
        <div className="account-container__inputbox">
          <span className="account-container__inputbox--label">Password</span>
          <input {...register("password")} type="password" className="account-container__inputbox--input"></input>
        </div>
        <div className="account-container__inputbox">
          <span className="account-container__inputbox--label">Confirm Password</span>
          <Controller
          name="passwordRepeat"
          control={control}
          defaultValue=""
          render={() => (
            <input {...register("passwordRepeat")} type="password" className="account-container__inputbox--input"></input>
          )}
          rules={{validate: value => password.current === value || "Passwords don't match."}}
          />
          {errors.passwordRepeat?.message && (<p>{errors.passwordRepeat.message}</p>)}
        </div>
        <div className="account-container__button-container pair">
          <button onClick={() => {setSlide(0);}} className="account-container__button-container--button">&lt;&lt;</button>
          <button onClick={handleSubmit(submit)} className="account-container__button-container--button">Register</button>
        </div> */}
        {
          slide == 0 &&
          <>
            <div className="account-container__inputbox">
              <span className="account-container__inputbox--label">Name</span>
              <input {...register("name")} className="account-container__inputbox--input"></input>
            </div>
            <div className="account-container__inputbox">
              <span className="account-container__inputbox--label">Birthdate</span>
              <input {...register("birthday")} type="date" className="account-container__inputbox--input"></input>
            </div>
            <span className="account-container__noaccount">Already have an account?
              <Link to="/login">Login</Link>.
            </span>
            <div className="account-container__button-container">
              <button onClick={() => {setSlide(1)}} className="account-container__button-container--button">&gt;&gt;</button>
            </div> 
        </> }
            {
              slide == 1 &&
              <>
              <div className="account-container__inputbox">
                <span className="account-container__inputbox--label">E-mail</span>
                <input {...register("email")} className="account-container__inputbox--input"></input>
              </div>
              <div className="account-container__inputbox">
                <span className="account-container__inputbox--label">Password</span>
                <input {...register("password")} type="password" className="account-container__inputbox--input"></input>
              </div>
              <div className="account-container__inputbox">
                <span className="account-container__inputbox--label">Confirm Password</span>
                <Controller
                name="passwordRepeat"
                control={control}
                defaultValue=""
                render={() => (
                  <input {...register("passwordRepeat")} type="password" className="account-container__inputbox--input"></input>
                )}
                rules={{validate: value => password.current === value || "Passwords don't match."}}
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

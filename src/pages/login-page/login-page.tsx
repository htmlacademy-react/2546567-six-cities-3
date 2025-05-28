import { useEffect, useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../store/index.ts';
import { AuthPayload } from '../../store/slices/user-slice.ts';
import { useSelector } from 'react-redux';
import { AuthorizationStatus, CITIES } from '../../utils/const.ts';
import { tryAuth } from '../../store/middleware/user-thunk.ts';
import { setCurrentCity, TCity } from '../../store/slices/cities-slice.ts';

function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [authPayload, setAuthPayload] = useState<AuthPayload>({
    email: '',
    password: '',
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const authorizationStatus = useSelector(
    (state: RootState) => state.user.authorizationStatus
  );
  const error = useSelector((state: RootState) => state.user.error);
  const [randomCity] = useState<TCity>(
    () => CITIES[Math.floor(Math.random() * CITIES.length)]
  );

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate('/');
    }
  }, [authorizationStatus, navigate]);

  const validatePassword = (password: string): boolean => {
    let hasLetter = false;
    let hasDigit = false;

    for (const char of password) {
      if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
        hasLetter = true;
      } else if (char >= '0' && char <= '9') {
        hasDigit = true;
      }
    }

    return hasLetter && hasDigit;
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!validatePassword(authPayload.password)) {
      setPasswordError(
        'Пароль должен содержать минимум одну латинскую букву и одну цифру'
      );
      return;
    }

    setPasswordError(null);
    dispatch(tryAuth(authPayload));
  };

  const handleCityClick = () => {
    dispatch(setCurrentCity(randomCity));
    navigate('/');
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAuthPayload({
      ...authPayload,
      email: e.target.value,
    });

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setAuthPayload({
      ...authPayload,
      password: newPassword,
    });

    if (passwordError) {
      setPasswordError(null);
    }
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            {error && <div className="login__error-message">{error}</div>}
            <form className="login__form form" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={authPayload.email}
                  onChange={handleChangeEmail}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={authPayload.password}
                  onChange={handleChangePassword}
                />
                {passwordError && (
                  <div
                    className="login__error-message"
                    style={{ color: 'red', fontSize: '12px' }}
                  >
                    {passwordError}
                  </div>
                )}
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                data-testid="login-submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to="/"
                onClick={handleCityClick}
              >
                <span>{randomCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;

const LoginForm = () => {


  return (
    <section className="add-skill skills section section--with-bg login_section">

      {/* Start login */}
      <div className='card card-login'>
        <h1 className="bio__heading">
          أهلا بك من جديد!
          <br />
          <span className="bio__title"> سجّل الدخول </span>
          &nbsp;
          <img className="contact__social" src="./images/pray2.png" alt="pray" width="25px" />
        </h1>
        <form className="card__form">
          <div className="form">
            <div className="card__inputContainer">
              <label className="card__label" htmlFor="input">اسم المستخدم</label>
              <input type="text" className="card__input" placeholder="اكتب اسمك هنا" name="username" required />
              <span className="card__errorMessage"></span>
            </div>
            <div className="card__inputContainer">
              <label className="card__label" htmlFor="input">الرقم السري</label>
              <input type="password" className="card__input" placeholder="اكتب الرقم السري" name="password" />
              <span className="card__errorMessage"></span>
            </div>
            <div className="card__inputContainer bottom">
              <a href="#url" className="forgot">نسيت الرقم السري؟</a>
            </div>
            <div className="card__separator">
              <button className="say-hi-link">تسجيل</button>
            </div>
          </div>
        </form>
      </div>
      {/* End login */}

      {/* Start register */}
      <div className='card card-register'>
        <h1 className="bio__heading">
        مستخدم جديد؟
        <br />
          <span className="bio__title">
            أنشىء حسابك مجانا! 
            &nbsp;
            <img className="contact__social" src="./images/star-svgrepo-com.svg" alt="pray" width="25px" />
            </span>
        </h1>
        <form className="card__form">
          <fieldset>
            <div className="form">
              <div className="card__inputContainer">
                <label className="card__label" htmlFor="input">اسم المستخدم</label>
                <input type="text" className="card__input" placeholder="اكتب اسمك هنا" name="username" required />
                <span className="card__errorMessage"></span>
              </div>
              <div className="card__inputContainer">
                <label className="card__label" htmlFor="password">الرقم السري</label>
                <input type="password" className="card__input" placeholder="اكتب الرقم السري" name="password" required />
                <span className="card__errorMessage"></span>
              </div>
              <div className="card__inputContainer">
                <label className="card__label" htmlFor="password">تأكيد الرقم السري</label>
                <input type="password" className="card__input" placeholder="اكتبه مرة أخرى" name="password" required />
                <span className="card__errorMessage"></span>
              </div>
              <div className="card__separator">
                <button className="say-hi-link">إنشاء</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
      {/* End register */}

    </section>
  );
};

export default LoginForm;

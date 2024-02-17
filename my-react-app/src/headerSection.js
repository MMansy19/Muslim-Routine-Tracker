
const HeaderSection = ({ loginFunction, linkFunction, mainFunction }) => {
  return (
    <header id="header" className="header">
      <label className="burger-menu" htmlFor="menu">
        <div className="burger-menu__bar"></div>
        <div className="burger-menu__bar"></div>
        <div className="burger-menu__bar"></div>
      </label>
      <input id="menu" className="burger-menu__checkbox" type="checkbox" />

      <nav className="navigation">
        <ul className="navigation__list">
          <li>
            <a href="#header" id="login" className="navigation__link navigation__login" onClick={loginFunction}>تسجيل الدخول</a>
          </li>
          <li>
            <a href="#bio" className="navigation__link navigation__bio" onClick={mainFunction}>الصفحة الرئيسية</a>
          </li>
          <li>
            <a href="#skills" className="navigation__link navigation__skills" onClick={linkFunction}>أورادك</a>
          </li>
          <li>
            <a href="#add_skill" className="navigation__link add_skill" onClick={linkFunction}>أضف وردًا</a>
          </li>
          <li>
            <a href="#contact" className="navigation__link navigation__contact" onClick={linkFunction}>التواصل</a>
          </li>
        </ul>
      </nav>
      <div className="toggle">
        <h3 className="toggle__title">تغيير المظهر</h3>
        <input type="checkbox" name="toggle checkbox" id="toggle" className="toggle__checkbox" />
        <label htmlFor="toggle" className="toggle__label" role="button" tabIndex="0"></label>
      </div>
    </header>
  );
};

export default HeaderSection;

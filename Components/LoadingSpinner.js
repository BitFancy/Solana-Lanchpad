import style from "../styles/Loader.module.css";
const Loader = () => {
  return (
    <div id={style.backcolor}>
      <span id={style.spin}></span>
    </div>
  );
};

export default Loader;

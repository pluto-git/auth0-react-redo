import classes from "./Loading.module.css";

const loadingImg =
  "https://cdn.auth0.com/blog/auth0-react-sample/assets/loading.svg";

const Loading = () => (
  <div className={classes.spinner}>
    <img src={loadingImg} alt="Loading..." />
  </div>
);

export default Loading;

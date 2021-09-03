import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <>
      <main className="d-flex flex-column min-vh-100">
        <Header />
        <div className="container">{props.children}</div>
        <Footer />
      </main>
    </>
  );
};

export default Layout;

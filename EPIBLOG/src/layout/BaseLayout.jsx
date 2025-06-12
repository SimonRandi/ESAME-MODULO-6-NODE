import Footer from "../components/footer/Footer";
import Navbar from "../components/navigation/Navbar";
import Headers from "../components/headers/Headers";

const BaseLayout = ({ children }) => {
  return (
    <>
      <Navbar />

      {children}
      <Footer />
    </>
  );
};

export default BaseLayout;

//External Imports
import { Outlet, Link } from "react-router-dom";

//Local Imports
import Navbar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';

export default function MainLayout() {
  return (
    <>      
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
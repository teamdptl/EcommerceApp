import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import FeaturedProducts from '../components/home/FeaturedProducts';
import ProductCarousel from '../components/home/ProductCarousel';
import "flowbite";
import {useAuth} from "../context/AuthContext";

const Home = () => {
    return (
        <>
            <Header></Header>
            <ProductCarousel/>
            <FeaturedProducts/>
            <Footer></Footer>
        </>
    );
}

export default Home;
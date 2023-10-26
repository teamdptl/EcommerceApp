import { Carousel } from "flowbite-react";
const ProductCarousel = () => {
    return (
			<div class="flex justify-center w-full">
				<Carousel className="h-56 md:h-96">
					<img class="w-full" alt="..." src="https://flowbite.com/docs/images/carousel/carousel-1.svg" />
					<img class="w-full" alt="..." src="https://flowbite.com/docs/images/carousel/carousel-2.svg" />
					<img class="w-full" alt="..." src="https://flowbite.com/docs/images/carousel/carousel-3.svg" />
				</Carousel>
			</div>
		);
};

export default ProductCarousel;

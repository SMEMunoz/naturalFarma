import { useState } from 'react';
// import FilterCategory from '../../components/Filters/filterCategory';
import Slider from 'react-slick';
import style from './Home.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import img1 from '../../assets/oferta1.webp';
import img2 from '../../assets/oferta2.webp';
import { FaTruck, FaWhatsapp } from 'react-icons/fa';
import { BiSolidCreditCardFront } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const subcategorias = {
	Medicinales: ['Subcat1', 'Subcat2', 'Subcat3'],
	Perfumería: ['Subcat4', 'Subcat5', 'Subcat6'],
	Accesorios: ['Subcat7', 'Subcat8', 'Subcat9'],
	Estética: ['Subcat10', 'Subcat11', 'Subcat12'],
};

export default function Home() {
	const [activeCategory, setActiveCategory] = useState(null);

	const settings = {
		dots: true,
		infinite: true,
		speed: 2000,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		arrows: true,
	};

	const handleCategoryHover = (category) => {
		setActiveCategory(category);
	};

	const handleCategoryLeave = () => {
		setActiveCategory(null);
	};


	return (
		<div
			className={style.container}>
			<div className={style.cuerpo}>
				<div className={style.botones}>
					{['Medicinales', 'Perfumería', 'Accesorios', 'Estética'].map((category) => {
						return (
							<div
								key={category}
								onMouseEnter={() => handleCategoryHover(category)}>
								<button className={style.btn}>{category}</button>
								<div className={style.subcategoriasCont}>
									{activeCategory === category && (
										<div
											className={style.subcategorias}
											onMouseLeave={handleCategoryLeave}>
											{subcategorias[category]?.map((subCat) => {
												return (
													<Link
														to={'/'}
														key={subCat}
														className={style.subcategoria}>
														{subCat}
													</Link>
												);
											})}
										</div>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>

			<div className={style.slider}>
				<Slider {...settings}>
					<div>
						<img
							src={img1}
							alt="oferta 1"
							className={style.imagenOferta}
						/>
					</div>
					<div>
						<img
							src={img2}
							alt="oferta 2"
							className={style.imagenOferta}
						/>
					</div>
				</Slider>
			</div>

			<ul className={style.servicios}>
				<li className={style.servicioItem}>
					<BiSolidCreditCardFront className={style.icon} />{' '}
					<span>Hasta 12 cuotas sin interes</span>
				</li>
				<li className={style.servicioItem}>
					<FaWhatsapp className={style.icon} />
					<span>Atención personalizada</span>
				</li>
				<li className={style.servicioItem}>
					<FaTruck className={style.icon} />
					<span>Calculá el costo de tu envío</span>
				</li>
			</ul>
		</div>
	);
}

import { useDispatch, useSelector } from 'react-redux';
import Product from '../../components/Product/Product'; // Asegúrate de importar el componente Product
import style from './ProductList.module.css';
import SortComponent from '../../components/Sorts/SortComponent';
import { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import { Link } from 'react-router-dom';
import { clearProducts, searchProducts, setFavorites } from '../../redux/actions/searchActions';

const ProductList = () => {
	const allProducts = useSelector((state) => state.search.products); // Accede a la lista de perros desde el estado global de Redux.
	const searchQuery = useSelector((state) => state.search.searchQuery);

	const [currentPage, setCurrentPage] = useState(1); // Define el estado local para la página actual.

	const productsPerPage = 8; // Define la cantidad de perros a mostrar por página.

	const lastProductOfPage = currentPage * productsPerPage; // Calcula el último perro de la página actual.

	const firstProductOfPage = lastProductOfPage - productsPerPage; // Calcula el primer perro de la página actual.

	const currentProducts =
		allProducts && allProducts.slice(firstProductOfPage, lastProductOfPage); // Obtiene los perros de la página actual.

	const pagination = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const dispatch = useDispatch();

	useEffect(() => {
		if (allProducts.length === 0) {
			dispatch(searchProducts(''));
		}
		return () => {
			dispatch(clearProducts());
		};
	}, []);


		useEffect(() => {
		const storedFavorites = localStorage.getItem('favorites');
		if (storedFavorites) {
			const parsedFavorites = JSON.parse(storedFavorites);
			// Actualiza el estado de Redux con los favoritos almacenados
			dispatch(setFavorites(parsedFavorites));
		}
	}, []);

	return (
		<div className={style.productListContainer}>
			<div className={style.sort}>
			<SortComponent />
			</div>
			<div className={style.content}>
			<Pagination
				productsPerPage={productsPerPage}
				allProducts={allProducts.length}
				pagination={pagination}
				currentPage={currentPage}
			/>
			<ul className={style.products}>
				{currentProducts &&
					currentProducts.map((product) => {
						return (
							<li
								className={style.productContainer}
								key={product.id}>
								<Product product={product} />
								{/* Renderiza el componente Product con el producto */}
							</li>
						);
					})}
			</ul>
			</div>
		</div>
	);
};

export default ProductList;
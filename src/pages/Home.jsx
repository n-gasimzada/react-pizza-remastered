import React from 'react';
import qs from 'qs';
import LoadingSkeleton from '../components/PizzaBlock/LoadingSkeleton';
import { Categories, Sort, PizzaBlock } from '../components/allComponents';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sortCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { sorts } from '../components/Sort';
import { fetchPizza } from '../redux/slices/pizzaSlice';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);


  const { items, status } = useSelector((state) => state.pizza)
  const { category, sort, currentPage, searchValue} = useSelector((state) => state.filter);


  const onClickCategory = (id) => {
    dispatch(sortCategoryId(id))
  }

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

  const getPizza = () => {
      const sortBy = sort.sortBy.replace('-', '');
      const order = sort.sortBy.includes('-') ? 'desc' : 'asc';
      const categoryId = category > 0 ? `category=${category}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';
      dispatch(
        fetchPizza({
          sortBy,
          order,
          categoryId,
          search,
          currentPage
        }))
    window.scrollTo(0, 0)
  }



  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy: sort.sortBy,
        category,
        currentPage,
      });

      navigate(`?${queryString}`)
    }
    isMounted.current = true;
  }, [category, sort.sortBy, currentPage])


  React.useEffect(() => {
    getPizza()
  }, [category, sort.sortBy, searchValue, currentPage]);


  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sorts.find((obj) => obj.sortBy === params.sortBy);

      dispatch(setFilters({
        ...params,
        sort,

      })
      );
      isSearch.current = true;
    }
  }, [])

  const pizzaItems = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)

  console.log(items)
  return (
    <>
      <div className='container'>
        <div className="content__top">
          <Categories value={category} onClickCategory={(index) => onClickCategory(index)} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
           {status === 'loading'
              ? [...new Array(4)].map((_, index) => <LoadingSkeleton key={index} />)
              : pizzaItems}
        </div>
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  )
}

export default Home
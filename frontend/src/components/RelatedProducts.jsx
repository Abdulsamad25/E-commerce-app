import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({category,subCategory}) => {

  const {products} = useContext(ShopContext)
  const [related, setRelated] = useState([]);

  useEffect(() =>{
    if(products.length > 0){

      let productsCopy = products.slice();

      productsCopy = productsCopy.filter((item)=> category === item.category);

      productsCopy = productsCopy.filter((item)=> subCategory === item.subCategory);

      setRelated(productsCopy.slice(0,5));
    }
  },[products])
  return (
    <div>
      <div className="my-24">
        <div className="py-2 text-3xl text-center">
          <Title text1={'RELATED'} text2={'PRODUCTS'}/>

        </div>
        <div className="gap-4 gap-y-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {related.map((item,index)=>(
            <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RelatedProducts

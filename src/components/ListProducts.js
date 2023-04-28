import React, { useEffect, useState } from 'react';
import axios from 'axios'

const ListProducts = () => {

  const[nameProduct, setNameProduct]=useState("");
  const[products, setProducts]=useState([])

  const getProducts=async()=>{
    let res = await axios.get("http://localhost:8080/api/products")
    setProducts(res.data)
  }

  useEffect(()=>{
    getProducts()
  },[])

  const handleNameProductChange=(e)=>{
    setNameProduct(e.target.value)
  }


  const handleRecherche=()=>{
    axios.get(`http://localhost:8080/api/products/findProductByName/${nameProduct}`).then(res=>setProducts(res.data)).catch(error=>console.log(error))
  }

  const handleReSearchClick=()=>{
    if(nameProduct===""){
      getProducts()
    }else{
      handleRecherche(nameProduct)
    }
  }

  return (
    <div className='container mt-3'>
      <input type="text" value={nameProduct} onChange={handleNameProductChange} />
      <button onClick={handleReSearchClick} className='btn btn-success'>Rechercher</button>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Nom</th>
            <th scope='col'>Prix</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? products.map((product)=>(
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan={3}>Aucun produit trouvé</td>
            </tr>
          )  }
        </tbody>
      </table>
    </div>
  );
};

export default ListProducts;
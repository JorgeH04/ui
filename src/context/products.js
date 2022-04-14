import React, { Component } from 'react'
import axios from 'axios'
//import {getPosts} from './service'
import { getAll, paginate } from './data';
import { useMoralis } from 'react-moralis'
import { faker } from '@faker-js/faker'

export const ProductContext = React.createContext();


export default function ProductProvider({ children }) {
   const { authenticate, isAuthenticated, user, account, chainId, Moralis } = useMoralis();
   const [currentAccount, setCurrentAccount] = React.useState()
   const [currentUser, setCurrentUser] = React.useState()

   const [loading, setLoading] = React.useState(false);   
   const [products, setProducts] = React.useState([]);
   const [featured, setFeatured] = React.useState([]);
   const [sorted, setSorted] = React.useState([]);
   const [page, setPage] = React.useState(0);
   const [filters, setFilters] = React.useState({
    search: "",
    name: "todos",
    shipping: false,
    price: "todos"
  });
  const [price, setPrice] = React.useState();

 

  //  const initialUrl = `https://stelenapp.herokuapp.com/api/post`;

   const initialUrl = `http://localhost:4000/api/post`;

 //   const initialUrlDos = `https://stelenapp.herokuapp.com`;

   const initialUrlDos = `http://localhost:4000`;



   const requestCurrentUserData = async walletAddress => {
    try {
      const response = await fetch(
        `/api/fetchCurrentUserData?activeAccount=${walletAddress}`,
      )
      const data = await response.json()

      setCurrentUser(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const requestUsersData = async activeAccount => {
    try {
      const response = await fetch(
        `/api/fetchUsers?activeAccount=${activeAccount}`,
      )
      const data = await response.json()

   //   setCardsData(data.data)
    } catch (error) {
      console.error(error)
    }
  }


   React.useEffect(() => {
    checkWalletConnection()

    if (isAuthenticated) {
      requestUsersData(user.get('ethAddress'))
      requestCurrentUserData(user.get('ethAddress'))
    }
  }, [isAuthenticated])

  const checkWalletConnection = async () => {
    if (isAuthenticated) {
      const address = user.get('ethAddress')
      setCurrentAccount(address)
    //  requestToCreateUserProfile(address, faker.name.findName())
    } else {
      setCurrentAccount('')
    }
  }

  const connectWallet = async () => {
    if (!isAuthenticated) {
      try {
        await authenticate({
          signingMessage: 'Log in using Moralis',
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  const disconnectWallet = async () => {
    await Moralis.User.logOut()
    setCurrentAccount('')
  }


 



   React.useEffect(() => {
    setLoading(true);
    async function fetchData() {

      let response = await getAll(initialUrl);
      //console.log(response);
      setSorted(paginate(products));
      //
      
   //   console.log(response.data);
      setProducts(response.data);
      setLoading(false);
  
    
    
  }
  fetchData();
  
  }, []);

  

   
   React.useEffect(() => {
    setLoading(true);
    async function fetchData() {

      let responsedos = await getAll(initialUrlDos);
      //console.log(responsedos);
      //setSorted(paginate(products));
      //console.log(res);
      setFeatured(responsedos.data);
      setLoading(false);
  
    
    
  }
  fetchData();
  
  }, []);



   const changePage = index => {
    setPage(index);
  };


   const updateFilters = e => {
    const type = e.target.type;
    const filter = e.target.name;
    const value = e.target.value;
    let filterValue;
    if (type === "checkbox") {
      filterValue = e.target.checked;
    } else if (type === "radio") {
      value === "todos" ? (filterValue = value) : (filterValue = parseInt(value));
    } else {
      filterValue = value;
    }
    setFilters({ ...filters, [filter]: filterValue });
    console.log(filter);
  };





  const changePrice = (number) => {
    setPrice(price + number);
  };


  const handleCheck = (e) => {
    //  let vv = [...products].map(({title}) => title)
    // console.log( vv)
    const checked = e.target.checked;

    if (checked) {
      let vv = [...products].map(({title}) => title)
      console.log( vv)
    } else {
      let vv = [...products].map(({price}) => price)
      console.log( vv)
    }
  };






 


  React.useLayoutEffect(() => {
    let newProducts = [...products].sort((a, b) => a.price - b.price);
    
    const { search, name, shipping, price } = filters;
    //
    if (name !== "todos") {
      newProducts = newProducts.filter(item => item.name === name);
    }
    if (shipping !== false) {
      newProducts = newProducts.filter(item => item.free_shipping === shipping);
    }
    if (price !== "todos") {
      newProducts = newProducts.filter(item => {
        if (price === 0) {
          return item.price < 2000;
        } else if (price === 2000) {
          return item.price > 2000 && item.price < 5000;
        } else {
          return item.price > 5000;
        }
        
      });
    }
    if (search !== "") {
      newProducts = newProducts.filter(item => {
        let title = item.title.toLowerCase().trim();
        return title.startsWith(search) ? item : null;
      });
    }

    setPage(0);

    setSorted(paginate(newProducts));
       // console.log( newProducts)
  }, [filters, products]);
  


  






    return (
      <ProductContext.Provider
      value={{
        connectWallet,
        disconnectWallet,
        currentAccount,
        currentUser,
         
        products,
        featured,
        loading,
        filters,
        sorted,
        page,
        changePage,
        updateFilters,
        handleCheck,
        changePrice
      }}
    >
      {children}
    </ProductContext.Provider>

    )
}

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CartLink from "./Cart/CartLink";
import { useContext } from 'react'
import { ProductContext } from "../context/products";

import { PageHeader, Button, Input, Space, Badge } from 'antd';

export default function Nav() {

      const { connectWallet, currentAccount, disconnectWallet } = useContext(ProductContext)
        return (
            <header className="header">
            <nav>
              <ul>
                <div>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">Nosotros</Link>
                  </li>
                 
                  <li>
                    <Link to="/products">Productos</Link>
                  </li>   

                  <li>
                  {currentAccount ? (
                    <>
                       <span >
                           {currentAccount.slice(0, 6)}...{currentAccount.slice(39)}
                       </span>
                    <button
                    
                      onClick={() => disconnectWallet()}
                   >
                     Logout
                   </button>
                   </>
                    ) : (
 
                      <button   onClick={() => connectWallet()}>
                         Login
                     </button>
                          )}

                  </li>                      
                  
                </div>
                <div>
                  <CartLink />
                </div>
              </ul>
            </nav>
          </header>
        )
    }
 


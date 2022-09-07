import { createContext, ReactNode, useContext, useState } from "react"
import { useLocation } from "react-router-dom"
import { ShoppingCart } from "../components/ShoppingCart"
import { UseLocalStorage } from "../hooks/useLocalStorage"

type ShoppingCartProviderProps={
    children:ReactNode
}

type ShoppingCartContext={
    openCart:()=> void
    closeCart:()=> void
    getItemQty:(id: number)=> number
    increaseCartQty:(id: number)=> void
    decreaseCartQty:(id: number)=> void
    removeFromCart:(id: number)=> void
    cartQty:number
    cartItems:CartItem[]
    isOpen:boolean
}

type CartItem = {
    id: number
    qty:number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}:ShoppingCartProviderProps){

    const [isOpen,setIsOpen]= useState(false)
    const [cartItems,setCartItems]= UseLocalStorage<CartItem[]>("shopping-cart",[])
    const cartQty = cartItems.reduce((qty,item)=>item.qty + qty,0)

    const openCart =()=> setIsOpen(true)
    const closeCart =()=> setIsOpen(false)    

    function getItemQty(id:number){
        return cartItems.find(item => item.id === id)?.qty || 0
    }

    function increaseCartQty(id:number){
        setCartItems(currentItems=>{
            if(currentItems.find(item => item.id === id) ==null ){
                return [ ...currentItems,{id,qty:1}]
            }else{
                return currentItems.map(item =>{
                    if(item.id === id) return { ...item,qty:item.qty + 1 }
                    else return item
                })
            }
        })
    }

    function decreaseCartQty(id:number){
        setCartItems(currentItems=>{
            if(currentItems.find(item => item.id === id)?.qty ==1 ){
                return currentItems.filter(item => item.id !== id)
            }else{
                return currentItems.map(item =>{
                    if(item.id === id) return { ...item,qty:item.qty - 1 }
                    else return item
                })
            }
        })
    }
    
    function removeFromCart(id:number){
        setCartItems(currentItems =>{
            return currentItems.filter(item => item.id !== id)
        })
    }


    return (
        <ShoppingCartContext.Provider 
        value={{
            getItemQty,
            increaseCartQty,
            decreaseCartQty,
            removeFromCart,
            cartQty,
            openCart,
            closeCart,
            cartItems,
        }}>
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    )
}
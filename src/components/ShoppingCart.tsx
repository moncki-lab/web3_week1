import { Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import { CartItems } from "./CartItems"
import storeItems from "../data/items.json";


type ShoppingCartProps={
    isOpen:boolean
}

export function ShoppingCart({isOpen}) {
    const { closeCart,cartItems } = useShoppingCart()
    const total = cartItems.reduce((total,cartItem)=>{
        const item= storeItems.find( i => i.id ===cartItem.id)
            return total + (item.price || 0 ) * cartItem.qty
    },0 )
  return (
  <Offcanvas className="w-100" style={{maxWidth:'800px'}} show={isOpen} onHide={closeCart} placement="end">
    <Offcanvas.Header className="border-bottom" closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body className="p-0">
        <Stack >
            {cartItems.map(item =>(
                <CartItems key={item.id} {...item}/>
            ))}
            {total >0 ? <div className="ms-auto fw-bold fs-5 p-3 text-end">
                <span className="me-2 ">Total : </span> { formatCurrency(total)}
            </div>:
            <div className="fs-6 p-3 w-100 text-muted">Your bag is empty</div>
            }
            
        </Stack>
    </Offcanvas.Body>
  </Offcanvas>
  )
}

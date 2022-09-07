import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps={
    id:number
    qty:number
}

export function CartItems({id,qty}:CartItemProps) {
    const { removeFromCart }= useShoppingCart()
    const item=storeItems.find( i => i.id === id )
    if(item == null) return null

    return (
        <Stack direction="horizontal" className="border-bottom p-3" gap={3}>
            <div>
                <img src={item.imgUrl} style={{ maxWidth:'100px' }} />
            </div>
            <div className="me-auto">
                {item.name}{qty >= 1 && (<span className="text-muted ms-2" style={{fontSize:"11px"}}>x {qty}</span>)}<br/>
                <span style={{fontSize:'11px'}}>{ formatCurrency(item.price) }</span>  
            </div>
            <div>
                <strong>{ formatCurrency(item.price * qty) }</strong>
                <Button onClick={()=> removeFromCart(item.id)} variant="outline-secondary " size="sm" className="ms-3 rounded-circle " style={{width:'30px',height:'30px'}}><span>✕</span></Button>
            </div>
            
        </Stack>
    )
}

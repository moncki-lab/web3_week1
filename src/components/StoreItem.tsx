import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

type StoreItemProps={
    id: number,
    name: string,
    price:number,
    imgUrl:string
}


export function StoreItem({id,name,price,imgUrl}:StoreItemProps) {
    const { getItemQty,increaseCartQty,decreaseCartQty,removeFromCart } = useShoppingCart()
    const qty=getItemQty(id);
    return (
      <Card className="border-0 h-100">
        <Card.Img variant="top" src={ imgUrl } height="" style={{ objectFit:"cover" }}/>
          <Card.Body className="d-flex flex-column px-0">
              <Card.Title className="">
                  <h3 className="fs-5">{ name }</h3>
                  <p  className="fs-6 ml-auto">{ formatCurrency( price ) }</p>
              </Card.Title>
              <div className="mt-auto">
                {qty===0? (
                    <Button className="w-100 bg-dark border-dark p-3" onClick={()=>increaseCartQty(id)} >+ Add to Bag</Button>
                ):  
                    <div className="d-flex align-items-center">
                        <div className="p-2 ps-0 me-auto">QTY : {qty}</div>
                        <Button className="btn btn-dark m-1 me-0" style={{width:'45px',height:'45px'}} onClick={()=>decreaseCartQty(id)}>-</Button>
                        <Button className="btn btn-dark m-1" style={{width:'45px',height:'45px'}} onClick={()=>increaseCartQty(id)}>+</Button>
                    </div>
                }
              </div>
          </Card.Body>
      </Card>
    );
  }
  
import { Button, Container,Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Bag from "../assets/bag.svg";
import { useShoppingCart } from "../context/ShoppingCartContext";

export function Navbar(){
    const { openCart,cartQty } = useShoppingCart()
    return (
        <NavbarBs sticky="top" className="bg-white shadow-sm py-3">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link to={"/"} as={NavLink}>Home</Nav.Link>
                    <Nav.Link to={"/store"} as={NavLink}>Store</Nav.Link>
                    <Nav.Link to={"/about"} as={NavLink}>About</Nav.Link>
                </Nav>
               
                    <Button 
                    style={{ width:"3rem", height:"3rem",position:"relative" }} 
                    variant="outline-dark" 
                    className="rounded-circle"
                    onClick={openCart}
                >
                    <img className="w-100 h-100" style={{mixBlendMode: 'difference'}}  src={Bag}/>
                    
                    {cartQty > 0 && (
                        <div className="rounded-circle d-flex justify-content-center align-items-center bg-dark" 
                        style={{ color:"white", width:"1.5rem", height:"1.5rem", position:"absolute",bottom:0,right:0,transform:'translate(25%,25%)',fontSize:'0.875rem'  }}>
                            {cartQty}
                        </div>
                    )}
                </Button>
                
            </Container>
        </NavbarBs>
    )
}
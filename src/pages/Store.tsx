
import { Col,Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import storeItems from "../data/items.json";

export function Store(){
    return (
    <>
    <h1 >Store</h1>
    <Row  lg={3} md={2}  xs={2} className="g-3">
        {storeItems.map(item => (
            <Col className="p-3" key={item.id}>
                <StoreItem { ...item }/>
            </Col>
        ))}
    </Row>
    </>
    )
}
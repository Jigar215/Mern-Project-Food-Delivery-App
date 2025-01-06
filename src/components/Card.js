import React, { useState, useEffect, useRef } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    const handleOptions = (e) => {
        setSize(e.target.value);
    };

    const handleAddToCart = async () => {
        let food = null; // Use null to initialize the variable
        for (const item of data) {
            if (item.id === props.foodItem._id) { // Replace foodItem with props.foodItem
                food = item;
                break;
            }
        }

        console.log(food);
        console.log(new Date());

        // Check if food is not null
        if (food) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
                return;
            } else {
                await dispatch({
                    type: "ADD",
                    id: props.foodItem._id,
                    name: props.foodItem.name,
                    price: finalPrice,
                    qty: qty,
                    size: size,
                    img: props.ImgSrc,
                });
                console.log("Size different so simply ADD one more to the list");
                return;
            }
        }

        // If no matching food item is found, add a new entry
        await dispatch({
            type: "ADD",
            id: props.foodItem._id,
            name: props.foodItem.name,
            price: finalPrice,
            qty: qty,
            size: size,
            img: props.ImgSrc,
        });
    };

    let finalPrice = size ? qty * parseInt(options[size]) : 0;

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ width: "18rem", maxHeight: "600px" }}>
                    <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "200px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <p className="card-text">{props.foodItem.description}</p>
                        <div className="container">
                            <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    );
                                })}
                            </select>

                            <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={handleOptions}>
                                {priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>;
                                })}
                            </select>

                            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
                        </div>
                        <hr />
                        <button className={"btn btn-success justify-center ms-2"} onClick={handleAddToCart}>Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

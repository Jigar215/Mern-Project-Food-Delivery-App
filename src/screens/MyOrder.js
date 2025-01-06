import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState({});

    const fetchMyOrder = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/myorderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail'),
                }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const response = await res.json();
            setOrderData(response);
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className="container">
                <div className="row">
                    {Object.keys(orderData).length > 0 && orderData?.orderData?.order_data ? (
                        orderData.orderData.order_data.slice(0).reverse().map((item, index) => (
                            <div key={index}>
                                {/* Display Date if Available */}
                                {item[0]?.Order_date && (
                                    <div className="m-auto mt-5">
                                        <h4>{item[0].Order_date}</h4>
                                        <hr />
                                    </div>
                                )}
                                
                                {/* Display Items */}
                                {item.map((arrayData, idx) => (
                                    <div className="col-12 col-md-6 col-lg-3" key={`${index}-${idx}`}>
                                        <div
                                            className="card mt-3"
                                            style={{ width: '16rem', maxHeight: '360px' }}
                                        >
                                            <div className="card-body">
                                                <h5 className="card-title">{arrayData.name || 'Unknown Item'}</h5>
                                                <div
                                                    className="container w-100 p-0"
                                                    style={{ height: '38px' }}
                                                >
                                                    <span className="m-1">{arrayData.qty || '0'}</span>
                                                    <span className="m-1">{arrayData.size || 'N/A'}</span>
                                                    <div className="d-inline ms-2 h-100 w-20 fs-5">
                                                        ₹{arrayData.price || '0'}/-
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <p>No orders found</p>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}

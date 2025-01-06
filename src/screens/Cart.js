import React from 'react'
import Delete from '@material-ui/icons/Delete'
import { useCart, useDispatchCart } from '../components/ContextReducer';
// import trash from "../trash.svg"

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }

  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
        alert("Please log in to proceed.");
        return;
    }

    const payload = {
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
    };

    console.log("Payload Sent to API:", payload);

    try {
        const response = await fetch("http://localhost:5000/api/OrderData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        console.log("API Response:", response.status, response.statusText);

        if (response.status === 200) {
            dispatch({ type: "DROP" });
        } else {
            alert("Failed to place the order. Please try again.");
        }
    } catch (error) {
        console.error("Checkout Error:", error);
        alert("An error occurred. Please try again.");
    }
};




  let totalPrice = data.reduce((total, food) => total + food.price, 0)

  return (
    <div>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' style={{color:"green"}}>#</th>
              <th scope='col' style={{color:"green"}}>Name</th>
              <th scope='col' style={{color:"green"}}>Quantity</th>
              <th scope='col' style={{color:"green"}}>Option</th>
              <th scope='col' style={{color:"green"}}>Amount</th>
              <th scope='col' style={{color:"green"}}></th>
            </tr>
          </thead>
          <tbody >
            {data.map((food, index) => (
              <tr>
                <th scope='row' style={{color:"white"}} >{index + 1}</th>
                <td style={{color:"white"}}>{food.name}</td>
                <td style={{color:"white"}}>{food.qty}</td>
                <td style={{color:"white"}}>{food.size}</td>
                <td style={{color:"white"}}>{food.price}</td>
                <td ><button type="button" className="btn p-0"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>



    </div>
  )
}

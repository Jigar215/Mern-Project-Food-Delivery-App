import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [search, setsearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);

    // console.log(response[0],response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>

          <div className="carousel-inner " id='carousel'>
            <div class=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search for the food" aria-label="Search" value={search} onChange={(e) => { setsearch(e.target.value) }} />
                {/* <button className="btn text-white bg-success" type="submit">Search</button> */}
              </div>
            </div>
            <div className="carousel-item active" >
              <img src="https://static.wixstatic.com/media/2cbff6_cf6583ae65b346e7a22a5ecacf74453f~mv2.jpg/v1/fill/w_900,h_700,al_c,q_85/2cbff6_cf6583ae65b346e7a22a5ecacf74453f~mv2.jpg" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://soyummy.com/entertaining/wp-content/uploads/sites/3/2024/07/170420241713374139-900x700-1.webp" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa1K4KSuMMR8YF6oi4MN7C73S6f0OuwqUBWQ&s" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container">
        {
          foodCat && foodCat.length > 0
            ? foodCat.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">{data.CategoryName}</div>
                  <hr />

                  {
                    foodItem && foodItem.length > 0
                      ? foodItem.filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search))
                        .map(filterItems => {
                          return (
                            <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                              <Card foodItem={filterItems} options={filterItems.options[0]}> </Card>
                            </div>
                          );
                        }) : <div>No Such Data Found</div>
                  }

                </div>
              );
            })
            : ""
        }


        {/* <Card /> */}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

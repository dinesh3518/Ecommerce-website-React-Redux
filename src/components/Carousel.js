import React from 'react'
import c1 from '../assets/images/car1.JPG'
import c2 from '../assets/images/car2.JPG'
import c3 from '../assets/images/car3.JPG'

function Carousel() {
    
    return (
        <div id="carouselExampleIndicators" className="carousel slide carousel-fade rounded-4 border" data-bs-ride="carousel">
            <div className="carousel-indicators m-0">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active" role='button'>
                    <img src={c1} className="d-block w-100 rounded-3" alt="..." style={{ height: '12rem' }} />
                </div>
                <div className="carousel-item" role='button'>
                    <img src={c2} className="d-block w-100  rounded-3" alt="..." style={{ height: '12rem' }} />
                </div>
                <div className="carousel-item" role='button'>
                    <img src={c3} className="d-block w-100  rounded-3" alt="..." style={{ height: '12rem' }} />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Carousel
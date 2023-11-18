import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style1.css'; // Assuming you have a style.css file for your styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';

import Header from './header.js';
import Footer from './footer.js';
import MyModal from './MyModal.js';
import Ratings from './ratings.js'

const Info = () => {
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const handleShow1 = () => setShowModal1(true);
    const handleClose1 = () => setShowModal1(false);

    const { movieId } = useParams();

    const [data, setData] = useState({
        title: "",
        description: "",
        releaseDate: "",
        moviePoster: {},
        duration: {},
        castImages: [{}],
        directorImages: [{}],
        genre: [],
        language: []
    });

    useEffect(() => {
        axios.get(`http://localhost:8080/get-movie-info/${movieId}`)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    setData(res.data);
                } else {
                    Promise.reject();
                }
            })
            .catch((err) => { console.log(err); })
    }, [movieId]);

    return (
        <div className="bg-black">
            <Header />
            {data ? (
                <div className="row">
                    <div className="col-6 p-5">
                        <img src={`${data.moviePoster.cloudinaryURL}`} alt={data.title} height="550px" width="450px" className="rounded-5" />
                    </div>
                    <div className="col-6 text-white p-5">
                        <h1 className="mov">{data.title}</h1>
                        <br />
                        <p className="text-white align-content-between">{data.description}</p>
                        <h5 className="text-white">{data.duration.hours} hrs {data.duration.minutes} mins</h5>

                        {data.genre.map((g, index) => (
                            <h5 key={index} className="text-white">{g}</h5>
                        ))}

                        {data.language.map((l, index) => (
                            <h5 key={index} className="text-white">{l}</h5>
                        ))}
                        <br />

                        <button className="hpbt my-2 rounded" onClick={handleShow}><h2 className="sign">Book Tickets</h2></button>&ensp;&ensp;
                        <MyModal showModal={showModal} handleClose={handleClose} movieId={movieId} />
                        <button className="hpbt my-2 rounded" onClick={handleShow1}><h2 className="sign">View Ratings</h2></button>
                        <Ratings showModal={showModal1} handleClose={handleClose1} />
                        <br /><br />

                        <div className="row">
                            <h3 className="text-white">Director</h3>
                            <div className="col-8">
                                <div className="card bg-black">
                                    <div className="row">
                                        {data.directorImages.map((director, index) => (
                                            <div key={index} className="col-6">
                                                <img src={`${director.cloudinaryURL}`} height="150px" width="120px" />
                                                <h6 className="py-2 text-white">{director.name}</h6>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-8">
                                <div className="card bg-black">
                                    <h3 className="text-white">Starring</h3>
                                    <div className="row">
                                        {data.castImages.map((cast, index) => (
                                            <div key={index} className="col-6">
                                                <img src={`${cast.cloudinaryURL}`} height="150px" width="120px" />
                                                <h6 className="py-2 text-white">{cast.name}</h6>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>) : (<p> Loading ... </p>)
            }

            <Footer />
        </div >
    )
}

export default Info;

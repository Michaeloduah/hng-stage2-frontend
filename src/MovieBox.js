import { Modal,show,Button } from "react-bootstrap";
import React, { useState } from "react";
const API_IMG = "https://image.tmdb.org/t/p/w500/";

const MovieBox = ({
  id,
  title,
  poster_path,
  vote_average,
  release_date,
  runtime,
  overview,
}) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div className="card text-center bg-light mb-3">
      <div className="card-body">
        <img className="card-img-top" src={API_IMG + poster_path} />
        <div className="card-body">
          <button type="button" className="btn btn-info" onClick={handleShow}>
            View More
          </button>
          <a href={id} className="text-decoration-none"><button className="btn btn-primary mt-3">See More</button></a>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h3>{id}</h3>
              <img className="card-img-top" style={{width:`14rem`}} src={API_IMG+poster_path} />
              <h3>{title}</h3>
              <h4>ImDb: {vote_average}</h4>
              <h5>Release Date: {release_date}</h5>
              <h5>Rutime: {runtime}</h5>
              <br></br>
              <p>{overview}</p>
            </Modal.Body>
            <Modal.Footer>
              <button variant='secondary' onClick={handleClose}>
                Close
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default MovieBox;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import "./App.css";
import MovieBox from "./MovieBox";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const API_URL =
  "https://api.themoviedb.org/3/movie/popular?api_key=f7d948a1f846fa710b4efe2448ebe23e";
const API_SEARCH =
  "https://api.themoviedb.org/3/search/movie?query&api_key=f7d948a1f846fa710b4efe2448ebe23e";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        console.log(data);
      });
  }, []);

  const searchMovie = async (e) => {
    e.preventDefault();
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=f7d948a1f846fa710b4efe2448ebe23e`;
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    } catch (e) {}
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };
  return (
    <>
      <Navbar bg="info" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="/">MovieDb App</Navbar.Brand>
          <Navbar.Brand href="/">Trending</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-lg-3"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>

            <form className="d-flex" onSubmit={searchMovie}>
              <FormControl
                type="search"
                placeholder="Movie Search"
                className="me-2"
                aria-label="search"
                name="query"
                value={query}
                onChange={changeHandler}
              ></FormControl>
              <Button variant="secondary" type="submit">
                Search
              </Button>
            </form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Router>
        <Routes>
          <Route path="/" element={
            <div>
            {movies.length > 0 ? (
              <div className="container">
                <div className="grid">
                  {movies.map((movieReq) => (
                    <MovieBox key={movieReq.id} {...movieReq} />
                  ))}
                </div>
              </div>
            ) : (
              <h2 className="text-center text-white mt-5">
                Sorry!! No Movies Found
              </h2>
            )}
          </div>
          } />
          <Route path=":id" element={<MovieDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

import './StarwarsPlanets.css';
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import Star_Wars from "./Star_Wars.png";


const StarwarsPlanets = () => {
  const [planetsList, setPlanetsList] = useState([])
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)


  //fetch
  useEffect(() => {
    fetch(`https://swapi.dev/api/planets/?page=${page}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`something went wrong ! ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        //console.log(data.count)
        setPlanetsList(planetsList => planetsList.concat(data.results))
        setCount(data.count)
      })

  }, [setPlanetsList, page, setCount])

  const handleClick = () => {
    setPage(page + 1)

  }

  //console.log(planetsList)

  return (
    <section className="container py-5">
      <h1 className="mb-5 text-center text-white"><b>Planètes dans l'univers <img className="photo" src={Star_Wars} alt="logo Star Wars"></img></b></h1>
      <div className="row">
        {planetsList.map((element) => {
          return (
            <div key={element.name + element.population} className="col-md-6  col-lg-4 col-xl-3 mb-4">
              <article className="bg-warning p-3">
                <h2 className="h5"><em>{element.name}</em></h2>
                <p className="mb-0"><b>population :</b></p>
                <p className="mb-0">{element.population}</p>
                <p className="mb-0"><b>diameter :</b></p>
                <p className="mb-0">{element.diameter}</p>
                <p className="mb-0"><b>landscape :</b></p>
                <p className="mb-0">{element.terrain}</p>
                <p className="mb-0"><b>climate :</b></p>
                <p className="mb-0">{element.climate}</p>
              </article>
            </div>
          )
        })}
      </div>
      {count !== planetsList.length ? <button className="btn btn-dark" onClick={handleClick} type="button" ><b>Suivantes</b></button> :
        <p className="bg-dark text-white p-3"><b>Nous avons listé toutes les planètes recensées.</b></p>}
    </section>


  );
}

export default StarwarsPlanets;

import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";

const NotFound = () => {
  return (
    <div className="container-fluid p-0" style={{backgroundColor: '#0d1117',  minHeight: "100vh", color: "white"}}>
       <nav
        className="navbar navbar-expand-lg navbar-light "
        style={{ backgroundColor: "#101f28" }}
      >
        <div className="container d-flex justify-content-center">
          <a className="navbar-brand" href="/" style={{ color: "white" }}>
            Write Space
          </a>
        </div>
      </nav>
      <div className="container">
      <div className="row justify-content-center align-items-center w-100">
        <div className="col-12 col-md-6 d-flex justify-content-center">
         <img src="https://www.crunchyroll.com/build/assets/img/yuzu-bucket.png" style={{ maxWidth: '450px', minWidth: '12rem'}} alt="" />
        </div>
        <div className="col-12 col-md-6">
        <Typography
              variant="h2"
              component="div"
              sx={{
                fontWeight: "bold",
                background: "linear-gradient(to right,rgb(145, 147, 255), #4493f8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              404
            </Typography>
          <h2>¡Vaya! Página no encontrada</h2>
          <p>¡Aqui no hay nada!</p>
          <div className="mt-4">
          <Link to="/">
          <Button variant="contained" style={{backgroundColor: '#4493f8'}}>Volver al inicio</Button>
          </Link>
          </div>
        </div>
      </div>
      </div>
     
    </div>
  );
};

export default NotFound;

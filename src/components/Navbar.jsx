import { TiWeatherStormy } from "react-icons/ti";

export default function Navbar() { 
  return (
    <>
      <div className="nav bg-dark d-flex justify-content-center fixed-top">
        <a className="navbar-brand" href="/">
          <TiWeatherStormy style={{ color: "white", margin: "5px" }} />
          Stomify
        </a>
      </div>
    </>
  );
}

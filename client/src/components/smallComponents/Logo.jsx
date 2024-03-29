import {Link} from "react-router-dom";

function Logo({onClick}) {
    const onclick = () =>{
        onClick();
        window.scrollTo(0,0);
    }
  return (
    <Link to="/" className="logoImage" onClick={onclick}>
      Blimbing Blog
    </Link>
  )
}

export default Logo

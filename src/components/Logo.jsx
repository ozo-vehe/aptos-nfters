import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Logo = ({ textStyle }) => {
  return (
    <Link
      to="/"
      className={`${textStyle} montserrat font-[900] navbar-logo min-w-[100px]`}
    >
      NFTERS
    </Link>
  );
};

export default Logo;

Logo.propTypes = {
  textStyle: PropTypes.string,
};

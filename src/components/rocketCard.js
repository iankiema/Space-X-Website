import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { reserveRocket, cancelReservation } from '../redux/Rockets/rocketsSlice';
import '../App.css';

// eslint-disable-next-line react/prop-types
const RocketCard = ({ props }) => {
  const {
    id, name, image, description, reserved,
  } = props;

  const dispatch = useDispatch();

  const handleReserveClick = () => {
    if (reserved) {
      dispatch(cancelReservation(id));
    } else {
      dispatch(reserveRocket(id));
    }
  };

  return (
    <div key={id} className="rocket-alone">
      <div>
        <img src={image} alt="" />
      </div>
      <div className="rocket-desc">
        <h2>{name}</h2>
        <div className="badge">
          {reserved && <span className="reserved-badge">Reserved</span>}
          <p>{description}</p>
        </div>
        {reserved ? (
          <button type="button" className="cancel-reservation" onClick={handleReserveClick}>
            Cancel Reservation
          </button>
        ) : (
          <button type="button" className="rocket-reservation" onClick={handleReserveClick}>
            Reserve rocket
          </button>
        )}
      </div>
    </div>
  );
};

RocketCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  reserved: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default RocketCard;

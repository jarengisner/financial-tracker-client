import { Row } from 'react-bootstrap';
import { stateManipulationFunction } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleXmark,
  faHouse,
  faGear,
} from '@fortawesome/free-solid-svg-icons';

//styles
import '../home-side-bar/side-bar-styles.css';
import { Link } from 'react-router-dom';

interface sideBarOpenedProps {
  closeSideBar: stateManipulationFunction;
}

export const SideBar: React.FC<sideBarOpenedProps> = ({ closeSideBar }) => {
  return (
    <div className='icon-container'>
      <Row>
        <div className='close-button-container'>
          <button
            className='close-menu-button'
            data-testid='closeSideBarButton'
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              className='close-menu-icon'
              onClick={() => closeSideBar()}
            />
          </button>
        </div>
      </Row>
      <Row>
        <Link to='/'>
          <div className='home-button-container'>
            <button className='home-menu-button' data-testid='homeButton'>
              <FontAwesomeIcon icon={faHouse} className='home-menu-icon' />
            </button>
          </div>
        </Link>
      </Row>
      <Row>
        <div className='settings-button-container'>
          <button className='settings-menu-button'>
            <FontAwesomeIcon icon={faGear} className='settings-menu-icon' />
          </button>
        </div>
      </Row>
    </div>
  );
};

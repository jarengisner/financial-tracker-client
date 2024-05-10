import { Row } from 'react-bootstrap';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../home-side-bar/side-bar-styles.css';
import { stateManipulationFunction } from '../../types';

interface sideBarClosedProps {
  openSideBar: stateManipulationFunction;
}

export const SideBarClosed: React.FC<sideBarClosedProps> = ({
  openSideBar,
}) => {
  return (
    <Row>
      <div className='open-button-container'>
        <button className='open-menu-button' onClick={() => openSideBar()}>
          <FontAwesomeIcon icon={faList} className='open-menu-icon' />
        </button>
      </div>
    </Row>
  );
};

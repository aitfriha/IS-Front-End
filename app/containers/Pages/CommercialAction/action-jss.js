import { translate } from 'autoprefixer';

const style = () => ({
  outerDropzone: {
    height: '140px',
  },
  innerDropzone: {
    height: '140px',
  },
  dropTarget: {
    backgroundColor: '#29e',
    borderColor: '#fff',
    borderStyle: 'solid',
  },
  dropZone: {
    backgroundColor: '#bfe4ff',
    margin: '10px auto 30px',
    padding: '10px',
    width: '80%',
    transition: 'background-color 0.3s',
  },
  dropActive: {
    backgroundColor: '#bfe4ff',
    borderColor: '#ff004f',
    borderStyle: 'solid',
  },
  canDrop: {
    color: '#000',
    backgroundColor: '#4e4',
  },
  dragDrop: {
    display: 'inline-block',
    minWidth: '40px',
    padding: '2em 0.5em',
    margin: '1rem 0 0 1rem',
    color: '#fff',
    backgroundColor: '#29e',
    border: 'solid 2px #fff',
    touchAction: 'none',
    transform: translate('0px', '0px'),
    transition: 'background-color 0.3s',
  },
});

export default style;

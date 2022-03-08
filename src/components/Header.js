import PropTypes from 'prop-types';
import Button from './Button'

const Header = ({title, onAdd, showAdd}) => {
    const onClick = () => {
        onAdd()
    }
    return (
    <header className='header'>
        <h1>{title}</h1>
        <Button color={showAdd ? 'red' : 'green'}
                text={showAdd ? 'Close' : 'Add'}
                onClick={onClick}
        />
    </header>
  )
}

// default value for props parameter for Header component
Header.defaultProps = {
    title: 'Task Tracker',
}

// declaring that the title property is a string type, must be included
Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
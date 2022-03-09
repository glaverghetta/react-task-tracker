import PropTypes from 'prop-types';
import Button from './Button'

const Header = ({title, onAdd, onDeleteAll, showAdd}) => {
    /*const onClick = () => {
        onAdd()
    }
    const onClickDeleteAll = () => {
        onDeleteAll()
    }*/
    return (
    <header className='header'>
        <h1>{title}</h1>
        <Button color={showAdd ? 'orange' : 'green'}
                text={showAdd ? 'Close' : 'Add'}
                onClick={onAdd}
        />
        <Button color='red'
                text='Delete all'
                onClick={onDeleteAll}
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
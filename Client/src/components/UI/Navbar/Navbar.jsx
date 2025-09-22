import './Navbar.css';
import { Link } from 'react-router-dom';
import Up from '../../UX/SplitText/SplitTextUp';


export default function Navbar() {


    return(

        <div className='Navbar'>
            <Up delay={0.75}>
            <Link to="/" className='h1'>ЭЛИКСИР КОМБИНАТ</Link>
            </Up>

            <Up delay={0.75}>
            <div className='links'>
                <Link to="/Music">MUSIC</Link>
                <Link to="/Merch">Merch</Link>
            </div>
            </Up>

        </div>
        

    )
}
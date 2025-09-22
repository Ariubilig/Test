import './Home.css';
import Up from '../../components/UX/SplitText/SplitTextUp';

function Home() {
    return(
        <div className='Home'>
            <div className='Home-columns'>
                <div className='Home-left'>
                    <Up delay={1}>
                        <h1>started from <br /> the bottom</h1>
                    </Up>
                </div>
                <div className='Home-right'>
                    <Up delay={1.25}>
                        <h1>BELLATRIX</h1>
                        <h1>SITAN</h1>
                        <h1>EMURACS</h1>
                        <h1>NOEL</h1>
                        <h1>SANDAN</h1>
                    </Up>
                </div>
            </div>

            <div className='second'>
                <div className='second-left'>
                    <h1>WE DO MUSIC</h1>
                </div>
                <div className='second-right'>

                </div>
            </div>

            <div className='third'>
                <div className='third-left'>

                </div>
                <div className='third-right'>
                    <h1>AND CLOTHS</h1>
                </div>
            </div>
        </div>
    )
}

export default Home;
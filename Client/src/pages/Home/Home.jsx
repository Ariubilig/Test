import './Home.css';
import Up from '../../components/UX/SplitText/SplitTextUp';

function Home() {
    return(
        <div className='Home'>
            <div className='first-columns'>
                <div className='first-left'>
                    <Up delay={1.25}>
                        <h1>started from <br /> the bottom</h1>
                    </Up>
                </div>
                <div className='first-right'>
                    <Up delay={1.50}>
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

                    <Up>
                    <h1>WE DO MUSIC</h1>
                    </Up>

                </div>
                <div className='second-right'>

                </div>
            </div>

            <div className='third'>
                <div className='third-left'>
                </div>
                <div className='third-right'>

                    <Up>
                    <h1>AND CLOTHES</h1>
                    </Up>

                </div>
            </div>
        </div>
    )
}

export default Home;
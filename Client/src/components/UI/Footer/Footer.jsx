import './Footer.css';

export default function Footer() {
    
  return (
  <div 
    className="footer1-container"
    style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
  >
    <div className="footer1-relative">
      <div className="footer1-sticky">
        <div className="content-container">
          <Section1 />
          <Section2 />
        </div>
      </div>
    </div>
  </div>
  )
}

const Section1 = () => {
    return (
        <div>
            <Nav />
        </div>
    )
}

const Section2 = () => {
    return (
        <div className="section2">
            <h1 className="section2-title">Footer lalrudaa</h1>
            <p>©copyright</p>
        </div>
    )
}

const Nav = () => {
    return (
        <div className="nav-container">
            <div className="nav-section">
                <h3 className="nav-title">About</h3>
                <p>Home</p>
                <p>Projects</p>
                <p>Our Mission</p>
                <p>Contact Us</p>
            </div>
            <div className="nav-section">
                <h3 className="nav-title">Education</h3>
                <p>News</p>
                <p>Learn</p>
                <p>Certification</p>
                <p>Publications</p>
            </div>
        </div>
    )
}

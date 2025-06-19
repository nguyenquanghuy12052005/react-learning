import VideoHomePage from "../../assets/video-homepage.mp4"
const Home = (props) => {
 return (
    <div className="homepage-container">
        <video  autoPlay muted loop>
            <source src={VideoHomePage}
            type="video/mp4">
            </source>
        </video>
    </div>
 )
}
export default Home;
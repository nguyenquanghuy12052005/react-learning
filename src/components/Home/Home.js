import VideoHomePage from "../../assets/video-homepage.mp4"
const Home = (props) => {
 return (
    <div className="homepage-container">
        <video  autoPlay muted loop>
            <source src={VideoHomePage}
            type="video/mp4">
            </source>
        </video>

        <div className="homepage-content">
            <div className="title-1">Chào mừng đến với trang của t</div>
            <div className="title-2">
                Lần thứ 2 full 5 nhưng anh ấy bảo chỉ học cho đỡ liệt🐧
                Anh ấy thậm chí còn có thể thao túng cả điểm văn😲
                    Điểm thi thử lần 2 Nam Định</div>

            <div className="title-3">
                <button>Get started</button>
                </div>

        </div>
    </div>
 )
}
export default Home;
import logo from './../boyimage.png';
import "./ImageContainer.css";
import "./../App.css";
const ImageContainer = () => {
    return (
        <div >
            <div style={{ padding: 20 }} >
                <div className='montserratFont montserratFontBig' style={{ color: "#F8F8FF", fontWeight: 300 }} >
                    Convert Currency
                </div>
                <div className='montserratFont montserratFontGradient montserratFontBig' style={{ fontWeight: 300 }}  >
                    Real-time
                </div>
                <div className='montserratFont montserratFontSmall' style={{ marginTop: 24, color: "#F8F8FF", fontWeight: 300 }}  >
                    With DZap's advanced currency converter
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: 24 }} >
                <img className='logoImage' src={logo} alt="logo" />
            </div>
        </div>
    )
}

export default ImageContainer;
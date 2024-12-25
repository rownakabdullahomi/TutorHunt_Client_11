// import loadingSpinner from "../assets/800.gif"
import BeatLoader from "react-spinners/BeatLoader";

const Loading = () => {
    return (
        // <div className="flex min-h-screen justify-center items-center">
        //     <span className="">
        //         <img src={loadingSpinner} alt="" />
        //     </span>
        // </div>

        <div className="flex min-h-screen justify-center items-center">
        <BeatLoader color="#38D6B7" size={80} />
        </div>
    );
};

export default Loading;
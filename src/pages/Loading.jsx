import loadingSpinner from "../assets/800.gif"

const Loading = () => {
    return (
        <div className="flex min-h-screen justify-center items-center">
            <span className="">
                <img src={loadingSpinner} alt="" />
            </span>
        </div>
    );
};

export default Loading;
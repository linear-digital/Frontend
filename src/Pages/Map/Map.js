import Lottie from "react-lottie";
import robots from "../../../src/lottie/robot.json";

const Map = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: robots,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 md:px-8 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-7xl w-full">
                {/* Responsive Lottie Animation */}
                <div className="flex justify-center">
                    <div className="max-w-[250px] sm:max-w-[300px] md:max-w-[400px]">
                        <Lottie options={defaultOptions} />
                    </div>
                </div>

                {/* User Info Section */}
                <div className="text-center lg:text-left p-6 w-full">
                    <h1 className="text-xl sm:text-2xl md:text-2xl font-bold">Hazrat Ali Programmer || Software Engineering</h1>                 
                    {/* Responsive Map */}
                    <div className="mt-4">
                        <iframe
                            title="dhaka"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46830151.11795828!2d-119.8093025!3d44.24236485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sbd!4v1740062331678!5m2!1sen!2sbd"
                            className="w-full h-[250px] sm:h-[350px] md:h-[450px]"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Map;

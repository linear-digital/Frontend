import { FaHome, FaLaptopCode, FaFolder, FaRocket, FaGraduationCap, FaRegNewspaper, FaUsers } from 'react-icons/fa';

const Documentation = () => {
    return (
        <div className="max-w-5xl mx-auto w-full  rounded-xl p-10 space-y-10">
            <header className="text-center">
                <h1 className="text-4xl font-extrabold text-blue-600">Portfolio Documentation</h1>
                <p className="mt-2">Explore my portfolio, skills, and professional journey.</p>
            </header>

            <div className="grid md:grid-cols-2 gap-8">
                <section className="p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                    <h2 className="text-2xl font-semibold text-blue-600"><FaHome color="#1E90FF" /> Home</h2>
                    <p className="mt-2">Find all my social media activities, along with my picture and details.</p>
                </section>

                <section className="p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                    <h2 className="text-2xl font-semibold text-blue-600"><FaLaptopCode color="#FF6347" /> Services</h2>
                    <ul className="list-disc pl-6 mt-2">
                        <li>Software Engineering</li>
                        <li>Full-time Development</li>
                        <li>Python & Web Development</li>
                        <li>Game Development</li>
                    </ul>
                </section>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <section className="p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                    <h2 className="text-2xl font-semibold text-blue-600"><FaFolder color="#32CD32" /> Projects</h2>
                    <p className="mt-2">Showcasing my latest projects with descriptions and live previews.</p>
                </section>

                <section className="p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                    <h2 className="text-2xl font-semibold text-blue-600"><FaRocket color="#FFD700" /> Skills</h2>
                    <p className="mt-2">A comprehensive list of my programming and technical skills.</p>
                </section>

                <section className="p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                    <h2 className="text-2xl font-semibold text-blue-600"><FaGraduationCap color="#8A2BE2" /> Education</h2>
                    <p className="mt-2">My educational background and certifications.</p>
                </section>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <section className="p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                    <h2 className="text-2xl font-semibold text-blue-600"><FaRegNewspaper color="#FF1493" /> Blog Section</h2>
                    <p className="mt-2">Daily updates on my blog, covering various tech topics.</p>
                </section>

                <section className="p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                    <h2 className="text-2xl font-semibold text-blue-600"><FaUsers color="#00CED1" /> Team</h2>
                    <p className="mt-2">I collaborate with a team or work individually, depending on the project.</p>
                </section>
            </div>
        </div>
    );
};

export default Documentation;

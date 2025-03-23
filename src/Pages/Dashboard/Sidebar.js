import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = ({ setActive, active }) => {
    return (
        <div className='w-[250px] hidden lg:block  h-full rounded px-2 py-5'>
            <Link
                to={'/dashboard'}
                onClick={() => setActive("profile")}
                className={`btn text-white  ${active === "profile" ? "btn-primary" : "btn-neutral"} w-full`}>
                Dashboard
            </Link>
            <Link
                to={'/feedback'}
                onClick={() => setActive("Feedback")}
                className={`btn text-white  mt-2 ${active === "Feedback" ? "btn-primary" : "btn-neutral"} w-full`}>
                Write a Feedback
            </Link>
        </div>
    )
}

export default Sidebar
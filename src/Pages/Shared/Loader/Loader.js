import React from "react";
import "./Loader.css";

const Loader = ({ loading, change }) => {
  return (
    <div className="loader dark:bg-black">
      <section id="preloader-section">
        <div id="preloader">
          <div id="ctn-preloader" className="ctn-preloader">
            <div className="animation-preloader">
              {change ? (
                <img src="/end.gif" alt="" className="h-[400px]" />
              ) : (
                <img src="/start.gif" alt="" className="h-[400px]" />
              )}

              <div className="txt-loading">
                <span data-text-preloader="H" className="letters-loading">
                  H
                </span>
                <span data-text-preloader="A" className="letters-loading">
                  A
                </span>
                <span data-text-preloader="Z" className="letters-loading">
                  Z
                </span>
                <span data-text-preloader="R" className="letters-loading">
                  R
                </span>
                <span data-text-preloader="A" className="letters-loading">
                  A
                </span>
                <span data-text-preloader="T" className="letters-loading">
                  T
                </span>
                <span data-text-preloader="" className="letters-loading">
                  {" "}
                </span>
                <span data-text-preloader="A" className="letters-loading">
                  A
                </span>
                <span data-text-preloader="L" className="letters-loading">
                  L
                </span>
                <span data-text-preloader="I" className="letters-loading">
                  I
                </span>
              </div>
            </div>

            <div className="loader-section section-left"></div>
            <div className="loader-section section-right"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Loader;

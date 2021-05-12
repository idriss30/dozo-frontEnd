import { useEffect, useState } from "react";

import "./alert.scss";

const Alert = ({ alertText }) => {
  //use state to show or hide on click
  const [showing, setShowing] = useState(true);

  // use hook to set a timer to remove the alert after 3seconde

  useEffect(() => {
    let timer = setTimeout(() => {
      setShowing(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showing && (
        <div className="alert">
          <div className="alert__container">
            <div className="alert__container-close">
              <span
                onClick={() => {
                  setShowing(false);
                }}
              >
                X
              </span>
            </div>

            <p>{alertText}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;

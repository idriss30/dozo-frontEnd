import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../alertComponent/alert";
import "./search.scss";
const SearchForm = ({ closeForm, products }) => {
  // define the alert state first
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  // define the state results
  const [showResult, setShowResult] = useState(false);

  // define the input state change
  const [inputChange, setInputChange] = useState("");
  // define a state to handle to filtered Array
  const [filteredArray, setFilteredArray] = useState([]);

  // useEffect to stop memory leak from setAlert bug
  // when form is submited multiple times while alert is mounted
  useEffect(() => {
    setAlert(false);
  }, [inputChange]);

  // define the function to handle the input Change
  const handleInputChange = (e) => {
    setInputChange(e.target.value);
  };

  // handle the Form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const filtered = products.filter((product) => {
      return product.name.toLowerCase().includes(inputChange.toLowerCase());
    });

    if (filtered.length > 0) {
      setShowResult(true);
      setFilteredArray(filtered);
    } else {
      setAlert(true);
      setAlertMessage('No Products found, try "coat, jacket" as example');
    }
  };

  return (
    <>
      {alert && <Alert alertText={alertMessage} />}

      {!showResult && (
        <div className="container__search">
          <form onSubmit={handleFormSubmit}>
            <span>
              <Link to="#" onClick={closeForm}>
                <i className="fas fa-times"></i>
              </Link>
            </span>
            <input
              onChange={handleInputChange}
              type="text"
              name="search"
              placeholder=" Filter By Name"
              autoFocus
            />
            <span>
              <Link to="/" onClick={handleFormSubmit}>
                <i className="fas fa-search"></i>
              </Link>
            </span>
          </form>
        </div>
      )}
      {
        //display the result only if form is submitted
        showResult && (
          <section className="search__section">
            <div
              className="search__back"
              onClick={() => {
                setShowResult(false);
              }}
            >
              <span> {"<"}back</span>
            </div>
            <div className="search__container">
              {filteredArray.map((product) => {
                return (
                  <div
                    className="search__container-group"
                    key={product.id + Math.random()}
                  >
                    <img
                      src={`/assets/img/${product.imageName}-front.jpg`}
                      alt={product.name}
                    />
                    <div>
                      <p> {product.name}</p>
                      <button
                        onClick={() => {
                          window.location.href = `http://localhost:3000/shop/products/${product.id}`;
                        }}
                      >
                        view Item
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )
      }
    </>
  );
};

export default SearchForm;

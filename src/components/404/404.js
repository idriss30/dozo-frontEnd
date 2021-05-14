import("./404.scss");
const NotFound = () => {
  return (
    <>
      <div className="wrong__page">
        <h1>404</h1>
        <p>Looks like you got Lost!!</p>
        <p>Request could not be found on the server</p>
        <p>Please Navigate Away</p>
      </div>
    </>
  );
};

export default NotFound;

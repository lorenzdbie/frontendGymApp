import dumbbellLoader from '../assets/loader.png'

export default function Loader({ loading }) {
  if (loading) {
    return (
      <>
        <div className="divSpin">
          <img
            className="dumbbellSpin"
            src={dumbbellLoader}
            alt="loader"
          />
        </div>
        <div><p>Loading...</p></div>
        
      </>
    );
  }

  return null;
}

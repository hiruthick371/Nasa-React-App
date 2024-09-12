export default function SideBar(props) {

  const {showModal,handleToggleModal,data} = props;

  return (<>
    <div className="sidebar">
      <div className="bgOverlay"></div>
      <div className="sidebar-contents">
        <h2>{data?.title}</h2>
        <div className="description-container">
          <p className="descriptionTitle">{data?.date}</p>
          <p>{data?.explanation}</p>
        </div>
        <button onClick={handleToggleModal}>
          <i className="fa-solid fa-right-long"></i>
        </button>
      </div>
    </div>

  </>);
}
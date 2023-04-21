import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPhotos,
  updatePhotoTitles,
  resetPhotoTitles,
} from "../../intl/redux/Action/photoAction";
import { PhotoState } from "../../intl/redux/photoReducer";



interface UpdatedTitles {
  [key: number]: string;
}

function ConfirmCard() {
  const dispatch = useDispatch();
  const { photos, loading } = useSelector((state): { photoReducer: PhotoState } => state.photoReducer);
  const [updatedTitles, setUpdatedTitles] = useState<UpdatedTitles>({});
  const [editable, setEditable] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setUpdatedTitles({
      ...updatedTitles,
      [index]: event.target.value,
    });
  };

  const handleEditClick = (index: number) => {
    setEditable(index);
  };

  // const handleBlur = () => {
  //   setEditable(null);
  // };

  const handleConfirmUpdate = () => {
    dispatch(updatePhotoTitles(updatedTitles));
    setUpdatedTitles({});
  };

  const handleReset = () => {
    dispatch(resetPhotoTitles());
    setUpdatedTitles(
      photos.reduce((obj: UpdatedTitles, item: any, index: number) => {
        obj[index] = item.title;
        return obj;
      }, {})
    );
  };

  return (
    <Suspense fallback={<img src={require("../../../assets/imgLoading/Loading.gif")} alt="Loading" />}>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Thumbnail</th>
                      <th>Title</th>
                      <th>Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={3}>LOADING...</td>
                      </tr>
                    ) : (
                      photos.map((item: any, index: number) => (
                        <tr key={index} className={`${index % 2 === 0 ? "table-secondary" : ""}`}>
                          <td><img src={item.thumbnailUrl} alt={item.title} className="img-thumbnail" /></td>
                          <td>
                            {editable === index ? (
                              <input
                                type="text"
                                value={updatedTitles[index] || item.title}
                                onChange={(event) => handleInputChange(event, index)}
                                // onBlur={() => handleBlur()}
                                autoFocus
                                className="form-control"
                              />
                            ) : (
                              <span onClick={() => handleEditClick(index)}>{item.title}</span>
                            )}
                          </td>
                          <td>{Date.now()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <div className="d-flex justify-content-end">
                  <button
                    style={{ marginRight: '30px' }}
                    className="btn btn-primary"
                    disabled={Object.keys(updatedTitles).length === 0}
                    onClick={handleConfirmUpdate}
                  >
                    Confirm Update
                  </button>
                  <button
                    className="btn btn-secondary"
                    disabled={Object.keys(updatedTitles).length === 0}
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default ConfirmCard;

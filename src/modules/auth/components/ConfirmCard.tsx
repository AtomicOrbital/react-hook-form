import { Suspense, memo, useEffect, useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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

  const handleBlur = () => {
    setEditable(null);
  };

  const handleConfirmUpdate = () => {
    dispatch(updatePhotoTitles(updatedTitles));
    setUpdatedTitles({});
    setEditable(null);
  };

  const handleReset = () => {
    dispatch(resetPhotoTitles());
    setUpdatedTitles(
      photos.reduce((obj: UpdatedTitles, item: any, index: number) => {
        obj[index] = item.title;
        return obj;
      }, {})
    );
    setEditable(null);
  };

  const totalPages = Math.ceil(photos.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = photos.slice(indexOfFirstItem, indexOfLastItem);

  const Pagination = () => {
    const maxPagesToShow = 10;
    const arrayPages = [];
    const firstPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const lastPage = Math.min(totalPages, firstPage + maxPagesToShow - 1);
    for (let i = firstPage; i <= lastPage; i++) {
      arrayPages.push(
        <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
          <a className="page-link" href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}>
            {i}
          </a>
        </li>
      );
    }

    return (
      <nav className="d-flex justify-content-center" aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a className="page-link" href="#" aria-label="Previous"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) handlePageChange(currentPage - 1)
              }}>
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          {arrayPages}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <a className="page-link" href="#" aria-label="Next"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) handlePageChange(currentPage + 1)
              }}>
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
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
                      currentItems.map((item: any, index: number) => (
                        <tr key={index} className={`${index % 2 === 0 ? "table-secondary" : ""}`}>
                          <td><img src={item.thumbnailUrl} alt={item.title} className="img-thumbnail" /></td>
                          <td>
                            {editable === index ? (
                              <input
                                type="text"
                                value={updatedTitles[index] || item.title}
                                onChange={(event) => handleInputChange(event, index)}
                                key={index}
                                onBlur={() => handleBlur()}
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
                <div>
                  <div className="d-flex justify-content-end">
                    <button
                      style={{ marginRight: '30px' }}
                      className={`btn btn btn-outline-success`}
                      disabled={Object.keys(updatedTitles).length === 0}
                      onClick={handleConfirmUpdate}
                    >
                      Confirm Update
                    </button>
                    <button
                      className={`btn btn-outline-danger`}
                      disabled={Object.keys(updatedTitles).length === 0}
                      onClick={handleReset}
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <Pagination />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default memo(ConfirmCard);


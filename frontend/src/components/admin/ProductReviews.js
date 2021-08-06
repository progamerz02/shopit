import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import { MDBDataTable } from "mdbreact";

import Sidebar from "./Sidebar";
import MetaData from "../layout/MetaData";
import {
  getProductReviews,
  clearErrors,
  deleteProductReview,
} from "../../actions/productActions";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

const ProductReviews = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const [productId, setProductId] = useState("");

  const { error, reviews } = useSelector((state) => state.productReviews);
  const { isDeleted } = useSelector((state) => state.review);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review deleted successfully!");
      history.push("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, alert, history, isDeleted]);

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteProductReview(reviewId, productId));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(getProductReviews(productId));
  };

  const setReviews = () => {
    const data = {
      columns: [
        { label: "Review ID", field: "id", sort: "asc" },
        { label: "Rating", field: "rating", sort: "asc" },
        { label: "Comment", field: "comment", sort: "asc" },
        { label: "User", field: "user", sort: "asc" },
        { label: "Actions", field: "actions" },
      ],
      rows: [],
    };
    if (reviews)
      reviews.forEach(({ _id: id, rating, comment, name }) => {
        data.rows.push({
          id: id,
          rating,
          comment,
          user: name,
          actions: (
            <button
              className="btn btn-danger py-1 px-2 mx-2"
              onClick={() => deleteReviewHandler(id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          ),
        });
      });

    return data;
  };

  return (
    <Fragment>
      <MetaData title="Product Reviews" />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <div>
            <div className="row justify-content-center mt-5">
              <div className="col-5">
                <form onSubmit={submitHandler}>
                  <div className="form-group">
                    <label htmlFor="productId_field">Enter Product ID</label>
                    <input
                      type="text"
                      id="productId_field"
                      className="form-control"
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                    />
                  </div>

                  <button
                    id="search_button"
                    type="submit"
                    className="btn btn-primary btn-block py-2"
                  >
                    SEARCH
                  </button>
                </form>
              </div>
            </div>
            {reviews && reviews.length > 0 ? (
              <MDBDataTable
                data={setReviews()}
                className="px-3"
                bordered
                striped
                hover
                responsive
              />
            ) : (
              <p className="mt-5 text-center">
                No Reviews were found for the entered product ID.
              </p>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;

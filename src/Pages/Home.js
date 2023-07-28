import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import axios from "axios";
import { BASE_URL } from "../Asset/UrlMain";

function Home() {
  const navigate = useNavigate();
  const [urlList, setUrlList] = useState([]);
  const [error, setError] = useState("");
  const [longUrl, setLongUrl] = useState("");

  console.log("Long Url", longUrl);

  useEffect(() => {
    getUrlList();
  }, []);

  const getUrlList = async () => {
    try {
      const data = await axios.get("/api/getAll");
      setUrlList(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUrl = async (id) => {
    await axios
      .delete(`/api/delete/${id}`)
      .then((res) => {
        if (res) getUrlList();
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (longUrl) {
        axios
          .post("/api/generate", {
            longUrl: longUrl,
          })
          .then((res) => {
            setError(res.data.message);
            setLongUrl("");
            getUrlList();
            setTimeout(() => {
              setError("");
            }, 2000);
          })
          .catch((error) => {
            setError(error.response.data.message);
            setTimeout(() => {
              setError("");
            }, 2000);
          });
      } else {
        setError("Invalid Input");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  async function handleClickCount(id) {
    await axios.get(`/api/get/${id}`).then((res)=>{
      if(res) getUrlList();
    }).catch((e)=>{
      console.log("Error",e);
    })
  }

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="url-input">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                placeholder="Enter the URL"
                className="form-control"
                type="text"
                name="url"
                value={longUrl}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={(e) => setLongUrl(e.target.value)}
              />
              <div className="input-group-append">
                <button className="btn btn-primary p-3" type="submit" style={{backgroundColor: "#009b9b"}}> 
                submit
                </button>
              </div>
            </div>
            <br />
          </form>
        </div>

        <div className="row urlList mt-5">
          {urlList.map((url, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12">
              <div className="card border-secondary mb-3">
                <div className="card-header">
                  <h5 className="home-h5">Total Click :{url.clickCount}</h5>
                </div>
                <div className="card-body text-secondary">
                  <h6 className="card-title p-2">
                    Short URL :{" "}
                    <a
                      href={url.longUrl}
                      className="urlHeading"
                      onClick={() => handleClickCount(url._id)}
                    >
                      {BASE_URL}/api/{url.shortUrl}
                    </a>
                  </h6>
                  <h6 className="p-2">
                    Long Url :{" "}
                    <span className="card-text urlHeading">{url.longUrl}</span>
                  </h6>
                  <button
                    className="remove-btn"
                    onClick={() => deleteUrl(url._id)}
                  >
                    remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
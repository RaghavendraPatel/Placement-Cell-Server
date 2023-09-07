const dotenv = require("dotenv").config();
const axios = require("axios");

module.exports.getJobs = async function (req, res) {
  const jobs = await axios
    .get(
      `http://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}&results_per_page=20&what=javascript%20developer&content-type=application/json`
    )
    .then((data) => {
      return data.data.results;
    })
    .catch((err) => {
      console.log(err);
    });
  return res.status(200).json({
    message: "List of Jobs",
    jobs: jobs,
  });
};

module.exports.searchJobs = async function (req, res) {
  console.log(req.body);
  const jobs = await axios
    .get(
      `http://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}&results_per_page=20&what=${req.body.what}&content-type=application/json`
    )
    .then((data) => {
      return data.data.results;
    })
    .catch((err) => {
      console.log(err);
    });
  return res.status(200).json({
    message: "List of Jobs",
    jobs: jobs,
  });
};

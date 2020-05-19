const router = require("express").Router();
const axios = require("axios");
const config = require("config");

// Handle http request

// hanlde redirect with authorization code from Github, etc Authorization Server
router.get("/", async (req, res) => {
  const cbObj = req.query;
  console.log("client_secret: ", config.get("client_secret"));
  // Check valid state...
  // Exchange token
  axios
    .post(
      config.get("token_endpoint"),
      {
        code: cbObj.code,
        client_id: config.get("client_id"),
        client_secret: config.get("client_secret"),
        redirect_uri: config.get("redirect_uri"),
        state: cbObj.state,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    )
    .then(({ data }) => {
      // Initialize your application now that you have an access token.
      // Here we just display it in the browser.
      if (data.error) {
        console.error("Wrong information to exchange token ", data.error);
        res.redirect("https://localhost:3000/test");
      } else {
        console.log("data: ", data);
        console.log("Access token", data.access_token);
        res.redirect("https://google.com/search?q=gai+xinh+han+quoc");
      }
    })
    .catch((error) => {
      // This could be an error response from the OAuth server, or an error because the
      // request failed such as if the OAuth server doesn't allow CORS requests
      console.error("OAuth Server doesn't allow CORS: ", error);
      res.status(500).send("Authorization server error");
    });
});

module.exports = router;

const abortcontroller = new AbortController();
const signal = abortcontroller.signal;
const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

const fetchAPI = async (url, payload) => {
  const response = await fetch(url, payload);
  return response.json();
};

async function fetchHashtagTweets(
  hashtags,
  language,
  target_hashtag,
  setError
) {
  const url = backendBaseUrl + "/get-tweets-for-hashtag";
  // const hashtagsList = hashtags.split(" ");
  const requestBody = {
    // hashtags: hashtagsList.map((item) => {
    //   return item.startsWith("#") ? item : "#" + item;
    // }),
    hashtags: hashtags,
    target_hashtag: target_hashtag,
  };

  if (language !== "") {
    requestBody["languages"] = language.split(" ");
  }

  const payload = {
    method: "POST",
    body: JSON.stringify(requestBody),
    signal: signal,
  };

  const tweetsData = await fetchAPI(url, payload)
    .then((data) => {
      console.log("This is your data", data);
      return data;
    })
    .catch((err) => {
      console.log(err);
      setError(true);
    });
  return tweetsData;
}

export default fetchHashtagTweets;

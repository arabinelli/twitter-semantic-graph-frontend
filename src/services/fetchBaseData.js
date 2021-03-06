const abortcontroller = new AbortController();
const signal = abortcontroller.signal;
const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

const fetchAPI = async (url, payload, setIsEmpty) => {
  const response = await fetch(url, payload);
  if (response.status === 442) {
    console.log(response.status);
    setIsEmpty(true);
  } else {
    return response.json();
  }
};

async function fetchGraphData(hashtags, language, setError, setIsEmpty) {
  const url = backendBaseUrl + "/get-graph";
  const requestBody = {
    hashtags: hashtags,
  };

  if (language !== "") {
    requestBody["languages"] = language.split(" ");
  }
  if (true) {
    requestBody["filter_node_frequency"] = 1;
  }
  if (true) {
    requestBody["filter_link_frequency"] = 1;
  }

  const payload = {
    method: "POST",
    body: JSON.stringify(requestBody),
    signal: signal,
  };

  const graphData = await fetchAPI(url, payload, setIsEmpty)
    .then((data) => {
      data.graph_data.links.forEach((link) => {
        const a = data.graph_data.nodes[link.source];
        const b = data.graph_data.nodes[link.target];
        !a.neighbors && (a.neighbors = []);
        !b.neighbors && (b.neighbors = []);
        a.neighbors.push(b);
        b.neighbors.push(a);

        !a.links && (a.links = []);
        !b.links && (b.links = []);
        a.links.push(link);
        b.links.push(link);
      });
      data.communities.sort((a, b) => {
        return b.length - a.length;
      });
      return data;
    })
    .catch((err) => {
      console.log(err);
      setError(true);
    });
  return graphData;
}

export default fetchGraphData;

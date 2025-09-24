const queryRunner = async (query, token) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);
  
    const body = JSON.stringify({
      query,
      variables: "{}"
    });
  
    const requestOptions = {
      method: "POST",
      headers,
      body,
      redirect: "follow"
    };
  
    try {
      const response = await fetch("https://streaming.bitquery.io/eap", requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Query Runner Error:", error);
      throw error;
    }
};
  

module.exports = {queryRunner};
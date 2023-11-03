const webApiUrl = "http://localhost:9000/";

export class ToDoService {
  get = async () => {
    const options = {
      method: "GET",
    }
    const request = new Request(webApiUrl, options);
    const response = await fetch(request);
    const responseResult = response.json();
    return responseResult;
  }

  post = async (model: { name: string }) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(model)
    }
    const request = new Request(webApiUrl, options);
    const response = await fetch(request);
    const responseResult = response.json();
    return responseResult;
  }

  put = async (id: string, model: { name: string, checked: boolean } ) => {
    const headers = new Headers()
    headers.append("Content-Type", "application/json");
    const options = {
        method: "PUT",
        headers,
        body: JSON.stringify(model)
    }
    const request = new Request(webApiUrl + id, options);
    const response = await fetch(request);
    return response;
  }

  delete = async (id: string) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
        method: "DELETE",
        headers
    }
    const request = new Request(webApiUrl + id, options);
    const response = await fetch(request);
    return response;
  }
}

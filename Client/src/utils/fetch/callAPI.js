//BaseIP must be updated whenever your NIC card IP changes.  On a PC you can find it using ipconfig,
//and on a Mac:
// ifconfig | grep "inet " | grep -Fv 127.0.0.1 | awk "{print $2}"
const ServerIP = "10.44.22.65";
const Port = "4001";
export let token = "";
export function setToken(value) {
  token = value;
}

export async function callAPI(
  path = "",
  httpMethod = "GET",
  data = {}
  // token = ""
) {
  let options = {
    method: httpMethod,
    headers: {
      "Content-Type": "application/json",
    },
  };

  //signIn and signUp requests do not supply tokens
  if (token !== "" && token != undefined) {
    options.headers.authorization = `Bearer ${token}`;
  }

  if (httpMethod !== "GET") options.body = JSON.stringify(data);
  const response = await fetch(`http://${ServerIP}:${Port}${path}`, options);
  return response.json();
}

//BaseIP must be updated whenever your NIC card IP changes.  On a PC you can find it using ipconfig,
//and on a Mac:
// ifconfig | grep "inet " | grep -Fv 127.0.0.1 | awk "{print $2}"
export const BaseIP = "10.0.0.52";
export const Port = "4001";

export async function callAPI(path = "", methode = "GET", data = {}, token = "") {
  const options = {
    method: methode,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };

  if (methode !== "GET") options.body = JSON.stringify(data);
  const response = await fetch(`http://${BaseIP}:${Port}${path}`, options);
  return response.json();
}

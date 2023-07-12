//BaseIP must be updated whenever your NIC card IP changes.  On a PC you can find it using ipconfig,
//and on a Mac:
// ifconfig | grep "inet " | grep -Fv 127.0.0.1 | awk "{print $2}"

const ServerIP = "10.0.0.52";
const Port = "4001";

export async function callAPI(
  path = "",
  httpMethod = "GET",
  data = {},
  token = ""
) {
  try {
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
  } catch (error) {
    console.log("error :", error.message);
  }
}
// const ServerIP = "10.0.0.52";
// const Port = "4001";

// export async function callAPI(path = "", httpMethod = "GET", data = {}, token = "") {
//   try {
//     let options = {
//       method: httpMethod,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     //signIn and signUp requests do not supply tokens
//     if (token !== "" && token != undefined) {
//       options.headers.authorization = `Bearer ${token}`;
//     }
//     if (httpMethod !== "GET") options.body = JSON.stringify(data);
//     const response = await fetch(`http://${ServerIP}:${Port}${path}`, options);

//     return response.json();
//   } catch (error) {
//     console.log("error :", error.message);
//   }
// }}

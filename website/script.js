const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
function main() {
    let value = params.code; // 
    console.log(value);
    let a1 = document.getElementById("a1");
    let a2 = document.getElementById("a2");
    a1.href = "robert://" + value;
    a2.href = "exp://172.20.10.4:19000/--/" + value
}  
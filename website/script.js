const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
let value = "";
function main() {
    value = params.code; // 
    console.log(value);
    document.getElementById("a1").onclick = function() {
        document.getElementById("a1").href = "robert://" + value;
        return false;
    };
    document.getElementById("a2").onclick = function() {
        document.getElementById("a2").href ="exp://172.20.10.4:19000/--/" + value;
        return false;
    };
    console.log(document.getElementById("a2").href);
}
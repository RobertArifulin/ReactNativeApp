const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
let value = "";
function main() {
    value = params.code; // 
    console.log(value);
    document.getElementById("a1").href = "robert://" + value;
    document.getElementById("a2").href ="exp://" + document.getElementById("t1").value + "/--/" + value;
    console.log(document.getElementById("a2").href);
}
function reload(){
  document.getElementById("a1").href = "robert://" + value;
  document.getElementById("a2").href ="exp://" + document.getElementById("t1").value + "/--/" + value;
};
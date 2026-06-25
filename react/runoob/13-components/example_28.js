<div id="container"></div>
<script type="text/babel">
let value = "demo1";
let buttonName = "submit";
let inputStyle = {
  "backgroundColor":"yellow",
  "color":"red"
};
ReactDOM.render(
  <div>
    <input type="text" style={inputStyle} value={value}/> 
    <button>{buttonName}</button>
  </div>,
  document.getElementById("container")
)
</script>
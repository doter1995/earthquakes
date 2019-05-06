let { d3 } = window;

export function renderYear(year) {
    let topNode = d3.select("body").insert("div",":first-child").attr("class","top");
    topNode.insert("div").text(year);
}
export function updateYaer(year) {
    let topNode  = d3.select("div.top>div").text(year);
}

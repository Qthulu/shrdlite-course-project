var Nod = (function () {
    function Nod(n, neigh) {
        this.name = n;
        this.neighbours = neigh;
    }
    Nod.prototype.getNeighbours = function () {
        return this.neighbours;
    };
    return Nod;
})();
// Graph as [ (Node, [(Node, Distance)]) ]
// Priority Q ?
function astar(start, goal) {
    var closedset = [];
    var openset = [start];
    return [];
}
// heuristic function is factored out delibrately 
function heuristic(inputNode) {
    return 0; // Djikstra
}
var a = new Nod("A", [b, c, d]);
var b = new Nod("B", [a]);
var c = new Nod("C", [a, d]);
var d = new Nod("D", [a, c]);
var cities = [a, b, c, d];
// heuristicTable is assumed to be built 
var heuristicTable = buildingHeu(cities);
function buildingHeu(input) {
    var table = [];
    for (var i = 0; i < input.length; i++) {
        table[i] = [input[i], i];
    }
    return table;
}
// var x: KeyValuePair<number, string> = [10, "ten"];
document.body.innerHTML = show(heuristicTable);
function show(input) {
    var output = "";
    for (var i = 0; i < input.length; i++) {
        output = output + "CityName: " + input[i][0].name + "\t";
        output = output + "h: " + input[i][1];
    }
    return output;
}

class Nod { 
    name : string ;
    neighbours : Nod[]; 
    constructor(n : string, neigh : Nod[]) {
	this.name = n;
	this.neighbours = neigh;
    }

    getNeighbours():Nod[]{
	return this.neighbours;
    }
}
    
// Graph as [ (Node, [(Node, Distance)]) ]
// Priority Q ?

function astar (start : Nod, goal : Nod) : Nod[] {
    var closedset : Nod[] = [];
    var openset : Nod[] = [start]; 
    return []; 
}


// heuristic function is factored out delibrately 
function heuristic (inputNode : Nod) : number {
    return 0 ; // Djikstra
    
}

var a : Nod = new Nod ("A", [b, c, d])
var b : Nod = new Nod ("B", [a])
var c : Nod = new Nod ("C", [a, d])
var d : Nod = new Nod ("D", [a, c])
var cities : Nod[] = [a, b, c, d]

// heuristicTable is assumed to be built 
var heuristicTable : Pair<Nod, number>[] = buildingHeu(cities);

function buildingHeu (input : Nod[]){
    var table : Pair<Nod, number>[] = []; 
    for (var i = 0 ; i < input.length ; i++)
    {
	table[i] = [input[i], i]; 
    }
    return table;
}


interface Pair<K, V> extends Array<K | V> { 0: K; 1: V; }
// var x: KeyValuePair<number, string> = [10, "ten"];

// document.body.innerHTML = show(heuristicTable);
function show (input : Pair<Nod, number>[]){
    var output = "" ; 
    for (var i = 0 ; i < input.length ; i++)
    {
	output = output + "CityName: " + input[i][0].name + "\t"; 
	output = output + "h: " + input[i][1] ;
    }
    return output ; 
}

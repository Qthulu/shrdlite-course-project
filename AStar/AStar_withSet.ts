/// <reference path="lib/collections.ts" />

class Nod { 
    name : string ;
    neighbours : Nod[]; 
    constructor(n : string, neigh : Nod[]) {
	this.name = n;
	this.neighbours = neigh;
    }
    f_score : number;
    g_score : number;
}


function astar (start : Nod, goal : Nod) : Nod[] {
    var open = new collections.Set<Nod>();
    var closed = new collections.Set<Nod>();
    open.add(start); 
    var came_from = new collections.Dictionary<Nod, Nod>();
    start.g_score = 0;
    start.f_score = start.g_score + heuristic (start, goal);
    while(!open.isEmpty()){
	var current = findLowestF(open);
	open = new collections.Set<Nod>();
	if (current == goal){
	    console.log("done");
	    return reconstructPath(came_from, goal);
	}
	open.remove(current);
	closed.add(current);
	for (var i = 0 ; i < current.neighbours.length ; i++){
	    var neigh = current.neighbours[i] ; 
	    if (!closed.contains(neigh) ){
		var tentative_g_score = current.g_score + 
		    distance (current, neigh);
		if (!open.contains(neigh) || 
		   tentative_g_score < neigh.g_score){
		    came_from.setValue(neigh, current);
		    neigh.g_score = tentative_g_score;
		    neigh.f_score = neigh.g_score + heuristic(neigh, goal);
		    if (!open.contains(neigh)){
			open.add(neigh);
		    }
		}
	    }
	}	
    }
    return undefined;
}

function reconstructPath(came_from : collections.Dictionary<Nod, Nod>
			 , goal : Nod) : Nod[]
{
    var total_path = [goal]; 
    while (came_from.containsKey(goal)){
	goal = came_from.getValue(goal);
	total_path.push(goal);
    }
    return total_path;
}

// using toArray atm.
function findLowestF (inputSet : collections.Set<Nod>) : Nod {
    var arr = inputSet.toArray();
    var lowestInd = 0;
    for (var i = 0 ; i < arr.length ; i++){
	if (arr[i].f_score < arr[lowestInd].f_score) {lowestInd = i};
    }
    return arr[lowestInd];
}


// TBD : real distance between a b
function distance (a : Nod, b : Nod) : number {
    return 100;
}
// TBD : real heuristic between a b
function heuristic (inputNode : Nod, goalNode : Nod) : number {
    return 0 ; // Djikstra    
}






var b : Nod = new Nod ("B", [a])
var c : Nod = new Nod ("C", [a, d])
var d : Nod = new Nod ("D", [a, c])
var a : Nod = new Nod ("A", [b, c, d]);
var cities : Nod[] = [a, b, c, d]
// astar(a,b);

// // heuristicTable is assumed to be built 
// var heuristicTable : Pair<Nod, number>[] = buildingHeu(cities);

// function buildingHeu (input : Nod[]){
//     var table : Pair<Nod, number>[] = []; 
//     for (var i = 0 ; i < input.length ; i++)
//     {
// 	table[i] = [input[i], i]; 
//     }
//     return table;
// }
// document.body.innerHTML= astar ();

// interface Pair<K, V> extends Array<K | V> { 0: K; 1: V; }
// var x: KeyValuePair<number, string> = [10, "ten"];


/////REMARKS/////
// undefined is not bigger or smaller than anything !
// sequence of declaration resulting undefined
/////END/////
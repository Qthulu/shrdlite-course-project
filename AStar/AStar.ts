/// <reference path="lib/collections.ts" />

class Nod { 
    name : string ;
    neighbours : Nod[]; 
    constructor(n : string, neigh : Nod[]) {
	this.name = n;
	this.neighbours = neigh;
    }
    f_score : number;
}


function astar (start : Nod, goal : Nod) : Nod[] {
    var open = new Array<Nod>();
    var closed = new Array<Nod>();
    open.push(start); 
    var came_from = new Array<Nod>();
    while(open.length > 0 ){
	var current = findLowestF(open);
	console.log (current);
	open = [] ; 
    }
    return [];
}

// How can one have collections.Set in params' type?
function findLowestF (inputSet) : Nod {
    return ;
}

function heuristic (inputNode : Nod, goalNode : Nod) : number {
    return 0 ; // Djikstra    
}



var a : Nod = new Nod ("A", [b, c, d]);
var x = a.f_score;
console.log( x < 10); // default value is undefined
// undefined is not bigger or smaller than anything !
var b : Nod = new Nod ("B", [a])
var c : Nod = new Nod ("C", [a, d])
var d : Nod = new Nod ("D", [a, c])
var cities : Nod[] = [a, b, c, d]

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
// // var x: KeyValuePair<number, string> = [10, "ten"];
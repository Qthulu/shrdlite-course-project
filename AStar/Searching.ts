/// <reference path="lib/collections.ts" />

/*
Collection of searching : 
  1) non-informed search (BreadthFirst, DepthFirst)
  2) informed search (Best, AStar)
*/

/* Leif's ncie Idea: 
   instead of keeping all nodes, what we need is just neighbouring functions 
*/

interface Neighbours<T> { // otherwise called sucesscor
    (me : T) : T[];
}

interface Cost<T> {
    (start :T, end :T) : number;
}

interface GoalTest<T> {
    (amIgoal :T) : boolean; 
}
// These three should be enough to "Black Boxed" States

/*SEARCHES*/

interface Nod<T>{
    parent :Nod<T>;
}

function bfs<T>(neghibourFunction :Neighbours<Nod<T>>, start :Nod<T>, goalTest :GoalTest<T>){
    return undefined;
    // utterly layered implementation; dont know if this many generics help or not?
}

function breadthFirst<T>(g :Graph<T>, start :T, goalTest :GoalTest<T>){
    var q = new collections.Queue<T>();
    var explored = [];
    q.enqueue(start);
    explored.push(start);
    while(! q.isEmpty()){
	var v = q.dequeue();
	if (goalTest(v)){ return explored; } // reconstruction to real path?
	else {
	    var neighs = getNeighbours(g, v);
	    for (var i = 0; i < neighs.length; i++){
		if(!containing(explored, neighs[i])){
		    //neighs[i].parent = v; // need a Nod still
		    q.enqueue(neighs[i]);
		    explored.push(neighs[i]);
		}
	    }
	}
    }
    return undefined; // failure 
}

function depthFirst<T>(g :Graph<T>, start :T, goalTest :GoalTest<T>){
    var q = new collections.Stack<T>();
    var explored = [];
    q.push(start);
    explored.push(start);
    while(! q.isEmpty()){
	var v = q.pop();
	if (goalTest(v)){ return explored; } 
	else {
	    var neighs = getNeighbours(g, v);
	    for (var i = 0; i < neighs.length; i++){
		if(!containing(explored, neighs[i])){
		    q.push(neighs[i]);
		    explored.push(neighs[i]);
		}
	    }
	}
    }
    return undefined; // failure 
}

// helper funciton
function containing<T>(list :T[], elem :T) :boolean{
    for (var i = 0; i < list.length; i++){
	if (elem == list[i]){return true;}
    }
    return false;
}

/*GRAPH STUFF*/
class Graph<T>{
    graph : collections.Dictionary<T, collections.Dictionary<T, number>>;
    constructor(){
	this.graph = new collections.Dictionary<T, collections.Dictionary<T, number>>();
    }
}

function addNode<T>(g :Graph<T>, node :T){
    g.graph.setValue(node, new collections.Dictionary<T, number>());
}

function addEdge<T>(g :Graph<T>, start :T, end :T, cost :number){
    g.graph.getValue(start).setValue(end, cost);
    //g.graph.getValue(end).setValue(start, cost); //This means undirected graph
}

function getNeighbours<T>(g :Graph<T>, node :T) :T[]{
    return g.graph.getValue(node).keys();
}

function getCost<T>(g :Graph<T>, a :T, b :T) :number{
    return g.graph.getValue(a).getValue(b);
}

/*Examples*/
class Tile {
    constructor(public x :number, public y :number){}
    toString(){return "Tile:"+ this.x + "_" + this.y ;}
}

var tileGrid = new Graph<Tile>();
var tileA = new Tile(0,0);
var tileB = new Tile(0,1);
var tileC = new Tile(1,1);
var tileD = new Tile(2,2);
addNode(tileGrid, tileA);
addNode(tileGrid, tileB);
addNode(tileGrid, tileC);
addNode(tileGrid, tileD);
addEdge(tileGrid, tileA, tileB, 1);
addEdge(tileGrid, tileA, tileC, 10);
addEdge(tileGrid, tileB, tileC, 2);
addEdge(tileGrid, tileC, tileD, 10);
addEdge(tileGrid, tileD, tileC, 10);

var neighboursOfB = getNeighbours(tileGrid, tileA); 
for (var i = 0; i < neighboursOfB.length; i++){
    console.log(neighboursOfB[i].toString()); 
}

function tileGoalTest (t :Tile) :boolean{
    if (t == tileC){
	return true;
    }
    return false;
}

console.log(breadthFirst(tileGrid, tileA, tileGoalTest));
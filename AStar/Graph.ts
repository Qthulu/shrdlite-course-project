/// <reference path="lib/collections.ts" />
/// <reference path="Searching.ts" />

/*GRAPH STUFF*/
class Graph<Nod>{
    graph : collections.Dictionary<Nod, collections.Dictionary<Nod, number>>;
    constructor(){
	this.graph = new collections.Dictionary<Nod, collections.Dictionary<Nod, number>>();
    }
}

function addNode<Nod>(g :Graph<Nod>, node :Nod){
    g.graph.setValue(node, new collections.Dictionary<Nod, number>());
}

function addEdge<Nod>(g :Graph<Nod>, start :Nod, end :Nod, cost :number){
    g.graph.getValue(start).setValue(end, cost);
    //g.graph.getValue(end).setValue(start, cost); //This means undirected graph
}

function getNeighbours<Nod>(g :Graph<Nod>, node :Nod) :Nod[]{
    return g.graph.getValue(node).keys();
}

function getCost<Nod>(g :Graph<Nod>, a :Nod, b :Nod) :number{
    return g.graph.getValue(a).getValue(b);
}

function breadthFirst<T>(g :Graph<Nod<T>>, start :Nod<T>, goalTest :GoalTest<Nod<T>>){
    var nf = function<T> (node :Nod<T>){
	return getNeighbours(g, node);
    }
    var v = bfs(nf, start, goalTest);
    return backtrace(v);
}

/*Examples*/
class Tile implements Nod<Tile>{
    constructor(public x :number, public y :number){}
    toString(){return "Tile:"+ this.x + "_" + this.y ;}
    parent : Tile;
    
}

var tileGrid = new Graph<Nod<Tile>>();

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
    if (t == tileD){
	return true;
    }
    return false;
}

console.log(breadthFirst(tileGrid, tileA, tileGoalTest));
/// <reference path="lib/collections.ts" />

/*
Collection of searching : 
  1) non-informed search (BreadthFirst, DepthFirst)
  2) informed search (Best, AStar)
*/

/* Leif's ncie Idea: 
   instead of keeping all nodes, what we need is just neighbouring functions 
*/

interface Neighbours<T> {
    (me : T) : T[];
}

interface Cost<T> {
    (start :T, end :T) : number;
}

interface GoalTest<T> {
    (amIgoal :T) : boolean; 
}
// These three should be enough to "Black Boxed" States

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
    g.graph.getValue(end).setValue(start, cost);
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
addNode(tileGrid, tileA);
addNode(tileGrid, tileB);
addEdge(tileGrid, tileA, tileB, 1);
//console.log(getNeighbours(tileGrid, tileB));


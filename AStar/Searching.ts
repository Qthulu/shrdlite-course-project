/// <reference path="lib/collections.ts" />

/*
  Reason for this file: try to refactor searching algorithms
  Collection of searching: 
    1) non-informed search (BreadthFirst, DepthFirst)
    2) informed search (Best, AStar)
  TODO: if there's a way to time each search?
*/

/* Leif's nice Idea: 
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

function backtrace<T>(node :Nod<T>){
    var path = [node];
    while(node.parent){
	node = node.parent;
	path.push(node);
    }
    return path;
}

function bfs<T>(neighbourFunction :Neighbours<Nod<T>>, start :Nod<T>, goalTest :GoalTest<Nod<T>>){
    var q = new collections.Queue<Nod<T>>();
    var explored = [];
    q.enqueue(start);
    explored.push(start);
    while (! q.isEmpty()){
	var v = q.dequeue();
	if(goalTest(v)){ return v; } 
	else{
	    var neighbours = neighbourFunction(v);
	    for (var i = 0; i < neighbours.length; i++){
		if(!containing(explored, neighbours[i])){
		    neighbours[i].parent = v;
		    q.enqueue(neighbours[i]);
		    explored.push(neighbours[i]);
		}
	    }
	}
    }
    return undefined; // failure case
}

function dfs<T>(neighbourFunction :Neighbours<Nod<T>>, start :Nod<T>, goalTest :GoalTest<Nod<T>>){
    var q = new collections.Stack<Nod<T>>();
    var explored = [];
    q.push(start);
    explored.push(start);
    while (! q.isEmpty()){
	var v = q.pop();
	if(goalTest(v)){ return v; } 
	else{
	    var neighbours = neighbourFunction(v);
	    for (var i = 0; i < neighbours.length; i++){
		if(!containing(explored, neighbours[i])){
		    neighbours[i].parent = v;
		    q.push(neighbours[i]);
		    explored.push(neighbours[i]);
		}
	    }
	}
    }
    return undefined; // failure case
}

// helper funciton
function containing<T>(list :T[], elem :T) :boolean{
    for (var i = 0; i < list.length; i++){
	if (elem == list[i]){return true;}
    }
    return false;
}


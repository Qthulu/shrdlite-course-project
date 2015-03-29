class State {
	id : number;
	edges : collections.Set<Edge>;
	cost : number;
	heuristic : number;
	target : boolean;

	constructor(id : number) {
		this.id = id;
		this.edges = new collections.Set<Edge>();
		this.cost = 0;
		this.heuristic = 0;
		this.target = false;
	}

	addEdge(e : Edge) {
		this.edges.add(e);
	}

	setHeuristic(h : number) {
		this.heuristic = h;
	}

	setIsTarget(t : boolean) {
		this.target = t;
	}

	getEdges() {
		return this.edges;
	}

	getHeuristic() {
		return this.heuristic;
	}

	isTarget() {
		return this.target;
	}

	getID() {
		return this.id;
	}

	toString() {
		return collections.makeString(this);
	}
}

class Edge {
	cost : number;
	from : State;
	to : State;

	constructor(cost, from, to) {
		this.cost = cost;
		this.from = from;
		this.to = to;
	}

	getCost() {
		return this.cost;
	}

	toString() {
		return "Edge from " + this.from.toString() + " to " + this.to.toString() + ". Cost: " + this.cost;
	}
}
/*
function performSetup() {
	var tmp1 = new State(1);
	var tmp2 = new State(2);
	var tmp3 = new State(3);
	var tmp4 = new State(4);
	var tmp5 = new State(5);

	createConnection(tmp1, tmp3, 5);

	states.add(tmp1);
	states.add(tmp2);
	states.add(tmp3);
	states.add(tmp4);
	states.add(tmp5);
}

function createConnection(from : State, to : State, cost : number) {
	var e = new Edge(cost, from, to);
	from.addEdge(e);
}
*/

//var test = new Edge(9, 1, 2);
var states = new collections.Set<State>();
var outputString = "Output not overwritten";

function main() {
	//performSetup();
	document.getElementById("demo").innerHTML = outputString;
}
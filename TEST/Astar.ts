class State {
	id : number;
	edges : collections.Set<Edge>;
	heuristic : number;
	target : boolean;

	constructor(id : number) {
		this.id = id;
		this.edges = new collections.Set<Edge>();
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

	toString() {
		return "State";
	}
}

class Edge {
	cost : number;
	fromID : number;
	toID : number;

	constructor(cost, fromID, toID) {
		this.cost = cost;
		this.fromID = fromID;
		this.toID = toID;
	}

	getCost() {
		return this.cost;
	}

	toString() {
		return "Edge from " + this.fromID + " to " + this.toID + ". Cost: " + this.cost;
	}
}

var test = new Edge(9, 1, 2);

function main() {
	document.getElementById("demo").innerHTML = test.toString();
}
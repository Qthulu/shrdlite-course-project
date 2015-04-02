
/// <reference path="Dummy.ts" />
/// <reference path="Graph.ts" />
/// <reference path="Puzzle.ts" />
/// <reference path="Astar.ts" />
/// <reference path="lib/collections.ts" />

var show = "Hello World!!!" ;

//--------------------------------------

//--------------------------------------

function testMain(){
    var d = dummyCall();
    var gr = graphRun();
    var res = runPuzzle();
    show =  ""+
            "<p>$ dummy: " + d +
            "<p>$ graph: " + gr +
            "<p>$ 8-puzzle: start heuristic = " + puzzleHeuristic(pStart) +
            "<p> path length = " + res.length +
            "<p>"+ res;

    document.getElementById("demo").innerHTML = show;
}

///<reference path="World.ts"/>
///<reference path="Parser.ts"/>
///<reference path="lib/collections.ts"/>

module Interpreter {

    //////////////////////////////////////////////////////////////////////
    // exported functions, classes and interfaces/types

    export function interpret(parses : Parser.Result[], currentState : WorldState) : Result[] {
        var interpretations : Result[] = [];
        parses.forEach((parseresult) => {
            var intprt : Result = <Result>parseresult;
            intprt.intp = interpretCommand(intprt.prs, currentState);
            interpretations.push(intprt);
        });
        if (interpretations.length) {
            return interpretations;
        } else {
            throw new Interpreter.Error("Found no interpretation");
        }
    }


    export interface Result extends Parser.Result {intp:Literal[][];}
    export interface Literal {pol:boolean; rel:string; args:string[];}


    export function interpretationToString(res : Result) : string {
        return res.intp.map((lits) => {
            return lits.map((lit) => literalToString(lit)).join(" & ");
        }).join(" | ");
    }

    export function literalToString(lit : Literal) : string {
        return (lit.pol ? "" : "-") + lit.rel + "(" + lit.args.join(",") + ")";
    }


    export class Error implements Error {
        public name = "Interpreter.Error";
        constructor(public message? : string) {}
        public toString() {return this.name + ": " + this.message}
    }
    
    //////////
    export class Ambiguity implements Error {
	public name = "Interpreter.Ambiguity";
	public cmd : Parser.Command;
	constructor(c: Parser.Command, public message? : string) {
	    this.cmd = c;
	}
	public toString() {return this.name + ": " + this.message +" -> "+ this.cmd}
    }

    //////////////////////////////////////////////////////////////////////
    // PRIVATE functions


    function interpretCommand(cmd : Parser.Command, state : WorldState) : Literal[][] {
        var intprt : Literal[][] = [];
	var searchingResult = findTargetEntities(cmd.ent, state);
        var targets = searchingResult.targets;
	if (searchingResult.status === "AMBIGUITY"){
	    console.log("[AMBIGUITY] Possible candidates: ");
	    console.log(searchingResult.targets); 
	    console.log("also I know a nice question to ask could be: ");
	    var similarities = ["Color", "Form", "Size"];
	    var allPossible = new collections.Set<string>();
	    for (var i in similarities){
		allPossible.add(similarities[i]);
	    }
	    //console.log(searchingResult.common);
	    allPossible.difference(searchingResult.common);
	    console.log(allPossible.toArray());

	    // targets should be passed on for clearification questions
// also, it might be helpful if we keep the current cmd and ask the question 
	    throw new Interpreter.Ambiguity(cmd, "There are several objects that fit the description\n Can you tell me more about "+allPossible.toArray());
	}
        switch(cmd.cmd){
            case "take":
                //var targets = findTargetEntities(cmd.ent, state);
                for (var ix in targets){
                    intprt.push( [
                        {pol: true, rel: "holding", args: [targets[ix]] }
                    ] );
                }
                break;
            case "move":
                //var targets = findTargetEntities(cmd.ent, state);
                var location = cmd.loc;
	        //var locationTargets = findTargetEntities(location.ent, state);
	        var locationSearch = findTargetEntities(location.ent, state);
	        var locationTargets = locationSearch.targets;

                // TODO use information about canSupport...

                for (var ix in targets){
                    for(var jx in locationTargets){
                        intprt.push( [
                            {pol: true, rel: location.rel, args: [targets[ix], locationTargets[jx]] }
                        ] );
                    }
                }
                // throw new Interpreter.Error("Got move! which is not implemented yet...");
                break;
            default:
                throw new Interpreter.Error("Interpreter: UNKNOWN cmd: " + cmd.cmd);
        }
        return intprt;
    }

    /**
     * Accomodating possible extension
     */
    interface SearchingResult {status: string; targets: string[]; common: collections.Set<string>;}
    /**
    * @return list of targets in the world that complies with the specified entity.
    */
    function findTargetEntities(en : Parser.Entity, state : WorldState) : SearchingResult {
        var goalObj = en.obj;
        var result : string[] = [];
	var commonGround  = new collections.Set<string>();
	var searchResult : SearchingResult = {status:"", targets:result, common:commonGround};
        if(en.obj.form === "floor"){
            result.push("floor");
        }

        for(var objName in state.objects){
            var obj : ObjectDefinition = state.objects[objName];

            if(goalObj.size){
                if(goalObj.size != obj.size){
                    continue;
                }
		else {commonGround.add("Size");}
            }
            if(goalObj.color){
                if(goalObj.color != obj.color){
                    continue;
                }
		else {commonGround.add("Color");}
            }
            if(goalObj.form){
                if(goalObj.form != obj.form){
                    continue;
                }
		else {commonGround.add("Form");}
            }
            // TODO consider location for filtering as well!
            result.push(objName);
        }
        switch(en.quant){
            case "any":
                break;
            case "the":
                if(result.length > 1){
		    searchResult.status = "AMBIGUITY";
		    searchResult.targets = result;
		    searchResult.common = commonGround;
		    return searchResult;
                    //throw new Interpreter.Error("There are several objects that fit the description");
                }
                break;
        }
	searchResult.status = "FOUND";
	searchResult.targets = result;
	return searchResult;
        //return result;
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

}

// cube puzzle solver
// http://jsfiddle.net/47T2U/4/

// problem space, for the snake to crawl around in. 
// var ps = [[[1,1,1,1,1], [1,1,1,1,1], [1,1,1,1,1], [1,1,1,1,1], [1,1,1,1,1]], 
//           [[1,1,1,1,1], [1,"0","0","0",1], [1,"0","0","0",1], [1,"0","0","0",1], [1,1,1,1,1]], 
//           [[1,1,1,1,1], [1,"0","0","0",1], [1,"0","0","0",1], [1,"0","0","0",1], [1,1,1,1,1]], 
//           [[1,1,1,1,1], [1,"0","0","0",1], [1,"0","0","0",1], [1,"0","0","0",1], [1,1,1,1,1]], 
//           [[1,1,1,1,1], [1,1,1,1,1], [1,1,1,1,1], [1,1,1,1,1], [1,1,1,1,1]]
//          ];
         
//var snake = "--+++-++-+++-+-++++-+-+-+--";
var ps = [[[1,1,1,1,1,1], [1,1,1,1,1,1], [1,1,1,1,1,1], [1,1,1,1,1,1], [1,1,1,1,1,1], [1,1,1,1,1,1]], 
          [[1,1,1,1,1,1], [1,"0","0","0","0",1], [1,"0","0","0","0",1], [1,"0","0","0","0",1], [1,"0","0","0","0",1], [1,1,1,1,1,1]], 
          [[1,1,1,1,1,1], [1,"0","0","0","0",1], [1,"0","0","0","0",1], [1,"0","0","0","0",1], [1,"0","0","0","0",1], [1,1,1,1,1,1]], 
          [[1,1,1,1,1,1], [1,"0","0","0","0",1], [1,"0","0","0","0",1], [1,"0","0","0","0",1], [1,"0","0","0","0",1], [1,1,1,1,1,1]], 
          [[1,1,1,1,1,1], [1,"0","0","0","0",1], [1,"0","0","0","0",1], [1,"0","0","0","0",1], [1,"0","0","0","0",1], [1,1,1,1,1,1]], 
          [[1,1,1,1,1,1], [1,1,1,1,1,1], [1,1,1,1,1,1], [1,1,1,1,1,1], [1,1,1,1,1,1], [1,1,1,1,1,1]]
         ];

var   snake = “--++-+++--++-++-++-+++++++++-+-++++++-+--++++--++-++++++++++--+-“;

// dictionary of abreviated directions
var dir_name = {  "u": "Up", "d":"Down",
                    "r": "Right", "l":"Left",
                    "f": "Forward", "b":"Back"
                 };
// vectors pointing in each direction
var dir = {  "u": [0,1,0], "d":[0,-1,0],
                    "r": [0,0,1], "l":[0,0,-1],
                    "f": [1,0,0], "b":[-1,0,0]
                 };
// turn options for each direction
// eg. if going "u" Up, then you could turn "brfl" Back, Right, Forward or Left
var turn_dir = {  "u": "brfl", "d":"frbl",
                    "r": "ubdf", "l":"ufdb",
                    "f": "urdl", "b":"uldr"
                 };
// the current sequence
var sequence = "";
// a list of successful sequences (so far)
var sequences = [];
// setup and run
function setup() {
    var start_coord = [1, 1, 1];
    var orientation = "f";
    var solution = solve(start_coord, orientation, 0);
    if (solution) { console.log(sequences);}
}
// vector addition
function add(a, b) {
    var len = a.length, i = 0;
    var result = [];
    for (i = 0; i < len; i += 1) {
        result[i] = a[i] + b[i];
    }
    return result;
}
// solve (recursive)
// p = position, o = orientation, i = index into snake.
function solve(p, o, i) {
    var turn_index = 0;
    var np; // next_position
    var no; // next orientation
    var j = 0;
    var good_count = 0;
    var ret_val;
    // if we're at the end of the sequence it is "sloved!"
    
    if (i >= snake.length-1) {
        sequences.push(sequence);
        return 1;
    }
    
    ps[p[0]][p[1]][p[2]] = 'x';
    
    // this is a straight "-" block
    if (snake[i] === "-") {
        //$("#b").append("-");
        // if it is clear ... proceed
        //$("#b").append(o);
        np = add(p, dir[o]);
        
        //$("#b").append(JSON.stringify(ps[np[0]][np[1]][np[2]]));
        if (ps[np[0]][np[1]][np[2]] === "0") {
            //$("#b").append(JSON.stringify(np));
            sequence += o;
            ret_val = solve(np, o, i+1);
            // clean up on the way back out of recursion
            ps[p[0]][p[1]][p[2]] = "0";
            sequence = sequence.slice(0, -1);
            return ret_val;
        }
        else { 
            //$("#b").append('x ');
            ps[p[0]][p[1]][p[2]] = "0";
            
            return 0; 
        }
    }
    else { // bend in the snake... right angle "+" block.
        //$("#b").append("+");
        for (j = 0; j < 4; j+=1) {
            no = turn_dir[o][j]
            np = add(p, dir[no]);
            if (ps[np[0]][np[1]][np[2]] === "0") {
                //$("#b").append(no);
                //$("#b").append(JSON.stringify(np));
                sequence += no;
                ret_val = solve(np, no, i+1);
                //$("#b").append(" got..."+ret_val+ " ");
                good_count += ret_val;
                sequence = sequence.slice(0, -1);
            }
            if (good_count > 0) {
                //break;
            }
        }
        //$("#b").append(" return(" + (good_count !== 0) + "); ");
        ps[p[0]][p[1]][p[2]] = "0";
        if (good_count > 0) {
            return 1;
        } 
        else {
            return 0;
        }
    }
}

$(function() {
	//$("#a").append(JSON.stringify(ps[1])+"\n");
	//$("#a").append(JSON.stringify(ps[2])+"\n");
	$("#a").append(JSON.stringify(dir_name, null, " ")+"\n");
	setup();
	$("#c").append(JSON.stringify(sequences));
	//$("#d").append(JSON.stringify(ps[1])+"\n");
	//$("#d").append(JSON.stringify(ps[2])+"\n");
	//$("#d").append(JSON.stringify(ps[3])+"\n");
})();

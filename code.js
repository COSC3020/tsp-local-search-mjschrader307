class Graph {
  dist_matrix = [];
  best_route = [];
  best_cost = 0;
  NUM_NODES = 0;

  constructor(M) {
    this.dist_matrix = [...M];
    this.NUM_NODES = this.dist_matrix.length;

    // Construct initial route
    for (let i = 0; i < this.NUM_NODES; i++) {
      this.best_route.push(i);
    }

    this.best_cost = this.getRouteCost(this.best_route);
  }

  getEdgeCost(u, v) {
    return this.dist_matrix[u][v];
  }

  getRouteCost(route) {
    let cost = 0;

    for (let i = 0; i < route.length - 1; i++) {
      cost += this.dist_matrix[route[i]][route[i + 1]];
    }

    return cost;
  }

  print() {
    console.log("Best route:", this.best_route);
    console.log("Cost:", this.best_cost);
  }
}

// Auxilliary recursive subarray reversal function
function reverseSubarray(arr, start, end) {
  const result = [...arr];

  // Make sure bounds make sense
  if (start < 0 || end > arr.length - 1) return result;

  // Base case: start and end swap sides
  if (start > end) return result;

  // Recursive case: swap start and end values
  let tmp = result[start];
  result[start] = result[end];
  result[end] = tmp;

  // Move start and end positions inwards
  const rs = reverseSubarray(result, start + 1, end - 1);

  return rs;
}

function tsp_ls(distance_matrix) {
  const G = new Graph(distance_matrix);
  const n = G.NUM_NODES;

  let improved = true;

  while (improved) {
    improved = false;

    for (let i = 0; i < n - 1; i++) {
      for (let k = i + 1; k < n - 1; k++) {
        // Make sure i, j are within bounds
        if (i + 1 >= n || k + 1 >= n) {
          continue;
        }

        // Step 1: Pick two edges
        // Node indices for u2 and v2 shift one to the right after each inner iteration
        // Those for u1 and v1 shift one to the right after each outer iteration
        const u1 = G.best_route[i];
        const v1 = G.best_route[i + 1];
        const u2 = G.best_route[k];
        const v2 = G.best_route[k + 1];

        // Step 2: Reconnect in a different way
        let original_cost = G.getEdgeCost(u1, v1) + G.getEdgeCost(u2, v2);
        let new_cost = G.getEdgeCost(u1, u2) + G.getEdgeCost(v1, v2);

        if (new_cost < original_cost) {
          // New best route found --> Update best route (by reversing subpath between i+1 and j) and its cost

          improved = true; // Make while-loop run again to keep looking for improvements

          const new_best = reverseSubarray(G.best_route, i + 1, k);

          G.best_route = new_best;
          G.best_cost = G.getRouteCost(new_best);

          // Break inner loop to start fresh with new route
          break;
        }
      }

      if (improved) break;
    }
  }

  return G.best_cost;
}

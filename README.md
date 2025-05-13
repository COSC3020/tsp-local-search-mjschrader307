# Traveling Salesperson Problem -- Local Search

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The 2-opt algorithm for solving the Traveling Salesperson Problem is a
randomized local search algorithm that, at each iteration, reverses part of the
route. It starts with a random route (this is the randomized part), and changes
part of the route in each step (this is the local search part, sprinkled with
more randomness). The pseudocode for one iteration is as follows:

```javascript
2optSwap(route, i, k)
  cities 1 to i-1 stay in the order they are
  cities i to k are reversed
  cities k + 1 to n stay in the order they are
```

For example, if I call the above function with route A--B--C--D--E--F, $i=2$,
$k=4$, the resulting route is A--B--E--D--C--F.

The algorithm starts with a random route; if the new route at the end of an
iteration decreases the total length, it is retained as the current incumbent.
The incumbent after the final iteration is returned as the solution.

Implement the 2-opt algorithm, which repeatedly runs the above steps. Your
implementation needs to fix two design parameters that I have left open. First,
you need to design a stopping criterion -- when would it make sense to stop and
return the shortest route found so far rather than trying another iteration?
Second, design a way to choose $i$ and $k$ -- note that they need to be
different in subsequent iterations, as one iteration would simply undo what
the previous one did otherwise. Start with the template I provided in `code.js`.
Describe in your code how you designed your stopping criterion and ways of
choosing $i$ and $k$ and why.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.

---

### Choosing $i$ and $k$

I chose a method of changing $i$ and $k$, such that all possible swaps are looked at. I did this using nested for-loops and incrementing $i$ and $j$ by 1.

### Stopping Criterion

My stopping criterion was that no improvement was found after checking every possible swappage of edge pairs given the current best route. I declared and managed an `improved` flag to keep track of this. The stoppage happens when both of the nested for-loops run completely without setting `improved` to `true`, which means no improvement was found.

### Runtime

The suboperations of note in this implementation are the while loop and nested for-loops in the main function body, the recursive subarray reversal function I added, and the initialization of the `Graph` object, but each of those run in linear time. There is a possibility that the nested for-loops both run a max number of times (turns into quadratic runtime), so the graph initialization and subarray reversal operations are not significant.

I think that the worst-case scenario is going to involve making the nested for- and while-loops run a maximum number of times, which I think is going to happen when the algorithm finds a better route at the $(n-1)$th iteration of the inner for-loop for every iteration of the outer for-loop. This will result in a complexity of $O(|V|^2)$ for iterating over possible edge pairs. The outer while-loop can run many times, which I think can reach up to $|V|$ times, making this algorithm run in $O(|V|^3)$ time. 

### Space

I think the only notable space requirement is room for the `distance_matrix` attribute of the `Graph` object, which is $|V| \times |V|$. This makes memory usage a factor of $O(|V|^2)$. Everything else involves manipulation of 1-dimensional arrays, so those operations are not significant.

---

I was unclear just from the pseudocode how the edge swapping mechanism was supposed to work or what it would look like visually. To help visualize that, I found a youtube video. I did my best to avoid looking at their code.

**I certify that I have listed all sources used to complete this exercise, including the use
of any Large Language Models. All of the work is my own, except where stated
otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is
suspected, charges may be filed against me without prior notice.**

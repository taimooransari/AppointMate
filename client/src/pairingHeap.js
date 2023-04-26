class PairingHeapNode {
  constructor(key, data) {
    this.key = key;
    this.data = data;
    this.parent = null;
    this.children = [];
  }
}

export default class PairingHeap {
  constructor() {
    this.root = null;
    this.lst = [];
  }

  is_empty() {
    return this.root === null;
  }

  insert(key, data) {
    const node = new PairingHeapNode(key,data);          // Create a new node with the given key
    this.root = this.merge(this.root, node);        // Merge the new node with the root node of the heap
  }

  find_min() {
    if (this.is_empty()) {
      throw new Error('Heap is empty');             // Checks for empty heap
    }
    return this.root.data;                           // Returns the key of the root node
  }

  delete_min() {
    if (this.is_empty()) {
      throw new Error('Heap is empty');             // Checks for empty heap
    }
    const min_node = this.root;                     // Saving as a temp.
    if (min_node.children.length > 0) {
      this.root = this.pairwise_merge(min_node.children);  // Merge the children of the minimum node pairwise
    } else {
      this.root = null;                             // If the minimum node has no children, set the root to null
    }

    return min_node.data ;                     // Returns key of minimum node
  }

  merge(heap1, heap2) {
    // Check if either heap is null
    if (heap1 === null) {
      return heap2;
    }
    if (heap2 === null) {
      return heap1;
    }
    // Make heap1 the root of the merged heap
    if (heap1.key < heap2.key) {
      heap2.parent = heap1;
      heap1.children.push(heap2);
      return heap1;
    } else {
      // Make heap2 the root of the merged heap
      heap1.parent = heap2;
      heap2.children.push(heap1);
      return heap2;
    }
  }

  allElements() {
    const elements = [];
    if (this.is_empty()) {
      return elements;   // Return empty array for an empty heap
    }
    const stack = [this.root];
    while (stack.length > 0) {
      const node = stack.pop();
      elements.push(node.data);
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push(node.children[i]);
      }
    }
    return elements;
  }

  pairwise_merge(nodes) {
    // Base case: if there is only one node, return it
    if (nodes.length === 1) {
      return nodes[0];
    } else {
      // Merge nodes pairwise using the merge method
      const new_nodes = [];
      for (let i = 0; i < nodes.length - 1; i += 2) {
        const new_node = this.merge(nodes[i], nodes[i+1]);
        new_nodes.push(new_node);
      }
      // If there is an odd number of nodes, append the last one to the new list
      if (nodes.length % 2 === 1) {
        new_nodes.push(nodes[nodes.length-1]);
      }
      // Recursively merge the new list of nodes
      return this.pairwise_merge(new_nodes);
    }
  }
  
  getAll() {
    const elements = [];
    if (this.is_empty()) {
      return elements;   // Return empty array for an empty heap
    }
    const stack = [this.root];
    while (stack.length > 0) {
      const node = stack.pop();
      elements.push(node);
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push(node.children[i]);
      }
    }
    elements.sort((a, b) => a.key - b.key); // sort the elements in ascending order
    return elements.map(node => node.data); // return an array of sorted node data
}

}


  
  
  // let heap = new PairingHeap();
  
  // heap.insert(5);
  // heap.insert(30);
  // heap.insert(17);
  // heap.insert(1);
  // heap.insert(1291);
  // heap.insert(0.1);
  // heap.insert(1.1);
  
  
  
  // console.log(heap.find_min(),heap.delete_min()); 
  // console.log(heap.find_min(),heap.delete_min()); 
  // console.log(heap.find_min(),heap.delete_min()); 
  // console.log(heap.find_min(),heap.delete_min()); 
  // heap.insert(55);
  // heap.insert(3);
  // heap.insert(330)
  // console.log(heap.find_min(),heap.delete_min()); 
  // console.log(heap.find_min(),heap.delete_min()); 
  // console.log(heap.find_min(),heap.delete_min()); 
  // console.log(heap.find_min(),heap.delete_min()); 
  // console.log(heap.find_min(),heap.delete_min()); 
  // console.log(heap.find_min(),heap.delete_min()); 
  
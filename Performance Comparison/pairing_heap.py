# class PairingHeapNode:
#     def __init__(self, key):
#         self.key = key
#         self.parent = None
#         self.children = []

# class PairingHeap:
#     def __init__(self):
#         self.root = None

#     def is_empty(self):
#         return self.root is None

#     def insert(self, key):
#         node = PairingHeapNode(key)                 # Create a new node with the given key
#         self.root = self.merge(self.root, node)     # Merge the new node with the root node of the heap

#     def find_min(self):
#         if self.is_empty():
#             raise Exception('Heap is empty')        #checks for empty heap

#         return self.root.key                        #Returns the key of the root node.

#     def delete_min(self):
#         if self.is_empty():
#             raise Exception('Heap is empty')        #checks for empty heap
#         min_node = self.root                        #saving as a temp.

#         if len(min_node.children) > 0:
#             self.root = self.pairwise_merge(min_node.children) # Merge the children of the minimum node pairwise
#         else:
#             self.root = None            #If the minimum node has no children, set the root to None

#         return min_node.key             #Returns key of minimum node.

#     def merge(self, heap1, heap2):
#         # Check if either heap is None
#         if heap1 is None:
#             return heap2
#         if heap2 is None:
#             return heap1
#         # Make heap1 the root of the merged heap
#         if heap1.key < heap2.key:
#             heap2.parent = heap1
#             heap1.children.append(heap2)
#             return heap1
#         else:
#             # Make heap2 the root of the merged heap
#             heap1.parent = heap2
#             heap2.children.append(heap1)
#             return heap2


#     def pairwise_merge(self, nodes):
#         # Base case: if there is only one node, return it
#         if len(nodes) == 1:
#             return nodes[0]
#         else:
#             # Merge nodes pairwise using the merge method
#             new_nodes = []
#             for i in range(0, len(nodes) - 1, 2):
#                 new_node = self.merge(nodes[i], nodes[i+1])
#                 new_nodes.append(new_node)
#             # If there is an odd number of nodes, append the last one to the new list
#             if len(nodes) % 2 == 1:
#                 new_nodes.append(nodes[-1])
#             # Recursively merge the new list of nodes
#             return self.pairwise_merge(new_nodes)


class PairingHeap:
    class Node:
        def __init__(self, value):
            self.value = value
            self.children = []
            self.parent = None

    def __init__(self):
        self.root = None
        self.size = 0

    def insert(self, value):
        new_node = PairingHeap.Node(value)
        self.root = self.merge(self.root, new_node)
        self.size += 1

    def pop(self):
        if not self.root:
            return None

        popped_value = self.root.value

        # Merge all children of the root node
        if self.root.children:
            self.root = self.merge_pairs(self.root.children)
        else:
            self.root = None
        self.size -= 1

        return popped_value

    def merge(self, node1, node2):
        if not node1:
            return node2
        elif not node2:
            return node1
        elif node1.value < node2.value:
            node1.children.append(node2)
            node2.parent = node1
            return node1
        else:
            node2.children.append(node1)
            node1.parent = node2
            return node2

    def merge_pairs(self, nodes):
        if len(nodes) == 1:
            return nodes[0]

        # Pairwise merge adjacent nodes and then merge the resulting pairs
        pairs = [
            self.merge(nodes[i], nodes[i + 1]) for i in range(0, len(nodes) - 1, 2)
        ]
        if len(nodes) % 2 == 1:
            pairs.append(nodes[-1])
        return self.merge_pairs(pairs)

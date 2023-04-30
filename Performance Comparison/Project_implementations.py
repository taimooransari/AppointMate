import random

class PriorityQueue:
    def __init__(self):
        self._queue = []

    def push(self, item, priority):
        left, right = 0, len(self._queue) - 1
        while left <= right:
            mid = (left + right) // 2
            if self._queue[mid][1] <= priority:
                right = mid - 1
            else:
                left = mid + 1
        self._queue.insert(left, (item, priority))

    def pop(self):
        return self._queue.pop()[0]

    def size(self):
        return len(self._queue)

    def is_empty(self):
        return len(self._queue) == 0


# print("The Output Implementation for Queue is:")
# q = PriorityQueue()
# q.push(20, 20)
# q.push(30, 30)
# q.push(10, 10)
# print(q)  # Output: [10, 20, 30]

# print(q.pop())
# print(q.pop())
# print(q.pop())

# q.dequeue()
# print(q)  # Output: [20, 30]

# Singly Linked List


class NodeList:
    def __init__(self, data):
        self.data = data
        self.next = None


class SortedLinkedList:
    class Node:
        def __init__(self, value):
            self.value = value
            self.next = None

    def __init__(self):
        self.head = None

    def insert(self, value):
        new_node = SortedLinkedList.Node(value)

        # If list is empty or new_node is smaller than head
        if not self.head or new_node.value < self.head.value:
            new_node.next = self.head
            self.head = new_node
            return

        # Find the appropriate position to insert new_node
        curr = self.head
        while curr.next and curr.next.value < new_node.value:
            curr = curr.next

        # Insert the new_node
        new_node.next = curr.next
        curr.next = new_node

    def pop(self):
        if not self.head:
            return None

        popped_node = self.head
        self.head = self.head.next
        popped_node.next = None
        return popped_node.value

    def __str__(self):
        nodes = []
        curr = self.head
        while curr:
            nodes.append(str(curr.value))
            curr = curr.next
        return "->".join(nodes)


# # Example usage
# my_list = LinkedList()
# my_list.insert(5)
# my_list.insert(10)
# my_list.insert(8)
# my_list.insert(3)
# my_list.insert(7)

# print(my_list)  # Prints "5->10->8->3->7"

# my_list.delete()
# print(my_list)


class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None


class BST:
    def __init__(self):
        self.root = None

    def insert(self, key):
        if self.root is None:
            self.root = Node(key)
            return
        curr = self.root
        while True:
            if key < curr.key:
                if curr.left is None:
                    curr.left = Node(key)
                    return
                else:
                    curr = curr.left
            elif key > curr.key:
                if curr.right is None:
                    curr.right = Node(key)
                    return
                else:
                    curr = curr.right
            else:
                return

    def delete_min(self):
        if self.root is None:
            return None
        if self.root.left is None:
            temp = self.root
            self.root = self.root.right
            return temp.key
        parent = self.root
        curr = self.root.left
        while curr.left is not None:
            parent = curr
            curr = curr.left
        temp = curr
        parent.left = curr.right
        return temp.key

    def _delete_node(self, node, key):
        if node is None:
            return node
        if key < node.key:
            node.left = self._delete_node(node.left, key)
        elif key > node.key:
            node.right = self._delete_node(node.right, key)
        else:
            if node.left is None:
                temp = node.right
                node = None
                return temp
            elif node.right is None:
                temp = node.left
                node = None
                return temp
            temp = self._min_value_node(node.right)
            node.key = temp.key
            node.right = self._delete_node(node.right, temp.key)
        return node

    def _min_value_node(self, node):
        curr = node
        while curr.left is not None:
            curr = curr.left
        return curr

    def find(self, key):
        curr = self.root
        while curr is not None:
            if key < curr.key:
                curr = curr.left
            elif key > curr.key:
                curr = curr.right
            else:
                return True
        return False

    def sort(self):
        output = []
        self._inorder_traversal(self.root, output)
        return output

    def _inorder_traversal(self, node, output):
        if node is not None:
            self._inorder_traversal(node.left, output)
            output.append(node.key)
            self._inorder_traversal(node.right, output)

    def __str__(self):
        return str(self.sort())
import random

class SkipNode:
    def __init__(self, val=None, nxt=None, down=None):
        """
        Constructor for SkipNode class, which represents a node in the Skip List.

        :param val: the value stored in the node
        :param nxt: the next node in the same level
        :param down: the node in the level below
        """
        self.val = val
        self.next = nxt
        self.down = down

class SkipList:
    def __init__(self):
        """
        Constructor for SkipList class, which represents the Skip List data structure.
        """
        self.head = SkipNode()
        
    def insert(self, val):
        """
        Method for inserting a new value into the Skip List.

        :param val: the value to insert
        """
        cur = self.head
        stack = []
        
        # Traverse the Skip List until the correct insertion point is found
        while cur:
            if cur.next and cur.next.val < val:
                cur = cur.next
            else:
                stack.append(cur)
                cur = cur.down
        
        # Create a new node with the given value and add it to the Skip List
        node = SkipNode(val)
        down = None
        
        while stack:
            cur = stack.pop()
            node.next = cur.next
            cur.next = node
            node.down = down
            down = node
            node = SkipNode(val)
            
            # With 50% probability, add a new level to the Skip List
            if random.random() < 0.5:
                break
                
        # With 50% probability, add a new head to the Skip List
        if random.random() < 0.5:
            new_head = SkipNode()
            new_head.down = self.head
            new_head.next = node
            self.head = new_head
    
    def delete_min(self):
        """
        Method for deleting the minimum value from the Skip List.
        """
        cur = self.head
        
        # Traverse to the bottom level of the Skip List
        while cur.down:
            cur = cur.down
        
        # If there are no nodes in the bottom level, return None
        if not cur.next:
            return None
        
        # Otherwise, delete the first node in the bottom level and return its value
        val = cur.next.val
        cur.next = cur.next.next
        return val    
        
    def __str__(self):
        """
        Method for converting the Skip List to a string for printing.
        """
        lines = []
        cur = self.head
        
        # Traverse the Skip List and add each node to a string
        while cur:
            line = ""
            node = cur.next
            while node:
                line += str(node.val) + " -> "
                node = node.next
            lines.append(line)
            cur = cur.down
        
        # Join the lines together with newlines and return the resulting string
        return "\n".join(lines)
   

# Create a Skip List object
#sl = SkipList()

# Insert some elements
#sl.insert(5)
#sl.insert(3)
#sl.insert(7)
#sl.insert(2)
#sl.insert(4)
#sl.insert(6)
#sl.insert(8)

# Print the Skip List
#print(sl)

# Delete the minimum element
#min_val = sl.delete_min()
#print(f"Minimum value {min_val} deleted.")

# Print the Skip List again
#print(sl)


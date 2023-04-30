from Project_implementations import (

    PriorityQueue,
    SortedLinkedList,

    BST,
    SkipList
)
from pairing_heap import PairingHeap
import time

# Generate a range of values from 1 to 1000000
values = []
for i in range(1, 10001):
    if i % 2 == 0 or i % 7 == 0:
        values.append(i)

for i in range(1, 1000):
    if i % 2 == 1:
        values.append(i)

P_heap = PairingHeap()
start_time = time.time()
for i in values:
    P_heap.insert(i)
for i in range(300):
    P_heap.pop()
print("Performance time for PairingHeap")
tot_time = round((time.time() - start_time) * 1000,2)
print("--- %s milliseconds ---" % tot_time)
print("\n")





# Queue test
q = PriorityQueue()
start_time = time.time()
for i in values:
    q.push(i, i)
for i in range(300):
    q.pop()

print("Perfomance time for queue")
tot_time = round((time.time() - start_time) * 1000,2)
print("--- %s milliseconds ---" % tot_time)

print("\n")
# SinglySortedLinkedList test
ll = SortedLinkedList()
start_time = time.time()
for i in values:
    ll.insert(i)
for i in range(300):
    ll.pop()
print("Perrfomance time for SLL")
tot_time = round((time.time() - start_time) * 1000,2)
print("--- %s milliseconds ---" % tot_time)

print("\n")


# BST test
bst = BST()
start_time = time.time()
for i in values:
    bst.insert(i)
bst.delete_min()
bst.delete_min()
print("Perrfomance time for BST")
tot_time = round((time.time() - start_time) * 1000,2)
print("--- %s milliseconds ---" % tot_time)
print("\n")

# SkipList test
sl = SkipList()
start_time = time.time()
for i in values:
    sl.insert(i)
for i in range(300):
    sl.delete_min()
print("Perrfomance time for SkipList")
tot_time = round((time.time() - start_time) * 1000,2)
print("--- %s milliseconds ---" % tot_time)
print("\n")





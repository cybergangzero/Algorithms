'''Algorithm to resolve the knapsack problem raised in Grokking's algorithm book:
You’re a thief with a knapsack that can carry 4 lb of goods.
You have three items that you can put into the knapsack.
-guitar: 1 lbs and 1500$
-stereo: 4 lbs and 3000$
-laptop: 3 lbs and 2000$
What items should you steal so that you steal the maximum money’s
worth of goods?
'''

'''After read the solution (an explanation of the book), I analyze the problem as follows:
Input data:
items, maximum weight of the backpack
//The items will have a weight and a value
Output data:
array of chosen items that have a weight less than or equal to the capacity of the backpack
and maximize value

Let’s see how the process will be to solve this problem:
-We generate the matrix of items, where the row will represent an item, and the column a specific weight of the backpack,
which will be divided according to the number of items
-Then, we verify the weight and value of each item for each specific weight of the backpack.
If the weight of the item is less than or equal to the specific weight of the backpack, then:
  If there is space left, the items that fit in that space and maximize the added value are added,
  which will be taken from the previous values. If the new value is greater than the old, then
  the items that generate the new value are added, otherwise, the previous value is added.
In case the item does not fit, the value of the previous row is added.
-Repeat until the array is filled
'''

#Then I come to the next solution:

class item:
  def __init__(self, name, weigth, value):
    self.name=name
    self.weigth=weigth
    self.value=value

def getItemsWeigthAndValue(items):
  if type(items)!=int and type(items)==list:
    result=[0, 0] #weigth is the first, total value is the second
    for item in items:
      result[0]+=item.weigth
      result[1]+=item.value
    return result
  elif type(items)==int:
    return [0, 0]
  else: #is just a item
    return [items.weigth, items.value]


def knapsackProblem(items, knapsackWeigth):
  matrix=[]
  for i in range(len(items)):
    matrix.append([])
    for j in range(knapsackWeigth):
      matrix[i].append(0)
  iteratedSumWeight=int(knapsackWeigth/len(items))
  #I make a relation between every specific weigth and the index of the matrix
  weigthToIndex, weigth_=dict(), iteratedSumWeight
  for i in range(knapsackWeigth):
    weigthToIndex[weigth_]=i
    weigth_+=iteratedSumWeight
  #Then I start with the algorithm
  originalKnapsackWeigth=knapsackWeigth
  knapsackWeigth=iteratedSumWeight
  for i in range(len(items)): #in each iteration, the row number will define the item that can be chosen
    for j in range(originalKnapsackWeigth): #for each specific weigth
      if items[i].weigth<=knapsackWeigth:
        remainingWeigth=knapsackWeigth-items[i].weigth
        if remainingWeigth>0 and i-1!=-1: #solution when the index is 0
          indexColumn=weigthToIndex[remainingWeigth]
          newValue=items[i].value+getItemsWeigthAndValue(matrix[i-1][indexColumn])[1]
          if newValue>getItemsWeigthAndValue(matrix[i-1][j])[1]:
            copyMatrixValue=matrix[i-1][indexColumn].copy()
            copyMatrixValue.append(items[i])
            matrix[i][j]=copyMatrixValue
          else:
            matrix[i][j]=matrix[i-1][j]
        else:
          newValue=items[i].value
          if newValue>getItemsWeigthAndValue(matrix[i-1][j])[1]:
            matrix[i][j]=[items[i]]
          else:
            matrix[i][j]=matrix[i-1][j]
      else:
        matrix[i][j]=matrix[i-1][j]
      knapsackWeigth+=iteratedSumWeight #so the knapsack weigth is updated...
    knapsackWeigth=iteratedSumWeight #and after the iteration return to is initial specific weigth
  return matrix
print("Test:")
items=[item("guitar", 1, 1500), item("stereo", 4, 3000), item("laptop", 3, 2000)]
knapsackWeigth=4
result=knapsackProblem(items, knapsackWeigth)
for row in result:
  for column in row:
    print("..........")
    for item in column:
      print(item.name)
    print("..........")
#This probably is a solution adapted to the problem, but can be generalized to any problem polishing algorithm details
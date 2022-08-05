'''How many dif-ferent ways can we make change of $1.00, given half-dollars, quarters,
dimes, nickels, and pennies? More generally, can we write a procedure
to compute the number of ways to change any given amount of money?
'''


'''Por ahora no puedo pensar en una solucion general...
Pero tal vez, pueda intentar crear una solucion que use pocas monedas, y luego intentar generalizarla.


Digamos que ahora solo tengo dos monedas, de 5 y 10

5a+10b=100

donde
0<=a<=20
0<=b<=10
'''

#Esta es una implementancion iterativa y por fuerza bruta para las dos monedas de 5 y 10 centavos
coins=[5, 10]
maximunNumberOfCoinsToMakeADollar=[20, 10]
def change():
  ways=0
  for i in range(21):
    for j in range(11):
      if 5*i+10*j==100:
        ways+=1
        print("5*"+str(i)+"+10*"+str(j))

  print("Number of ways: "+str(ways))

#Probada la solucion para las dos monedas, procedo a hacer una solucion general
def dollarChange():
  ways=0
  for i in range(101):
    for j in range(21):
      for k in range(11):
        for l in range(5):
          for m in range(3):
            if 1*i+5*j+10*k+25*l+50*m==100:
              print("1*"+str(i)+"+5*"+str(j)+"+10*"+str(k)+"+25*"+str(l)+"+50*"+str(k))
              ways+=1
  print("Number of ways: "+str(ways))

#change()
dollarChange()

#Entonces el ejercicio fue resuelto por fuerza bruta, pero todavia tengo que encontrar de hacerlo de una forma mas elegante, recursiva...
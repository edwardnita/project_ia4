import matplotlib.pyplot as plt

# Datele tale
x = [1, 2, 4, 5, 6, 7]
y = [1, 2, 4, 5, 6, 7]

# Creează un grafic de linii
plt.plot(x, y, label='Exemplu de grafic')

# Adaugă etichete pentru axe și titlu
plt.xlabel('X-axis')
plt.ylabel('Y-axis')
plt.title('Grafic de Linii')

# Adaugă o legendă
plt.legend()

# Afișează graficul
plt.show()

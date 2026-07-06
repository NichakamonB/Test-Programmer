n = int(input("Enter number of rows: "))

for i in range(n):
    spaces = "  " * i
    stars = "* " * (2 * (n - i) - 1)
    print(spaces + stars)

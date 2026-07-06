SELECT c.ID, c.Name, c.Email, c.CountryCode, c.Budget, c.Used,
       o.ID AS OrderID, o.Date, o.Amount
FROM Customer c
LEFT JOIN `Order` o ON c.ID = o.CustomerID;
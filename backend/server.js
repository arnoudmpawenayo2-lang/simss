const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const sendReportResponse = (res) => {
  db.query(
    "SELECT COUNT(*) AS totalParts, COALESCE(SUM(Quantity), 0) AS totalStockQuantity, COALESCE(SUM(TotalPrice), 0) AS totalStockValue FROM Spare_Part",
    (err, spareSummary) => {
      if (err) return res.json(err);

      db.query(
        "SELECT SparePartID, Name, Category, Quantity, UnitPrice, TotalPrice FROM Spare_Part ORDER BY SparePartID",
        (err, spareParts) => {
          if (err) return res.json(err);

          db.query(
            "SELECT COUNT(*) AS totalStockIn, COALESCE(SUM(StockInQuantity), 0) AS totalStockInQuantity FROM Stock_In",
            (err, stockInSummary) => {
              if (err) return res.json(err);

              db.query(
                "SELECT COUNT(*) AS totalStockOut, COALESCE(SUM(StockOutQuantity), 0) AS totalStockOutQuantity, COALESCE(SUM(StockOutTotalPrice), 0) AS totalStockOutValue FROM Stock_Out",
                (err, stockOutSummary) => {
                  if (err) return res.json(err);

                  res.json({
                    spareSummary: spareSummary[0],
                    spareParts,
                    stockInSummary: stockInSummary[0],
                    stockOutSummary: stockOutSummary[0],
                  });
                }
              );
            }
          );
        }
      );
    }
  );
};

/* =========================
   AUTH (REGISTER + LOGIN)
========================= */

// REGISTER
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "INSERT INTO Users (Username, Password) VALUES (?, ?)",
    [username, password],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "Registered successfully" });
    }
  );
});

// LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM Users WHERE Username=? AND Password=?",
    [username, password],
    (err, result) => {
      if (err) return res.json(err);

      if (result.length > 0) {
        res.json({ message: "Login success" });
      } else {
        res.json({ message: "Invalid login" });
      }
    }
  );
});

/* =========================
   INSERT (ALL TABLES)
========================= */

// Spare Part
app.post("/spare", (req, res) => {
  const { name, category, quantity, unitPrice } = req.body;
  const total = quantity * unitPrice;

  db.query(
    "INSERT INTO Spare_Part (Name, Category, Quantity, UnitPrice, TotalPrice) VALUES (?, ?, ?, ?, ?)",
    [name, category, quantity, unitPrice, total],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "Spare Part Added" });
    }
  );
});

// Stock In
app.post("/stockin", (req, res) => {
  const { sparePartID, quantity, date } = req.body;

  db.query(
    "INSERT INTO Stock_In (SparePartID, StockInQuantity, StockInDate) VALUES (?, ?, ?)",
    [sparePartID, quantity, date],
    (err) => {
      if (err) return res.json(err);

      // update quantity
      db.query(
        "UPDATE Spare_Part SET Quantity = Quantity + ? WHERE SparePartID=?",
        [quantity, sparePartID]
      );

      res.json({ message: "Stock In Added" });
    }
  );
});

// Stock Out
app.post("/stockout", (req, res) => {
  const { sparePartID, quantity, unitPrice, date } = req.body;
  const total = quantity * unitPrice;

  db.query(
    `INSERT INTO Stock_Out
    (SparePartID, StockOutQuantity, StockOutUnitPrice, StockOutTotalPrice, StockOutDate)
    VALUES (?, ?, ?, ?, ?)`,
    [sparePartID, quantity, unitPrice, total, date],
    (err) => {
      if (err) return res.json(err);

      // reduce quantity
      db.query(
        "UPDATE Spare_Part SET Quantity = Quantity - ? WHERE SparePartID=?",
        [quantity, sparePartID]
      );

      res.json({ message: "Stock Out Added" });
    }
  );
});

/* =========================
   STOCK OUT ONLY (CRUD)
========================= */

// GET
app.get("/stockout", (req, res) => {
  db.query("SELECT * FROM Stock_Out", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

// REPORT
app.get("/report", (req, res) => {
  sendReportResponse(res);
});

app.get("/api/report", (req, res) => {
  sendReportResponse(res);
});

// GET BY ID
app.get("/stockout/:id", (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM Stock_Out WHERE StockOutID = ?", [id], (err, result) => {
    if (err) return res.json(err);
    if (result.length === 0) return res.json({});
    res.json(result[0]);
  });
});

// UPDATE
app.put("/stockout/:id", (req, res) => {
  const id = req.params.id;
  const { quantity, unitPrice } = req.body;
  const total = quantity * unitPrice;

  db.query(
    "UPDATE Stock_Out SET StockOutQuantity=?, StockOutUnitPrice=?, StockOutTotalPrice=? WHERE StockOutID=?",
    [quantity, unitPrice, total, id],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "Updated" });
    }
  );
});

// DELETE
app.delete("/stockout/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM Stock_Out WHERE StockOutID=?",
    [id],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "Deleted" });
    }
  );
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
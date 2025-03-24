import Sale from "../models/Sale.js";

export const addSale = async (req, res) => {
  try {
    const sale = new Sale(req.body);
    await sale.save();
    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSales = async (req, res) => {
  try {
    const { year, month, page = 1, limit = 10 } = req.query;
    let query = {};

    const skip = (page - 1) * limit;

    if (year && month) {
      const startDate = new Date(`${year}-${month}-01`);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);

      query.dateOfSale = { $gte: startDate, $lt: endDate };
    }

    const sales = await Sale.find(query).skip(skip).limit(Number(limit));

    const totalSales = await Sale.countDocuments(query);

    const totalPages = Math.ceil(totalSales / limit);

    res.json({
      sales,
      pagination: {
        page: Number(page),
        totalPages,
        totalSales,
        limit: Number(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }
    res.json(sale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSale = async (req, res) => {
  try {
    const updatedSale = await Sale.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedSale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSale = async (req, res) => {
  try {
    await Sale.findByIdAndDelete(req.params.id);
    res.json({ message: "Sale deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

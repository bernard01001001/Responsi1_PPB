import { LoanModel } from '../models/loanModel.js';

export const LoanController = {
  async getAll(req, res) {
    try {
      const { status } = req.query;
      const loans = await LoanModel.getAll(status);
      res.status(200).json({ success: true, data: loans }); // Diubah dari 'loan' menjadi 'loans'
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const loan = await LoanModel.getById(req.params.id);
      res.status(200).json({ success: true, data: loan });
    } catch (err) {
      res.status(404).json({ success: false, error: 'Data peminjaman tidak ditemukan' });
    }
  },

  async create(req, res) {
    try {
      const { member_name, book_title, borrow_date, due_date, status } = req.body;
      if (!member_name || !book_title || !borrow_date || !due_date) {
        return res.status(400).json({ success: false, error: 'Field wajib diisi: member_name, book_title, borrow_date, due_date' });
      }
      const newLoan = await LoanModel.create({
        member_name,
        book_title,
        borrow_date,
        due_date,
        status: status || 'Dipinjam'
      });
      res.status(201).json({ success: true, message: 'Peminjaman berhasil dicatat', data: newLoan });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  async update(req, res) {
    try {
      const updatedLoan = await LoanModel.update(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'Data peminjaman berhasil diperbarui', data: updatedLoan });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  async remove(req, res) {
    try {
      const result = await LoanModel.remove(req.params.id);
      res.status(200).json({ success: true, message: result.message });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  }
};
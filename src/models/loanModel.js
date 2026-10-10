import { supabase } from '../config/supabaseClient.js';

export const LoanModel = {
  async getAll(status) {
    let query = supabase.from('loans').select('*');
    if (status) {
      query = query.eq('status', status);
    }
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('loans')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(payload) {
    const { data, error } = await supabase
      .from('loans')
      .insert([payload])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, payload) {
    const { data, error } = await supabase
      .from('loans')
      .update(payload)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async returnBook(id) {
    const loan = await this.getById(id);
    if (!loan) throw new Error('Data peminjaman tidak ditemukan');

    const todayStr = new Date().toISOString().split('T')[0];
    
    const currentDateObj = new Date(todayStr);
    const dueDateObj = new Date(loan.due_date);

    const newStatus = currentDateObj > dueDateObj ? 'Terlambat' : 'Dikembalikan';

    const { data, error } = await supabase
      .from('loans')
      .update({ 
        status: newStatus,
        return_date: todayStr 
      })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { error } = await supabase
      .from('loans')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return { message: 'Data peminjaman berhasil dihapus' };
  }
};
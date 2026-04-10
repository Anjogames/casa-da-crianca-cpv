import { useEffect, useState} from 'react';
import AdminLayout from '../../components/AdminLayout';
import './admin.css';
import { supabase } from '../../lib/supabaseClient';


function Usuario() {
  return (
    <AdminLayout>
      <h1>Admin Usuarios</h1>
    </AdminLayout>
  )
}

export default Usuario